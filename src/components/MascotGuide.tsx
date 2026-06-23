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

const logoSource = require('../../assets/logo.png');

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
  }, [animate]);

  const imgSize = size === 'sm' ? 64 : size === 'lg' ? 160 : 100;

  return (
    <View style={[styles.container, style]}>
      {showBubble && message && (
        <View style={styles.bubble}>
          <Text style={styles.bubbleText}>{message}</Text>
          <View style={styles.bubbleTail} />
        </View>
      )}
      <Animated.View style={{ transform: [{ translateY: floatAnim }] }}>
        <Image
          source={logoSource}
          style={{ width: imgSize, height: imgSize }}
          resizeMode="contain"
        />
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
    position: 'relative',
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
});
