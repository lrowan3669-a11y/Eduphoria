import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Colors, BorderRadius, NeonShadow } from '../utils/theme';
import NeonCard from '../components/NeonCard';
import NeonText from '../components/NeonText';
import MascotGuide from '../components/MascotGuide';
import { useApp } from '../context/AppContext';
import { substances } from '../data/substances';

const { width } = Dimensions.get('window');

interface Props {
  navigation: any;
}

export default function HomeScreen({ navigation }: Props) {
  const { user, savedSubstances, journalEntries, prepPlans, activeSession } = useApp();
  const savedSubstanceData = substances.filter(s => savedSubstances.includes(s.id));

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const modules = [
    { title: 'Learn',     emoji: '📚', desc: 'Substance database',  tab: 'Learn',      color: Colors.neonGreen },
    { title: 'Prepare',   emoji: '🛡️',  desc: 'Plan responsibly',    route: 'Prepare',  color: Colors.electricYellow },
    { title: 'Companion', emoji: '🤝', desc: 'Real-time support',   tab: 'Companion',  color: Colors.tropicalTeal },
    { title: 'Reflect',   emoji: '📔', desc: 'Journal & insights',  tab: 'Reflect',    color: '#FF6B9D' },
    { title: 'Quit',      emoji: '🌱', desc: 'Stop use support',    route: 'Quit',     color: Colors.rastaRed },
  ] as { title: string; emoji: string; desc: string; route?: string; tab?: string; color: string }[];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Rasta stripe top bar */}
      <View style={styles.rastaBar}>
        <View style={[styles.rastaStripe, { backgroundColor: Colors.rastaRed }]} />
        <View style={[styles.rastaStripe, { backgroundColor: Colors.rastaYellow }]} />
        <View style={[styles.rastaStripe, { backgroundColor: Colors.rastaGreen }]} />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>{greeting()}, {user?.name}</Text>
            <NeonText size={12} color={Colors.textMuted} weight="600" style={{ letterSpacing: 1, textTransform: 'uppercase' }}>
              What will you explore today?
            </NeonText>
          </View>
          <TouchableOpacity
            style={styles.avatar}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.avatarText}>{user?.name?.[0] || 'U'}</Text>
          </TouchableOpacity>
        </View>

        {/* Mascot greeting */}
        <View style={styles.mascotCard}>
          <MascotGuide size="md" animate showBubble={false} />
          <View style={styles.mascotBubble}>
            <Text style={styles.mascotText}>
              {user?.learningStreak && user.learningStreak > 0
                ? `🔥 ${user.learningStreak} day streak! Stay curious, stay safe.`
                : "I'm here to guide your journey safely. Education first. Always."}
            </Text>
            <TouchableOpacity
              style={styles.mascotCta}
              onPress={() => navigation.navigate('Learn')}
            >
              <NeonText size={12} color={Colors.neonGreen}>Start Learning →</NeonText>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Active Session Banner */}
      {activeSession && (
        <TouchableOpacity style={styles.sessionBanner} onPress={() => navigation.navigate('Companion')}>
          <Text style={styles.sessionDot}>●</Text>
          <Text style={styles.sessionText}>Active companion session – tap to return</Text>
          <Text style={styles.sessionArrow}>→</Text>
        </TouchableOpacity>
      )}

      {/* Stats */}
      <View style={styles.statsRow}>
        {[
          { emoji: '🔥', value: String(user?.learningStreak ?? 0), label: 'Streak', color: Colors.rastaRed },
          { emoji: '💚', value: `${user?.wellnessScore}%`, label: 'Wellness', color: Colors.neonGreen },
          { emoji: '📖', value: String(user?.totalSessions ?? 0), label: 'Sessions', color: Colors.tropicalTeal },
        ].map((stat, i) => (
          <View key={i} style={[styles.statCard, { borderColor: stat.color + '50' }]}>
            <Text style={styles.statEmoji}>{stat.emoji}</Text>
            <NeonText size={22} color={stat.color}>{stat.value}</NeonText>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Core Modules */}
      <View style={styles.section}>
        <NeonText size={13} color={Colors.textMuted} weight="700" style={styles.sectionLabel}>
          CORE MODULES
        </NeonText>
        <View style={styles.modulesGrid}>
          {modules.map(mod => (
            <TouchableOpacity
              key={mod.title}
              style={[styles.moduleCard, { borderColor: mod.color + '50' }]}
              onPress={() => mod.tab ? navigation.navigate(mod.tab) : navigation.navigate(mod.route as string)}
              activeOpacity={0.75}
            >
              <View style={[styles.moduleGlow, { backgroundColor: mod.color + '10' }]} />
              <Text style={styles.moduleEmoji}>{mod.emoji}</Text>
              <NeonText size={15} color={mod.color}>{mod.title}</NeonText>
              <Text style={styles.moduleDesc}>{mod.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Saved Substances */}
      {savedSubstanceData.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <NeonText size={13} color={Colors.textMuted} weight="700" style={styles.sectionLabel}>SAVED SUBSTANCES</NeonText>
            <TouchableOpacity onPress={() => navigation.navigate('Learn')}>
              <NeonText size={13} color={Colors.neonGreen}>See all</NeonText>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {savedSubstanceData.map(s => (
              <TouchableOpacity
                key={s.id}
                style={styles.substanceChip}
                onPress={() => navigation.navigate('SubstanceDetail', { substanceId: s.id })}
              >
                <Text style={styles.substanceEmoji}>{s.emoji}</Text>
                <Text style={styles.substanceName}>{s.name.split(' ')[0]}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Active Prep Plan */}
      {prepPlans.filter(p => !p.completed).length > 0 && (
        <View style={styles.section}>
          <NeonText size={13} color={Colors.textMuted} weight="700" style={styles.sectionLabel}>UPCOMING PREPARATION</NeonText>
          {prepPlans.filter(p => !p.completed).slice(0, 1).map(plan => {
            const pct = plan.checklist.filter(c => c.checked).length / plan.checklist.length * 100;
            return (
              <TouchableOpacity key={plan.id} onPress={() => navigation.navigate('Prepare')}>
                <NeonCard variant="yellow" glow style={styles.planCard}>
                  <View style={styles.planHeader}>
                    <Text style={styles.planTitle}>{plan.title}</Text>
                    <Text style={styles.planDate}>📅 {plan.date}</Text>
                  </View>
                  <Text style={styles.planSub}>
                    {substances.find(s => s.id === plan.substance)?.emoji}{' '}
                    {substances.find(s => s.id === plan.substance)?.name.split(' ')[0]}
                  </Text>
                  <View style={styles.progressRow}>
                    <Text style={styles.progressText}>{plan.checklist.filter(c => c.checked).length}/{plan.checklist.length} steps</Text>
                    <NeonText size={12} color={Colors.electricYellow}>{Math.round(pct)}%</NeonText>
                  </View>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${pct}%` }]} />
                  </View>
                </NeonCard>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* Recent Journal */}
      {journalEntries.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <NeonText size={13} color={Colors.textMuted} weight="700" style={styles.sectionLabel}>RECENT REFLECTIONS</NeonText>
            <TouchableOpacity onPress={() => navigation.navigate('Reflect')}>
              <NeonText size={13} color={Colors.neonGreen}>See all</NeonText>
            </TouchableOpacity>
          </View>
          {journalEntries.slice(0, 2).map(entry => (
            <NeonCard key={entry.id} style={styles.journalCard}>
              <View style={styles.journalHeader}>
                <Text style={styles.journalTitle}>{entry.title}</Text>
                <Text style={styles.journalDate}>{entry.date}</Text>
              </View>
              <Text style={styles.journalContent} numberOfLines={2}>{entry.content}</Text>
            </NeonCard>
          ))}
        </View>
      )}

      {/* Disclaimer */}
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          ⚠️ Eduphoria does not encourage drug use. All information is for educational and harm reduction purposes only.
        </Text>
      </View>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const moduleW = (width - 32 - 8) / 2;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  rastaBar: { flexDirection: 'row', height: 4 },
  rastaStripe: { flex: 1 },
  header: { paddingHorizontal: 16, paddingTop: 48, paddingBottom: 20, gap: 16 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { fontSize: 22, fontWeight: '900', color: Colors.textPrimary, letterSpacing: 0.3 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.neonGreenDim,
    borderWidth: 2,
    borderColor: Colors.neonGreen,
    alignItems: 'center',
    justifyContent: 'center',
    ...NeonShadow.green,
  },
  avatarText: {
    color: Colors.neonGreen,
    fontWeight: '900',
    fontSize: 18,
    textShadowColor: Colors.neonGreen,
    textShadowRadius: 8,
    textShadowOffset: { width: 0, height: 0 },
  },
  mascotCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(57,255,20,0.04)',
    borderWidth: 1,
    borderColor: Colors.borderGreen,
    borderRadius: 18,
    padding: 14,
    alignItems: 'center',
    gap: 14,
    ...NeonShadow.green,
  },
  mascotBubble: { flex: 1, gap: 10 },
  mascotText: { color: Colors.textSecondary, fontSize: 13, lineHeight: 20 },
  mascotCta: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.neonGreenDim,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.borderGreen,
  },
  sessionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,229,204,0.08)',
    borderWidth: 1,
    borderColor: Colors.borderTeal,
    borderRadius: BorderRadius.md,
    marginHorizontal: 16,
    padding: 12,
    marginBottom: 16,
    gap: 8,
  },
  sessionDot: { color: Colors.tropicalTeal, fontSize: 12 },
  sessionText: { flex: 1, color: Colors.tropicalTeal, fontSize: 13, fontWeight: '600' },
  sessionArrow: { color: Colors.tropicalTeal },
  statsRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, marginBottom: 24 },
  statCard: {
    flex: 1,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    padding: 14,
    alignItems: 'center',
    gap: 4,
  },
  statEmoji: { fontSize: 22 },
  statLabel: { fontSize: 11, color: Colors.textMuted, fontWeight: '600' },
  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionLabel: { letterSpacing: 1.5, marginBottom: 12 },
  modulesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  moduleCard: {
    width: moduleW,
    backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: 16,
    gap: 6,
    overflow: 'hidden',
  },
  moduleGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  moduleEmoji: { fontSize: 28 },
  moduleDesc: { fontSize: 12, color: Colors.textMuted },
  substanceChip: {
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderMuted,
    borderRadius: BorderRadius.lg,
    padding: 12,
    marginRight: 8,
    alignItems: 'center',
    gap: 6,
    minWidth: 80,
  },
  substanceEmoji: { fontSize: 28 },
  substanceName: { color: Colors.textSecondary, fontSize: 12, fontWeight: '600' },
  planCard: { gap: 8 },
  planHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  planTitle: { flex: 1, fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  planDate: { color: Colors.textMuted, fontSize: 12 },
  planSub: { color: Colors.electricYellow, fontSize: 13, fontWeight: '600',
    textShadowColor: Colors.electricYellow, textShadowRadius: 6, textShadowOffset: { width: 0, height: 0 } },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between' },
  progressText: { color: Colors.textMuted, fontSize: 12 },
  progressBar: { height: 3, backgroundColor: Colors.bgCardLight, borderRadius: 2 },
  progressFill: { height: 3, backgroundColor: Colors.electricYellow, borderRadius: 2,
    shadowColor: Colors.electricYellow, shadowRadius: 4, shadowOpacity: 1, shadowOffset: { width: 0, height: 0 } },
  journalCard: { marginBottom: 8, gap: 6 },
  journalHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  journalTitle: { flex: 1, fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  journalDate: { color: Colors.textMuted, fontSize: 11 },
  journalContent: { color: Colors.textSecondary, fontSize: 13, lineHeight: 19 },
  disclaimer: {
    marginHorizontal: 16,
    padding: 12,
    backgroundColor: 'rgba(255,230,0,0.04)',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(255,230,0,0.2)',
  },
  disclaimerText: { color: Colors.textMuted, fontSize: 11, textAlign: 'center', lineHeight: 16 },
});
