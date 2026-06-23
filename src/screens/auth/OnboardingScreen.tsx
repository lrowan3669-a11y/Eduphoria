import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import { Colors, BorderRadius } from '../../utils/theme';
import NeonButton from '../../components/NeonButton';
import MascotGuide from '../../components/MascotGuide';
import { useApp } from '../../context/AppContext';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    color: Colors.neonGreen,
    mascotMessage: "Hey! I'm your Eduphoria guide. I'll help you learn, stay safe, and make informed decisions. 🌿",
    title: 'Education First',
    subtitle: 'Science-based information',
    description:
      'Access a comprehensive database of substances with evidence-based information about effects, risks, interactions and harm reduction.',
  },
  {
    id: '2',
    color: Colors.electricYellow,
    mascotMessage: "Your safety is everything. I'll walk you through preparation so every experience is as safe as possible. 🛡️",
    title: 'Harm Reduction Always',
    subtitle: 'Your safety matters',
    description:
      'Prepare responsibly with personalised safety checklists, intention setting tools, and emergency information at your fingertips.',
  },
  {
    id: '3',
    color: Colors.tropicalTeal,
    mascotMessage: "If things get intense, I'm right here. Breathing exercises, grounding, calm guidance — whenever you need it. 🤝",
    title: 'AI Companion Support',
    subtitle: 'Never face it alone',
    description:
      'Our AI guide provides grounding exercises, breathing techniques, and reassurance whenever you need it – completely judgement free.',
  },
  {
    id: '4',
    color: '#FF6B9D',
    mascotMessage: "Every experience holds wisdom. Let's capture your insights and track your personal growth together. 📔",
    title: 'Reflect & Grow',
    subtitle: 'Learn from every experience',
    description:
      'Build your personal insight library through journaling, mood tracking, and pattern recognition to support your personal growth.',
  },
  {
    id: '5',
    color: Colors.warning,
    mascotMessage: "Before we begin — this app is for education and harm reduction only. I never encourage unsafe behaviour. Promise. ✅",
    title: 'Important Notice',
    subtitle: 'Please read carefully',
    description:
      'Eduphoria does not encourage drug use. All information is for educational and harm reduction purposes only.\n\nBy continuing, you confirm you understand this app does not promote illegal activity.',
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

  const slide = slides[currentIndex];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Neon glow bg accent */}
      <View style={[styles.glowAccent, { backgroundColor: slide.color + '15' }]} />

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
            {/* Mascot with speech bubble */}
            <MascotGuide
              message={item.mascotMessage}
              size="lg"
              style={styles.mascot}
              animate={currentIndex === slides.indexOf(item)}
            />

            <View style={[styles.textCard, { borderColor: item.color + '40' }]}>
              <Text style={[styles.slideSubtitle, { color: item.color }]}>{item.subtitle}</Text>
              <Text style={styles.slideTitle}>{item.title}</Text>
              <Text style={styles.slideDesc}>{item.description}</Text>
            </View>
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
                ? { backgroundColor: slide.color, width: 24 }
                : { backgroundColor: Colors.textMuted, width: 8 },
            ]}
          />
        ))}
      </View>

      <View style={styles.actions}>
        <NeonButton
          label={currentIndex === slides.length - 1 ? "I Understand – Let's Begin" : 'Next'}
          onPress={goNext}
          variant={currentIndex === slides.length - 1 ? 'yellow' : 'primary'}
          size="lg"
          style={styles.btn}
        />
        {currentIndex < slides.length - 1 && (
          <TouchableOpacity onPress={completeOnboarding} style={styles.skip}>
            <Text style={styles.skipText}>Skip intro</Text>
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
  glowAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.55,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  mascot: {
    marginBottom: 24,
  },
  textCard: {
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    gap: 10,
  },
  slideSubtitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  slideTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: Colors.textPrimary,
  },
  slideDesc: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 20,
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
