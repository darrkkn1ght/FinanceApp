// src/styles/theme.ts
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const theme = {
  colors: {
    // Primary Colors
    primary: '#2E7D32',
    primaryLight: '#66BB6A',
    primaryDark: '#1B5E20',
    
    // Secondary Colors
    secondary: '#1976D2',
    secondaryLight: '#42A5F5',
    secondaryDark: '#0D47A1',
    
    // Accent Colors
    accent: '#FF6B35',
    accentLight: '#FF8A65',
    accentDark: '#E64A19',
    
    // Neutral Colors
    background: '#FAFAFA',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    
    // Text Colors
    textPrimary: '#1A1A1A',
    textSecondary: '#666666',
    textTertiary: '#999999',
    textDisabled: '#BDBDBD',
    
    // Status Colors
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
    
    // Financial Colors
    income: '#4CAF50',
    expense: '#F44336',
    investment: '#9C27B0',
    savings: '#2E7D32',
    
    // Border Colors
    border: '#E0E0E0',
    borderLight: '#F5F5F5',
    borderDark: '#BDBDBD',
    
    // Overlay Colors
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayLight: 'rgba(0, 0, 0, 0.3)',
    overlayDark: 'rgba(0, 0, 0, 0.7)',
    
    // Gradient Colors
    gradientStart: '#2E7D32',
    gradientEnd: '#66BB6A',
    
    // Chart Colors
    chartColors: [
      '#2E7D32',
      '#1976D2',
      '#FF6B35',
      '#9C27B0',
      '#FF9800',
      '#4CAF50',
      '#F44336',
      '#2196F3',
    ],
  },
  
  fonts: {
    // Font Families
    regular: 'System',
    medium: 'System',
    semiBold: 'System',
    bold: 'System',
    
    // Font Sizes
    sizes: {
      xs: 10,
      sm: 12,
      md: 14,
      lg: 16,
      xl: 18,
      xxl: 20,
      xxxl: 24,
      heading: 28,
      title: 32,
      display: 36,
    },
    
    // Line Heights
    lineHeights: {
      tight: 1.2,
      normal: 1.4,
      relaxed: 1.6,
      loose: 1.8,
    },
    
    // Font Weights
    weights: {
      normal: '400',
      medium: '500',
      semiBold: '600',
      bold: '700',
    },
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    huge: 48,
    massive: 64,
  },
  
  radius: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 20,
    round: 50,
  },
  
  shadows: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 8,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 16,
    },
  },
  
  layout: {
    screenWidth: width,
    screenHeight: height,
    headerHeight: 60,
    tabBarHeight: 60,
    statusBarHeight: 44,
    bottomSafeArea: 34,
  },
  
  animations: {
    duration: {
      fast: 200,
      normal: 300,
      slow: 500,
    },
    easing: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
    },
  },
  
  // Component specific styles
  components: {
    button: {
      height: 48,
      minWidth: 120,
      borderRadius: 8,
    },
    input: {
      height: 48,
      borderRadius: 8,
      borderWidth: 1,
    },
    card: {
      borderRadius: 12,
      padding: 16,
    },
    modal: {
      borderRadius: 16,
      padding: 20,
    },
  },
} as const;

export type Theme = typeof theme;
export type ThemeColors = typeof theme.colors;
export type ThemeFonts = typeof theme.fonts;
export type ThemeSpacing = typeof theme.spacing;