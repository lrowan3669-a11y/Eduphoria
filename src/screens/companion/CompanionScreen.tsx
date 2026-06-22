import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  StatusBar,
  Dimensions,
  Modal,
} from 'react-native';
import { Colors, BorderRadius } from '../../utils/theme';
import NeonCard from '../../components/NeonCard';
import NeonButton from '../../components/NeonButton';
import { useApp } from '../../context/AppContext';

const { width } = Dimensions.get('window');

interface Props {
  navigation: any;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const GROUNDING_EXERCISES = [
  {
    title: '5-4-3-2-1 Grounding',
    emoji: '🌿',
    steps: [
      'Name 5 things you can SEE around you',
      'Name 4 things you can TOUCH',
      'Name 3 things you can HEAR',
      'Name 2 things you can SMELL',
      'Name 1 thing you can TASTE',
    ],
  },
  {
    title: 'Box Breathing',
    emoji: '🌬️',
    steps: [
      'Breathe IN for 4 counts',
      'HOLD for 4 counts',
      'Breathe OUT for 4 counts',
      'HOLD for 4 counts',
      'Repeat 4–6 times',
    ],
  },
  {
    title: 'Body Scan',
    emoji: '✨',
    steps: [
      'Sit or lie comfortably',
      'Close your eyes gently',
      'Slowly notice your feet... then legs... then torso...',
      'Notice any sensations without judgement',
      'Remember: sensations always pass',
    ],
  },
];

const AI_RESPONSES: Record<string, string> = {
  default:
    "I'm here with you. You're in a safe space and everything is okay. Take slow, deep breaths. What are you experiencing right now?",
  anxious:
    "It makes sense to feel this way – these sensations can be intense. Remember: you are safe. This is temporary and will pass. Try breathing slowly: in for 4 counts, hold for 4, out for 4. You are not alone.",
  scared:
    "Fear during these experiences is completely normal and it does not mean anything is wrong. You are physically safe. The feelings you're having cannot hurt you. Would you like to try a grounding exercise together?",
  confused:
    "Feeling confused is very common and it's okay. You don't need to understand or figure anything out right now. Just be here. Notice your breathing. Feel the ground beneath you. Everything is unfolding exactly as it should.",
  good:
    "That's wonderful to hear! These moments of clarity and connection are valuable. Would you like to write down any insights you're having? Your journal is here whenever you're ready.",
  music:
    "Music can be deeply therapeutic during these experiences. I'd suggest gentle, ambient music – Brian Eno, Steve Reich, or nature sounds tend to be very supportive. Avoid lyrics or dramatic changes in tempo.",
  help:
    "I'm right here. First – are you physically safe? If this is a medical emergency, please call emergency services (999 in UK, 911 in US). If you're feeling overwhelmed emotionally, I can guide you through grounding techniques. What do you need most right now?",
};

function getAIResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('anxious') || lower.includes('anxiety') || lower.includes('panic'))
    return AI_RESPONSES.anxious;
  if (lower.includes('scared') || lower.includes('fear') || lower.includes('terrified'))
    return AI_RESPONSES.scared;
  if (lower.includes('confused') || lower.includes('lost') || lower.includes('don\'t understand'))
    return AI_RESPONSES.confused;
  if (lower.includes('good') || lower.includes('great') || lower.includes('amazing') || lower.includes('beautiful'))
    return AI_RESPONSES.good;
  if (lower.includes('music') || lower.includes('song') || lower.includes('sound'))
    return AI_RESPONSES.music;
  if (lower.includes('help') || lower.includes('emergency') || lower.includes('wrong'))
    return AI_RESPONSES.help;
  return AI_RESPONSES.default;
}

