// src/services/api/authService.ts
declare const __DEV__: boolean;

import { mockUserData } from '../mock/mockUserData';
import { User, ServiceResponse, NotificationSettings } from '../../types';

// Simple delay function without setTimeout
const delay = (ms: number) => new Promise(resolve => {
  const start = Date.now();
  while (Date.now() - start < ms) {
    // Busy wait - simple alternative to setTimeout
  }
  resolve(undefined);
});

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  dateOfBirth?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresAt: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  avatar?: string;
  preferences?: {
    currency?: string;
    language?: string;
    notifications?: NotificationSettings;
    darkMode?: boolean;
  };
}

export interface VerifyEmailRequest {
  email: string;
  verificationCode: string;
}

class AuthService {
  private useMockData = __DEV__;
  private mockToken = 'mock_jwt_token_123456789';
  private mockRefreshToken = 'mock_refresh_token_987654321';

  async login(credentials: LoginRequest): Promise<ServiceResponse<AuthResponse>> {
    try {
      if (this.useMockData) {
        // Simulate network delay
        await delay(1000);

        // Mock validation
        if (!credentials.email || !credentials.password) {
          throw new Error('Email and password are required');
        }

        if (!credentials.email.includes('@')) {
          throw new Error('Invalid email format');
        }

        if (credentials.password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }

        // Mock successful login
        const authResponse: AuthResponse = {
          user: mockUserData,
          token: this.mockToken,
          refreshToken: this.mockRefreshToken,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
        };

        return {
          data: authResponse,
          success: true
        };
      }
      
      // Real API call will go here later
      throw new Error('Real API not implemented yet');
    } catch (error) {
      return {
        data: {} as AuthResponse,
        success: false,
        error: error instanceof Error ? error.message : 'Login failed'
      };
    }
  }

