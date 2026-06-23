import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { Colors, BorderRadius, NeonShadow } from '../../utils/theme';
import NeonButton from '../../components/NeonButton';
import NeonText from '../../components/NeonText';
import MascotGuide from '../../components/MascotGuide';
import { useApp } from '../../context/AppContext';

export default function LoginScreen() {
  const { login } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');
    if (!email || !password) { setError('Please fill in all fields'); return; }
    if (!isLogin && !name) { setError('Please enter your name'); return; }
    if (!isLogin && !agreed) { setError('Please agree to the terms'); return; }
    setLoading(true);
    setTimeout(() => { login(email, name || 'User'); setLoading(false); }, 1000);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Rasta bar */}
      <View style={styles.rastaBar}>
        <View style={[styles.rastaStripe, { backgroundColor: Colors.rastaRed }]} />
        <View style={[styles.rastaStripe, { backgroundColor: Colors.rastaYellow }]} />
        <View style={[styles.rastaStripe, { backgroundColor: Colors.rastaGreen }]} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        {/* Logo / mascot */}
        <View style={styles.header}>
          <MascotGuide
            size="lg"
            animate
            message={isLogin ? "Welcome back! Ready to learn safely? 🌿" : "Join us. Education, harm reduction, zero judgement. 💚"}
          />
          <NeonText size={36} color={Colors.neonGreen} weight="900" style={styles.logoGreen}>Edu</NeonText>
          <NeonText size={36} color={Colors.electricYellow} weight="900" style={styles.logoYellow}>phoria</NeonText>
          <Text style={styles.tagline}>Education & Harm Reduction</Text>
        </View>

        {/* Toggle */}
        <View style={styles.toggle}>
          <TouchableOpacity
            style={[styles.toggleBtn, isLogin && styles.toggleActive]}
            onPress={() => setIsLogin(true)}
          >
            <Text style={[styles.toggleText, isLogin && styles.toggleTextActive]}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, !isLogin && styles.toggleActive]}
            onPress={() => setIsLogin(false)}
          >
            <Text style={[styles.toggleText, !isLogin && styles.toggleTextActive]}>Register</Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {!isLogin && (
            <View style={styles.field}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput style={styles.input} value={name} onChangeText={setName}
                placeholder="Your name" placeholderTextColor={Colors.textMuted}
                autoCapitalize="words" />
            </View>
          )}
          <View style={styles.field}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail}
              placeholder="your@email.com" placeholderTextColor={Colors.textMuted}
              keyboardType="email-address" autoCapitalize="none" />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} value={password} onChangeText={setPassword}
              placeholder="••••••••" placeholderTextColor={Colors.textMuted} secureTextEntry />
          </View>

          {!isLogin && (
            <TouchableOpacity style={styles.checkRow} onPress={() => setAgreed(!agreed)}>
              <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
                {agreed && <Text style={styles.checkMark}>✓</Text>}
              </View>
              <Text style={styles.agreeText}>
                I am 18+ and understand Eduphoria is for education and harm reduction only
              </Text>
            </TouchableOpacity>
          )}

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <NeonButton label={isLogin ? 'Sign In' : 'Create Account'} onPress={handleSubmit}
            loading={loading} size="lg" />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <NeonButton label="Continue as Guest" onPress={() => login('guest@eduphoria.app', 'Guest')}
            variant="outline" size="lg" />
        </View>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            🛡️ Your data is private and never sold. Zero judgement, always.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  rastaBar: { flexDirection: 'row', height: 4 },
  rastaStripe: { flex: 1 },
  scroll: { flexGrow: 1, padding: 24 },
  header: { alignItems: 'center', paddingTop: 32, paddingBottom: 24, gap: 0 },
  logoGreen: { marginTop: 8 },
  logoYellow: { marginTop: -8 },
  tagline: { color: Colors.textMuted, marginTop: 6, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' },
  toggle: {
    flexDirection: 'row',
    backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius.md,
    padding: 4,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.borderMuted,
  },
  toggleBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: BorderRadius.sm },
  toggleActive: { backgroundColor: Colors.neonGreenDim, borderWidth: 1, borderColor: Colors.borderGreen },
  toggleText: { color: Colors.textMuted, fontWeight: '700', textTransform: 'uppercase', fontSize: 13, letterSpacing: 0.5 },
  toggleTextActive: {
    color: Colors.neonGreen,
    textShadowColor: Colors.neonGreen,
    textShadowRadius: 6,
    textShadowOffset: { width: 0, height: 0 },
  },
  form: { gap: 16 },
  field: { gap: 8 },
  label: { color: Colors.textSecondary, fontSize: 12, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  input: {
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderMuted,
    borderRadius: BorderRadius.md,
    color: Colors.textPrimary,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
  },
  checkRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  checkbox: {
    width: 22, height: 22, borderRadius: 6,
    borderWidth: 1.5, borderColor: Colors.borderGreen,
    alignItems: 'center', justifyContent: 'center',
    marginTop: 2, flexShrink: 0,
  },
  checkboxChecked: { backgroundColor: Colors.neonGreen, borderColor: Colors.neonGreen },
  checkMark: { color: Colors.bg, fontWeight: '900', fontSize: 13 },
  agreeText: { flex: 1, color: Colors.textSecondary, fontSize: 13, lineHeight: 19 },
  error: { color: Colors.danger, fontSize: 13, textAlign: 'center' },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.borderMuted },
  dividerText: { color: Colors.textMuted, fontSize: 13 },
  disclaimer: {
    marginTop: 24,
    padding: 14,
    backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.borderMuted,
  },
  disclaimerText: { color: Colors.textMuted, fontSize: 12, textAlign: 'center', lineHeight: 18 },
});
