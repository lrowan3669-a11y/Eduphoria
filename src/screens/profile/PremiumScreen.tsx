import React from 'react';
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
import { useApp } from '../../context/AppContext';

interface Props {
  navigation: any;
}

const FREE_FEATURES = [
  'Basic substance database (3 substances)',
  'Limited preparation tools',
  'Basic journaling',
  'Community access',
  'Emergency information',
];

const PREMIUM_FEATURES = [
  { emoji: '🧬', label: 'Full substance database (100+ substances)' },
  { emoji: '🤖', label: 'AI Companion – unlimited sessions' },
  { emoji: '🛡️', label: 'Advanced preparation planning' },
  { emoji: '📊', label: 'Reflection analytics & patterns' },
  { emoji: '🎓', label: 'Guided learning pathways' },
  { emoji: '💡', label: 'Personalised harm reduction insights' },
  { emoji: '📔', label: 'Unlimited journal entries' },
  { emoji: '🎵', label: 'Curated music & ambient sound library' },
  { emoji: '🌍', label: 'Global legal status tracker (200+ regions)' },
  { emoji: '🔬', label: 'Latest research & clinical studies' },
];

const PLANS = [
  {
    id: 'monthly',
    label: 'Monthly',
    price: '£4.99',
    period: '/month',
    badge: null,
    highlight: false,
  },
  {
    id: 'annual',
    label: 'Annual',
    price: '£39.99',
    period: '/year',
    badge: 'Save 33%',
    highlight: true,
    monthlyEq: '£3.33/mo',
  },
  {
    id: 'lifetime',
    label: 'Lifetime',
    price: '£79.99',
    period: 'one time',
    badge: 'Best Value',
    highlight: false,
  },
];

export default function PremiumScreen({ navigation }: Props) {
  const { user, upgradeToPremium } = useApp();

  if (user?.isPremium) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.alreadyPremium}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.back}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.premiumEmoji}>✨</Text>
          <Text style={styles.premiumTitle}>You're Premium!</Text>
          <Text style={styles.premiumDesc}>
            Thank you for supporting Eduphoria. You have full access to all features.
          </Text>
          <NeonButton
            label="Back to App"
            onPress={() => navigation.goBack()}
            style={{ marginTop: 16 }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.back}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.heroTitle}>
            Unlock{' '}
            <Text style={{ color: Colors.electricYellow }}>Premium</Text>
          </Text>
          <Text style={styles.heroSubtitle}>
            The complete harm reduction & education toolkit
          </Text>
        </View>

        {/* Plans */}
        <View style={styles.section}>
          {PLANS.map(plan => (
            <TouchableOpacity
              key={plan.id}
              style={[styles.planCard, plan.highlight && styles.planCardHighlight]}
              onPress={upgradeToPremium}
            >
              <View style={styles.planLeft}>
                <Text style={styles.planLabel}>{plan.label}</Text>
                {plan.monthlyEq && (
                  <Text style={styles.planMonthly}>{plan.monthlyEq}</Text>
                )}
              </View>
              <View style={styles.planRight}>
                <Text style={styles.planPrice}>{plan.price}</Text>
                <Text style={styles.planPeriod}>{plan.period}</Text>
              </View>
              {plan.badge && (
                <View style={[styles.badge, plan.highlight && styles.badgeHighlight]}>
                  <Text style={[styles.badgeText, plan.highlight && styles.badgeTextHighlight]}>
                    {plan.badge}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <NeonButton
            label="Start Premium – Try Free for 7 Days"
            onPress={upgradeToPremium}
            variant="yellow"
            size="lg"
          />
          <Text style={styles.trialNote}>No payment required during trial. Cancel anytime.</Text>
        </View>

        {/* Feature Comparison */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What you get</Text>
          {PREMIUM_FEATURES.map((feat, i) => (
            <View key={i} style={styles.featureRow}>
              <Text style={styles.featureEmoji}>{feat.emoji}</Text>
              <Text style={styles.featureLabel}>{feat.label}</Text>
              <Text style={styles.featureCheck}>✓</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Free tier includes</Text>
          {FREE_FEATURES.map((feat, i) => (
            <View key={i} style={styles.freeRow}>
              <Text style={styles.freeIcon}>○</Text>
              <Text style={styles.freeLabel}>{feat}</Text>
            </View>
          ))}
        </View>

        {/* Guarantee */}
        <View style={styles.section}>
          <NeonCard style={styles.guaranteeCard} variant="teal">
            <Text style={styles.guaranteeTitle}>🛡️ 30-Day Money Back Guarantee</Text>
            <Text style={styles.guaranteeText}>
              Not happy? We'll refund you within 30 days, no questions asked.
            </Text>
          </NeonCard>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  alreadyPremium: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 12 },
  premiumEmoji: { fontSize: 64 },
  premiumTitle: { fontSize: 28, fontWeight: '900', color: Colors.electricYellow },
  premiumDesc: { color: Colors.textSecondary, fontSize: 16, textAlign: 'center', lineHeight: 24 },
  header: { paddingHorizontal: 16, paddingTop: 56, paddingBottom: 24, gap: 10 },
  backBtn: { alignSelf: 'flex-start', marginBottom: 8 },
  back: { color: Colors.neonGreen, fontSize: 15, fontWeight: '600' },
  heroTitle: { fontSize: 34, fontWeight: '900', color: Colors.textPrimary },
  heroSubtitle: { color: Colors.textSecondary, fontSize: 15, lineHeight: 22 },
  section: { paddingHorizontal: 16, marginBottom: 24 },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderMuted,
    borderRadius: BorderRadius.lg,
    padding: 16,
    marginBottom: 10,
    position: 'relative',
  },
  planCardHighlight: {
    borderColor: Colors.electricYellow,
    backgroundColor: 'rgba(255,230,0,0.06)',
  },
  planLeft: { flex: 1 },
  planLabel: { color: Colors.textPrimary, fontSize: 16, fontWeight: '700' },
  planMonthly: { color: Colors.textMuted, fontSize: 12, marginTop: 2 },
  planRight: { alignItems: 'flex-end' },
  planPrice: { color: Colors.textPrimary, fontSize: 22, fontWeight: '900' },
  planPeriod: { color: Colors.textMuted, fontSize: 12 },
  badge: {
    position: 'absolute',
    top: -8,
    right: 16,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderMuted,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeHighlight: {
    backgroundColor: Colors.electricYellow,
    borderColor: Colors.electricYellow,
  },
  badgeText: { color: Colors.textSecondary, fontSize: 11, fontWeight: '700' },
  badgeTextHighlight: { color: Colors.bg },
  trialNote: { color: Colors.textMuted, fontSize: 12, textAlign: 'center', marginTop: 10 },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: Colors.textPrimary, marginBottom: 16 },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderMuted,
    gap: 12,
  },
  featureEmoji: { fontSize: 20, width: 30, textAlign: 'center' },
  featureLabel: { flex: 1, color: Colors.textPrimary, fontSize: 14 },
  featureCheck: { color: Colors.neonGreen, fontSize: 16, fontWeight: '800' },
  freeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  freeIcon: { color: Colors.textMuted, fontSize: 14, width: 30, textAlign: 'center' },
  freeLabel: { color: Colors.textMuted, fontSize: 14 },
  guaranteeCard: { gap: 8 },
  guaranteeTitle: { color: Colors.tropicalTeal, fontSize: 15, fontWeight: '800' },
  guaranteeText: { color: Colors.textSecondary, fontSize: 14, lineHeight: 21 },
});
