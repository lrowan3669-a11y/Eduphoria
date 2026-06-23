import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { Colors } from '../utils/theme';

interface Props {
  children: React.ReactNode;
  style?: TextStyle;
  color?: string;
  size?: number;
  weight?: TextStyle['fontWeight'];
}

export default function NeonText({ children, style, color = Colors.neonGreen, size = 16, weight = '800' }: Props) {
  return (
    <Text style={[
      styles.text,
      {
        color,
        fontSize: size,
        fontWeight: weight,
        textShadowColor: color,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
      },
      style,
    ]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    letterSpacing: 0.5,
  },
});
