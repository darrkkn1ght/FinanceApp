// src/constants/Config.ts
export const Config = {
    // App Information
    app: {
      name: 'FinanceApp',
      version: '1.0.0',
      buildNumber: 1,
      bundleId: 'com.financeapp.mobile',
    },
    
    // API Configuration
    api: {
      baseUrl: __DEV__ ? 'http://localhost:3000/api' : 'https://api.financeapp.com',
      timeout: 30000, // 30 seconds
      retryAttempts: 3,
      retryDelay: 1000, // 1 second
    },
    
    // Environment Configuration
    environment: {
      isDevelopment: __DEV__,
      isProduction: !__DEV__,
      enableLogging: __DEV__,
      enableMockData: __DEV__,
    },
    
    // Feature Flags
    features: {
      enableAICoach: true,
      enableInvestmentTracking: true,
      enableBudgetGoals: true,
      enableNotifications: true,
      enableBiometricAuth: true,
      enableDarkMode: false, // Future implementation
      enableMultiCurrency: true,
      enableBankSync: false, // Future implementation
      enableCategoryCustomization: true,
      enableDataExport: true,
    },
    
    // Storage Configuration
    storage: {
      userPreferences: 'userPreferences',
      authToken: 'authToken',
      biometricEnabled: 'biometricEnabled',
      onboardingCompleted: 'onboardingCompleted',
      themeMode: 'themeMode',
      language: 'language',
      currency: 'currency',
      notificationSettings: 'notificationSettings',
    },
    
    // Security Configuration
    security: {
      biometricPrompt: 'Use your biometric to access your financial data',
      sessionTimeout: 900000, // 15 minutes in milliseconds
      maxFailedAttempts: 5,
      lockoutDuration: 300000, // 5 minutes in milliseconds
    },
    
    // Notification Configuration
    notifications: {
      budgetAlertThreshold: 0.8, // 80% of budget
      lowBalanceThreshold: 100, // Alert when account balance is below $100
      reminderFrequency: 'daily', // daily, weekly, monthly
      enablePushNotifications: true,
      enableEmailNotifications: true,
    },
    
    // Chart Configuration
    charts: {
      defaultTimeRange: '30d', // 7d, 30d, 90d, 1y, all
      animationDuration: 300,
      colors: {
        primary: '#2E7D32',
        secondary: '#1976D2',
        accent: '#FF9800',
        success: '#4CAF50',
        error: '#F44336',
        warning: '#FF9800',
      },
    },
    
    // Pagination Configuration
    pagination: {
      transactionsPerPage: 20,
      investmentsPerPage: 10,
      notificationsPerPage: 15,
    },
    
    // Currency Configuration
    currency: {
      default: 'USD',
      supported: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'NGN'],
      format: {
        style: 'currency',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
    
    // Date Configuration
    date: {
      format: 'YYYY-MM-DD',
      displayFormat: 'MMM DD, YYYY',
      timeFormat: 'HH:mm',
      locale: 'en-US',
    },
    
    // Validation Rules
    validation: {
      email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address',
      },
      password: {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        message: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character',
      },
      transaction: {
        minAmount: 0.01,
        maxAmount: 1000000,
        descriptionMaxLength: 200,
      },
      budget: {
        minAmount: 1,
        maxAmount: 1000000,
      },
    },
    
    // AI Configuration
    ai: {
      maxChatHistory: 50,
      responseTimeout: 10000, // 10 seconds
      enableAutoSuggestions: true,
      insightRefreshInterval: 3600000, // 1 hour in milliseconds
    },
    
    // Investment Configuration
    investment: {
      refreshInterval: 60000, // 1 minute in milliseconds
      supportedAssets: ['stocks', 'bonds', 'crypto', 'mutual_funds', 'etf', 'real_estate'],
      riskLevels: ['conservative', 'moderate', 'aggressive'],
    },
    
    // Budget Configuration
    budget: {
      defaultCategories: [
        'dining',
        'shopping',
        'transportation',
        'entertainment',
        'utilities',
        'healthcare',
        'education',
        'travel',
        'groceries',
        'other',
      ],
      alertThresholds: [0.5, 0.8, 0.9, 1.0], // 50%, 80%, 90%, 100%
      rolloverPeriod: 'monthly', // weekly, monthly, yearly
    },
    
    // Goal Configuration
    goals: {
      types: ['savings', 'debt_payoff', 'investment', 'purchase'],
      minAmount: 1,
      maxAmount: 10000000,
      minTimeframe: 1, // 1 month
      maxTimeframe: 600, // 50 years
    },
    
    // Performance Configuration
    performance: {
      imageQuality: 0.8,
      cacheSize: 50, // MB
      maxConcurrentRequests: 5,
      debounceDelay: 300, // milliseconds
    },
    
    // Error Handling
    errors: {
      maxRetries: 3,
      retryDelay: 1000, // milliseconds
      enableCrashReporting: !__DEV__,
      enablePerformanceMonitoring: !__DEV__,
    },
    
    // Social Features (Future implementation)
    social: {
      enableSharing: false,
      enableCommunity: false,
      enableComparisons: false,
    },
    
    // Accessibility
    accessibility: {
      enableVoiceOver: true,
      enableLargeText: true,
      enableHighContrast: true,
      minimumTouchTarget: 44, // pixels
    },
    
    // Analytics Configuration
    analytics: {
      enableTracking: !__DEV__,
      trackingId: 'UA-XXXXXXXXX-X',
      enableCrashlytics: !__DEV__,
      enablePerformanceTracking: !__DEV__,
    },
    
    // Deep Linking
    deepLinking: {
      scheme: 'financeapp',
      host: 'app.financeapp.com',
      prefixes: ['https://app.financeapp.com', 'financeapp://'],
    },
    
    // Biometric Authentication
    biometric: {
      enableFaceID: true,
      enableTouchID: true,
      enableAndroidBiometric: true,
      fallbackToPasscode: true,
      promptMessage: 'Authenticate to access your financial data',
    },
  } as const;
  
  export type CurrencyCode = typeof Config.currency.supported[number];
  export type AssetType = typeof Config.investment.supportedAssets[number];
  export type RiskLevel = typeof Config.investment.riskLevels[number];
  export type BudgetCategory = typeof Config.budget.defaultCategories[number];
  export type GoalType = typeof Config.goals.types[number];