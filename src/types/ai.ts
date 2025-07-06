// AI-related type definitions for the Finance App

// AI Insight Types
export interface AIInsight {
    id: string;
    type: 'spending' | 'saving' | 'investment' | 'budget' | 'goal' | 'spending_pattern' | 'investment_opportunity' | 'goal_progress' | 'budget_optimization' | 'market_analysis' | 'cashflow_analysis' | 'tax_optimization' | 'subscription_analysis' | 'credit_score' | 'emergency_fund';
    title: string;
    description: string;
    category: string;
    priority: 'low' | 'medium' | 'high';
    confidence: number; // 0-1 scale
    impact: 'low' | 'medium' | 'high';
    actionable: boolean;
    recommendation: {
      action: string;
      details: string;
      potentialSavings: number;
      timeframe: string;
    };
    data: Record<string, unknown>;
    createdAt: string; // ISO date string
    isRead: boolean;
    isActioned: boolean;
    tags: string[];
  }
  
  // AI Recommendation Types
  export interface AIRecommendation {
    id: string;
    type: 'action' | 'alert' | 'tip' | 'optimization';
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    category: string;
    estimatedSavings?: number;
    estimatedTime?: string; // e.g., "5 minutes", "1 week"
    actionItems: string[];
    isCompleted: boolean;
    createdAt: string; // ISO date string
    expiresAt?: string; // ISO date string
    tags: string[];
  }
  
  // AI Chat Types
  export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string; // ISO date string
    context?: {
      relatedTransactions?: string[];
      relatedGoals?: string[];
      relatedBudgets?: string[];
    };
  }
  
  export interface ChatSession {
    id: string;
    title: string;
    messages: ChatMessage[];
    startedAt: string; // ISO date string
    lastActiveAt: string; // ISO date string
    isActive: boolean;
  }
  
  // AI Analysis Types
  export interface SpendingAnalysis {
    period: 'week' | 'month' | 'quarter' | 'year';
    totalSpent: number;
    categoryBreakdown: {
      category: string;
      amount: number;
      percentage: number;
      trend: 'increasing' | 'decreasing' | 'stable';
    }[];
    insights: AIInsight[];
    recommendations: AIRecommendation[];
    comparisonToPrevious: {
      percentageChange: number;
      amountChange: number;
      isImprovement: boolean;
    };
  }
  
  export interface SavingAnalysis {
    period: 'week' | 'month' | 'quarter' | 'year';
    totalSaved: number;
    savingRate: number; // percentage
    savingGoalProgress: {
      goalId: string;
      progress: number; // percentage
      onTrack: boolean;
    }[];
    insights: AIInsight[];
    recommendations: AIRecommendation[];
    projectedSavings: number;
  }
  
  export interface InvestmentAnalysis {
    period: 'week' | 'month' | 'quarter' | 'year';
    totalValue: number;
    totalGainLoss: number;
    totalGainLossPercentage: number;
    portfolioBreakdown: {
      assetType: string;
      value: number;
      percentage: number;
      performance: number;
    }[];
    riskAssessment: {
      level: 'low' | 'medium' | 'high';
      score: number; // 0-100
      factors: string[];
    };
    insights: AIInsight[];
    recommendations: AIRecommendation[];
  }
  
  // AI Coach Types
  export interface AICoach {
    id: string;
    name: string;
    personality: 'supportive' | 'analytical' | 'motivational' | 'conservative';
    specialization: 'budgeting' | 'investing' | 'saving' | 'general';
    avatar: string;
    isActive: boolean;
  }
  
  export interface AICoachSession {
    id: string;
    coachId: string;
    topic: string;
    status: 'active' | 'completed' | 'paused';
    progress: number; // 0-100
    startedAt: string; // ISO date string
    completedAt?: string; // ISO date string
    goals: string[];
    milestones: {
      id: string;
      title: string;
      isCompleted: boolean;
      completedAt?: string;
    }[];
  }
  
  // AI Prediction Types
  export interface FinancialPrediction {
    id: string;
    type: 'expense' | 'income' | 'savings' | 'investment';
    period: 'next_month' | 'next_quarter' | 'next_year';
    predictedAmount: number;
    confidence: number; // 0-1 scale
    factors: string[];
    methodology: string;
    createdAt: string; // ISO date string
    actualAmount?: number; // filled when period completes
    accuracy?: number; // filled when period completes
  }
  
  // AI Service Response Types
  export interface AIServiceResponse<T> {
    data: T;
    success: boolean;
    error?: string;
    processingTime?: number; // milliseconds
    metadata?: {
      dataPointsAnalyzed: number;
      modelVersion: string;
      confidenceScore: number;
    };
  }
  
  // AI Configuration Types
  export interface AIConfig {
    enableInsights: boolean;
    enableRecommendations: boolean;
    enablePredictions: boolean;
    enableChat: boolean;
    insightFrequency: 'daily' | 'weekly' | 'monthly';
    recommendationSensitivity: 'low' | 'medium' | 'high';
    preferredCoachPersonality: 'supportive' | 'analytical' | 'motivational' | 'conservative';
    dataRetentionPeriod: number; // days
    privacyLevel: 'basic' | 'standard' | 'enhanced';
  }
  
  // AI Context Types
  export interface AIContext {
    userId: string;
    userProfile: {
      age: number;
      incomeLevel: 'low' | 'medium' | 'high';
      riskTolerance: 'low' | 'medium' | 'high';
      financialGoals: string[];
      preferences: {
        categories: string[];
        notifications: boolean;
        analysisDepth: 'basic' | 'detailed';
      };
    };
    historicalData: {
      transactionCount: number;
      accountAge: number; // days
      behaviorPatterns: string[];
    };
    currentState: {
      totalBalance: number;
      monthlyIncome: number;
      monthlyExpenses: number;
      activeBudgets: number;
      activeGoals: number;
    };
  }
  