export default function CompanionScreen({ navigation }: Props) {
  const { activeSession, sessionSubstance, endSession, addJournalEntry } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content:
        "Hello, I'm your Eduphoria companion. I'm here to support you through your experience with calm, non-judgemental guidance.\n\nYou are safe. I am with you.\n\nHow are you feeling right now?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'ground' | 'breathe' | 'journal'>('chat');
  const [breathPhase, setBreathPhase] = useState<'in' | 'hold' | 'out' | 'pause'>('in');
  const [breathCount, setBreathCount] = useState(4);
  const [breathing, setBreathing] = useState(false);
  const [journalText, setJournalText] = useState('');
  const breathAnim = useRef(new Animated.Value(0.5)).current;
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (breathing) runBreathCycle();
    else breathAnim.stopAnimation();
  }, [breathing, breathPhase]);

  const runBreathCycle = () => {
    const phases: ('in' | 'hold' | 'out' | 'pause')[] = ['in', 'hold', 'out', 'pause'];
    const idx = phases.indexOf(breathPhase);
    const next = phases[(idx + 1) % phases.length];
    const dur = 4000;

    const toVal = breathPhase === 'in' ? 1 : breathPhase === 'out' ? 0.5 : undefined;

    if (toVal !== undefined) {
      Animated.timing(breathAnim, {
        toValue: toVal,
        duration: dur,
        useNativeDriver: true,
      }).start(() => {
        if (breathing) setBreathPhase(next);
      });
    } else {
      setTimeout(() => {
        if (breathing) setBreathPhase(next);
      }, dur);
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    setMessages(m => [...m, userMsg]);
    setInput('');

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAIResponse(input),
        timestamp: new Date(),
      };
      setMessages(m => [...m, aiMsg]);
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 800);
  };

  const saveJournal = () => {
    if (!journalText.trim()) return;
    addJournalEntry({
      date: new Date().toISOString().split('T')[0],
      type: 'companion',
      title: 'Companion Session Note',
      content: journalText,
      substance: sessionSubstance,
      tags: ['companion', 'in-session'],
    });
    setJournalText('');
    navigation.navigate('Reflect');
  };

  const breathLabel = {
    in: 'Breathe IN',
    hold: 'HOLD',
    out: 'Breathe OUT',
    pause: 'Rest...',
  }[breathPhase];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>🤝 Companion</Text>
          <Text style={styles.subtitle}>
            {activeSession ? '● Live session active' : 'Your AI support guide'}
          </Text>
        </View>
        {activeSession && (
          <TouchableOpacity
            style={styles.endBtn}
            onPress={() => {
              endSession();
              navigation.navigate('Reflect');
            }}
          >
            <Text style={styles.endBtnText}>End Session</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Emergency Banner */}
      <TouchableOpacity style={styles.emergencyBanner}>
        <Text style={styles.emergencyText}>🆘 Emergency: 999 | FRANK: 0300 123 6600</Text>
      </TouchableOpacity>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        {[
          { key: 'chat', label: '💬 Chat' },
          { key: 'ground', label: '🌿 Ground' },
          { key: 'breathe', label: '🌬️ Breathe' },
          { key: 'journal', label: '📝 Note' },
        ].map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key as any)}
          >
            <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Chat Tab */}
      {activeTab === 'chat' && (
        <View style={styles.chatContainer}>
          <ScrollView
            ref={scrollRef}
            style={styles.messages}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
          >
            {messages.map(msg => (
              <View
                key={msg.id}
                style={[
                  styles.bubble,
                  msg.role === 'user' ? styles.userBubble : styles.aiBubble,
                ]}
              >
                {msg.role === 'assistant' && (
                  <Text style={styles.aiLabel}>🤝 Companion</Text>
                )}
                <Text style={[styles.bubbleText, msg.role === 'user' && styles.userText]}>
                  {msg.content}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.chatInput}
              value={input}
              onChangeText={setInput}
              placeholder="How are you feeling?"
              placeholderTextColor={Colors.textMuted}
              multiline
              maxLength={500}
            />
            <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
              <Text style={styles.sendBtnText}>→</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Grounding Tab */}
      {activeTab === 'ground' && (
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.groundIntro}>
            Grounding techniques help you reconnect with the present moment when feelings become overwhelming.
          </Text>
          {GROUNDING_EXERCISES.map((ex, i) => (
            <NeonCard key={i} variant="green" style={styles.groundCard}>
              <Text style={styles.groundEmoji}>{ex.emoji}</Text>
              <Text style={styles.groundTitle}>{ex.title}</Text>
              {ex.steps.map((step, j) => (
                <View key={j} style={styles.groundStep}>
                  <View style={styles.groundNum}>
                    <Text style={styles.groundNumText}>{j + 1}</Text>
                  </View>
                  <Text style={styles.groundStepText}>{step}</Text>
                </View>
              ))}
            </NeonCard>
          ))}
          <View style={{ height: 40 }} />
        </ScrollView>
      )}

      {/* Breathing Tab */}
      {activeTab === 'breathe' && (
        <View style={styles.breatheContainer}>
          <Text style={styles.breatheTitle}>Box Breathing</Text>
          <Text style={styles.breatheDesc}>
            Slow breathing activates your parasympathetic nervous system, reducing anxiety.
          </Text>

          <View style={styles.breathCircleContainer}>
            <Animated.View
              style={[
                styles.breathCircle,
                {
                  transform: [{ scale: breathAnim }],
                  opacity: Animated.add(0.4, Animated.multiply(breathAnim, 0.6)),
                },
              ]}
            />
            <View style={styles.breathInner}>
              <Text style={styles.breathLabel}>{breathing ? breathLabel : 'Press Start'}</Text>
            </View>
          </View>

          <NeonButton
            label={breathing ? 'Stop' : 'Start Breathing Exercise'}
            onPress={() => {
              setBreathing(!breathing);
              setBreathPhase('in');
            }}
            variant={breathing ? 'outline' : 'primary'}
            size="lg"
            style={styles.breathBtn}
          />
        </View>
      )}

      {/* Journal/Note Tab */}
      {activeTab === 'journal' && (
        <View style={styles.journalContainer}>
          <Text style={styles.journalTitle}>Session Notes</Text>
          <Text style={styles.journalDesc}>
            Capture thoughts, insights, or feelings during your experience.
          </Text>
          <TextInput
            style={styles.journalInput}
            value={journalText}
            onChangeText={setJournalText}
            placeholder="What are you experiencing? Any insights, thoughts, or feelings you want to capture..."
            placeholderTextColor={Colors.textMuted}
            multiline
            textAlignVertical="top"
          />
          <NeonButton
            label="Save to Journal"
            onPress={saveJournal}
            disabled={!journalText.trim()}
            style={{ marginTop: 12 }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 12,
  },
  title: { fontSize: 26, fontWeight: '900', color: Colors.textPrimary },
  subtitle: { color: Colors.tropicalTeal, fontSize: 13, marginTop: 2 },
  endBtn: {
    backgroundColor: 'rgba(255,68,68,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,68,68,0.4)',
    borderRadius: BorderRadius.md,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  endBtnText: { color: Colors.danger, fontSize: 13, fontWeight: '700' },
  emergencyBanner: {
    backgroundColor: 'rgba(255,68,68,0.1)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,68,68,0.25)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  emergencyText: { color: Colors.danger, fontSize: 12, fontWeight: '600' },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderMuted,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: { borderBottomColor: Colors.tropicalTeal },
  tabText: { color: Colors.textMuted, fontSize: 12, fontWeight: '600' },
  tabTextActive: { color: Colors.tropicalTeal },
  chatContainer: { flex: 1 },
  messages: { flex: 1 },
  messagesContent: { padding: 16, gap: 12 },
  bubble: {
    maxWidth: '85%',
    borderRadius: BorderRadius.lg,
    padding: 14,
    gap: 6,
  },
  aiBubble: {
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderTeal,
    alignSelf: 'flex-start',
  },
  userBubble: {
    backgroundColor: Colors.neonGreenDim,
    borderWidth: 1,
    borderColor: Colors.borderGreen,
    alignSelf: 'flex-end',
  },
  aiLabel: { color: Colors.tropicalTeal, fontSize: 11, fontWeight: '700' },
  bubbleText: { color: Colors.textSecondary, fontSize: 14, lineHeight: 21 },
  userText: { color: Colors.textPrimary },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.borderMuted,
    alignItems: 'flex-end',
  },
  chatInput: {
    flex: 1,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderMuted,
    borderRadius: BorderRadius.md,
    color: Colors.textPrimary,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    maxHeight: 100,
  },
  sendBtn: {
    width: 44,
    height: 44,
    backgroundColor: Colors.tropicalTeal,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnText: { color: Colors.bg, fontSize: 20, fontWeight: '800' },
  scrollContent: { flex: 1, padding: 16 },
  groundIntro: { color: Colors.textSecondary, fontSize: 14, lineHeight: 21, marginBottom: 16 },
  groundCard: { marginBottom: 16, gap: 10 },
  groundEmoji: { fontSize: 32 },
  groundTitle: { fontSize: 17, fontWeight: '800', color: Colors.textPrimary },
  groundStep: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  groundNum: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.neonGreenDim,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 2,
  },
  groundNumText: { color: Colors.neonGreen, fontSize: 11, fontWeight: '800' },
  groundStepText: { flex: 1, color: Colors.textSecondary, fontSize: 14, lineHeight: 21 },
  breatheContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 20 },
  breatheTitle: { fontSize: 24, fontWeight: '900', color: Colors.textPrimary },
  breatheDesc: { color: Colors.textSecondary, fontSize: 14, textAlign: 'center', lineHeight: 21 },
  breathCircleContainer: { width: 200, height: 200, alignItems: 'center', justifyContent: 'center' },
  breathCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.tropicalTeal,
  },
  breathInner: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  breathLabel: { color: Colors.textPrimary, fontSize: 18, fontWeight: '800', textAlign: 'center' },
  breathBtn: { width: '100%' },
  journalContainer: { flex: 1, padding: 16, gap: 8 },
  journalTitle: { fontSize: 20, fontWeight: '800', color: Colors.textPrimary },
  journalDesc: { color: Colors.textSecondary, fontSize: 14 },
  journalInput: {
    flex: 1,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderMuted,
    borderRadius: BorderRadius.lg,
    color: Colors.textPrimary,
    padding: 16,
    fontSize: 15,
    lineHeight: 22,
  },
});
