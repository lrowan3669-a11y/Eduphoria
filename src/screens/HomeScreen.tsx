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
import { Colors, BorderRadius, Spacing } from '../utils/theme';
import NeonCard from '../components/NeonCard';
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
    { title: 'Learn', emoji: '📚', desc: 'Substance database', tab: 'Learn', color: Colors.neonGreen },
    { title: 'Prepare', emoji: '🛡️', desc: 'Plan responsibly', route: 'Prepare', color: Colors.electricYellow },
    { title: 'Companion', emoji: '🤝', desc: 'Real-time support', tab: 'Companion', color: Colors.tropicalTeal },
    { title: 'Reflect', emoji: '📔', desc: 'Journal & insights', tab: 'Reflect', color: '#FF6B9D' },
    { title: 'Quit', emoji: '🌱', desc: 'Stop use support', route: 'Quit', color: '#9B59B6' },
  ] as { title: string; emoji: string; desc: string; route?: string; tab?: string; color: string }[];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{greeting()}, {user?.name} 👋</Text>
          <Text style={styles.subGreeting}>What would you like to explore today?</Text>
        </View>
        <TouchableOpacity
          style={styles.avatar}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.avatarText}>{user?.name?.[0] || 'U'}</Text>
        </TouchableOpacity>
      </View>

      {/* Active Session Banner */}
      {activeSession && (
        <TouchableOpacity
          style={styles.sessionBanner}
          onPress={() => navigation.navigate('Companion')}
        >
          <Text style={styles.sessionDot}>●</Text>
          <Text style={styles.sessionText}>Active companion session – tap to return</Text>
          <Text style={styles.sessionArrow}>→</Text>
        </TouchableOpacity>
      )}

      {/* Stats */}
      <View style={styles.statsRow}>
        <NeonCard style={styles.statCard} variant="green">
          <Text style={styles.statEmoji}>🔥</Text>
          <Text style={styles.statValue}>{user?.learningStreak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </NeonCard>
        <NeonCard style={styles.statCard} variant="yellow">
          <Text style={styles.statEmoji}>🧠</Text>
          <Text style={styles.statValue}>{user?.wellnessScore}%</Text>
          <Text style={styles.statLabel}>Wellness</Text>
        </NeonCard>
        <NeonCard style={styles.statCard} variant="teal">
          <Text style={styles.statEmoji}>📖</Text>
          <Text style={styles.statValue}>{user?.totalSessions}</Text>
          <Text style={styles.statLabel}>Sessions</Text>
        </NeonCard>
      </View>

      {/* Core Modules */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Core Modules</Text>
        <View style={styles.modulesGrid}>
          {modules.map(mod => (
            <TouchableOpacity
              key={mod.route}
              style={[styles.moduleCard, { borderColor: mod.color + '40' }]}
              onPress={() => mod.tab ? navigation.navigate(mod.tab) : navigation.navigate(mod.route as string)}
              activeOpacity={0.8}
            >
              <Text style={styles.moduleEmoji}>{mod.emoji}</Text>
              <Text style={[styles.moduleTitle, { color: mod.color }]}>{mod.title}</Text>
              <Text style={styles.moduleDesc}>{mod.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Saved Substances */}
      {savedSubstanceData.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Saved Substances</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Learn')}>
              <Text style={styles.seeAll}>See all</Text>
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
          <Text style={styles.sectionTitle}>Upcoming Preparation</Text>
          {prepPlans
            .filter(p => !p.completed)
            .slice(0, 1)
            .map(plan => (
              <TouchableOpacity
                key={plan.id}
                onPress={() => navigation.navigate('Prepare')}
              >
                <NeonCard variant="yellow" style={styles.planCard}>
                  <View style={styles.planHeader}>
                    <Text style={styles.planTitle}>{plan.title}</Text>
                    <Text style={styles.planDate}>📅 {plan.date}</Text>
                  </View>
                  <Text style={styles.planSubstance}>
                    {substances.find(s => s.id === plan.substance)?.emoji}{' '}
                    {substances.find(s => s.id === plan.substance)?.name.split(' ')[0]}
                  </Text>
                  <View style={styles.planProgress}>
                    <Text style={styles.planProgressText}>
                      {plan.checklist.filter(c => c.checked).length}/{plan.checklist.length} steps complete
                    </Text>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width: `${
                              (plan.checklist.filter(c => c.checked).length / plan.checklist.length) * 100
                            }%`,
                          },
                        ]}
                      />
                    </View>
                  </View>
                </NeonCard>
              </TouchableOpacity>
            ))}
        </View>
      )}

      {/* Recent Journal */}
      {journalEntries.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Reflections</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Reflect')}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          {journalEntries.slice(0, 2).map(entry => (
            <NeonCard key={entry.id} style={styles.journalCard}>
              <View style={styles.journalHeader}>
                <Text style={styles.journalTitle}>{entry.title}</Text>
                <Text style={styles.journalDate}>{entry.date}</Text>
              </View>
              <Text style={styles.journalContent} numberOfLines={2}>
                {entry.content}
              </Text>
              {entry.mood && (
                <View style={styles.moodRow}>
                  <Text style={styles.moodLabel}>Mood: </Text>
                  {'⭐'.repeat(Math.round(entry.mood / 2))}
                </View>
              )}
            </NeonCard>
          ))}
        </View>
      )}

      {/* Safety Disclaimer */}
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          ⚠️ Eduphoria does not encourage drug use. All information is for educational and harm reduction purposes only.
        </Text>
      </View>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const cardW = (width - 16 * 2 - 8) / 3;
