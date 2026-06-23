import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import { Colors, BorderRadius, NeonShadow } from '../utils/theme';

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'yellow' | 'teal' | 'rasta';
  style?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function NeonButton({
  label,
  onPress,
  variant = 'primary',
  style,
  textStyle,
  loading,
  disabled,
  size = 'md',
}: Props) {
  const config = {
    primary: {
      bg: Colors.neonGreen,
      text: '#000000',
      border: Colors.neonGreen,
      shadow: NeonShadow.green,
    },
    yellow: {
      bg: Colors.electricYellow,
      text: '#000000',
      border: Colors.electricYellow,
      shadow: NeonShadow.yellow,
    },
    teal: {
      bg: Colors.tropicalTeal,
      text: '#000000',
      border: Colors.tropicalTeal,
      shadow: NeonShadow.teal,
    },
    danger: {
      bg: Colors.rastaRed,
      text: '#ffffff',
      border: Colors.rastaRed,
      shadow: NeonShadow.red,
    },
    rasta: {
      bg: 'transparent',
      text: Colors.neonGreen,
      border: Colors.borderGreen,
      shadow: NeonShadow.green,
    },
    outline: {
      bg: 'transparent',
      text: Colors.neonGreen,
      border: Colors.borderGreen,
      shadow: {},
    },
    secondary: {
      bg: Colors.bgCard,
      text: Colors.textSecondary,
      border: Colors.borderMuted,
      shadow: {},
    },
  }[variant];

  const padding = size === 'sm' ? 10 : size === 'lg' ? 18 : 14;
  const fontSize = size === 'sm' ? 13 : size === 'lg' ? 16 : 15;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.75}
      style={[
        styles.btn,
        {
          backgroundColor: config.bg,
          borderColor: config.border,
          paddingVertical: padding,
          opacity: disabled ? 0.35 : 1,
        },
        !disabled && config.shadow,
        style,
      ]}
    >
      {variant === 'rasta' && (
        <View style={styles.rastaTop}>
          <View style={[styles.rastaStripe, { backgroundColor: Colors.rastaRed }]} />
          <View style={[styles.rastaStripe, { backgroundColor: Colors.rastaYellow }]} />
          <View style={[styles.rastaStripe, { backgroundColor: Colors.rastaGreen }]} />
        </View>
      )}
      {loading ? (
        <ActivityIndicator color={config.text} />
      ) : (
        <Text style={[styles.label, { color: config.text, fontSize }, textStyle]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  label: {
    fontWeight: '800',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  rastaTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    flexDirection: 'row',
  },
  rastaStripe: {
    flex: 1,
  },
});
