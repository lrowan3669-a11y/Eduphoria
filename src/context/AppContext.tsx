import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  joinDate: string;
  learningStreak: number;
  totalSessions: number;
  wellnessScore: number;
}

interface JournalEntry {
  id: string;
  date: string;
  type: 'reflection' | 'companion' | 'mood';
  title: string;
  content: string;
  mood?: number;
  substance?: string;
  tags: string[];
}

interface PrepPlan {
  id: string;
  title: string;
  substance: string;
  date: string;
  intention: string;
  environment: string;
  sitter: string;
  completed: boolean;
  checklist: { item: string; checked: boolean }[];
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  savedSubstances: string[];
  journalEntries: JournalEntry[];
  prepPlans: PrepPlan[];
  activeSession: boolean;
  sessionSubstance: string;
  sessionStartTime: Date | null;
}

interface AppContextType extends AppState {
  login: (email: string, name: string) => void;
  logout: () => void;
  completeOnboarding: () => void;
  toggleSaveSubstance: (id: string) => void;
  addJournalEntry: (entry: Omit<JournalEntry, 'id'>) => void;
  addPrepPlan: (plan: Omit<PrepPlan, 'id'>) => void;
  startSession: (substance: string) => void;
  endSession: () => void;
  upgradeToPremium: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

const defaultUser: User = {
  id: '1',
  name: 'Alex',
  email: 'alex@example.com',
  isPremium: false,
  joinDate: '2024-01-15',
  learningStreak: 7,
  totalSessions: 3,
  wellnessScore: 72,
};

const sampleJournalEntries: JournalEntry[] = [
  {
    id: '1',
    date: '2024-01-20',
    type: 'reflection',
    title: 'Post-mushroom integration',
    content: 'Feeling much more connected to nature. The experience revealed patterns I wasn\'t aware of.',
    mood: 8,
    substance: 'psilocybin',
    tags: ['integration', 'nature', 'connection'],
  },
  {
    id: '2',
    date: '2024-01-15',
    type: 'mood',
    title: 'Daily Check-in',
    content: 'Feeling grounded and clear-headed today. Good energy.',
    mood: 7,
    tags: ['daily', 'grounded'],
  },
];

const samplePrepPlans: PrepPlan[] = [
  {
    id: '1',
    title: 'Weekend Forest Experience',
    substance: 'psilocybin',
    date: '2024-02-10',
    intention: 'Deep relaxation and nature connection',
    environment: 'Quiet forest cabin with trusted friend',
    sitter: 'Jamie (experienced)',
    completed: false,
    checklist: [
      { item: 'Fasted for 4 hours', checked: true },
      { item: 'Informed sitter of experience', checked: true },
      { item: 'Safe environment prepared', checked: false },
      { item: 'Emergency contacts saved', checked: false },
      { item: 'Trip stopper available', checked: false },
    ],
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    user: defaultUser,
    isAuthenticated: false,
    isOnboarded: false,
    savedSubstances: ['cannabis', 'psilocybin'],
    journalEntries: sampleJournalEntries,
    prepPlans: samplePrepPlans,
    activeSession: false,
    sessionSubstance: '',
    sessionStartTime: null,
  });

  const login = (email: string, name: string) => {
    setState(s => ({
      ...s,
      isAuthenticated: true,
      user: { ...defaultUser, email, name },
    }));
  };

  const logout = () => {
    setState(s => ({ ...s, isAuthenticated: false, isOnboarded: false }));
  };

  const completeOnboarding = () => {
    setState(s => ({ ...s, isOnboarded: true }));
  };

  const toggleSaveSubstance = (id: string) => {
    setState(s => ({
      ...s,
      savedSubstances: s.savedSubstances.includes(id)
        ? s.savedSubstances.filter(x => x !== id)
        : [...s.savedSubstances, id],
    }));
  };

  const addJournalEntry = (entry: Omit<JournalEntry, 'id'>) => {
    setState(s => ({
      ...s,
      journalEntries: [{ ...entry, id: Date.now().toString() }, ...s.journalEntries],
    }));
  };

  const addPrepPlan = (plan: Omit<PrepPlan, 'id'>) => {
    setState(s => ({
      ...s,
      prepPlans: [{ ...plan, id: Date.now().toString() }, ...s.prepPlans],
    }));
  };

  const startSession = (substance: string) => {
    setState(s => ({
      ...s,
      activeSession: true,
      sessionSubstance: substance,
      sessionStartTime: new Date(),
    }));
  };

  const endSession = () => {
    setState(s => ({
      ...s,
      activeSession: false,
      sessionSubstance: '',
      sessionStartTime: null,
    }));
  };

  const upgradeToPremium = () => {
    setState(s => ({
      ...s,
      user: s.user ? { ...s.user, isPremium: true } : null,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        logout,
        completeOnboarding,
        toggleSaveSubstance,
        addJournalEntry,
        addPrepPlan,
        startSession,
        endSession,
        upgradeToPremium,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
