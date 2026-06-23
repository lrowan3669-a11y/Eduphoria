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

const { width, height } = Dimensions.get('window');

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
    // Float loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -10, duration: 1600, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 1600, useNativeDriver: true }),
      ])
    ).start();

    // Entrance + exit
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

      <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }], alignItems: 'center' }}>
        {/* Logo image */}
        <Animated.View style={{ transform: [{ translateY: floatAnim }] }}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Tagline */}
        <Animated.Text style={[styles.tagline, { opacity: taglineAnim }]}>
          A Modern Companion for Education & Harm Reduction
        </Animated.Text>
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
  ring1: {
    width: 300,
    height: 300,
    borderColor: 'rgba(57,255,20,0.12)',
  },
  ring2: {
    width: 420,
    height: 420,
    borderColor: 'rgba(57,255,20,0.07)',
  },
  ring3: {
    width: 540,
    height: 540,
    borderColor: 'rgba(57,255,20,0.03)',
  },
  logo: {
    width: 280,
    height: 260,
    marginBottom: 16,
  },
  tagline: {
    color: Colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: 48,
    letterSpacing: 0.5,
    lineHeight: 20,
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
