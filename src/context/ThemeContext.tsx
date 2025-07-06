// src/context/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  income: string;
  expense: string;
  card: string;
  shadow: string;
}

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
  isDark: boolean;
}

const lightTheme: ThemeColors = {
  primary: '#2E7D32',
  secondary: '#66BB6A',
  background: '#FFFFFF',
  surface: '#F5F5F5',
  text: '#1A1A1A',
  textSecondary: '#666666',
  border: '#E0E0E0',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  income: '#4CAF50',
  expense: '#F44336',
  card: '#FFFFFF',
  shadow: '#00000020',
};

const darkTheme: ThemeColors = {
  primary: '#66BB6A',
  secondary: '#81C784',
  background: '#121212',
  surface: '#1E1E1E',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  border: '#333333',
  success: '#4CAF50',
  warning: '#FFA726',
  error: '#EF5350',
  income: '#4CAF50',
  expense: '#EF5350',
  card: '#1E1E1E',
  shadow: '#00000040',
};

interface ThemeContextType {
  theme: Theme;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  colors: ThemeColors;
  isDark: boolean;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

const THEME_STORAGE_KEY = '@finance_app_theme';

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [systemColorScheme, setSystemColorScheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );

  useEffect(() => {
    loadThemeFromStorage();
    
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemColorScheme(colorScheme);
    });

    return () => subscription?.remove();
  }, []);

  const loadThemeFromStorage = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        const parsedTheme = JSON.parse(savedTheme) as ThemeMode;
        setThemeModeState(parsedTheme);
      }
    } catch (error) {
      console.error('Error loading theme from storage:', error);
    }
  };

  const saveThemeToStorage = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(mode));
    } catch (error) {
      console.error('Error saving theme to storage:', error);
    }
  };

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    saveThemeToStorage(mode);
  };

  const toggleTheme = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newMode);
  };

  const getCurrentTheme = (): Theme => {
    let isDark = false;
    
    if (themeMode === 'dark') {
      isDark = true;
    } else if (themeMode === 'light') {
      isDark = false;
    } else {
      // System mode
      isDark = systemColorScheme === 'dark';
    }

    return {
      mode: themeMode,
      colors: isDark ? darkTheme : lightTheme,
      isDark,
    };
  };

  const theme = getCurrentTheme();

  const value: ThemeContextType = {
    theme,
    setThemeMode,
    toggleTheme,
    colors: theme.colors,
    isDark: theme.isDark,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;