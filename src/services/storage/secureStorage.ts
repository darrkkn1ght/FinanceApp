// src/services/storage/secureStorage.ts
import * as SecureStore from 'expo-secure-store';

export interface SecureStorageResponse<T> {
  data: T | null;
  success: boolean;
  error?: string;
}

export interface SecureStorageKeys {
  AUTH_TOKEN: 'auth_token';
  REFRESH_TOKEN: 'refresh_token';
  USER_ID: 'user_id';
  BIOMETRIC_ENABLED: 'biometric_enabled';
  PIN_CODE: 'pin_code';
  BANK_TOKENS: 'bank_tokens';
  ENCRYPTION_KEY: 'encryption_key';
  SECURE_PREFERENCES: 'secure_preferences';
  BACKUP_SEED: 'backup_seed';
  DEVICE_ID: 'device_id';
}

export const SECURE_KEYS: SecureStorageKeys = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_ID: 'user_id',
  BIOMETRIC_ENABLED: 'biometric_enabled',
  PIN_CODE: 'pin_code',
  BANK_TOKENS: 'bank_tokens',
  ENCRYPTION_KEY: 'encryption_key',
  SECURE_PREFERENCES: 'secure_preferences',
  BACKUP_SEED: 'backup_seed',
  DEVICE_ID: 'device_id',
};

export interface SecureStoreOptions {
  requireAuthentication?: boolean;
  authenticationPrompt?: string;
  keychainService?: string;
  touchID?: boolean;
  showModal?: boolean;
  kSecAccessControl?: string;
}

class SecureStorageService {
  private defaultOptions: SecureStoreOptions = {
    requireAuthentication: false,
    authenticationPrompt: 'Authenticate to access your financial data',
    keychainService: 'com.financeapp.secure',
    touchID: true,
    showModal: true,
  };

  /**
   * Store sensitive data in secure storage
   */
  async setItem<T>(
    key: keyof SecureStorageKeys, 
    value: T, 
    options?: SecureStoreOptions
  ): Promise<SecureStorageResponse<T>> {
    try {
      const finalOptions = { ...this.defaultOptions, ...options };
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      
      await SecureStore.setItemAsync(key, stringValue, finalOptions);
      
      return {
        data: value,
        success: true
      };
    } catch (error) {
      console.error(`SecureStorage setItem error for key ${key}:`, error);
      return {
        data: null,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to store secure data'
      };
    }
  }

  /**
   * Retrieve sensitive data from secure storage
   */
  async getItem<T>(
    key: keyof SecureStorageKeys, 
    options?: SecureStoreOptions
  ): Promise<SecureStorageResponse<T>> {
    try {
      const finalOptions = { ...this.defaultOptions, ...options };
      const value = await SecureStore.getItemAsync(key, finalOptions);
      
      if (value === null) {
        return {
          data: null,
          success: true
        };
      }

      // Try to parse as JSON, fallback to string
      let parsedValue: T;
      try {
        parsedValue = JSON.parse(value) as T;
      } catch (parseError) {
        parsedValue = value as T;
      }

      return {
        data: parsedValue,
        success: true
      };
    } catch (error) {
      console.error(`SecureStorage getItem error for key ${key}:`, error);
      return {
        data: null,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to retrieve secure data'
      };
    }
  }

  /**
   * Remove sensitive data from secure storage
   */
  async removeItem(
    key: keyof SecureStorageKeys, 
    options?: SecureStoreOptions
  ): Promise<SecureStorageResponse<null>> {
    try {
      const finalOptions = { ...this.defaultOptions, ...options };
      await SecureStore.deleteItemAsync(key, finalOptions);
      
      return {
        data: null,
        success: true
      };
    } catch (error) {
      console.error(`SecureStorage removeItem error for key ${key}:`, error);
      return {
        data: null,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to remove secure data'
      };
    }
  }

  /**
   * Check if a key exists in secure storage
   */
  async hasKey(
    key: keyof SecureStorageKeys, 
    options?: SecureStoreOptions
  ): Promise<SecureStorageResponse<boolean>> {
    try {
      const finalOptions = { ...this.defaultOptions, ...options };
      const value = await SecureStore.getItemAsync(key, finalOptions);
      
      return {
        data: value !== null,
        success: true
      };
    } catch (error) {
      console.error(`SecureStorage hasKey error for key ${key}:`, error);
      return {
        data: false,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to check secure key existence'
      };
    }
  }

  /**
   * Store authentication tokens
   */
  async setAuthTokens(
    accessToken: string, 
    refreshToken: string, 
    userId: string
  ): Promise<SecureStorageResponse<boolean>> {
    try {
      const authOptions: SecureStoreOptions = {
        requireAuthentication: true,
        authenticationPrompt: 'Authenticate to save login credentials',
      };

      await Promise.all([
        SecureStore.setItemAsync(SECURE_KEYS.AUTH_TOKEN, accessToken, authOptions),
        SecureStore.setItemAsync(SECURE_KEYS.REFRESH_TOKEN, refreshToken, authOptions),
        SecureStore.setItemAsync(SECURE_KEYS.USER_ID, userId, authOptions),
      ]);

      return {
        data: true,
        success: true
      };
    } catch (error) {
      console.error('SecureStorage setAuthTokens error:', error);
      return {
        data: false,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to store authentication tokens'
      };
    }
  }

