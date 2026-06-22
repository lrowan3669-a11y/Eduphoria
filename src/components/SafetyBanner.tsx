import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../utils/theme';

export default function SafetyBanner() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        ⚠️ Eduphoria does not encourage drug use. All information is provided for educational and harm reduction purposes only.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,184,0,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,184,0,0.3)',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  text: {
    color: Colors.warning,
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
  },
});
