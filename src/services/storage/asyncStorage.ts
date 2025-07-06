// src/services/storage/asyncStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface StorageResponse<T> {
  data: T | null;
  success: boolean;
  error?: string;
}

export interface StorageKeys {
  USER_PREFERENCES: 'user_preferences';
  BUDGET_DATA: 'budget_data';
  CACHED_TRANSACTIONS: 'cached_transactions';
  CACHED_INVESTMENTS: 'cached_investments';
  APP_SETTINGS: 'app_settings';
  ONBOARDING_COMPLETE: 'onboarding_complete';
  LAST_SYNC: 'last_sync';
  OFFLINE_TRANSACTIONS: 'offline_transactions';
  THEME_PREFERENCE: 'theme_preference';
  NOTIFICATION_SETTINGS: 'notification_settings';
}

export const STORAGE_KEYS: StorageKeys = {
  USER_PREFERENCES: 'user_preferences',
  BUDGET_DATA: 'budget_data',
  CACHED_TRANSACTIONS: 'cached_transactions',
  CACHED_INVESTMENTS: 'cached_investments',
  APP_SETTINGS: 'app_settings',
  ONBOARDING_COMPLETE: 'onboarding_complete',
  LAST_SYNC: 'last_sync',
  OFFLINE_TRANSACTIONS: 'offline_transactions',
  THEME_PREFERENCE: 'theme_preference',
  NOTIFICATION_SETTINGS: 'notification_settings',
};

class AsyncStorageService {
  /**
   * Store data in AsyncStorage
   */
  async setItem<T>(key: keyof StorageKeys, value: T): Promise<StorageResponse<T>> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return {
        data: value,
        success: true
      };
    } catch (error) {
      console.error(`AsyncStorage setItem error for key ${key}:`, error);
      return {
        data: null,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to store data'
      };
    }
  }

  /**
   * Retrieve data from AsyncStorage
   */
  async getItem<T>(key: keyof StorageKeys): Promise<StorageResponse<T>> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      
      if (jsonValue === null) {
        return {
          data: null,
          success: true
        };
      }

      const data = JSON.parse(jsonValue) as T;
      return {
        data,
        success: true
      };
    } catch (error) {
      console.error(`AsyncStorage getItem error for key ${key}:`, error);
      return {
        data: null,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to retrieve data'
      };
    }
  }

  /**
   * Remove specific item from AsyncStorage
   */
  async removeItem(key: keyof StorageKeys): Promise<StorageResponse<null>> {
    try {
      await AsyncStorage.removeItem(key);
      return {
        data: null,
        success: true
      };
    } catch (error) {
      console.error(`AsyncStorage removeItem error for key ${key}:`, error);
      return {
        data: null,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to remove data'
      };
    }
  }

  /**
   * Clear all data from AsyncStorage
   */
  async clear(): Promise<StorageResponse<null>> {
    try {
      await AsyncStorage.clear();
      return {
        data: null,
        success: true
      };
    } catch (error) {
      console.error('AsyncStorage clear error:', error);
      return {
        data: null,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to clear storage'
      };
    }
  }

  /**
   * Get all keys from AsyncStorage
   */
  async getAllKeys(): Promise<StorageResponse<string[]>> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return {
        data: [...keys],
        success: true
      };
    } catch (error) {
      console.error('AsyncStorage getAllKeys error:', error);
      return {
        data: null,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get keys'
      };
    }
  }

  /**
   * Get multiple items from AsyncStorage
   */
  async multiGet(keys: (keyof StorageKeys)[]): Promise<StorageResponse<Record<string, unknown>>> {
    try {
      const keyValues = await AsyncStorage.multiGet(keys);
      const result: Record<string, unknown> = {};
      
      keyValues.forEach(([key, value]) => {
        try {
          result[key] = value ? JSON.parse(value) : null;
        } catch (_parseError) {
          result[key] = value;
        }
      });

      return {
        data: result,
        success: true
      };
    } catch (error) {
      console.error('AsyncStorage multiGet error:', error);
      return {
        data: null,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get multiple items'
      };
    }
  }

  /**
   * Set multiple items in AsyncStorage
   */
  async multiSet(keyValuePairs: Array<[keyof StorageKeys, unknown]>): Promise<StorageResponse<null>> {
    try {
      const formattedPairs: Array<[string, string]> = keyValuePairs.map(([key, value]) => [
        key,
        JSON.stringify(value)
      ]);

      await AsyncStorage.multiSet(formattedPairs);
      return {
        data: null,
        success: true
      };
    } catch (error) {
      console.error('AsyncStorage multiSet error:', error);
      return {
        data: null,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to set multiple items'
      };
    }
  }

  /**
   * Remove multiple items from AsyncStorage
   */
  async multiRemove(keys: (keyof StorageKeys)[]): Promise<StorageResponse<null>> {
    try {
      await AsyncStorage.multiRemove(keys);
      return {
        data: null,
        success: true
      };
    } catch (error) {
      console.error('AsyncStorage multiRemove error:', error);
      return {
        data: null,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to remove multiple items'
      };
    }
  }

  /**
   * Check if a key exists in AsyncStorage
   */
  async hasKey(key: keyof StorageKeys): Promise<StorageResponse<boolean>> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const exists = keys.includes(key);
      return {
        data: exists,
        success: true
      };
    } catch (error) {
      console.error(`AsyncStorage hasKey error for key ${key}:`, error);
      return {
        data: false,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to check key existence'
      };
    }
  }

  /**
   * Get storage size info
   */
  async getStorageSize(): Promise<StorageResponse<{ keys: number; totalSize: number }>> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const keyValues = await AsyncStorage.multiGet(keys);
      
      let totalSize = 0;
      keyValues.forEach(([key, value]) => {
        totalSize += key.length + (value?.length || 0);
      });

      return {
        data: {
          keys: keys.length,
          totalSize
        },
        success: true
      };
    } catch (error) {
      console.error('AsyncStorage getStorageSize error:', error);
      return {
        data: null,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get storage size'
      };
    }
  }
}

export const asyncStorage = new AsyncStorageService();