import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';
import { Colors } from '../utils/theme';
import { useApp } from '../context/AppContext';

// Screens
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

function TabIcon({ emoji, label, focused }: { emoji: string; label: string; focused: boolean }) {
  return (
    <View style={[tabStyles.iconWrap, focused && tabStyles.iconWrapActive]}>
      <Text style={tabStyles.iconEmoji}>{emoji}</Text>
      <Text style={[tabStyles.iconLabel, focused && tabStyles.iconLabelActive]}>{label}</Text>
    </View>
  );
}

const tabStyles = StyleSheet.create({
  iconWrap: { alignItems: 'center', gap: 2, paddingTop: 6 },
  iconWrapActive: {},
  iconEmoji: { fontSize: 20 },
  iconLabel: { fontSize: 10, color: Colors.textMuted, fontWeight: '600' },
  iconLabelActive: { color: Colors.neonGreen },
});

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.bgCard,
          borderTopColor: Colors.borderMuted,
          borderTopWidth: 1,
          height: 70,
          paddingBottom: 8,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" label="Home" focused={focused} /> }}
      />
      <Tab.Screen
        name="Learn"
        component={LearnScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon emoji="📚" label="Learn" focused={focused} /> }}
      />
      <Tab.Screen
        name="Companion"
        component={CompanionScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon emoji="🤝" label="Guide" focused={focused} /> }}
      />
      <Tab.Screen
        name="Reflect"
        component={ReflectScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon emoji="📔" label="Reflect" focused={focused} /> }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon emoji="🌐" label="Community" focused={focused} /> }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { isAuthenticated, isOnboarded } = useApp();

  return (
    <NavigationContainer>
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