const moduleW = (width - 16 * 2 - 8) / 2;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 20,
  },
  greeting: { fontSize: 22, fontWeight: '800', color: Colors.textPrimary },
  subGreeting: { color: Colors.textSecondary, fontSize: 13, marginTop: 4 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.neonGreenDim,
    borderWidth: 2,
    borderColor: Colors.neonGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: Colors.neonGreen, fontWeight: '800', fontSize: 18 },
  sessionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,229,204,0.12)',
    borderWidth: 1,
    borderColor: Colors.tropicalTeal,
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
  statCard: { flex: 1, alignItems: 'center', gap: 4, padding: 12 },
  statEmoji: { fontSize: 22 },
  statValue: { fontSize: 20, fontWeight: '800', color: Colors.textPrimary },
  statLabel: { fontSize: 11, color: Colors.textMuted, textAlign: 'center' },
  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: Colors.textPrimary, marginBottom: 12 },
  seeAll: { color: Colors.neonGreen, fontSize: 13, fontWeight: '600' },
  modulesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  moduleCard: {
    width: moduleW,
    backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: 16,
    gap: 6,
  },
  moduleEmoji: { fontSize: 28 },
  moduleTitle: { fontSize: 16, fontWeight: '800' },
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
  planCard: { gap: 10 },
  planHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  planTitle: { flex: 1, fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  planDate: { color: Colors.textMuted, fontSize: 12 },
  planSubstance: { color: Colors.electricYellow, fontSize: 13, fontWeight: '600' },
  planProgress: { gap: 6 },
  planProgressText: { color: Colors.textSecondary, fontSize: 12 },
  progressBar: { height: 4, backgroundColor: Colors.bgCardLight, borderRadius: 2 },
  progressFill: { height: 4, backgroundColor: Colors.electricYellow, borderRadius: 2 },
  journalCard: { marginBottom: 8, gap: 8 },
  journalHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  journalTitle: { flex: 1, fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  journalDate: { color: Colors.textMuted, fontSize: 11 },
  journalContent: { color: Colors.textSecondary, fontSize: 13, lineHeight: 19 },
  moodRow: { flexDirection: 'row', alignItems: 'center' },
  moodLabel: { color: Colors.textMuted, fontSize: 12 },
  disclaimer: {
    marginHorizontal: 16,
    padding: 12,
    backgroundColor: 'rgba(255,184,0,0.08)',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(255,184,0,0.2)',
  },
  disclaimerText: { color: Colors.warning, fontSize: 11, textAlign: 'center', lineHeight: 16 },
});
