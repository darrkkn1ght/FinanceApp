// Auth Screens
export { WelcomeScreen } from './auth/WelcomeScreen';
export { LoginScreen } from './auth/LoginScreen';
export { RegisterScreen } from './auth/RegisterScreen';
export { OnboardingScreen } from './auth/OnboardingScreen';

// Main Screens
export { DashboardScreen } from './main/DashboardScreen';
export { TransactionsScreen } from './main/TransactionsScreen';
export { AnalyticsScreen } from './main/AnalyticsScreen';
export { InvestmentsScreen } from './main/InvestmentsScreen';
export { AICoachScreen } from './main/AICoachScreen';

// Finance Screens
export { BudgetScreen } from './finance/BudgetScreen';
export { GoalsScreen } from './finance/GoalsScreen';
export { AddTransactionScreen } from './finance/AddTransactionScreen';
export { TransactionDetailsScreen } from './finance/TransactionDetailsScreen';

// Settings Screens
export { SettingsScreen } from './settings/SettingsScreen';
export { ProfileScreen } from './settings/ProfileScreen';
export { SecurityScreen } from './settings/SecurityScreen';
export { NotificationsScreen } from './settings/NotificationsScreen';

// Re-export auth screens as a group
export * from './auth';

// Re-export main screens as a group
export * from './main';

// Re-export finance screens as a group
export * from './finance';

// Re-export settings screens as a group
export * from './settings';