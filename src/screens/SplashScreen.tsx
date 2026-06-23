import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import { Colors } from '../utils/theme';

const { width } = Dimensions.get('window');

let logoSource: any = null;
try {
  logoSource = require('../../assets/logo.png');
} catch {}

interface Props {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const taglineAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -12, duration: 1600, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 1600, useNativeDriver: true }),
      ])
    ).start();

    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, friction: 6, useNativeDriver: true }),
      ]),
      Animated.timing(glowAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(taglineAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.delay(1600),
      Animated.timing(fadeAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start(() => onFinish());
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />

      {/* Glow rings */}
      <Animated.View style={[styles.ring, styles.ring1, { opacity: glowAnim }]} />
      <Animated.View style={[styles.ring, styles.ring2, { opacity: glowAnim }]} />
      <Animated.View style={[styles.ring, styles.ring3, { opacity: glowAnim }]} />

      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>

        {/* Logo or fallback */}
        <Animated.View style={{ transform: [{ translateY: floatAnim }] }}>
          {logoSource ? (
            <Image source={logoSource} style={styles.logoImg} resizeMode="contain" />
          ) : (
            <View style={styles.logoFallback}>
              <Text style={styles.logoEmoji}>🧘</Text>
              <View style={styles.cloudRow}>
                <Text style={styles.cloudGreen}>☁️</Text>
                <Text style={styles.cloudYellow}>☁️</Text>
              </View>
            </View>
          )}
        </Animated.View>

        {/* Title */}
        <Animated.View style={{ opacity: glowAnim, alignItems: 'center' }}>
          <Text style={styles.title}>
            <Text style={styles.titleGreen}>Edu</Text>
            <Text style={styles.titleYellow}>phoria</Text>
          </Text>
          <Animated.Text style={[styles.tagline, { opacity: taglineAnim }]}>
            A Modern Companion for Education & Harm Reduction
          </Animated.Text>
        </Animated.View>

      </Animated.View>

      <Animated.View style={[styles.bottom, { opacity: glowAnim }]}>
        <View style={styles.dot} />
        <View style={[styles.dot, { opacity: 0.5 }]} />
        <View style={[styles.dot, { opacity: 0.25 }]} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 1,
  },
  ring1: { width: 300, height: 300, borderColor: 'rgba(57,255,20,0.12)' },
  ring2: { width: 430, height: 430, borderColor: 'rgba(57,255,20,0.07)' },
  ring3: { width: 560, height: 560, borderColor: 'rgba(57,255,20,0.03)' },
  content: {
    alignItems: 'center',
    gap: 16,
  },
  logoImg: {
    width: 260,
    height: 240,
  },
  logoFallback: {
    alignItems: 'center',
    marginBottom: 8,
  },
  logoEmoji: {
    fontSize: 72,
  },
  cloudRow: {
    flexDirection: 'row',
    marginTop: -16,
  },
  cloudGreen: {
    fontSize: 48,
    tintColor: Colors.neonGreen,
  },
  cloudYellow: {
    fontSize: 48,
    marginLeft: -8,
  },
  title: {
    fontSize: 52,
    fontWeight: '900',
    letterSpacing: 2,
  },
  titleGreen: { color: Colors.neonGreen },
  titleYellow: { color: Colors.electricYellow },
  tagline: {
    color: Colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: 48,
    letterSpacing: 0.4,
    lineHeight: 20,
    marginTop: 8,
  },
  bottom: {
    position: 'absolute',
    bottom: 56,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.neonGreen,
  },
});
