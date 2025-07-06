// Navigation type definitions for the Finance App

import React from 'react';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

// Root Stack Parameter List
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Onboarding: undefined;
};

// Auth Stack Parameter List
export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Onboarding: undefined;
  ForgotPassword: undefined;
  ResetPassword: {
    email: string;
    token: string;
  };
};

// Main Tab Parameter List
export type MainTabParamList = {
  Dashboard: undefined;
  Transactions: undefined;
  Analytics: undefined;
  Investments: undefined;
  AICoach: undefined;
};

// Dashboard Stack Parameter List
export type DashboardStackParamList = {
  DashboardHome: undefined;
  QuickAdd: undefined;
  AccountDetails: {
    accountId: string;
    accountName: string;
  };
  NotificationCenter: undefined;
};

// Transactions Stack Parameter List
export type TransactionsStackParamList = {
  TransactionsList: undefined;
  TransactionDetails: {
    transactionId: string;
  };
  AddTransaction: undefined;
  EditTransaction: {
    transactionId: string;
  };
  CategoryManagement: undefined;
  TransactionSearch: undefined;
  TransactionFilters: undefined;
  BulkActions: {
    selectedTransactions: string[];
  };
};

// Analytics Stack Parameter List
export type AnalyticsStackParamList = {
  AnalyticsHome: undefined;
  SpendingAnalysis: {
    period?: 'week' | 'month' | 'quarter' | 'year';
    category?: string;
  };
  IncomeAnalysis: {
    period?: 'week' | 'month' | 'quarter' | 'year';
  };
  TrendAnalysis: {
    type: 'spending' | 'income' | 'saving';
  };
  CustomReport: undefined;
  ReportDetails: {
    reportId: string;
    reportType: string;
  };
  BudgetAnalysis: undefined;
  GoalProgress: undefined;
};

// Investments Stack Parameter List
export type InvestmentsStackParamList = {
  InvestmentsList: undefined;
  InvestmentDetails: {
    investmentId: string;
    investmentName: string;
  };
  AddInvestment: undefined;
  EditInvestment: {
    investmentId: string;
  };
  PortfolioOverview: undefined;
  MarketData: undefined;
  InvestmentAnalysis: {
    investmentId?: string;
  };
  WatchList: undefined;
  InvestmentNews: undefined;
};

// AI Coach Stack Parameter List
export type AICoachStackParamList = {
  AICoachHome: undefined;
  ChatInterface: {
    sessionId?: string;
    topic?: string;
  };
  InsightDetails: {
    insightId: string;
    insightType: string;
  };
  RecommendationDetails: {
    recommendationId: string;
  };
  CoachingSession: {
    sessionId: string;
    coachId: string;
  };
  AISettings: undefined;
  PersonalizedPlan: undefined;
  ProgressTracking: undefined;
};

// Finance Stack Parameter List (for budget, goals, etc.)
export type FinanceStackParamList = {
  BudgetScreen: undefined;
  BudgetDetails: {
    budgetId: string;
    budgetName: string;
  };
  CreateBudget: undefined;
  EditBudget: {
    budgetId: string;
  };
  GoalsScreen: undefined;
  GoalDetails: {
    goalId: string;
    goalName: string;
  };
  CreateGoal: undefined;
  EditGoal: {
    goalId: string;
  };
  DebtTracker: undefined;
  BillReminders: undefined;
  RecurringTransactions: undefined;
};

// Settings Stack Parameter List
export type SettingsStackParamList = {
  SettingsHome: undefined;
  ProfileScreen: undefined;
  EditProfile: undefined;
  SecurityScreen: undefined;
  ChangePassword: undefined;
  BiometricSettings: undefined;
  NotificationsScreen: undefined;
  PrivacySettings: undefined;
  DataExport: undefined;
  HelpCenter: undefined;
  ContactSupport: undefined;
  About: undefined;
  LegalDocuments: {
    documentType: 'privacy' | 'terms' | 'licenses';
  };
};

// Modal Stack Parameter List
export type ModalStackParamList = {
  TransactionModal: {
    mode: 'add' | 'edit';
    transactionId?: string;
  };
  BudgetModal: {
    mode: 'add' | 'edit';
    budgetId?: string;
  };
  GoalModal: {
    mode: 'add' | 'edit';
    goalId?: string;
  };
  InvestmentModal: {
    mode: 'add' | 'edit';
    investmentId?: string;
  };
  CategoryModal: {
    mode: 'add' | 'edit';
    categoryId?: string;
  };
  ConfirmationModal: {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel?: () => void;
  };
};

