import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Colors } from '../utils/theme';

const { width, height } = Dimensions.get('window');

interface Props {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, friction: 5, useNativeDriver: true }),
      ]),
      Animated.timing(glowAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.delay(1200),
      Animated.timing(fadeAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start(() => onFinish());
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />

      {/* Background rings */}
      <Animated.View style={[styles.ring, styles.ring1, { opacity: glowAnim }]} />
      <Animated.View style={[styles.ring, styles.ring2, { opacity: glowAnim }]} />

      <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }], alignItems: 'center' }}>
        {/* Logo cloud emoji placeholder */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoEmoji}>☁️</Text>
          <View style={styles.characterContainer}>
            <Text style={styles.characterEmoji}>🧘</Text>
          </View>
        </View>

        <Animated.Text style={[styles.title, { opacity: glowAnim }]}>
          <Text style={styles.titleGreen}>Edu</Text>
          <Text style={styles.titleYellow}>phoria</Text>
        </Animated.Text>

        <Animated.Text style={[styles.tagline, { opacity: glowAnim }]}>
          A Modern Companion for Education & Harm Reduction
        </Animated.Text>
      </Animated.View>

      <Animated.View style={[styles.bottomBar, { opacity: glowAnim }]}>
        <View style={styles.dot} />
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
  ring1: {
    width: 280,
    height: 280,
    borderColor: 'rgba(57,255,20,0.1)',
  },
  ring2: {
    width: 380,
    height: 380,
    borderColor: 'rgba(57,255,20,0.05)',
  },
  logoContainer: {
    width: 140,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  logoEmoji: {
    fontSize: 80,
  },
  characterContainer: {
    position: 'absolute',
    top: -10,
  },
  characterEmoji: {
    fontSize: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: 2,
  },
  titleGreen: {
    color: Colors.neonGreen,
  },
  titleYellow: {
    color: Colors.electricYellow,
  },
  tagline: {
    color: Colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 12,
    paddingHorizontal: 40,
    letterSpacing: 0.5,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.neonGreen,
  },
});
