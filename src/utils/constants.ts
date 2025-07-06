// src/utils/constants.ts

// App Information
export const APP_NAME = 'FinanceApp';
export const APP_VERSION = '1.0.0';
export const APP_BUILD = '1';

// API Configuration
export const API_BASE_URL = __DEV__ 
  ? 'https://api-dev.financeapp.com/v1'
  : 'https://api.financeapp.com/v1';

export const API_TIMEOUT = 10000; // 10 seconds

// Storage Keys
export const STORAGE_KEYS = {
  USER_TOKEN: '@FinanceApp:userToken',
  USER_DATA: '@FinanceApp:userData',
  ONBOARDING_COMPLETED: '@FinanceApp:onboardingCompleted',
  BIOMETRIC_ENABLED: '@FinanceApp:biometricEnabled',
  NOTIFICATIONS_ENABLED: '@FinanceApp:notificationsEnabled',
  THEME_MODE: '@FinanceApp:themeMode',
  CURRENCY_PREFERENCE: '@FinanceApp:currencyPreference',
  LANGUAGE_PREFERENCE: '@FinanceApp:languagePreference',
  LAST_SYNC: '@FinanceApp:lastSync',
  BUDGET_ALERTS: '@FinanceApp:budgetAlerts',
  TRANSACTION_CACHE: '@FinanceApp:transactionCache',
  INVESTMENT_CACHE: '@FinanceApp:investmentCache',
} as const;

// Screen Names
export const SCREEN_NAMES = {
  // Auth Screens
  WELCOME: 'Welcome',
  LOGIN: 'Login',
  REGISTER: 'Register',
  ONBOARDING: 'Onboarding',
  
  // Main Screens
  DASHBOARD: 'Dashboard',
  TRANSACTIONS: 'Transactions',
  ANALYTICS: 'Analytics',
  INVESTMENTS: 'Investments',
  AI_COACH: 'AICoach',
  
  // Finance Screens
  BUDGET: 'Budget',
  GOALS: 'Goals',
  ADD_TRANSACTION: 'AddTransaction',
  TRANSACTION_DETAILS: 'TransactionDetails',
  
  // Settings Screens
  SETTINGS: 'Settings',
  PROFILE: 'Profile',
  SECURITY: 'Security',
  NOTIFICATIONS: 'Notifications',
} as const;

// Transaction Categories
export const TRANSACTION_CATEGORIES = {
  INCOME: {
    salary: 'Salary',
    freelance: 'Freelance',
    investment: 'Investment',
    business: 'Business',
    gift: 'Gift',
    bonus: 'Bonus',
    refund: 'Refund',
    other_income: 'Other Income',
  },
  EXPENSE: {
    food: 'Food & Dining',
    transportation: 'Transportation',
    shopping: 'Shopping',
    entertainment: 'Entertainment',
    bills: 'Bills & Utilities',
    healthcare: 'Healthcare',
    education: 'Education',
    travel: 'Travel',
    home: 'Home & Garden',
    personal: 'Personal Care',
    insurance: 'Insurance',
    taxes: 'Taxes',
    charity: 'Charity',
    other_expense: 'Other Expense',
  },
} as const;

// Investment Types
export const INVESTMENT_TYPES = {
  STOCKS: 'stocks',
  BONDS: 'bonds',
  MUTUAL_FUNDS: 'mutual_funds',
  ETF: 'etf',
  CRYPTO: 'crypto',
  REAL_ESTATE: 'real_estate',
  COMMODITIES: 'commodities',
  SAVINGS: 'savings',
  CD: 'cd',
  OTHER: 'other',
} as const;

// Account Types
export const ACCOUNT_TYPES = {
  CHECKING: 'checking',
  SAVINGS: 'savings',
  CREDIT_CARD: 'credit_card',
  INVESTMENT: 'investment',
  LOAN: 'loan',
  MORTGAGE: 'mortgage',
  OTHER: 'other',
} as const;

// Budget Categories
export const BUDGET_CATEGORIES = {
  NEEDS: 'needs',
  WANTS: 'wants',
  SAVINGS: 'savings',
  DEBT: 'debt',
} as const;

// Goal Types
export const GOAL_TYPES = {
  EMERGENCY_FUND: 'emergency_fund',
  VACATION: 'vacation',
  HOME_PURCHASE: 'home_purchase',
  CAR_PURCHASE: 'car_purchase',
  EDUCATION: 'education',
  RETIREMENT: 'retirement',
  DEBT_PAYOFF: 'debt_payoff',
  INVESTMENT: 'investment',
  OTHER: 'other',
} as const;

// Time Periods
export const TIME_PERIODS = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  YEARLY: 'yearly',
  ALL_TIME: 'all_time',
} as const;

