import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  StatusBar,
} from 'react-native';
import { Colors, BorderRadius } from '../../utils/theme';
import NeonCard from '../../components/NeonCard';
import NeonButton from '../../components/NeonButton';
import { useApp } from '../../context/AppContext';
import { substances } from '../../data/substances';

interface Props {
  navigation: any;
}

const DEFAULT_CHECKLIST = [
  'Set a clear intention for this experience',
  'Informed a trusted sober sitter',
  'Prepared a safe, comfortable environment',
  'No obligations for the next 24 hours',
  'Fasted appropriately',
  'Checked for medication interactions',
  'Have emergency contacts saved',
  'Trip stopper / emergency medication available',
  'Stayed well hydrated',
  'Mentally prepared and in a positive mindset',
];

export default function PrepareScreen({ navigation }: Props) {
  const { prepPlans, addPrepPlan, user } = useApp();
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedSubstance, setSelectedSubstance] = useState('');
  const [date, setDate] = useState('');
  const [intention, setIntention] = useState('');
  const [environment, setEnvironment] = useState('');
  const [sitter, setSitter] = useState('');

  const handleCreate = () => {
    if (!title || !selectedSubstance) return;
    addPrepPlan({
      title,
      substance: selectedSubstance,
      date,
      intention,
      environment,
      sitter,
      completed: false,
      checklist: DEFAULT_CHECKLIST.map(item => ({ item, checked: false })),
    });
    setModalVisible(false);
    setTitle('');
    setSelectedSubstance('');
    setDate('');
    setIntention('');
    setEnvironment('');
    setSitter('');
  };

  const safetyTips = [
    { emoji: '🧭', title: 'Set Your Intention', desc: 'Knowing WHY you are exploring helps guide the experience.' },
    { emoji: '🌿', title: 'Set & Setting', desc: 'Your mindset and environment are the two biggest predictors of experience quality.' },
    { emoji: '👥', title: 'Trip Sitter', desc: 'A trusted, sober companion can be life-saving. Never go alone.' },
    { emoji: '🧪', title: 'Test Your Substance', desc: 'Reagent testing kits can identify dangerous adulterants like fentanyl.' },
    { emoji: '⏰', title: 'Clear Your Schedule', desc: 'Give yourself 24 hours with no obligations or responsibilities.' },
    { emoji: '🚨', title: 'Have a Plan B', desc: 'Know what to do if things get difficult. Have emergency contacts ready.' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🛡️ Prepare</Text>
          <Text style={styles.subtitle}>Plan your experience responsibly</Text>
        </View>

        {/* Safety Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preparation Principles</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {safetyTips.map((tip, i) => (
              <NeonCard key={i} variant="green" style={styles.tipCard}>
                <Text style={styles.tipEmoji}>{tip.emoji}</Text>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipDesc}>{tip.desc}</Text>
              </NeonCard>
            ))}
          </ScrollView>
        </View>

        {/* Emergency Info */}
        <View style={styles.section}>
          <NeonCard style={styles.emergencyCard}>
            <Text style={styles.emergencyTitle}>🆘 Emergency Information</Text>
            <View style={styles.emergencyRows}>
              <View style={styles.emergencyRow}>
                <Text style={styles.emergencyLabel}>UK Emergency:</Text>
                <Text style={styles.emergencyNumber}>999</Text>
              </View>
              <View style={styles.emergencyRow}>
                <Text style={styles.emergencyLabel}>FRANK Helpline:</Text>
                <Text style={styles.emergencyNumber}>0300 123 6600</Text>
              </View>
              <View style={styles.emergencyRow}>
                <Text style={styles.emergencyLabel}>DAN 24/7:</Text>
                <Text style={styles.emergencyNumber}>0808 802 0954</Text>
              </View>
              <View style={styles.emergencyRow}>
                <Text style={styles.emergencyLabel}>Crisis text:</Text>
                <Text style={styles.emergencyNumber}>Text HELLO to 85258</Text>
              </View>
            </View>
          </NeonCard>
        </View>

        {/* Prep Plans */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Preparation Plans</Text>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.addBtnText}>+ New Plan</Text>
            </TouchableOpacity>
          </View>

          {prepPlans.length === 0 ? (
            <NeonCard style={styles.emptyCard}>
              <Text style={styles.emptyEmoji}>📋</Text>
              <Text style={styles.emptyTitle}>No plans yet</Text>
              <Text style={styles.emptyDesc}>
                Create a preparation plan to help ensure your experience is as safe as possible.
              </Text>
              <NeonButton
                label="Create First Plan"
                onPress={() => setModalVisible(true)}
                size="sm"
                style={{ marginTop: 8 }}
              />
            </NeonCard>
          ) : (
            prepPlans.map(plan => {
              const sub = substances.find(s => s.id === plan.substance);
              const completed = plan.checklist.filter(c => c.checked).length;
              const total = plan.checklist.length;
              const pct = total ? (completed / total) * 100 : 0;
              return (
                <TouchableOpacity
                  key={plan.id}
                  onPress={() => navigation.navigate('PrepDetail', { planId: plan.id })}
                >
                  <NeonCard style={styles.planCard} variant={plan.completed ? 'teal' : 'yellow'}>
                    <View style={styles.planHeader}>
                      <Text style={styles.planTitle}>{plan.title}</Text>
                      {plan.completed && (
                        <View style={styles.completedBadge}>
                          <Text style={styles.completedText}>Done</Text>
                        </View>
                      )}
                    </View>
                    {sub && (
                      <Text style={styles.planSub}>
                        {sub.emoji} {sub.name.split(' ')[0]}
                      </Text>
                    )}
                    {plan.date && <Text style={styles.planDate}>📅 {plan.date}</Text>}
                    {plan.intention && (
                      <Text style={styles.planIntention} numberOfLines={2}>
                        💭 {plan.intention}
                      </Text>
                    )}
                    <View style={styles.progressRow}>
                      <Text style={styles.progressText}>{completed}/{total} checklist items</Text>
                      <Text style={styles.progressPct}>{Math.round(pct)}%</Text>
                    </View>
                    <View style={styles.progressBar}>
                      <View style={[styles.progressFill, { width: `${pct}%` }]} />
                    </View>
                  </NeonCard>
                </TouchableOpacity>
              );
            })
          )}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>

      {/* Create Plan Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Preparation Plan</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalForm}>
                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Plan Title *</Text>
                  <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="e.g. Weekend Forest Experience"
                    placeholderTextColor={Colors.textMuted}
                  />
                </View>

                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Substance *</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {substances.map(s => (
                      <TouchableOpacity
                        key={s.id}
                        style={[
                          styles.subChip,
                          selectedSubstance === s.id && styles.subChipActive,
                        ]}
                        onPress={() => setSelectedSubstance(s.id)}
                      >
                        <Text>{s.emoji}</Text>
                        <Text
                          style={[
                            styles.subChipText,
                            selectedSubstance === s.id && { color: Colors.neonGreen },
                          ]}
                        >
                          {s.name.split(' ')[0]}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Planned Date</Text>
                  <TextInput
                    style={styles.input}
                    value={date}
                    onChangeText={setDate}
                    placeholder="e.g. 2024-03-15"
                    placeholderTextColor={Colors.textMuted}
                  />
                </View>

                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Your Intention</Text>
                  <TextInput
                    style={[styles.input, styles.textarea]}
                    value={intention}
                    onChangeText={setIntention}
                    placeholder="Why are you doing this? What do you hope to gain?"
                    placeholderTextColor={Colors.textMuted}
                    multiline
                    numberOfLines={3}
                  />
                </View>

                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Environment</Text>
                  <TextInput
                    style={styles.input}
                    value={environment}
                    onChangeText={setEnvironment}
                    placeholder="Where will this take place?"
                    placeholderTextColor={Colors.textMuted}
                  />
                </View>

                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Sober Sitter</Text>
                  <TextInput
                    style={styles.input}
                    value={sitter}
                    onChangeText={setSitter}
                    placeholder="Who will be your sober companion?"
                    placeholderTextColor={Colors.textMuted}
                  />
                </View>

                <NeonButton
                  label="Create Plan"
                  onPress={handleCreate}
                  disabled={!title || !selectedSubstance}
                  style={{ marginTop: 8 }}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: { paddingHorizontal: 16, paddingTop: 56, paddingBottom: 16 },
  title: { fontSize: 28, fontWeight: '900', color: Colors.textPrimary },
  subtitle: { color: Colors.textSecondary, fontSize: 13, marginTop: 4 },
  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: Colors.textPrimary, marginBottom: 12 },
  tipCard: { width: 200, marginRight: 8, gap: 6 },
  tipEmoji: { fontSize: 28 },
  tipTitle: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  tipDesc: { fontSize: 12, color: Colors.textSecondary, lineHeight: 17 },
  emergencyCard: { backgroundColor: 'rgba(255,68,68,0.08)', borderColor: 'rgba(255,68,68,0.3)', gap: 12 },
  emergencyTitle: { color: Colors.danger, fontSize: 16, fontWeight: '800' },
  emergencyRows: { gap: 8 },
  emergencyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  emergencyLabel: { color: Colors.textSecondary, fontSize: 14 },
  emergencyNumber: { color: Colors.textPrimary, fontSize: 14, fontWeight: '700' },
  addBtn: {
    backgroundColor: Colors.neonGreenDim,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  addBtnText: { color: Colors.neonGreen, fontSize: 14, fontWeight: '700' },
  emptyCard: { alignItems: 'center', gap: 8, padding: 24 },
  emptyEmoji: { fontSize: 40 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  emptyDesc: { color: Colors.textSecondary, fontSize: 13, textAlign: 'center', lineHeight: 19 },
  planCard: { marginBottom: 12, gap: 8 },
  planHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  planTitle: { flex: 1, fontSize: 16, fontWeight: '800', color: Colors.textPrimary },
  completedBadge: {
    backgroundColor: Colors.tropicalTeal + '22',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  completedText: { color: Colors.tropicalTeal, fontSize: 11, fontWeight: '700' },
  planSub: { color: Colors.electricYellow, fontSize: 13, fontWeight: '600' },
  planDate: { color: Colors.textMuted, fontSize: 12 },
  planIntention: { color: Colors.textSecondary, fontSize: 13 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between' },
  progressText: { color: Colors.textMuted, fontSize: 12 },
  progressPct: { color: Colors.electricYellow, fontSize: 12, fontWeight: '700' },
  progressBar: { height: 4, backgroundColor: Colors.bgCardLight, borderRadius: 2 },
  progressFill: { height: 4, backgroundColor: Colors.electricYellow, borderRadius: 2 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  modal: {
    backgroundColor: Colors.bgCard,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '90%',
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary },
  modalClose: { color: Colors.textMuted, fontSize: 18 },
  modalForm: { gap: 16 },
  field: { gap: 8 },
  fieldLabel: { color: Colors.textSecondary, fontSize: 13, fontWeight: '600' },
  input: {
    backgroundColor: Colors.bgSurface,
    borderWidth: 1,
    borderColor: Colors.borderMuted,
    borderRadius: BorderRadius.md,
    color: Colors.textPrimary,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
  },
  textarea: { minHeight: 80, textAlignVertical: 'top' },
  subChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.bgSurface,
    borderWidth: 1,
    borderColor: Colors.borderMuted,
    borderRadius: BorderRadius.full,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  subChipActive: { borderColor: Colors.borderGreen, backgroundColor: Colors.neonGreenDim },
  subChipText: { color: Colors.textMuted, fontSize: 13, fontWeight: '600' },
});