  /**
   * Retrieve authentication tokens
   */
  async getAuthTokens(): Promise<SecureStorageResponse<{
    accessToken: string | null;
    refreshToken: string | null;
    userId: string | null;
  }>> {
    try {
      const authOptions: SecureStoreOptions = {
        requireAuthentication: true,
        authenticationPrompt: 'Authenticate to access your account',
      };

      const [accessToken, refreshToken, userId] = await Promise.all([
        SecureStore.getItemAsync(SECURE_KEYS.AUTH_TOKEN, authOptions),
        SecureStore.getItemAsync(SECURE_KEYS.REFRESH_TOKEN, authOptions),
        SecureStore.getItemAsync(SECURE_KEYS.USER_ID, authOptions),
      ]);

      return {
        data: {
          accessToken,
          refreshToken,
          userId,
        },
        success: true
      };
    } catch (error) {
      console.error('SecureStorage getAuthTokens error:', error);
      return {
        data: null,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to retrieve authentication tokens'
      };
    }
  }

  /**
   * Clear all authentication tokens
   */
  async clearAuthTokens(): Promise<SecureStorageResponse<boolean>> {
    try {
      await Promise.all([
        SecureStore.deleteItemAsync(SECURE_KEYS.AUTH_TOKEN),
        SecureStore.deleteItemAsync(SECURE_KEYS.REFRESH_TOKEN),
        SecureStore.deleteItemAsync(SECURE_KEYS.USER_ID),
      ]);

      return {
        data: true,
        success: true
      };
    } catch (error) {
      console.error('SecureStorage clearAuthTokens error:', error);
      return {
        data: false,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to clear authentication tokens'
      };
    }
  }

  /**
   * Store bank connection tokens
   */
  async setBankTokens(
    bankTokens: Record<string, string>
  ): Promise<SecureStorageResponse<boolean>> {
    try {
      const bankOptions: SecureStoreOptions = {
        requireAuthentication: true,
        authenticationPrompt: 'Authenticate to save bank connection',
      };

      await SecureStore.setItemAsync(
        SECURE_KEYS.BANK_TOKENS, 
        JSON.stringify(bankTokens), 
        bankOptions
      );

      return {
        data: true,
        success: true
      };
    } catch (error) {
      console.error('SecureStorage setBankTokens error:', error);
      return {
        data: false,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to store bank tokens'
      };
    }
  }

  /**
   * Retrieve bank connection tokens
   */
  async getBankTokens(): Promise<SecureStorageResponse<Record<string, string>>> {
    try {
      const bankOptions: SecureStoreOptions = {
        requireAuthentication: true,
        authenticationPrompt: 'Authenticate to access bank connections',
      };

      const tokensJson = await SecureStore.getItemAsync(SECURE_KEYS.BANK_TOKENS, bankOptions);
      
      if (!tokensJson) {
        return {
          data: {},
          success: true
        };
      }

      const tokens = JSON.parse(tokensJson) as Record<string, string>;
      return {
        data: tokens,
        success: true
      };
    } catch (error) {
      console.error('SecureStorage getBankTokens error:', error);
      return {
        data: null,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to retrieve bank tokens'
      };
    }
  }

  /**
   * Store biometric preference
   */
  async setBiometricEnabled(enabled: boolean): Promise<SecureStorageResponse<boolean>> {
    try {
      await SecureStore.setItemAsync(SECURE_KEYS.BIOMETRIC_ENABLED, enabled.toString());
      return {
        data: enabled,
        success: true
      };
    } catch (error) {
      console.error('SecureStorage setBiometricEnabled error:', error);
      return {
        data: false,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to store biometric preference'
      };
    }
  }

  /**
   * Check if biometric authentication is enabled
   */
  async isBiometricEnabled(): Promise<SecureStorageResponse<boolean>> {
    try {
      const enabled = await SecureStore.getItemAsync(SECURE_KEYS.BIOMETRIC_ENABLED);
      return {
        data: enabled === 'true',
        success: true
      };
    } catch (error) {
      console.error('SecureStorage isBiometricEnabled error:', error);
      return {
        data: false,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to check biometric preference'
      };
    }
  }

  /**
   * Clear all secure storage data
   */
  async clearAll(): Promise<SecureStorageResponse<boolean>> {
    try {
      const keys = Object.values(SECURE_KEYS);
      await Promise.all(keys.map(key => SecureStore.deleteItemAsync(key)));
      
      return {
        data: true,
        success: true
      };
    } catch (error) {
      console.error('SecureStorage clearAll error:', error);
      return {
        data: false,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to clear all secure storage'
      };
    }
  }
}

export const secureStorage = new SecureStorageService();