import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';
import { Colors, NeonShadow } from '../utils/theme';
import { useApp } from '../context/AppContext';

import OnboardingScreen from '../screens/auth/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import LearnScreen from '../screens/learn/LearnScreen';
import SubstanceDetailScreen from '../screens/learn/SubstanceDetailScreen';
import PrepareScreen from '../screens/prepare/PrepareScreen';
import PrepDetailScreen from '../screens/prepare/PrepDetailScreen';
import CompanionScreen from '../screens/companion/CompanionScreen';
import ReflectScreen from '../screens/reflect/ReflectScreen';
import QuitScreen from '../screens/quit/QuitScreen';
import CommunityScreen from '../screens/community/CommunityScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import PremiumScreen from '../screens/profile/PremiumScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TABS = [
  { name: 'Home',      emoji: '🏠', label: 'Home',      color: Colors.neonGreen },
  { name: 'Learn',     emoji: '📚', label: 'Learn',     color: Colors.neonGreen },
  { name: 'Companion', emoji: '🤝', label: 'Guide',     color: Colors.tropicalTeal },
  { name: 'Reflect',   emoji: '📔', label: 'Reflect',   color: '#FF6B9D' },
  { name: 'Community', emoji: '🌐', label: 'Community', color: Colors.electricYellow },
];

const SCREENS: Record<string, React.ComponentType<any>> = {
  Home: HomeScreen,
  Learn: LearnScreen,
  Companion: CompanionScreen,
  Reflect: ReflectScreen,
  Community: CommunityScreen,
};

function TabIcon({ emoji, label, focused, color }: { emoji: string; label: string; focused: boolean; color: string }) {
  return (
    <View style={[styles.iconWrap, focused && { borderTopColor: color }]}>
      <Text style={[styles.iconEmoji, focused && { textShadowColor: color, textShadowRadius: 8, textShadowOffset: { width: 0, height: 0 } }]}>
        {emoji}
      </Text>
      <Text style={[styles.iconLabel, focused && { color, textShadowColor: color, textShadowRadius: 6, textShadowOffset: { width: 0, height: 0 } }]}>
        {label}
      </Text>
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopColor: 'rgba(57,255,20,0.2)',
          borderTopWidth: 1,
          height: 72,
          paddingBottom: 8,
          paddingTop: 4,
        },
        tabBarShowLabel: false,
      }}
    >
      {TABS.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={SCREENS[tab.name]}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon emoji={tab.emoji} label={tab.label} focused={focused} color={tab.color} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { isAuthenticated, isOnboarded } = useApp();

  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          primary: Colors.neonGreen,
          background: '#000000',
          card: '#000000',
          text: Colors.textPrimary,
          border: 'rgba(57,255,20,0.2)',
          notification: Colors.rastaRed,
        },
        fonts: {
          regular: { fontFamily: 'System', fontWeight: '400' },
          medium: { fontFamily: 'System', fontWeight: '500' },
          bold: { fontFamily: 'System', fontWeight: '700' },
          heavy: { fontFamily: 'System', fontWeight: '900' },
        },
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isOnboarded ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : !isAuthenticated ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="SubstanceDetail" component={SubstanceDetailScreen} />
            <Stack.Screen name="Prepare" component={PrepareScreen} />
            <Stack.Screen name="PrepDetail" component={PrepDetailScreen} />
            <Stack.Screen name="Quit" component={QuitScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Premium" component={PremiumScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    alignItems: 'center',
    gap: 3,
    paddingTop: 6,
    borderTopWidth: 2,
    borderTopColor: 'transparent',
    width: 64,
  },
  iconEmoji: { fontSize: 20 },
  iconLabel: { fontSize: 10, color: Colors.textMuted, fontWeight: '700', letterSpacing: 0.3 },
});
