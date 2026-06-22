import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Switch,
} from 'react-native';
import { Colors, BorderRadius } from '../../utils/theme';
import NeonCard from '../../components/NeonCard';
import NeonButton from '../../components/NeonButton';
import { useApp } from '../../context/AppContext';

interface Props {
  navigation: any;
}

export default function ProfileScreen({ navigation }: Props) {
  const { user, logout, savedSubstances, journalEntries } = useApp();

  const stats = [
    { label: 'Saved', value: savedSubstances.length, emoji: '🔖' },
    { label: 'Journals', value: journalEntries.length, emoji: '📔' },
    { label: 'Streak', value: user?.learningStreak ?? 0, emoji: '🔥' },
    { label: 'Wellness', value: `${user?.wellnessScore}%`, emoji: '💚' },
  ];

  const menuItems = [
    { emoji: '💎', label: 'Upgrade to Premium', action: () => navigation.navigate('Premium'), highlight: true },
    { emoji: '🔔', label: 'Notifications', action: () => {} },
    { emoji: '🔒', label: 'Privacy Settings', action: () => {} },
    { emoji: '🎨', label: 'App Theme', action: () => {} },
    { emoji: '🌍', label: 'Language & Region', action: () => {} },
    { emoji: '❓', label: 'Help & Support', action: () => {} },
    { emoji: '📄', label: 'Terms & Privacy Policy', action: () => {} },
    { emoji: '⭐', label: 'Rate Eduphoria', action: () => {} },
    { emoji: '🚪', label: 'Sign Out', action: logout, danger: true },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>👤 Profile</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.section}>
          <NeonCard variant="green" style={styles.profileCard}>
            <View style={styles.avatarLarge}>
              <Text style={styles.avatarText}>{user?.name?.[0] || 'U'}</Text>
            </View>
            <Text style={styles.userName}>{user?.name}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
            <View style={styles.memberRow}>
              <Text style={styles.memberSince}>Member since {user?.joinDate}</Text>
              {user?.isPremium && (
                <View style={styles.premiumBadge}>
                  <Text style={styles.premiumText}>✨ PREMIUM</Text>
                </View>
              )}
            </View>
          </NeonCard>
        </View>

        {/* Stats */}
        <View style={styles.section}>
          <View style={styles.statsGrid}>
            {stats.map((stat, i) => (
              <NeonCard key={i} style={styles.statCard}>
                <Text style={styles.statEmoji}>{stat.emoji}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </NeonCard>
            ))}
          </View>
        </View>

        {/* Premium CTA */}
        {!user?.isPremium && (
          <View style={styles.section}>
            <TouchableOpacity onPress={() => navigation.navigate('Premium')}>
              <NeonCard style={styles.premiumCard}>
                <View style={styles.premiumRow}>
                  <View>
                    <Text style={styles.premiumCardTitle}>✨ Unlock Premium</Text>
                    <Text style={styles.premiumCardDesc}>
                      Full database • AI Companion • Advanced analytics
                    </Text>
                  </View>
                  <Text style={styles.premiumArrow}>→</Text>
                </View>
              </NeonCard>
            </TouchableOpacity>
          </View>
        )}

        {/* Menu */}
        <View style={styles.section}>
          {menuItems.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.menuItem, item.danger && styles.menuItemDanger]}
              onPress={item.action}
            >
              <Text style={styles.menuEmoji}>{item.emoji}</Text>
              <Text
                style={[
                  styles.menuLabel,
                  item.highlight && { color: Colors.electricYellow },
                  item.danger && { color: Colors.danger },
                ]}
              >
                {item.label}
              </Text>
              {!item.danger && <Text style={styles.menuArrow}>›</Text>}
            </TouchableOpacity>
          ))}
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appName}>
            <Text style={{ color: Colors.neonGreen }}>Edu</Text>
            <Text style={{ color: Colors.electricYellow }}>phoria</Text>
          </Text>
          <Text style={styles.appVersion}>Version 1.0.0 Beta</Text>
          <Text style={styles.appDisclaimer}>
            Eduphoria does not encourage drug use. All information is provided for educational and harm reduction purposes only.
          </Text>
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
  section: { paddingHorizontal: 16, marginBottom: 20 },
  profileCard: { alignItems: 'center', gap: 8, paddingVertical: 28 },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.neonGreenDim,
    borderWidth: 3,
    borderColor: Colors.neonGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  avatarText: { color: Colors.neonGreen, fontSize: 36, fontWeight: '900' },
  userName: { fontSize: 22, fontWeight: '800', color: Colors.textPrimary },
  userEmail: { color: Colors.textSecondary, fontSize: 14 },
  memberRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4 },
  memberSince: { color: Colors.textMuted, fontSize: 12 },
  premiumBadge: {
    backgroundColor: Colors.electricYellow + '22',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  premiumText: { color: Colors.electricYellow, fontSize: 11, fontWeight: '900' },
  statsGrid: { flexDirection: 'row', gap: 8 },
  statCard: { flex: 1, alignItems: 'center', gap: 4, padding: 12 },
  statEmoji: { fontSize: 22 },
  statValue: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary },
  statLabel: { fontSize: 11, color: Colors.textMuted },
  premiumCard: {
    backgroundColor: 'rgba(255,230,0,0.07)',
    borderColor: 'rgba(255,230,0,0.3)',
  },
  premiumRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  premiumCardTitle: { color: Colors.electricYellow, fontSize: 16, fontWeight: '800', marginBottom: 4 },
  premiumCardDesc: { color: Colors.textSecondary, fontSize: 13 },
  premiumArrow: { color: Colors.electricYellow, fontSize: 22 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderMuted,
    gap: 14,
  },
  menuItemDanger: { marginTop: 8 },
  menuEmoji: { fontSize: 20, width: 28, textAlign: 'center' },
  menuLabel: { flex: 1, color: Colors.textPrimary, fontSize: 15, fontWeight: '500' },
  menuArrow: { color: Colors.textMuted, fontSize: 20 },
  appInfo: { alignItems: 'center', gap: 6, padding: 24 },
  appName: { fontSize: 24, fontWeight: '900' },
  appVersion: { color: Colors.textMuted, fontSize: 12 },
  appDisclaimer: {
    color: Colors.textMuted,
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
    marginTop: 8,
    paddingHorizontal: 20,
  },
});
