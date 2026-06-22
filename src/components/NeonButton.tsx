import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { Colors, BorderRadius } from '../utils/theme';

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'yellow';
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
  const bgColor =
    variant === 'primary'
      ? Colors.neonGreen
      : variant === 'yellow'
      ? Colors.electricYellow
      : variant === 'danger'
      ? Colors.danger
      : 'transparent';

  const borderColor =
    variant === 'outline'
      ? Colors.neonGreen
      : variant === 'secondary'
      ? Colors.borderMuted
      : 'transparent';

  const textColor =
    variant === 'primary' || variant === 'yellow'
      ? Colors.deepForestBlack
      : variant === 'outline'
      ? Colors.neonGreen
      : Colors.textPrimary;

  const padding = size === 'sm' ? 10 : size === 'lg' ? 18 : 14;
  const fontSize = size === 'sm' ? 13 : size === 'lg' ? 17 : 15;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.75}
      style={[
        styles.btn,
        {
          backgroundColor: bgColor,
          borderColor,
          borderWidth: variant === 'outline' || variant === 'secondary' ? 1 : 0,
          paddingVertical: padding,
          opacity: disabled ? 0.4 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.label, { color: textColor, fontSize }, textStyle]}>{label}</Text>
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
  },
  label: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
