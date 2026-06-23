export const Colors = {
  // True black base (matches logo background)
  bg: '#000000',
  bgCard: '#0A0A0A',
  bgCardLight: '#111111',
  bgSurface: '#080808',

  // Neon primaries (logo accurate)
  neonGreen: '#39FF14',
  electricYellow: '#FFE600',
  tropicalTeal: '#00E5CC',

  // Rasta tricolour
  rastaRed: '#FF2200',
  rastaYellow: '#FFE600',
  rastaGreen: '#39FF14',

  // Neon glow layers
  neonGreenDim: '#0D2200',
  neonGreenMid: '#1A4400',
  neonGreenGlow: 'rgba(57,255,20,0.18)',
  neonGreenGlowStrong: 'rgba(57,255,20,0.35)',
  yellowGlow: 'rgba(255,230,0,0.18)',
  yellowGlowStrong: 'rgba(255,230,0,0.35)',
  tealGlow: 'rgba(0,229,204,0.18)',
  redGlow: 'rgba(255,34,0,0.18)',

  // Text
  textPrimary: '#F0FFE8',
  textSecondary: '#8ABA7A',
  textMuted: '#3D5C2E',
  textNeon: '#39FF14',

  // Borders (glowing)
  borderGreen: 'rgba(57,255,20,0.5)',
  borderGreenStrong: 'rgba(57,255,20,0.8)',
  borderYellow: 'rgba(255,230,0,0.5)',
  borderTeal: 'rgba(0,229,204,0.5)',
  borderRed: 'rgba(255,34,0,0.5)',
  borderMuted: 'rgba(57,255,20,0.12)',

  // Status
  danger: '#FF2200',
  warning: '#FFE600',
  success: '#39FF14',
  info: '#00E5CC',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

// Neon shadow styles for platform use
export const NeonShadow = {
  green: {
    shadowColor: '#39FF14',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 10,
  },
  yellow: {
    shadowColor: '#FFE600',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 10,
  },
  teal: {
    shadowColor: '#00E5CC',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 10,
  },
  red: {
    shadowColor: '#FF2200',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 10,
  },
};
