// src/hooks/useAuth.ts
import { useState, useEffect, useCallback } from 'react';
import { authService } from '../services/api/authService';
import { User, LoginCredentials, RegisterCredentials } from '../types/auth';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (credentials: RegisterCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  clearError: () => void;
  checkAuthStatus: () => Promise<void>;
}

export const useAuth = (): AuthState & AuthActions => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user;

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const checkAuthStatus = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await authService.getCurrentUser();
      
      if (response.success && response.data) {
        setUser(response.data);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
      setError(err instanceof Error ? err.message : 'Failed to check auth status');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await authService.login(credentials);
      
      if (response.success && response.data) {
        setUser(response.data.user);
        return true;
      } else {
        setError(response.error || 'Login failed');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (credentials: RegisterCredentials): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await authService.register(credentials);
      
      if (response.success && response.data) {
        setUser(response.data.user);
        return true;
      } else {
        setError(response.error || 'Registration failed');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      await authService.logout();
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (email: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await authService.resetPassword({ email });
      
      if (response.success) {
        return true;
      } else {
        setError(response.error || 'Password reset failed');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Password reset failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (updates: Partial<User>): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Convert User type to UpdateProfileRequest type
      const profileUpdates = {
        ...(updates.firstName && { firstName: updates.firstName }),
        ...(updates.lastName && { lastName: updates.lastName }),
        ...(updates.phone && { phoneNumber: updates.phone }),
        ...(updates.dateOfBirth && { dateOfBirth: updates.dateOfBirth }),
        ...(updates.avatar && { avatar: updates.avatar }),
        ...(updates.preferences && {
          preferences: {
            ...(updates.preferences.currency && { currency: updates.preferences.currency }),
            ...(updates.preferences.language && { language: updates.preferences.language }),
            ...(updates.preferences.notifications && { 
              notifications: {
                enabled: updates.preferences.notifications.email || updates.preferences.notifications.push,
                sound: true,
                badge: true,
                alert: true,
                types: {
                  transaction: updates.preferences.notifications.transactions,
                  budget: updates.preferences.notifications.budget,
                  investment: updates.preferences.notifications.investments,
                  aiInsights: true,
                  security: true
                }
              }
            }),
            ...(updates.preferences.theme && { darkMode: updates.preferences.theme === 'dark' })
          }
        })
      };
      
      const response = await authService.updateProfile(profileUpdates);
      
      if (response.success && response.data) {
        setUser(response.data);
        return true;
      } else {
        setError(response.error || 'Profile update failed');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Profile update failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return {
    user,
    isLoading,
    isAuthenticated,
    error,
    login,
    register,
    logout,
    resetPassword,
    updateProfile,
    clearError,
    checkAuthStatus,
  };
};