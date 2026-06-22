import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Colors, Spacing, BorderRadius } from '../../utils/theme';
import NeonButton from '../../components/NeonButton';
import { useApp } from '../../context/AppContext';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    emoji: '🎓',
    title: 'Education First',
    subtitle: 'Science-based information',
    description:
      'Access a comprehensive database of substances with evidence-based information about effects, risks, interactions and harm reduction.',
    color: Colors.neonGreen,
  },
  {
    id: '2',
    emoji: '🛡️',
    title: 'Harm Reduction Always',
    subtitle: 'Your safety matters',
    description:
      'Prepare responsibly with personalised safety checklists, intention setting tools, and emergency information at your fingertips.',
    color: Colors.electricYellow,
  },
  {
    id: '3',
    emoji: '🤝',
    title: 'AI Companion Support',
    subtitle: 'Never face it alone',
    description:
      'Our AI guide provides grounding exercises, breathing techniques, and reassurance whenever you need it – completely judgement free.',
    color: Colors.tropicalTeal,
  },
  {
    id: '4',
    emoji: '📔',
    title: 'Reflect & Grow',
    subtitle: 'Learn from every experience',
    description:
      'Build your personal insight library through journaling, mood tracking, and pattern recognition to support your personal growth.',
    color: '#FF6B9D',
  },
  {
    id: '5',
    emoji: '⚠️',
    title: 'Important Notice',
    subtitle: 'Please read carefully',
    description:
      'Eduphoria does not encourage drug use. All information is for educational and harm reduction purposes only.\n\nBy continuing, you confirm you understand this app does not promote illegal activity.',
    color: Colors.warning,
  },
];

export default function OnboardingScreen() {
  const { completeOnboarding } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const goNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(i => i + 1);
    } else {
      completeOnboarding();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={[styles.emojiContainer, { shadowColor: item.color }]}>
              <Text style={styles.emoji}>{item.emoji}</Text>
            </View>
            <Text style={[styles.subtitle, { color: item.color }]}>{item.subtitle}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />

      {/* Dots */}
      <View style={styles.dots}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === currentIndex
                ? { backgroundColor: Colors.neonGreen, width: 24 }
                : { backgroundColor: Colors.textMuted, width: 8 },
            ]}
          />
        ))}
      </View>

      <View style={styles.actions}>
        <NeonButton
          label={currentIndex === slides.length - 1 ? 'I Understand – Get Started' : 'Next'}
          onPress={goNext}
          variant={currentIndex === slides.length - 1 ? 'yellow' : 'primary'}
          size="lg"
          style={styles.btn}
        />
        {currentIndex < slides.length - 1 && (
          <TouchableOpacity onPress={completeOnboarding} style={styles.skip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingTop: 60,
  },
  emojiContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.bgCard,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    shadowOpacity: 0.5,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
  emoji: {
    fontSize: 56,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 24,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  actions: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    gap: 12,
  },
  btn: {
    width: '100%',
  },
  skip: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  skipText: {
    color: Colors.textMuted,
    fontSize: 14,
  },
});
