// src/context/SettingsContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'NGN' | 'GHS' | 'KES' | 'ZAR';
export type DateFormat = 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
export type NumberFormat = 'US' | 'EU' | 'UK';

export interface NotificationSettings {
  budgetAlerts: boolean;
  goalReminders: boolean;
  transactionNotifications: boolean;
  investmentUpdates: boolean;
  weeklyReports: boolean;
  monthlyReports: boolean;
  aiInsights: boolean;
  pushNotifications: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
}

export interface SecuritySettings {
  biometricAuth: boolean;
  pinAuth: boolean;
  twoFactorAuth: boolean;
  autoLock: boolean;
  autoLockTime: number; // in minutes
  sessionTimeout: number; // in minutes
  privacyMode: boolean;
  analyticsConsent: boolean;
}

export interface DisplaySettings {
  currency: CurrencyCode;
  dateFormat: DateFormat;
  numberFormat: NumberFormat;
  hideAmounts: boolean;
  showDecimalPlaces: boolean;
  compactMode: boolean;
  animationsEnabled: boolean;
  hapticFeedback: boolean;
}

export interface AppSettings {
  notifications: NotificationSettings;
  security: SecuritySettings;
  display: DisplaySettings;
  language: string;
  timezone: string;
  lastSyncTime: string | null;
  dataRetentionDays: number;
  backupEnabled: boolean;
  autoBackup: boolean;
  debugMode: boolean;
}

interface SettingsContextType {
  settings: AppSettings;
  isLoading: boolean;
  updateNotificationSettings: (updates: Partial<NotificationSettings>) => Promise<boolean>;
  updateSecuritySettings: (updates: Partial<SecuritySettings>) => Promise<boolean>;
  updateDisplaySettings: (updates: Partial<DisplaySettings>) => Promise<boolean>;
  updateGeneralSettings: (updates: Partial<AppSettings>) => Promise<boolean>;
  resetSettings: () => Promise<boolean>;
  exportSettings: () => Promise<string>;
  importSettings: (settingsJson: string) => Promise<boolean>;
  clearAllData: () => Promise<boolean>;
}

const defaultSettings: AppSettings = {
  notifications: {
    budgetAlerts: true,
    goalReminders: true,
    transactionNotifications: true,
    investmentUpdates: true,
    weeklyReports: true,
    monthlyReports: true,
    aiInsights: true,
    pushNotifications: true,
    emailNotifications: false,
    smsNotifications: false,
  },
  security: {
    biometricAuth: false,
    pinAuth: false,
    twoFactorAuth: false,
    autoLock: true,
    autoLockTime: 5,
    sessionTimeout: 30,
    privacyMode: false,
    analyticsConsent: true,
  },
  display: {
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    numberFormat: 'US',
    hideAmounts: false,
    showDecimalPlaces: true,
    compactMode: false,
    animationsEnabled: true,
    hapticFeedback: true,
  },
  language: 'en',
  timezone: 'UTC',
  lastSyncTime: null,
  dataRetentionDays: 365,
  backupEnabled: true,
  autoBackup: true,
  debugMode: false,
};

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsProviderProps {
  children: React.ReactNode;
}

const SETTINGS_STORAGE_KEY = '@finance_app_settings';

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSettingsFromStorage();
  }, []);

  const loadSettingsFromStorage = async () => {
    try {
      setIsLoading(true);
      const savedSettings = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings) as AppSettings;
        // Merge with defaults to ensure new settings are included
        const mergedSettings = {
          ...defaultSettings,
          ...parsedSettings,
          notifications: {
            ...defaultSettings.notifications,
            ...parsedSettings.notifications,
          },
          security: {
            ...defaultSettings.security,
            ...parsedSettings.security,
          },
          display: {
            ...defaultSettings.display,
            ...parsedSettings.display,
          },
        };
        setSettings(mergedSettings);
      }
    } catch (error) {
      console.error('Error loading settings from storage:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettingsToStorage = async (newSettings: AppSettings) => {
    try {
      await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
    } catch (error) {
      console.error('Error saving settings to storage:', error);
      throw error;
    }
  };

  const updateNotificationSettings = async (updates: Partial<NotificationSettings>): Promise<boolean> => {
    try {
      const newSettings = {
        ...settings,
        notifications: {
          ...settings.notifications,
          ...updates,
        },
      };
      await saveSettingsToStorage(newSettings);
      setSettings(newSettings);
      return true;
    } catch (error) {
      console.error('Error updating notification settings:', error);
      return false;
    }
  };

  const updateSecuritySettings = async (updates: Partial<SecuritySettings>): Promise<boolean> => {
    try {
      const newSettings = {
        ...settings,
        security: {
          ...settings.security,
          ...updates,
        },
      };
      await saveSettingsToStorage(newSettings);
      setSettings(newSettings);
      return true;
    } catch (error) {
      console.error('Error updating security settings:', error);
      return false;
    }
  };

  const updateDisplaySettings = async (updates: Partial<DisplaySettings>): Promise<boolean> => {
    try {
      const newSettings = {
        ...settings,
        display: {
          ...settings.display,
          ...updates,
        },
      };
      await saveSettingsToStorage(newSettings);
      setSettings(newSettings);
      return true;
    } catch (error) {
      console.error('Error updating display settings:', error);
      return false;
    }
  };

  const updateGeneralSettings = async (updates: Partial<AppSettings>): Promise<boolean> => {
    try {
      const newSettings = {
        ...settings,
        ...updates,
      };
      await saveSettingsToStorage(newSettings);
      setSettings(newSettings);
      return true;
    } catch (error) {
      console.error('Error updating general settings:', error);
      return false;
    }
  };

  const resetSettings = async (): Promise<boolean> => {
    try {
      await saveSettingsToStorage(defaultSettings);
      setSettings(defaultSettings);
      return true;
    } catch (error) {
      console.error('Error resetting settings:', error);
      return false;
    }
  };

  const exportSettings = async (): Promise<string> => {
    try {
      return JSON.stringify(settings, null, 2);
    } catch (error) {
      console.error('Error exporting settings:', error);
      throw error;
    }
  };

  const importSettings = async (settingsJson: string): Promise<boolean> => {
    try {
      const importedSettings = JSON.parse(settingsJson) as AppSettings;
      // Validate and merge with defaults
      const mergedSettings = {
        ...defaultSettings,
        ...importedSettings,
        notifications: {
          ...defaultSettings.notifications,
          ...importedSettings.notifications,
        },
        security: {
          ...defaultSettings.security,
          ...importedSettings.security,
        },
        display: {
          ...defaultSettings.display,
          ...importedSettings.display,
        },
      };
      await saveSettingsToStorage(mergedSettings);
      setSettings(mergedSettings);
      return true;
    } catch (error) {
      console.error('Error importing settings:', error);
      return false;
    }
  };

  const clearAllData = async (): Promise<boolean> => {
    try {
      await AsyncStorage.multiRemove([
        SETTINGS_STORAGE_KEY,
        '@finance_app_theme',
        '@finance_app_user_data',
        '@finance_app_cache',
      ]);
      setSettings(defaultSettings);
      return true;
    } catch (error) {
      console.error('Error clearing all data:', error);
      return false;
    }
  };

  const value: SettingsContextType = {
    settings,
    isLoading,
    updateNotificationSettings,
    updateSecuritySettings,
    updateDisplaySettings,
    updateGeneralSettings,
    resetSettings,
    exportSettings,
    importSettings,
    clearAllData,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export default SettingsProvider;