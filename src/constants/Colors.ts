// src/constants/Colors.ts
export const Colors = {
    // Primary Colors
    primary: '#2E7D32',
    primaryLight: '#4CAF50',
    primaryDark: '#1B5E20',
    
    // Secondary Colors
    secondary: '#1976D2',
    secondaryLight: '#42A5F5',
    secondaryDark: '#0D47A1',
    
    // Accent Colors
    accent: '#FF9800',
    accentLight: '#FFB74D',
    accentDark: '#F57C00',
    
    // Background Colors
    background: '#FFFFFF',
    surface: '#F5F5F5',
    surfaceLight: '#FAFAFA',
    surfaceDark: '#E0E0E0',
    
    // Text Colors
    text: '#1A1A1A',
    textSecondary: '#757575',
    textLight: '#9E9E9E',
    textDisabled: '#BDBDBD',
    
    // Status Colors
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FF9800',
    info: '#2196F3',
    
    // Transaction Colors
    income: '#4CAF50',
    expense: '#F44336',
    transfer: '#2196F3',
    
    // Chart Colors
    chartPrimary: '#2E7D32',
    chartSecondary: '#1976D2',
    chartAccent: '#FF9800',
    chartSuccess: '#4CAF50',
    chartError: '#F44336',
    chartWarning: '#FF9800',
    chartInfo: '#2196F3',
    
    // Gradient Colors
    gradientPrimary: ['#2E7D32', '#4CAF50'],
    gradientSecondary: ['#1976D2', '#42A5F5'],
    gradientAccent: ['#FF9800', '#FFB74D'],
    
    // Card Colors
    cardBackground: '#FFFFFF',
    cardBorder: '#E0E0E0',
    cardShadow: 'rgba(0, 0, 0, 0.1)',
    
    // Input Colors
    inputBackground: '#F5F5F5',
    inputBorder: '#E0E0E0',
    inputBorderFocused: '#2E7D32',
    inputPlaceholder: '#9E9E9E',
    
    // Button Colors
    buttonPrimary: '#2E7D32',
    buttonSecondary: '#1976D2',
    buttonDisabled: '#E0E0E0',
    buttonText: '#FFFFFF',
    buttonTextSecondary: '#757575',
    
    // Overlay Colors
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayLight: 'rgba(0, 0, 0, 0.3)',
    overlayDark: 'rgba(0, 0, 0, 0.7)',
    
    // Border Colors
    border: '#E0E0E0',
    borderLight: '#F5F5F5',
    borderDark: '#BDBDBD',
    
    // Shadow Colors
    shadowLight: 'rgba(0, 0, 0, 0.1)',
    shadowMedium: 'rgba(0, 0, 0, 0.2)',
    shadowDark: 'rgba(0, 0, 0, 0.3)',
    
    // Category Colors
    categories: {
      dining: '#FF5722',
      shopping: '#9C27B0',
      transportation: '#2196F3',
      entertainment: '#FF9800',
      utilities: '#4CAF50',
      healthcare: '#F44336',
      education: '#3F51B5',
      travel: '#00BCD4',
      groceries: '#8BC34A',
      other: '#9E9E9E',
    },
    
    // Investment Colors
    investments: {
      stocks: '#2196F3',
      bonds: '#4CAF50',
      crypto: '#FF9800',
      mutual: '#9C27B0',
      etf: '#00BCD4',
      real_estate: '#795548',
      commodities: '#FFC107',
      cash: '#9E9E9E',
    },
    
    // Dark Mode Colors (for future implementation)
    dark: {
      background: '#121212',
      surface: '#1E1E1E',
      text: '#FFFFFF',
      textSecondary: '#B0B0B0',
      primary: '#4CAF50',
      secondary: '#42A5F5',
      accent: '#FFB74D',
      border: '#333333',
      card: '#1E1E1E',
    },
  } as const;
  
  export type ColorName = keyof typeof Colors;