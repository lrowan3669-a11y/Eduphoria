import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Colors, BorderRadius } from '../../utils/theme';
import NeonCard from '../../components/NeonCard';
import NeonButton from '../../components/NeonButton';
import { substances } from '../../data/substances';
import { useApp } from '../../context/AppContext';

const { width } = Dimensions.get('window');

interface Props {
  route: any;
  navigation: any;
}

const TABS = ['Overview', 'Effects', 'Risks', 'Interactions', 'Harm Reduction', 'Legal', 'History'];

export default function SubstanceDetailScreen({ route, navigation }: Props) {
  const { substanceId } = route.params;
  const { user, savedSubstances, toggleSaveSubstance } = useApp();
  const [activeTab, setActiveTab] = useState('Overview');

  const substance = substances.find(s => s.id === substanceId);
  if (!substance) return null;

  const isPremiumLocked = substance.isPremium && !user?.isPremium;

  const severityColor = {
    low: Colors.success,
    moderate: Colors.warning,
    high: '#FF8C00',
    extreme: Colors.danger,
  };

  const renderTab = () => {
    if (isPremiumLocked && activeTab !== 'Overview') {
      return (
        <View style={styles.premiumGate}>
          <Text style={styles.gateEmoji}>🔒</Text>
          <Text style={styles.gateTitle}>Premium Content</Text>
          <Text style={styles.gateDesc}>
            Upgrade to Eduphoria Premium to access full {substance.name} information including detailed
            effects, interactions, dosage and harm reduction guidance.
          </Text>
          <NeonButton
            label="Upgrade to Premium"
            onPress={() => navigation.navigate('Premium')}
            variant="yellow"
            style={{ marginTop: 16 }}
          />
        </View>
      );
    }

    switch (activeTab) {
      case 'Overview':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.description}>{substance.description}</Text>

            <View style={styles.metaGrid}>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Duration</Text>
                <Text style={styles.metaValue}>⏱ {substance.duration}</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Onset</Text>
                <Text style={styles.metaValue}>⚡ {substance.onset}</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Category</Text>
                <Text style={styles.metaValue}>{substance.category}</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Also known as</Text>
                <Text style={styles.metaValue} numberOfLines={2}>
                  {substance.aliases.slice(0, 3).join(', ')}
                </Text>
              </View>
            </View>

            {/* Dosage */}
            <Text style={styles.subheading}>Dosage Information</Text>
            {substance.dosage.map((d, i) => (
              <View key={i} style={styles.dosageRow}>
                <View style={styles.dosageLevel}>
                  <Text style={styles.dosageLevelText}>{d.level}</Text>
                </View>
                <View style={styles.dosageInfo}>
                  <Text style={styles.dosageAmount}>{d.amount}</Text>
                  <Text style={styles.dosageNote}>{d.notes}</Text>
                </View>
              </View>
            ))}

            <NeonCard style={styles.warningCard}>
              <Text style={styles.warningTitle}>⚠️ Safety First</Text>
              <Text style={styles.warningText}>
                All dosage information is for educational purposes. Individual responses vary greatly.
                Never use substances alone and always have harm reduction measures in place.
              </Text>
            </NeonCard>
          </View>
        );

      case 'Effects':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.subheading}>Reported Effects</Text>
            {substance.effects.map((e, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.bullet}>●</Text>
                <Text style={styles.listText}>{e}</Text>
              </View>
            ))}
            <NeonCard style={styles.infoCard} variant="teal">
              <Text style={styles.infoTitle}>💡 Individual Variation</Text>
              <Text style={styles.infoText}>
                Effects vary greatly between individuals based on body weight, metabolism, mental state,
                environment, tolerance, and other substances used.
              </Text>
            </NeonCard>
          </View>
        );

      case 'Risks':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.subheading}>Known Risks</Text>
            {substance.risks.map((r, i) => (
              <View key={i} style={styles.riskItem}>
                <Text style={styles.riskBullet}>⚠️</Text>
                <Text style={styles.listText}>{r}</Text>
              </View>
            ))}
          </View>
        );

      case 'Interactions':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.subheading}>Drug Interactions</Text>
            <Text style={styles.infoText2}>
              Always check interactions before combining substances. Unexpected combinations can be dangerous or fatal.
            </Text>
            {substance.interactions.map((inter, i) => (
              <View key={i} style={[styles.interactionCard, { borderColor: severityColor[inter.severity] + '50' }]}>
                <View style={styles.interactionHeader}>
                  <Text style={styles.interactionSubstance}>{inter.substance}</Text>
                  <View style={[styles.severityBadge, { backgroundColor: severityColor[inter.severity] + '22' }]}>
                    <Text style={[styles.severityText, { color: severityColor[inter.severity] }]}>
                      {inter.severity.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <Text style={styles.interactionNote}>{inter.note}</Text>
              </View>
            ))}
          </View>
        );

      case 'Harm Reduction':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.subheading}>Harm Reduction Guidelines</Text>
            {substance.harmReduction.map((h, i) => (
              <View key={i} style={styles.hrItem}>
                <View style={styles.hrNumber}>
                  <Text style={styles.hrNumberText}>{i + 1}</Text>
                </View>
                <Text style={styles.listText}>{h}</Text>
              </View>
            ))}
          </View>
        );

      case 'Legal':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.subheading}>Legal Status by Region</Text>
            <Text style={styles.infoText2}>
              Laws change frequently. Always verify current local laws before possessing any substance.
            </Text>
            {substance.legalStatus.map((l, i) => (
              <View key={i} style={styles.legalRow}>
                <Text style={styles.legalRegion}>🌍 {l.region}</Text>
                <Text style={styles.legalStatus}>{l.status}</Text>
              </View>
            ))}
          </View>
        );

      case 'History':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.subheading}>Cultural & Historical Context</Text>
            <Text style={styles.historyText}>{substance.culturalHistory}</Text>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Hero */}
      <View style={styles.hero}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.heroContent}>
          <Text style={styles.heroEmoji}>{substance.emoji}</Text>
          <View style={styles.heroInfo}>
            <View style={styles.heroTitleRow}>
              <Text style={styles.heroName}>{substance.name}</Text>
              <TouchableOpacity onPress={() => toggleSaveSubstance(substance.id)}>
                <Text style={styles.saveBtn}>
                  {savedSubstances.includes(substance.id) ? '🔖' : '🏷️'}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.heroCategory}>{substance.category}</Text>
            <Text style={styles.heroTagline}>{substance.tagline}</Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabBar}
        contentContainerStyle={styles.tabBarContent}
      >
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderTab()}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  hero: {
    backgroundColor: Colors.bgCard,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderMuted,
    paddingTop: 52,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  backBtn: { marginBottom: 12 },
  backText: { color: Colors.neonGreen, fontSize: 15, fontWeight: '600' },
  heroContent: { flexDirection: 'row', gap: 16, alignItems: 'center' },
  heroEmoji: { fontSize: 56 },
  heroInfo: { flex: 1, gap: 4 },
  heroTitleRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  heroName: { flex: 1, fontSize: 20, fontWeight: '900', color: Colors.textPrimary },
  saveBtn: { fontSize: 22 },
  heroCategory: { color: Colors.neonGreen, fontSize: 11, fontWeight: '700', textTransform: 'uppercase' },
  heroTagline: { color: Colors.textSecondary, fontSize: 13 },
  tabBar: { maxHeight: 48, borderBottomWidth: 1, borderBottomColor: Colors.borderMuted },
  tabBarContent: { paddingHorizontal: 16, gap: 4 },
  tab: { paddingHorizontal: 14, paddingVertical: 14, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: Colors.neonGreen },
  tabText: { color: Colors.textMuted, fontSize: 13, fontWeight: '600' },
  tabTextActive: { color: Colors.neonGreen },
  content: { flex: 1 },
  tabContent: { padding: 16, gap: 12 },
  description: { color: Colors.textSecondary, fontSize: 15, lineHeight: 24 },
  metaGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  metaItem: {
    width: (width - 32 - 8) / 2,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderMuted,
    borderRadius: BorderRadius.md,
    padding: 12,
    gap: 4,
  },
  metaLabel: { color: Colors.textMuted, fontSize: 11, textTransform: 'uppercase', fontWeight: '600' },
  metaValue: { color: Colors.textPrimary, fontSize: 14, fontWeight: '700' },
  subheading: { fontSize: 16, fontWeight: '800', color: Colors.textPrimary, marginTop: 8 },
  dosageRow: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderMuted,
    borderRadius: BorderRadius.md,
    padding: 12,
    alignItems: 'flex-start',
  },
  dosageLevel: {
    backgroundColor: Colors.neonGreenDim,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 80,
    alignItems: 'center',
  },
  dosageLevelText: { color: Colors.neonGreen, fontSize: 12, fontWeight: '700' },
  dosageInfo: { flex: 1, gap: 2 },
  dosageAmount: { color: Colors.textPrimary, fontSize: 15, fontWeight: '700' },
  dosageNote: { color: Colors.textSecondary, fontSize: 12 },
  warningCard: { backgroundColor: 'rgba(255,68,68,0.08)', borderColor: 'rgba(255,68,68,0.3)' },
  warningTitle: { color: Colors.danger, fontSize: 14, fontWeight: '700', marginBottom: 8 },
  warningText: { color: Colors.textSecondary, fontSize: 13, lineHeight: 19 },
  infoCard: { marginTop: 8 },
  infoTitle: { color: Colors.tropicalTeal, fontSize: 14, fontWeight: '700', marginBottom: 8 },
  infoText: { color: Colors.textSecondary, fontSize: 13, lineHeight: 19 },
  infoText2: { color: Colors.textMuted, fontSize: 13, lineHeight: 19 },
  listItem: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  bullet: { color: Colors.neonGreen, fontSize: 8, marginTop: 6 },
  riskItem: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  riskBullet: { fontSize: 14, marginTop: 2 },
  listText: { flex: 1, color: Colors.textSecondary, fontSize: 14, lineHeight: 21 },
  interactionCard: {
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: 12,
    gap: 6,
  },
  interactionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  interactionSubstance: { color: Colors.textPrimary, fontSize: 15, fontWeight: '700' },
  severityBadge: { borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3 },
  severityText: { fontSize: 10, fontWeight: '900' },
  interactionNote: { color: Colors.textSecondary, fontSize: 13 },
  hrItem: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  hrNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.neonGreenDim,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 2,
  },
  hrNumberText: { color: Colors.neonGreen, fontSize: 12, fontWeight: '800' },
  legalRow: {
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderMuted,
    borderRadius: BorderRadius.md,
    padding: 12,
    gap: 4,
  },
  legalRegion: { color: Colors.textPrimary, fontSize: 14, fontWeight: '700' },
  legalStatus: { color: Colors.textSecondary, fontSize: 13 },
  historyText: { color: Colors.textSecondary, fontSize: 15, lineHeight: 24 },
  premiumGate: { padding: 32, alignItems: 'center', gap: 8 },
  gateEmoji: { fontSize: 48 },
  gateTitle: { fontSize: 20, fontWeight: '800', color: Colors.textPrimary },
  gateDesc: { color: Colors.textSecondary, fontSize: 14, textAlign: 'center', lineHeight: 21 },
});
