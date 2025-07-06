// Main types export file - aggregates all type definitions
export * from './auth';
export * from './transaction';
export * from './investment';
export * from './budget';
export * from './ai';
export * from './navigation';

// Common utility types
export interface ServiceResponse<T> {
  data: T;
  success: boolean;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  success: boolean;
  error?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: string;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

export interface FormValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface FormState<T> {
  values: T;
  errors: Record<keyof T, string>;
  touched: Record<keyof T, boolean>;
  isValid: boolean;
  isSubmitting: boolean;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface AmountRange {
  min: number;
  max: number;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

export interface FilterOptions {
  dateRange?: DateRange;
  amountRange?: AmountRange;
  categories?: string[];
  tags?: string[];
  searchText?: string;
}

// Theme and styling types
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  warning: string;
  success: string;
  info: string;
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface ThemeTypography {
  h1: {
    fontSize: number;
    fontWeight: string;
    lineHeight: number;
  };
  h2: {
    fontSize: number;
    fontWeight: string;
    lineHeight: number;
  };
  h3: {
    fontSize: number;
    fontWeight: string;
    lineHeight: number;
  };
  body1: {
    fontSize: number;
    fontWeight: string;
    lineHeight: number;
  };
  body2: {
    fontSize: number;
    fontWeight: string;
    lineHeight: number;
  };
  caption: {
    fontSize: number;
    fontWeight: string;
    lineHeight: number;
  };
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  borderRadius: number;
  shadows: {
    small: object;
    medium: object;
    large: object;
  };
}

// Component common props
export interface BaseComponentProps {
  style?: any;
  testID?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export interface ButtonProps extends BaseComponentProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  icon?: string;
  iconPosition?: 'left' | 'right';
}

export interface InputProps extends BaseComponentProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  multiline?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoComplete?: string;
  maxLength?: number;
  editable?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
}

export interface CardProps extends BaseComponentProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  onPress?: () => void;
  shadow?: boolean;
  bordered?: boolean;
}

export interface ModalProps extends BaseComponentProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  animationType?: 'slide' | 'fade' | 'none';
  presentationStyle?: 'fullScreen' | 'pageSheet' | 'formSheet' | 'overFullScreen';
  onShow?: () => void;
  onDismiss?: () => void;
}

// Context types
export interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: string;
  setLanguage: (language: string) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  isOnline: boolean;
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
}

export interface AppSettings {
  notifications: boolean;
  biometricAuth: boolean;
  darkMode: boolean;
  autoSync: boolean;
  currency: string;
  language: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
}

// Navigation types (will be extended in navigation.ts)
export interface NavigationProps {
  navigation: any;
  route: any;
}

// Utility types for better type safety
export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Generic hook return types
export interface UseAsyncReturn<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  execute: (...args: any[]) => Promise<T>;
  reset: () => void;
}

export interface UseFormReturn<T> {
  values: T;
  errors: Record<keyof T, string>;
  touched: Record<keyof T, boolean>;
  isValid: boolean;
  isSubmitting: boolean;
  setValue: (field: keyof T, value: any) => void;
  setError: (field: keyof T, error: string) => void;
  setTouched: (field: keyof T, touched: boolean) => void;
  handleSubmit: (onSubmit: (values: T) => void | Promise<void>) => void;
  reset: () => void;
  validate: () => boolean;
}

// Storage types
export interface StorageItem<T> {
  key: string;
  value: T;
  timestamp: number;
  expiry?: number;
}

export interface SecureStorageItem {
  key: string;
  value: string;
  service?: string;
}

// Notification types
export interface NotificationPayload {
  id: string;
  title: string;
  body: string;
  data?: Record<string, any>;
  sound?: string;
  badge?: number;
  category?: string;
  scheduled?: boolean;
  scheduledTime?: string;
}

export interface NotificationSettings {
  enabled: boolean;
  sound: boolean;
  badge: boolean;
  alert: boolean;
  types: {
    transaction: boolean;
    budget: boolean;
    investment: boolean;
    aiInsights: boolean;
    security: boolean;
  };
}