  async register(userData: RegisterRequest): Promise<ServiceResponse<AuthResponse>> {
    try {
      if (this.useMockData) {
        // Simulate network delay
        await delay(1200);

        // Mock validation
        if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
          throw new Error('All required fields must be provided');
        }

        if (!userData.email.includes('@')) {
          throw new Error('Invalid email format');
        }

        if (userData.password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }

        // Mock user creation
        const newUser: User = {
          id: `user_${Date.now()}`,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phoneNumber,
          dateOfBirth: userData.dateOfBirth,
          avatar: undefined,
          isVerified: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          preferences: {
            currency: 'USD',
            language: 'en',
            timezone: 'America/Los_Angeles',
            notifications: {
              email: true,
              push: true,
              sms: false,
              budget: true,
              goals: true,
              investments: true,
              transactions: true
            },
            theme: 'light',
            privacy: {
              shareData: false,
              analytics: true,
              marketing: false
            }
          }
        };

        const authResponse: AuthResponse = {
          user: newUser,
          token: this.mockToken,
          refreshToken: this.mockRefreshToken,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        };

        return {
          data: authResponse,
          success: true
        };
      }
      
      // Real API call will go here later
      throw new Error('Real API not implemented yet');
    } catch (error) {
      return {
        data: {} as AuthResponse,
        success: false,
        error: error instanceof Error ? error.message : 'Registration failed'
      };
    }
  }

  async logout(): Promise<ServiceResponse<boolean>> {
    try {
      if (this.useMockData) {
        // Simulate network delay
        await delay(500);

        // Mock logout success
        return {
          data: true,
          success: true
        };
      }
      
      // Real API call will go here later
      throw new Error('Real API not implemented yet');
    } catch (error) {
      return {
        data: false,
        success: false,
        error: error instanceof Error ? error.message : 'Logout failed'
      };
    }
  }

  async refreshToken(refreshToken: string): Promise<ServiceResponse<AuthResponse>> {
    try {
      if (this.useMockData) {
        // Simulate network delay
        await delay(300);

        if (!refreshToken || refreshToken !== this.mockRefreshToken) {
          throw new Error('Invalid refresh token');
        }

        const authResponse: AuthResponse = {
          user: mockUserData,
          token: this.mockToken,
          refreshToken: this.mockRefreshToken,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        };

        return {
          data: authResponse,
          success: true
        };
      }
      
      // Real API call will go here later
      throw new Error('Real API not implemented yet');
    } catch (error) {
      return {
        data: {} as AuthResponse,
        success: false,
        error: error instanceof Error ? error.message : 'Token refresh failed'
      };
    }
  }

  async resetPassword(request: ResetPasswordRequest): Promise<ServiceResponse<boolean>> {
    try {
      if (this.useMockData) {
        // Simulate network delay
        await delay(800);

        if (!request.email || !request.email.includes('@')) {
          throw new Error('Valid email is required');
        }

        // Mock password reset email sent
        return {
          data: true,
          success: true
        };
      }
      
      // Real API call will go here later
      throw new Error('Real API not implemented yet');
    } catch (error) {
      return {
        data: false,
        success: false,
        error: error instanceof Error ? error.message : 'Password reset failed'
      };
    }
  }

  async changePassword(request: ChangePasswordRequest): Promise<ServiceResponse<boolean>> {
    try {
      if (this.useMockData) {
        // Simulate network delay
        await delay(600);

        if (!request.currentPassword || !request.newPassword) {
          throw new Error('Current and new passwords are required');
        }

        if (request.newPassword.length < 6) {
          throw new Error('New password must be at least 6 characters');
        }

        if (request.currentPassword === request.newPassword) {
          throw new Error('New password must be different from current password');
        }

        // Mock password change success
        return {
          data: true,
          success: true
        };
      }
      
      // Real API call will go here later
      throw new Error('Real API not implemented yet');
    } catch (error) {
      return {
        data: false,
        success: false,
        error: error instanceof Error ? error.message : 'Password change failed'
      };
    }
  }

  async updateProfile(updates: UpdateProfileRequest): Promise<ServiceResponse<User>> {
    try {
      if (this.useMockData) {
        // Simulate network delay
        await delay(700);

        const updatedUser: User = {
          ...mockUserData,
          ...updates,
          preferences: {
            ...mockUserData.preferences,
            ...(updates.preferences && {
              currency: updates.preferences.currency,
              language: updates.preferences.language,
              ...(updates.preferences.notifications && { 
                notifications: {
                  ...mockUserData.preferences.notifications,
                  ...updates.preferences.notifications
                }
              }),
              theme: updates.preferences.darkMode ? 'dark' : mockUserData.preferences.theme
            })
          },
          updatedAt: new Date().toISOString()
        };

        return {
          data: updatedUser,
          success: true
        };
      }
      
      // Real API call will go here later
      throw new Error('Real API not implemented yet');
    } catch (error) {
      return {
        data: {} as User,
        success: false,
        error: error instanceof Error ? error.message : 'Profile update failed'
      };
    }
  }

  async verifyEmail(request: VerifyEmailRequest): Promise<ServiceResponse<boolean>> {
    try {
      if (this.useMockData) {
        // Simulate network delay
        await delay(500);

        if (!request.email || !request.verificationCode) {
          throw new Error('Email and verification code are required');
        }

        if (request.verificationCode.length !== 6) {
          throw new Error('Verification code must be 6 digits');
        }

        // Mock email verification success
        return {
          data: true,
          success: true
        };
      }
      
      // Real API call will go here later
      throw new Error('Real API not implemented yet');
    } catch (error) {
      return {
        data: false,
        success: false,
        error: error instanceof Error ? error.message : 'Email verification failed'
      };
    }
  }

  async resendVerificationEmail(email: string): Promise<ServiceResponse<boolean>> {
    try {
      if (this.useMockData) {
        // Simulate network delay
        await delay(400);

        if (!email || !email.includes('@')) {
          throw new Error('Valid email is required');
        }

        // Mock verification email sent
        return {
          data: true,
          success: true
        };
      }
      
      // Real API call will go here later
      throw new Error('Real API not implemented yet');
    } catch (error) {
      return {
        data: false,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to resend verification email'
      };
    }
  }

  async getCurrentUser(): Promise<ServiceResponse<User>> {
    try {
      if (this.useMockData) {
        // Simulate network delay
        await delay(200);

        return {
          data: mockUserData,
          success: true
        };
      }
      
      // Real API call will go here later
      throw new Error('Real API not implemented yet');
    } catch (error) {
      return {
        data: {} as User,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get user data'
      };
    }
  }
}

export const authService = new AuthService();