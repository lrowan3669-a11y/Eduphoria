import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import { Colors, BorderRadius } from '../../utils/theme';
import NeonCard from '../../components/NeonCard';
import { substances, categories, SubstanceCategory } from '../../data/substances';
import { useApp } from '../../context/AppContext';

interface Props {
  navigation: any;
}

export default function LearnScreen({ navigation }: Props) {
  const { user, savedSubstances, toggleSaveSubstance } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SubstanceCategory | 'All'>('All');

  const filtered = useMemo(() => {
    return substances.filter(s => {
      const matchCat = selectedCategory === 'All' || s.category === selectedCategory;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.aliases.some(a => a.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [search, selectedCategory]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🧠 Learn</Text>
        <Text style={styles.subtitle}>Evidence-based substance education</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Search substances..."
          placeholderTextColor={Colors.textMuted}
        />
        {search ? (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Text style={styles.clearSearch}>✕</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.catScroll}
        contentContainerStyle={styles.catContent}
      >
        <TouchableOpacity
          style={[styles.catChip, selectedCategory === 'All' && styles.catChipActive]}
          onPress={() => setSelectedCategory('All')}
        >
          <Text style={[styles.catText, selectedCategory === 'All' && styles.catTextActive]}>
            All
          </Text>
        </TouchableOpacity>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat.name}
            style={[
              styles.catChip,
              selectedCategory === cat.name && { backgroundColor: cat.color + '22', borderColor: cat.color + '66' },
            ]}
            onPress={() => setSelectedCategory(cat.name)}
          >
            <Text style={styles.catEmoji}>{cat.emoji}</Text>
            <Text
              style={[
                styles.catText,
                selectedCategory === cat.name && { color: cat.color },
              ]}
            >
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Substance List */}
      <FlatList
        data={filtered}
        keyExtractor={s => s.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.resultsCount}>{filtered.length} substances</Text>
        }
        renderItem={({ item: s }) => {
          const isPremiumLocked = s.isPremium && !user?.isPremium;
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate('SubstanceDetail', { substanceId: s.id })
              }
              activeOpacity={0.8}
            >
              <View style={styles.cardLeft}>
                <Text style={styles.cardEmoji}>{s.emoji}</Text>
                <View style={styles.cardInfo}>
                  <View style={styles.cardTitleRow}>
                    <Text style={styles.cardName} numberOfLines={1}>
                      {s.name}
                    </Text>
                    {isPremiumLocked && (
                      <View style={styles.premiumBadge}>
                        <Text style={styles.premiumText}>PRO</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.cardCategory}>{s.category}</Text>
                  <Text style={styles.cardTagline} numberOfLines={1}>
                    {s.tagline}
                  </Text>
                  <View style={styles.cardMeta}>
                    <Text style={styles.cardMetaText}>⏱ {s.duration}</Text>
                    <Text style={styles.cardDot}>•</Text>
                    <Text style={styles.cardMetaText}>
                      {s.risks.length} risks noted
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={e => {
                  e.stopPropagation();
                  toggleSaveSubstance(s.id);
                }}
                style={styles.bookmarkBtn}
              >
                <Text style={styles.bookmark}>
                  {savedSubstances.includes(s.id) ? '🔖' : '🏷️'}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyText}>No substances found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: { paddingHorizontal: 16, paddingTop: 56, paddingBottom: 16 },
  title: { fontSize: 28, fontWeight: '900', color: Colors.textPrimary },
  subtitle: { color: Colors.textSecondary, fontSize: 13, marginTop: 4 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderMuted,
    borderRadius: BorderRadius.md,
    marginHorizontal: 16,
    paddingHorizontal: 14,
    marginBottom: 12,
    gap: 8,
  },
  searchIcon: { fontSize: 16 },
  searchInput: { flex: 1, color: Colors.textPrimary, fontSize: 15, paddingVertical: 13 },
  clearSearch: { color: Colors.textMuted, fontSize: 16, padding: 4 },
  catScroll: { maxHeight: 48, marginBottom: 12 },
  catContent: { paddingHorizontal: 16, gap: 8 },
  catChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderMuted,
    borderRadius: BorderRadius.full,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 6,
  },
  catChipActive: { backgroundColor: Colors.neonGreenDim, borderColor: Colors.borderGreen },
  catEmoji: { fontSize: 14 },
  catText: { color: Colors.textMuted, fontSize: 13, fontWeight: '600' },
  catTextActive: { color: Colors.neonGreen },
  list: { paddingHorizontal: 16, paddingBottom: 100 },
  resultsCount: { color: Colors.textMuted, fontSize: 12, marginBottom: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderMuted,
    borderRadius: BorderRadius.lg,
    padding: 14,
    marginBottom: 8,
  },
  cardLeft: { flex: 1, flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  cardEmoji: { fontSize: 32, marginTop: 2 },
  cardInfo: { flex: 1, gap: 3 },
  cardTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  cardName: { flex: 1, fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  premiumBadge: {
    backgroundColor: Colors.electricYellow,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  premiumText: { color: Colors.bg, fontSize: 9, fontWeight: '900' },
  cardCategory: { color: Colors.neonGreen, fontSize: 11, fontWeight: '600', textTransform: 'uppercase' },
  cardTagline: { color: Colors.textMuted, fontSize: 12 },
  cardMeta: { flexDirection: 'row', gap: 6, alignItems: 'center', marginTop: 2 },
  cardMetaText: { color: Colors.textMuted, fontSize: 11 },
  cardDot: { color: Colors.textMuted, fontSize: 11 },
  bookmarkBtn: { padding: 8 },
  bookmark: { fontSize: 20 },
  empty: { alignItems: 'center', paddingVertical: 48, gap: 12 },
  emptyEmoji: { fontSize: 48 },
  emptyText: { color: Colors.textMuted, fontSize: 16 },
});
