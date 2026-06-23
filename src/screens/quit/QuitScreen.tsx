import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Colors, BorderRadius } from '../../utils/theme';
import NeonCard from '../../components/NeonCard';
import NeonButton from '../../components/NeonButton';
import MascotGuide from '../../components/MascotGuide';

interface Props {
  navigation: any;
}

const SUPPORT_LINES = [
  { name: 'FRANK (UK)', number: '0300 123 6600', desc: '24/7 drug info & support' },
  { name: 'Drinkline (UK)', number: '0300 123 1110', desc: 'Alcohol support' },
  { name: 'Talk to Frank', number: 'talktofrank.com', desc: 'Online chat & info' },
  { name: 'Narcotics Anonymous', number: '0300 999 1212', desc: 'NA helpline UK' },
  { name: 'Alcoholics Anonymous', number: '0800 9177 650', desc: 'AA helpline UK' },
];

const STRATEGIES = [
  {
    emoji: '🌟',
    title: 'Set a Clear Goal',
    desc: 'Decide whether you want to quit completely, reduce use, or take a break. Having clarity is the first step.',
  },
  {
    emoji: '📅',
    title: 'Choose a Quit Date',
    desc: 'Give yourself 1–2 weeks to prepare mentally. Mark it in your calendar and tell a trusted friend.',
  },
  {
    emoji: '🧠',
    title: 'Understand Your Triggers',
    desc: 'Identify what situations, emotions, or people trigger your use. Awareness is power.',
  },
  {
    emoji: '🏃',
    title: 'Replace the Habit',
    desc: 'Find healthy alternatives for the same need – exercise, creativity, socialising, meditation.',
  },
  {
    emoji: '👥',
    title: 'Build Your Support Network',
    desc: 'Tell people you trust. Consider a support group. You don\'t have to do this alone.',
  },
  {
    emoji: '💊',
    title: 'Medical Support',
    desc: 'For alcohol, benzodiazepines, or opioids – NEVER quit cold turkey without medical supervision. Withdrawal can be fatal.',
  },
  {
    emoji: '🌱',
    title: 'Take It One Day at a Time',
    desc: 'Recovery isn\'t linear. Setbacks happen. Treat every day sober or reduced as a victory.',
  },
  {
    emoji: '📔',
    title: 'Journal Your Journey',
    desc: 'Use Eduphoria\'s Reflect section to track your progress, feelings, and growth.',
  },
];

const WITHDRAWAL_WARNINGS = [
  { substance: 'Alcohol', risk: 'HIGH', warning: 'Can cause seizures and death. Seek medical supervision ALWAYS.' },
  { substance: 'Benzodiazepines', risk: 'HIGH', warning: 'Can cause seizures. Never quit cold turkey. See a doctor.' },
  { substance: 'Opioids', risk: 'MODERATE', warning: 'Painful but rarely fatal. Medical support strongly recommended.' },
  { substance: 'Cannabis', risk: 'LOW', warning: 'Uncomfortable but not dangerous. Anxiety, irritability, sleep disruption.' },
  { substance: 'Stimulants', risk: 'LOW-MOD', warning: 'Fatigue, depression. Support and monitoring advised.' },
];