// Main Stack Parameter List for MainNavigator
export type MainStackParamList = {
  HomeTabs: undefined;
  AddTransaction: undefined;
  TransactionDetails: { transactionId: string };
  Budget: undefined;
  Goals: undefined;
  Settings: undefined;
  Profile: undefined;
  Security: undefined;
  Notifications: undefined;
};

// Tab Stack Parameter List for TabNavigator
export type TabStackParamList = {
  Dashboard: undefined;
  Transactions: undefined;
  Analytics: undefined;
  Investments: undefined;
  AICoach: undefined;
};

// Navigation Prop Types
export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;
export type AuthStackNavigationProp = StackNavigationProp<AuthStackParamList>;
export type MainTabNavigationProp = BottomTabNavigationProp<MainTabParamList>;
export type DashboardStackNavigationProp = StackNavigationProp<DashboardStackParamList>;
export type TransactionsStackNavigationProp = StackNavigationProp<TransactionsStackParamList>;
export type AnalyticsStackNavigationProp = StackNavigationProp<AnalyticsStackParamList>;
export type InvestmentsStackNavigationProp = StackNavigationProp<InvestmentsStackParamList>;
export type AICoachStackNavigationProp = StackNavigationProp<AICoachStackParamList>;
export type FinanceStackNavigationProp = StackNavigationProp<FinanceStackParamList>;
export type SettingsStackNavigationProp = StackNavigationProp<SettingsStackParamList>;
export type ModalStackNavigationProp = StackNavigationProp<ModalStackParamList>;

// Route Prop Types
export type RootStackRouteProp<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;
export type AuthStackRouteProp<T extends keyof AuthStackParamList> = RouteProp<AuthStackParamList, T>;
export type MainTabRouteProp<T extends keyof MainTabParamList> = RouteProp<MainTabParamList, T>;
export type DashboardStackRouteProp<T extends keyof DashboardStackParamList> = RouteProp<DashboardStackParamList, T>;
export type TransactionsStackRouteProp<T extends keyof TransactionsStackParamList> = RouteProp<TransactionsStackParamList, T>;
export type AnalyticsStackRouteProp<T extends keyof AnalyticsStackParamList> = RouteProp<AnalyticsStackParamList, T>;
export type InvestmentsStackRouteProp<T extends keyof InvestmentsStackParamList> = RouteProp<InvestmentsStackParamList, T>;
export type AICoachStackRouteProp<T extends keyof AICoachStackParamList> = RouteProp<AICoachStackParamList, T>;
export type FinanceStackRouteProp<T extends keyof FinanceStackParamList> = RouteProp<FinanceStackParamList, T>;
export type SettingsStackRouteProp<T extends keyof SettingsStackParamList> = RouteProp<SettingsStackParamList, T>;
export type ModalStackRouteProp<T extends keyof ModalStackParamList> = RouteProp<ModalStackParamList, T>;

// Combined Navigation Props for Screens
export interface DashboardScreenNavigationProps {
  navigation: DashboardStackNavigationProp;
  route: DashboardStackRouteProp<'DashboardHome'>;
}

export interface TransactionDetailsScreenNavigationProps {
  navigation: TransactionsStackNavigationProp;
  route: TransactionsStackRouteProp<'TransactionDetails'>;
}

export interface AddTransactionScreenNavigationProps {
  navigation: TransactionsStackNavigationProp;
  route: TransactionsStackRouteProp<'AddTransaction'>;
}

export interface InvestmentDetailsScreenNavigationProps {
  navigation: InvestmentsStackNavigationProp;
  route: InvestmentsStackRouteProp<'InvestmentDetails'>;
}

export interface ChatInterfaceScreenNavigationProps {
  navigation: AICoachStackNavigationProp;
  route: AICoachStackRouteProp<'ChatInterface'>;
}

export interface BudgetDetailsScreenNavigationProps {
  navigation: FinanceStackNavigationProp;
  route: FinanceStackRouteProp<'BudgetDetails'>;
}

export interface GoalDetailsScreenNavigationProps {
  navigation: FinanceStackNavigationProp;
  route: FinanceStackRouteProp<'GoalDetails'>;
}

// Generic Navigation Props
export interface NavigationProps<
  T extends NavigationProp<Record<string, object | undefined>>,
  R extends RouteProp<Record<string, object | undefined>, string>
> {
  navigation: T;
  route: R;
}

// Screen Component Type Helper
export type ScreenComponent<
  T extends NavigationProp<Record<string, object | undefined>>,
  R extends RouteProp<Record<string, object | undefined>, string>
> = React.FC<NavigationProps<T, R>>;

