import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, BorderRadius, NeonShadow } from '../utils/theme';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'green' | 'yellow' | 'teal' | 'red' | 'rasta';
  glow?: boolean;
}

export default function NeonCard({ children, style, variant = 'default', glow = false }: Props) {
  const borderColor =
    variant === 'green' ? Colors.borderGreen :
    variant === 'yellow' ? Colors.borderYellow :
    variant === 'teal' ? Colors.borderTeal :
    variant === 'red' ? Colors.borderRed :
    variant === 'rasta' ? Colors.borderGreen :
    Colors.borderMuted;

  const bgColor =
    variant === 'green' ? 'rgba(57,255,20,0.04)' :
    variant === 'yellow' ? 'rgba(255,230,0,0.04)' :
    variant === 'teal' ? 'rgba(0,229,204,0.04)' :
    variant === 'red' ? 'rgba(255,34,0,0.04)' :
    variant === 'rasta' ? 'rgba(57,255,20,0.03)' :
    Colors.bgCard;

  const shadowStyle = glow
    ? variant === 'yellow' ? NeonShadow.yellow
    : variant === 'teal' ? NeonShadow.teal
    : variant === 'red' ? NeonShadow.red
    : NeonShadow.green
    : {};

  return (
    <View style={[
      styles.card,
      { borderColor, backgroundColor: bgColor },
      shadowStyle,
      style,
    ]}>
      {variant === 'rasta' && (
        <View style={styles.rastaBar}>
          <View style={[styles.rastaStripe, { backgroundColor: Colors.rastaRed }]} />
          <View style={[styles.rastaStripe, { backgroundColor: Colors.rastaYellow }]} />
          <View style={[styles.rastaStripe, { backgroundColor: Colors.rastaGreen }]} />
        </View>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: 16,
    overflow: 'hidden',
  },
  rastaBar: {
    flexDirection: 'row',
    height: 3,
    marginBottom: 14,
    marginTop: -4,
    marginHorizontal: -16,
    borderRadius: 0,
  },
  rastaStripe: {
    flex: 1,
  },
});