export default function QuitScreen({ navigation }: Props) {
  const [dayCount, setDayCount] = useState(0);
  const [tracking, setTracking] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>🌱 Quit Support</Text>
          <Text style={styles.subtitle}>You don't have to face this alone</Text>
          <MascotGuide
            message="I'm proud of you for being here. Every step forward matters, no matter how small. 💚"
            size="md"
            style={{ marginTop: 12 }}
          />
        </View>

        {/* Mission Statement */}
        <View style={styles.section}>
          <NeonCard variant="green" style={styles.missionCard}>
            <Text style={styles.missionEmoji}>💚</Text>
            <Text style={styles.missionTitle}>Every Journey Starts With a Decision</Text>
            <Text style={styles.missionText}>
              Whether you want to cut back, take a break, or quit entirely – Eduphoria supports you without judgement.
              Recovery looks different for everyone, and every positive step matters.
            </Text>
          </NeonCard>
        </View>

        {/* Counter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobriety Tracker</Text>
          <NeonCard style={styles.counterCard} variant="teal">
            <Text style={styles.counterNumber}>{dayCount}</Text>
            <Text style={styles.counterLabel}>days</Text>
            <Text style={styles.counterDesc}>
              {dayCount === 0
                ? 'Start tracking your journey today'
                : dayCount === 1
                ? '1 day – every journey starts with one'
                : `${dayCount} days – you should be proud`}
            </Text>
            <View style={styles.counterBtns}>
              <NeonButton
                label={tracking ? '+ Add a Day' : 'Start Tracking'}
                onPress={() => {
                  setTracking(true);
                  setDayCount(d => d + 1);
                }}
                variant="primary"
                size="sm"
              />
              {tracking && dayCount > 0 && (
                <NeonButton
                  label="Reset"
                  onPress={() => setDayCount(0)}
                  variant="outline"
                  size="sm"
                />
              )}
            </View>
          </NeonCard>
        </View>

        {/* Withdrawal Warning */}
        <View style={styles.section}>
          <NeonCard style={styles.warnCard}>
            <Text style={styles.warnTitle}>⚠️ Critical: Withdrawal Safety</Text>
            <Text style={styles.warnIntro}>
              Some substances have dangerous or fatal withdrawals. NEVER quit these cold turkey:
            </Text>
            {WITHDRAWAL_WARNINGS.map((w, i) => (
              <View key={i} style={styles.withdrawRow}>
                <View style={styles.withdrawLeft}>
                  <Text style={styles.withdrawSub}>{w.substance}</Text>
                  <View style={[
                    styles.riskBadge,
                    { backgroundColor: w.risk === 'HIGH' ? Colors.danger + '22' : w.risk === 'MODERATE' ? Colors.warning + '22' : Colors.success + '22' }
                  ]}>
                    <Text style={[
                      styles.riskText,
                      { color: w.risk === 'HIGH' ? Colors.danger : w.risk === 'MODERATE' ? Colors.warning : Colors.success }
                    ]}>{w.risk}</Text>
                  </View>
                </View>
                <Text style={styles.withdrawWarn}>{w.warning}</Text>
              </View>
            ))}
          </NeonCard>
        </View>

        {/* Support Lines */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Get Help Now</Text>
          {SUPPORT_LINES.map((line, i) => (
            <View key={i} style={styles.supportRow}>
              <View style={styles.supportInfo}>
                <Text style={styles.supportName}>{line.name}</Text>
                <Text style={styles.supportDesc}>{line.desc}</Text>
              </View>
              <Text style={styles.supportNumber}>{line.number}</Text>
            </View>
          ))}
        </View>

        {/* Strategies */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quit Strategies</Text>
          {STRATEGIES.map((s, i) => (
            <View key={i} style={styles.strategyRow}>
              <Text style={styles.strategyEmoji}>{s.emoji}</Text>
              <View style={styles.strategyInfo}>
                <Text style={styles.strategyTitle}>{s.title}</Text>
                <Text style={styles.strategyDesc}>{s.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Journal Prompt */}
        <View style={styles.section}>
          <NeonButton
            label="📔 Start a Reflection Journal"
            onPress={() => navigation.navigate('Reflect')}
            variant="outline"
          />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: { paddingHorizontal: 16, paddingTop: 56, paddingBottom: 16 },
  title: { fontSize: 28, fontWeight: '900', color: Colors.textPrimary },
  subtitle: { color: Colors.textSecondary, fontSize: 13, marginTop: 4 },
  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: Colors.textPrimary, marginBottom: 12 },
  missionCard: { alignItems: 'center', gap: 10, padding: 20 },
  missionEmoji: { fontSize: 36 },
  missionTitle: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary, textAlign: 'center' },
  missionText: { color: Colors.textSecondary, fontSize: 14, lineHeight: 21, textAlign: 'center' },
  counterCard: { alignItems: 'center', gap: 8, padding: 24 },
  counterNumber: { fontSize: 72, fontWeight: '900', color: Colors.tropicalTeal },
  counterLabel: { color: Colors.textSecondary, fontSize: 16, marginTop: -12 },
  counterDesc: { color: Colors.textSecondary, fontSize: 14, textAlign: 'center' },
  counterBtns: { flexDirection: 'row', gap: 12, marginTop: 8 },
  warnCard: { backgroundColor: 'rgba(255,68,68,0.06)', borderColor: 'rgba(255,68,68,0.3)', gap: 12 },
  warnTitle: { color: Colors.danger, fontSize: 15, fontWeight: '800' },
  warnIntro: { color: Colors.textSecondary, fontSize: 13, lineHeight: 19 },
  withdrawRow: { gap: 4, paddingVertical: 8, borderTopWidth: 1, borderTopColor: Colors.borderMuted },
  withdrawLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  withdrawSub: { color: Colors.textPrimary, fontSize: 14, fontWeight: '700' },
  riskBadge: { borderRadius: 4, paddingHorizontal: 7, paddingVertical: 2 },
  riskText: { fontSize: 10, fontWeight: '900' },
  withdrawWarn: { color: Colors.textSecondary, fontSize: 12, lineHeight: 18 },
  supportRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderMuted,
    borderRadius: BorderRadius.md,
    padding: 14,
    marginBottom: 8,
    gap: 12,
  },
  supportInfo: { flex: 1, gap: 2 },
  supportName: { color: Colors.textPrimary, fontSize: 14, fontWeight: '700' },
  supportDesc: { color: Colors.textMuted, fontSize: 12 },
  supportNumber: { color: Colors.neonGreen, fontSize: 13, fontWeight: '700' },
  strategyRow: {
    flexDirection: 'row',
    gap: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderMuted,
    alignItems: 'flex-start',
  },
  strategyEmoji: { fontSize: 26, width: 36, textAlign: 'center' },
  strategyInfo: { flex: 1, gap: 4 },
  strategyTitle: { color: Colors.textPrimary, fontSize: 15, fontWeight: '700' },
  strategyDesc: { color: Colors.textSecondary, fontSize: 13, lineHeight: 19 },
});