// Chart Types
export const CHART_TYPES = {
  LINE: 'line',
  BAR: 'bar',
  PIE: 'pie',
  DOUGHNUT: 'doughnut',
  AREA: 'area',
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  TRANSACTION_ALERT: 'transaction_alert',
  BUDGET_WARNING: 'budget_warning',
  BUDGET_EXCEEDED: 'budget_exceeded',
  GOAL_MILESTONE: 'goal_milestone',
  BILL_REMINDER: 'bill_reminder',
  INVESTMENT_UPDATE: 'investment_update',
  SECURITY_ALERT: 'security_alert',
  SYSTEM_UPDATE: 'system_update',
} as const;

// Animation Durations
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 800,
} as const;

// Default Values
export const DEFAULT_VALUES = {
  CURRENCY: 'USD',
  LANGUAGE: 'en',
  THEME: 'light',
  DECIMAL_PLACES: 2,
  PAGE_SIZE: 20,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  AUTO_LOGOUT_TIME: 15 * 60 * 1000, // 15 minutes
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 50,
  EMAIL_MAX_LENGTH: 254,
  PHONE_MIN_LENGTH: 10,
  PHONE_MAX_LENGTH: 15,
  TRANSACTION_DESCRIPTION_MAX_LENGTH: 200,
  BUDGET_NAME_MAX_LENGTH: 50,
  GOAL_NAME_MAX_LENGTH: 50,
  ACCOUNT_NAME_MAX_LENGTH: 50,
} as const;

// Regular Expressions
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\+]?[\d\s\-\(\)]{10,}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  ALPHA_NUMERIC: /^[a-zA-Z0-9]+$/,
  NUMBERS_ONLY: /^[0-9]+$/,
  DECIMAL: /^\d+(\.\d{1,2})?$/,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_PHONE: 'Please enter a valid phone number.',
  INVALID_PASSWORD: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character.',
  REQUIRED_FIELD: 'This field is required.',
  INVALID_AMOUNT: 'Please enter a valid amount.',
  BUDGET_EXCEEDED: 'Budget limit exceeded.',
  INSUFFICIENT_FUNDS: 'Insufficient funds.',
  INVALID_DATE: 'Please enter a valid date.',
  SYNC_ERROR: 'Failed to sync data. Please try again.',
  BIOMETRIC_ERROR: 'Biometric authentication failed.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  TRANSACTION_ADDED: 'Transaction added successfully.',
  BUDGET_UPDATED: 'Budget updated successfully.',
  GOAL_CREATED: 'Goal created successfully.',
  PROFILE_UPDATED: 'Profile updated successfully.',
  PASSWORD_CHANGED: 'Password changed successfully.',
  SYNC_COMPLETED: 'Data synchronized successfully.',
  BACKUP_CREATED: 'Backup created successfully.',
  SETTINGS_SAVED: 'Settings saved successfully.',
} as const;

// Feature Flags
export const FEATURE_FLAGS = {
  BIOMETRIC_AUTH: true,
  PUSH_NOTIFICATIONS: true,
  INVESTMENT_TRACKING: true,
  AI_INSIGHTS: true,
  BANK_SYNC: __DEV__ ? false : true,
  EXPORT_DATA: true,
  MULTI_CURRENCY: true,
  DARK_MODE: true,
  OFFLINE_MODE: true,
  ANALYTICS_TRACKING: !__DEV__,
} as const;

// Supported Currencies
export const SUPPORTED_CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
] as const;

// Supported Languages
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
] as const;

// Color Palette for Charts
export const CHART_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
  '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#F7DC6F',
  '#AED6F1', '#A9DFBF', '#F9E79F', '#F5B7B1', '#D2B4DE',
] as const;

// Environment Variables
export const ENV_VARS = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_URL: process.env.EXPO_PUBLIC_API_URL || API_BASE_URL,
  SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN,
  ANALYTICS_KEY: process.env.EXPO_PUBLIC_ANALYTICS_KEY,
  ENCRYPTION_KEY: process.env.EXPO_PUBLIC_ENCRYPTION_KEY,
} as const;

// Deep Linking
export const DEEP_LINK_URLS = {
  SCHEME: 'financeapp',
  DOMAIN: 'financeapp.com',
  PATHS: {
    TRANSACTION: '/transaction',
    BUDGET: '/budget',
    GOAL: '/goal',
    INVESTMENT: '/investment',
    SETTINGS: '/settings',
  },
} as const;

// Limits
export const LIMITS = {
  MAX_TRANSACTIONS_PER_PAGE: 50,
  MAX_BUDGETS: 20,
  MAX_GOALS: 10,
  MAX_ACCOUNTS: 15,
  MAX_CATEGORIES: 50,
  MAX_ATTACHMENT_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_SYNC_RETRIES: 3,
  MAX_OFFLINE_TRANSACTIONS: 100,
} as const;