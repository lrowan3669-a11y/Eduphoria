import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, BorderRadius } from '../utils/theme';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  glowColor?: string;
  variant?: 'default' | 'green' | 'yellow' | 'teal';
}

export default function NeonCard({ children, style, variant = 'default' }: Props) {
  const borderColor =
    variant === 'green'
      ? Colors.borderGreen
      : variant === 'yellow'
      ? Colors.borderYellow
      : variant === 'teal'
      ? Colors.borderTeal
      : Colors.borderMuted;

  return (
    <View style={[styles.card, { borderColor }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: 16,
  },
});
