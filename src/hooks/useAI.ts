// src/hooks/useAI.ts
import { useState, useEffect, useCallback } from 'react';
import { aiService } from '../services/api/aiService';
import { AIInsight, AIRecommendation, ChatMessage } from '../types/ai';
import { Transaction } from '../types/transaction';
import { BudgetGoal } from '../types/budget';

interface AIState {
  insights: AIInsight[];
  recommendations: AIRecommendation[];
  chatHistory: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  isTyping: boolean;
  financialScore: number;
  spendingPatterns: {
    category: string;
    trend: 'increasing' | 'decreasing' | 'stable';
    change: number;
  }[];
  budgetAlerts: {
    category: string;
    severity: 'low' | 'medium' | 'high';
    message: string;
  }[];
  goalProgress: {
    goalId: string;
    progress: number;
    timeRemaining: number;
    onTrack: boolean;
  }[];
}

interface AIActions {
  loadInsights: () => Promise<void>;
  loadRecommendations: () => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
  generateBudgetSuggestions: (income: number, expenses: number[]) => Promise<AIRecommendation[]>;
  analyzeSpendingPatterns: (transactions: Transaction[]) => Promise<void>;
  getInvestmentAdvice: (riskTolerance: string, timeline: string) => Promise<AIRecommendation[]>;
  optimizePortfolio: (currentHoldings: Transaction[]) => Promise<AIRecommendation[]>;
  predictFutureSpending: (category: string, months: number) => Promise<number[]>;
  generateGoalStrategy: (goal: BudgetGoal) => Promise<AIRecommendation>;
  clearChatHistory: () => void;
  clearError: () => void;
  refreshFinancialScore: () => Promise<void>;
}

export const useAI = (): AIState & AIActions => {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [financialScore, setFinancialScore] = useState(0);
  const [spendingPatterns, setSpendingPatterns] = useState<{
    category: string;
    trend: 'increasing' | 'decreasing' | 'stable';
    change: number;
  }[]>([]);
  const [budgetAlerts, setBudgetAlerts] = useState<{
    category: string;
    severity: 'low' | 'medium' | 'high';
    message: string;
  }[]>([]);
  const [goalProgress, setGoalProgress] = useState<{
    goalId: string;
    progress: number;
    timeRemaining: number;
    onTrack: boolean;
  }[]>([]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const loadInsights = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await aiService.getInsights();
      
      if (response.success && response.data) {
        setInsights(response.data);
      } else {
        setError(response.error || 'Failed to load insights');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load insights');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadRecommendations = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await aiService.getRecommendations();
      
      if (response.success && response.data) {
        setRecommendations(response.data);
      } else {
        setError(response.error || 'Failed to load recommendations');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load recommendations');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendMessage = useCallback(async (message: string) => {
    try {
      setIsTyping(true);
      setError(null);
      
      // Add user message to chat history
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: message,
        timestamp: new Date().toISOString(),
      };
      
      setChatHistory(prev => [...prev, userMessage]);
      
      const response = await aiService.sendChatMessage(message);
      
      if (response.success && response.data) {
        setChatHistory(prev => [...prev, response.data!]);
      } else {
        setError(response.error || 'Failed to send message');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setIsTyping(false);
    }
  }, []);

  const generateBudgetSuggestions = useCallback(async (income: number, expenses: number[]): Promise<AIRecommendation[]> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await aiService.generateBudgetSuggestions(income, expenses);
      
      if (response.success && response.data) {
        return response.data;
      } else {
        setError(response.error || 'Failed to generate budget suggestions');
        return [];
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate budget suggestions');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const analyzeSpendingPatterns = useCallback(async (transactions: Transaction[]) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await aiService.analyzeSpendingPatterns(transactions);
      
      if (response.success && response.data) {
        setSpendingPatterns(response.data.patterns);
        setBudgetAlerts(response.data.alerts);
      } else {
        setError(response.error || 'Failed to analyze spending patterns');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze spending patterns');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getInvestmentAdvice = useCallback(async (riskTolerance: string, timeline: string): Promise<AIRecommendation[]> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await aiService.getInvestmentAdvice(riskTolerance, timeline);
      
      if (response.success && response.data) {
        return response.data;
      } else {
        setError(response.error || 'Failed to get investment advice');
        return [];
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get investment advice');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const optimizePortfolio = useCallback(async (currentHoldings: Transaction[]): Promise<AIRecommendation[]> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await aiService.optimizePortfolio(currentHoldings);
      
      if (response.success && response.data) {
        return response.data;
      } else {
        setError(response.error || 'Failed to optimize portfolio');
        return [];
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to optimize portfolio');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const predictFutureSpending = useCallback(async (category: string, months: number): Promise<number[]> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await aiService.predictFutureSpending(category, months);
      
      if (response.success && response.data) {
        return response.data;
      } else {
        setError(response.error || 'Failed to predict future spending');
        return [];
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to predict future spending');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateGoalStrategy = useCallback(async (goal: BudgetGoal): Promise<AIRecommendation> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await aiService.generateGoalStrategy(goal);
      
      if (response.success && response.data) {
        return response.data;
      } else {
        setError(response.error || 'Failed to generate goal strategy');
        throw new Error(response.error || 'Failed to generate goal strategy');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate goal strategy');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearChatHistory = useCallback(() => {
    setChatHistory([]);
  }, []);

  const refreshFinancialScore = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await aiService.getFinancialScore();
      
      if (response.success && response.data) {
        setFinancialScore(response.data.score);
        setGoalProgress(response.data.goalProgress);
      } else {
        setError(response.error || 'Failed to refresh financial score');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh financial score');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInsights();
    loadRecommendations();
    refreshFinancialScore();
  }, [loadInsights, loadRecommendations, refreshFinancialScore]);

  // Auto-refresh insights every 5 minutes
  useEffect(() => {
    const interval = globalThis.setInterval(() => {
      loadInsights();
      loadRecommendations();
    }, 300000); // 5 minutes

    return () => globalThis.clearInterval(interval);
  }, [loadInsights, loadRecommendations]);

  return {
    insights,
    recommendations,
    chatHistory,
    isLoading,
    error,
    isTyping,
    financialScore,
    spendingPatterns,
    budgetAlerts,
    goalProgress,
    loadInsights,
    loadRecommendations,
    sendMessage,
    generateBudgetSuggestions,
    analyzeSpendingPatterns,
    getInvestmentAdvice,
    optimizePortfolio,
    predictFutureSpending,
    generateGoalStrategy,
    clearChatHistory,
    clearError,
    refreshFinancialScore,
  };
};