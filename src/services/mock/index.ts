// Mock Data Services - Central Export
export { mockTransactions } from './mockTransactions';
export { mockInvestments } from './mockInvestments';
export { mockUserData } from './mockUserData';
export { mockAIInsights } from './mockAIInsights';

// Re-export types for convenience
export type { Transaction } from '../../types/transaction';
export type { Investment } from '../../types/investment';
export type { User } from '../../types/auth';
export type { AIInsight } from '../../types/ai';