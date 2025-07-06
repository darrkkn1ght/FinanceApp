// Authentication and user-related types
export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName?: string;
    avatar?: string;
    phone?: string;
    dateOfBirth?: string;
    address?: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    preferences: UserPreferences;
    financialProfile?: {
      monthlyIncome: number;
      monthlyExpenses: number;
      riskTolerance: string;
      investmentGoals: string[];
      employmentStatus: string;
      occupation: string;
      employer: string;
      creditScore: number;
      creditScoreDate: string;
    };
    accounts?: any[];
    budgets?: any[];
    goals?: any[];
    achievements?: any[];
    createdAt: string;
    updatedAt: string;
    lastLoginAt?: string;
    isVerified?: boolean;
    isActive?: boolean;
    subscriptionPlan?: string;
    subscriptionExpiry?: string;
  }
  
  export interface UserPreferences {
    currency: string;
    language: string;
    timezone: string;
    notifications: NotificationSettings;
    theme: 'light' | 'dark' | 'system';
    privacy: PrivacySettings;
  }
  
  export interface NotificationSettings {
    email: boolean;
    push: boolean;
    sms: boolean;
    budget: boolean;
    goals: boolean;
    investments: boolean;
    transactions: boolean;
  }
  
  export interface PrivacySettings {
    shareData: boolean;
    analytics: boolean;
    marketing: boolean;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    accessToken: string | null;
    refreshToken: string | null;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
    rememberMe?: boolean;
  }
  
  export interface RegisterCredentials {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    acceptTerms: boolean;
  }
  
  export interface AuthResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }
  
  export interface PasswordResetRequest {
    email: string;
  }
  
  export interface PasswordResetConfirm {
    token: string;
    newPassword: string;
    confirmPassword: string;
  }
  
  export interface BiometricAuthResult {
    success: boolean;
    error?: string;
    biometryType?: 'FaceID' | 'TouchID' | 'Fingerprint';
  }
  
  export interface OnboardingStep {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    required: boolean;
  }
  
  export interface OnboardingData {
    steps: OnboardingStep[];
    currentStep: number;
    totalSteps: number;
    completed: boolean;
  }
  
  export interface SecuritySettings {
    lastPasswordChange: string;
    loginAttempts: number;
    lastLoginDate: string;
    activeDevices: AuthDevice[];
  }
  
  export interface AuthDevice {
    id: string;
    deviceName: string;
    deviceType: 'mobile' | 'desktop' | 'tablet';
    lastUsed: string;
    location?: string;
    isCurrent: boolean;
  }
  
  export interface AuthError {
    code: string;
    message: string;
    details?: Record<string, any>;
  }
  
  // Service response types
  export interface AuthServiceResponse<T> {
    data: T;
    success: boolean;
    error?: AuthError;
  }
  
  // Navigation types for auth flow
  export interface AuthNavigationProps {
    navigation: any;
    route: any;
  }
  
  export interface WelcomeScreenProps extends AuthNavigationProps {}
  export interface LoginScreenProps extends AuthNavigationProps {}
  export interface RegisterScreenProps extends AuthNavigationProps {}
  export interface OnboardingScreenProps extends AuthNavigationProps {}
  
  // Hook return types
  export interface UseAuthReturn {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (credentials: LoginCredentials) => Promise<AuthServiceResponse<AuthResponse>>;
    register: (credentials: RegisterCredentials) => Promise<AuthServiceResponse<AuthResponse>>;
    logout: () => Promise<void>;
    refreshToken: () => Promise<AuthServiceResponse<AuthResponse>>;
    resetPassword: (email: string) => Promise<AuthServiceResponse<void>>;
    updateProfile: (updates: Partial<User>) => Promise<AuthServiceResponse<User>>;
    enableBiometric: () => Promise<AuthServiceResponse<BiometricAuthResult>>;
    authenticateWithBiometric: () => Promise<AuthServiceResponse<BiometricAuthResult>>;
  }