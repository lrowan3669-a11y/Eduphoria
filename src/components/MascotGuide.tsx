import React, { useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated, ViewStyle } from 'react-native';
import { Colors, BorderRadius } from '../utils/theme';

interface Props {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  showBubble?: boolean;
  animate?: boolean;
}

// Safely require the logo – falls back to null if file doesn't exist yet
let logoSource: any = null;
try {
  logoSource = require('../../assets/logo.png');
} catch {}

function LogoFallback({ size }: { size: number }) {
  return (
    <View style={[styles.fallback, { width: size, height: size }]}>
      <Text style={{ fontSize: size * 0.5 }}>🧘</Text>
      <Text style={[styles.fallbackLabel, { fontSize: size * 0.12 }]}>
        <Text style={{ color: Colors.neonGreen }}>Edu</Text>
        <Text style={{ color: Colors.electricYellow }}>phoria</Text>
      </Text>
    </View>
  );
}

export default function MascotGuide({
  message,
  size = 'md',
  style,
  showBubble = true,
  animate = true,
}: Props) {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!animate) return;
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -8, duration: 1800, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 1800, useNativeDriver: true }),
      ])
    ).start();
    return () => floatAnim.stopAnimation();
  }, [animate]);

  const imgSize = size === 'sm' ? 48 : size === 'lg' ? 160 : 90;

  return (
    <View style={[styles.container, style]}>
      {showBubble && message && (
        <View style={styles.bubble}>
          <Text style={styles.bubbleText}>{message}</Text>
          <View style={styles.bubbleTail} />
        </View>
      )}
      <Animated.View style={{ transform: [{ translateY: floatAnim }] }}>
        {logoSource ? (
          <Image
            source={logoSource}
            style={{ width: imgSize, height: imgSize }}
            resizeMode="contain"
          />
        ) : (
          <LogoFallback size={imgSize} />
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  bubble: {
    backgroundColor: Colors.bgCard,
    borderWidth: 1.5,
    borderColor: Colors.borderGreen,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: 260,
    marginBottom: 12,
  },
  bubbleText: {
    color: Colors.textPrimary,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  bubbleTail: {
    position: 'absolute',
    bottom: -8,
    left: '50%',
    marginLeft: -8,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: Colors.borderGreen,
  },
  fallback: {
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderGreen,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  fallbackLabel: {
    fontWeight: '800',
  },
});
