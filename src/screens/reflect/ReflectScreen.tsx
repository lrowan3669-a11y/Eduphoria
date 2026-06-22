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

const MOODS = ['😔', '😕', '😐', '🙂', '😊', '😄', '🤩'];
const TAGS = ['insight', 'healing', 'connection', 'challenge', 'gratitude', 'creativity', 'nature', 'integration', 'breakthrough'];

export default function ReflectScreen({ navigation }: Props) {
  const { journalEntries, addJournalEntry, user } = useApp();
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState(4);
  const [selectedSubstance, setSelectedSubstance] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filter, setFilter] = useState<'all' | 'reflection' | 'companion' | 'mood'>('all');

  const toggleTag = (tag: string) => {
    setSelectedTags(t => t.includes(tag) ? t.filter(x => x !== tag) : [...t, tag]);
  };

  const handleSave = () => {
    if (!content.trim()) return;
    addJournalEntry({
      date: new Date().toISOString().split('T')[0],
      type: 'reflection',
      title: title || 'Reflection',
      content,
      mood,
      substance: selectedSubstance || undefined,
      tags: selectedTags,
    });
    setModalVisible(false);
    setTitle('');
    setContent('');
    setMood(4);
    setSelectedSubstance('');
    setSelectedTags([]);
  };

  const filtered = journalEntries.filter(e => filter === 'all' || e.type === filter);

  const avgMood =
    journalEntries.filter(e => e.mood).reduce((sum, e) => sum + (e.mood || 0), 0) /
    (journalEntries.filter(e => e.mood).length || 1);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>📔 Reflect</Text>
          <Text style={styles.subtitle}>Learn from every experience</Text>
        </View>

        {/* Insight Stats */}
        <View style={styles.statsRow}>
          <NeonCard style={styles.statCard} variant="teal">
            <Text style={styles.statValue}>{journalEntries.length}</Text>
            <Text style={styles.statLabel}>Entries</Text>
          </NeonCard>
          <NeonCard style={styles.statCard} variant="green">
            <Text style={styles.statValue}>{MOODS[Math.round(avgMood) - 1] || '😐'}</Text>
            <Text style={styles.statLabel}>Avg Mood</Text>
          </NeonCard>
          <NeonCard style={styles.statCard} variant="yellow">
            <Text style={styles.statValue}>
              {new Set(journalEntries.map(e => e.substance).filter(Boolean)).size}
            </Text>
            <Text style={styles.statLabel}>Substances</Text>
          </NeonCard>
        </View>

        {/* Write Reflection */}
        <View style={styles.section}>
          <NeonButton
            label="+ Write New Reflection"
            onPress={() => setModalVisible(true)}
            variant="primary"
          />
        </View>

        {/* Filter */}
        <View style={styles.filterRow}>
          {(['all', 'reflection', 'companion', 'mood'] as const).map(f => (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, filter === f && styles.filterChipActive]}
              onPress={() => setFilter(f)}
            >
              <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Journal Entries */}
        <View style={styles.section}>
          {filtered.length === 0 ? (
            <NeonCard style={styles.emptyCard}>
              <Text style={styles.emptyEmoji}>📝</Text>
              <Text style={styles.emptyTitle}>No reflections yet</Text>
              <Text style={styles.emptyDesc}>
                Start journaling to track your insights, mood patterns, and personal growth.
              </Text>
            </NeonCard>
          ) : (
            filtered.map(entry => {
              const sub = substances.find(s => s.id === entry.substance);
              return (
                <NeonCard key={entry.id} style={styles.entryCard}>
                  <View style={styles.entryHeader}>
                    <View style={styles.entryMeta}>
                      <Text style={styles.entryDate}>{entry.date}</Text>
                      {entry.type !== 'reflection' && (
                        <View style={styles.typeBadge}>
                          <Text style={styles.typeText}>{entry.type}</Text>
                        </View>
                      )}
                    </View>
                    {entry.mood && (
                      <Text style={styles.moodEmoji}>{MOODS[entry.mood - 1]}</Text>
                    )}
                  </View>
                  <Text style={styles.entryTitle}>{entry.title}</Text>
                  <Text style={styles.entryContent} numberOfLines={3}>
                    {entry.content}
                  </Text>
                  {sub && (
                    <Text style={styles.entrySub}>
                      {sub.emoji} {sub.name.split(' ')[0]}
                    </Text>
                  )}
                  {entry.tags.length > 0 && (
                    <View style={styles.tagRow}>
                      {entry.tags.map(tag => (
                        <View key={tag} style={styles.tag}>
                          <Text style={styles.tagText}>#{tag}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </NeonCard>
              );
            })
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* New Entry Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Reflection</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalForm}>
                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Title</Text>
                  <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Give this reflection a title"
                    placeholderTextColor={Colors.textMuted}
                  />
                </View>

                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Your Reflection *</Text>
                  <TextInput
                    style={[styles.input, styles.textarea]}
                    value={content}
                    onChangeText={setContent}
                    placeholder="What insights, feelings, or experiences do you want to capture?"
                    placeholderTextColor={Colors.textMuted}
                    multiline
                    numberOfLines={6}
                    textAlignVertical="top"
                  />
                </View>

                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Current Mood</Text>
                  <View style={styles.moodRow}>
                    {MOODS.map((m, i) => (
                      <TouchableOpacity
                        key={i}
                        style={[styles.moodBtn, mood === i + 1 && styles.moodBtnActive]}
                        onPress={() => setMood(i + 1)}
                      >
                        <Text style={styles.moodBtnEmoji}>{m}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Related Substance (optional)</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity
                      style={[styles.subChip, !selectedSubstance && styles.subChipActive]}
                      onPress={() => setSelectedSubstance('')}
                    >
                      <Text style={styles.subChipText}>None</Text>
                    </TouchableOpacity>
                    {substances.map(s => (
                      <TouchableOpacity
                        key={s.id}
                        style={[styles.subChip, selectedSubstance === s.id && styles.subChipActive]}
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
                  <Text style={styles.fieldLabel}>Tags</Text>
                  <View style={styles.tagGrid}>
                    {TAGS.map(tag => (
                      <TouchableOpacity
                        key={tag}
                        style={[styles.tagChip, selectedTags.includes(tag) && styles.tagChipActive]}
                        onPress={() => toggleTag(tag)}
                      >
                        <Text
                          style={[
                            styles.tagChipText,
                            selectedTags.includes(tag) && { color: Colors.neonGreen },
                          ]}
                        >
                          #{tag}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <NeonButton
                  label="Save Reflection"
                  onPress={handleSave}
                  disabled={!content.trim()}
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
  statsRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, marginBottom: 20 },
  statCard: { flex: 1, alignItems: 'center', gap: 4, padding: 14 },
  statValue: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary },
  statLabel: { fontSize: 11, color: Colors.textMuted },
  section: { paddingHorizontal: 16, marginBottom: 16 },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.borderMuted,
  },
  filterChipActive: { backgroundColor: Colors.neonGreenDim, borderColor: Colors.borderGreen },
  filterText: { color: Colors.textMuted, fontSize: 13, fontWeight: '600' },
  filterTextActive: { color: Colors.neonGreen },
  emptyCard: { alignItems: 'center', gap: 8, padding: 24 },
  emptyEmoji: { fontSize: 40 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  emptyDesc: { color: Colors.textSecondary, fontSize: 13, textAlign: 'center', lineHeight: 19 },
  entryCard: { marginBottom: 12, gap: 8 },
  entryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  entryMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  entryDate: { color: Colors.textMuted, fontSize: 12 },
  typeBadge: {
    backgroundColor: Colors.tropicalTeal + '22',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  typeText: { color: Colors.tropicalTeal, fontSize: 10, fontWeight: '700' },
  moodEmoji: { fontSize: 20 },
  entryTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  entryContent: { color: Colors.textSecondary, fontSize: 14, lineHeight: 21 },
  entrySub: { color: Colors.electricYellow, fontSize: 12, fontWeight: '600' },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: {
    backgroundColor: Colors.neonGreenDim,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: { color: Colors.neonGreen, fontSize: 11, fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  modal: {
    backgroundColor: Colors.bgCard,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '92%',
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
  textarea: { minHeight: 120, textAlignVertical: 'top' },
  moodRow: { flexDirection: 'row', gap: 6 },
  moodBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.bgSurface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  moodBtnActive: { borderColor: Colors.neonGreen, backgroundColor: Colors.neonGreenDim },
  moodBtnEmoji: { fontSize: 20 },
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
  tagGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tagChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.bgSurface,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.borderMuted,
  },
  tagChipActive: { backgroundColor: Colors.neonGreenDim, borderColor: Colors.borderGreen },
  tagChipText: { color: Colors.textMuted, fontSize: 13, fontWeight: '600' },
});
