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
import NeonButton from '../../components/NeonButton';
import { useApp } from '../../context/AppContext';
import { substances } from '../../data/substances';

interface Props {
  route: any;
  navigation: any;
}

export default function PrepDetailScreen({ route, navigation }: Props) {
  const { planId } = route.params;
  const { prepPlans, addPrepPlan, startSession } = useApp();
  const [localPlans, setLocalPlans] = useState(prepPlans);

  const plan = localPlans.find(p => p.id === planId);
  if (!plan) return null;

  const sub = substances.find(s => s.id === plan.substance);
  const completed = plan.checklist.filter(c => c.checked).length;
  const total = plan.checklist.length;
  const allDone = completed === total;

  const toggleItem = (index: number) => {
    setLocalPlans(plans =>
      plans.map(p =>
        p.id === planId
          ? {
              ...p,
              checklist: p.checklist.map((item, i) =>
                i === index ? { ...item, checked: !item.checked } : item
              ),
            }
          : p
      )
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{plan.title}</Text>
        {sub && <Text style={styles.substance}>{sub.emoji} {sub.name.split(' ')[0]}</Text>}
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Meta */}
        <View style={styles.section}>
          {plan.date && (
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>📅 Date</Text>
              <Text style={styles.metaValue}>{plan.date}</Text>
            </View>
          )}
          {plan.intention && (
            <View style={styles.intentionCard}>
              <Text style={styles.intentionLabel}>💭 Intention</Text>
              <Text style={styles.intentionText}>{plan.intention}</Text>
            </View>
          )}
          {plan.environment && (
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>🌿 Environment</Text>
              <Text style={styles.metaValue}>{plan.environment}</Text>
            </View>
          )}
          {plan.sitter && (
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>👤 Sitter</Text>
              <Text style={styles.metaValue}>{plan.sitter}</Text>
            </View>
          )}
        </View>

        {/* Checklist */}
        <View style={styles.section}>
          <View style={styles.checklistHeader}>
            <Text style={styles.sectionTitle}>Safety Checklist</Text>
            <Text style={styles.checklistProgress}>
              {completed}/{total}
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(completed / total) * 100}%` }]} />
          </View>
          <View style={styles.checklistItems}>
            {plan.checklist.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={styles.checkItem}
                onPress={() => toggleItem(i)}
                activeOpacity={0.7}
              >
                <View style={[styles.checkbox, item.checked && styles.checkboxDone]}>
                  {item.checked && <Text style={styles.checkMark}>✓</Text>}
                </View>
                <Text style={[styles.checkText, item.checked && styles.checkTextDone]}>
                  {item.item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Start Session */}
        {allDone && (
          <View style={styles.section}>
            <View style={styles.readyCard}>
              <Text style={styles.readyEmoji}>✅</Text>
              <Text style={styles.readyTitle}>You're Prepared!</Text>
              <Text style={styles.readyDesc}>
                All checklist items complete. You can now start your companion session.
              </Text>
              <NeonButton
                label="Start Companion Session"
                onPress={() => {
                  startSession(plan.substance);
                  navigation.navigate('Companion');
                }}
                variant="primary"
                size="lg"
                style={{ marginTop: 12 }}
              />
            </View>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: {
    paddingTop: 52,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderMuted,
    gap: 6,
  },
  back: { color: Colors.neonGreen, fontSize: 15, fontWeight: '600', marginBottom: 8 },
  title: { fontSize: 22, fontWeight: '900', color: Colors.textPrimary },
  substance: { color: Colors.electricYellow, fontSize: 14, fontWeight: '600' },
  scroll: { flex: 1 },
  section: { padding: 16, gap: 10 },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderMuted,
    gap: 12,
  },
  metaLabel: { color: Colors.textSecondary, fontSize: 14 },
  metaValue: { flex: 1, color: Colors.textPrimary, fontSize: 14, fontWeight: '600', textAlign: 'right' },
  intentionCard: {
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderGreen,
    borderRadius: BorderRadius.md,
    padding: 14,
    gap: 6,
  },
  intentionLabel: { color: Colors.neonGreen, fontSize: 13, fontWeight: '700' },
  intentionText: { color: Colors.textSecondary, fontSize: 14, lineHeight: 21 },
  checklistHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: Colors.textPrimary },
  checklistProgress: { color: Colors.neonGreen, fontSize: 16, fontWeight: '800' },
  progressBar: { height: 6, backgroundColor: Colors.bgCard, borderRadius: 3 },
  progressFill: { height: 6, backgroundColor: Colors.neonGreen, borderRadius: 3 },
  checklistItems: { gap: 8, marginTop: 4 },
  checkItem: { flexDirection: 'row', gap: 12, alignItems: 'flex-start', paddingVertical: 4 },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: Colors.borderGreen,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 2,
  },
  checkboxDone: { backgroundColor: Colors.neonGreen, borderColor: Colors.neonGreen },
  checkMark: { color: Colors.bg, fontWeight: '900', fontSize: 13 },
  checkText: { flex: 1, color: Colors.textSecondary, fontSize: 14, lineHeight: 21 },
  checkTextDone: { color: Colors.textMuted, textDecorationLine: 'line-through' },
  readyCard: {
    backgroundColor: 'rgba(57,255,20,0.08)',
    borderWidth: 1,
    borderColor: Colors.borderGreen,
    borderRadius: BorderRadius.lg,
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  readyEmoji: { fontSize: 40 },
  readyTitle: { fontSize: 20, fontWeight: '800', color: Colors.neonGreen },
  readyDesc: { color: Colors.textSecondary, fontSize: 14, textAlign: 'center', lineHeight: 21 },
});
