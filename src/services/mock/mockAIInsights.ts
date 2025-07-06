import { AIInsight } from '../../types/ai';

export const mockAIInsights: AIInsight[] = [
  {
    id: "insight_001",
    type: "spending_pattern",
    title: "Coffee Spending Alert",
    description: "You've spent 23% more on coffee this month compared to last month. Consider making coffee at home to save $78/month.",
    category: "dining",
    priority: "medium",
    confidence: 0.87,
    impact: "medium",
    actionable: true,
    recommendation: {
      action: "reduce_spending",
      details: "Try making coffee at home 3 days a week to save approximately $78 per month.",
      potentialSavings: 78.00,
      timeframe: "monthly"
    },
    data: {
      currentSpending: 165.50,
      previousSpending: 134.20,
      percentageChange: 23.35,
      category: "coffee_shop"
    },
    createdAt: "2025-07-05T09:00:00Z",
    isRead: false,
    isActioned: false,
    tags: ["spending", "coffee", "budget"]
  },
  {
    id: "insight_002",
    type: "investment_opportunity",
    title: "Diversification Opportunity",
    description: "Your portfolio is 65% concentrated in tech stocks. Consider diversifying into other sectors for better risk management.",
    category: "investments",
    priority: "high",
    confidence: 0.92,
    impact: "high",
    actionable: true,
    recommendation: {
      action: "diversify_portfolio",
      details: "Add exposure to healthcare, financials, and consumer goods sectors. Consider ETFs for broad diversification.",
      potentialSavings: 0,
      timeframe: "quarterly"
    },
    data: {
      techAllocation: 65.2,
      recommendedAllocation: 40.0,
      riskScore: 7.8,
      diversificationScore: 4.2
    },
    createdAt: "2025-07-04T14:30:00Z",
    isRead: true,
    isActioned: false,
    tags: ["portfolio", "diversification", "risk"]
  },
  {
    id: "insight_003",
    type: "goal_progress",
    title: "House Down Payment on Track",
    description: "Great progress! You're 44% towards your house down payment goal. At your current savings rate, you'll reach it 3 months early.",
    category: "goals",
    priority: "low",
    confidence: 0.95,
    impact: "low",
    actionable: false,
    recommendation: {
      action: "continue_current_plan",
      details: "Your current savings rate of $1,200/month is excellent. Consider increasing it slightly to reach your goal even sooner.",
      potentialSavings: 0,
      timeframe: "monthly"
    },
    data: {
      currentAmount: 35000.00,
      targetAmount: 80000.00,
      monthlyContribution: 1200.00,
      progressPercentage: 43.75,
      monthsAhead: 3
    },
    createdAt: "2025-07-03T11:15:00Z",
    isRead: true,
    isActioned: false,
    tags: ["goals", "saving", "house"]
  },
  {
    id: "insight_004",
    type: "budget_optimization",
    title: "Shopping Budget Exceeded",
    description: "You've exceeded your shopping budget by $89.99 this month. This is the second consecutive month of overspending in this category.",
    category: "budgeting",
    priority: "high",
    confidence: 0.89,
    impact: "medium",
    actionable: true,
    recommendation: {
      action: "adjust_budget",
      details: "Consider increasing your shopping budget to $450/month or implement a 24-hour waiting period for non-essential purchases.",
      potentialSavings: 0,
      timeframe: "monthly"
    },
    data: {
      budgetAmount: 300.00,
      spentAmount: 389.99,
      overspentAmount: 89.99,
      overspentPercentage: 29.99,
      consecutiveMonths: 2
    },
    createdAt: "2025-07-02T16:45:00Z",
    isRead: false,
    isActioned: false,
    tags: ["budget", "shopping", "overspending"]
  },
  {
    id: "insight_005",
    type: "market_analysis",
    title: "Tesla Stock Volatility Alert",
    description: "TSLA has shown high volatility (Beta: 2.01) in your portfolio. Consider reducing position size or using stop-loss orders.",
    category: "investments",
    priority: "medium",
    confidence: 0.78,
    impact: "medium",
    actionable: true,
    recommendation: {
      action: "risk_management",
      details: "Consider reducing TSLA position from 15.2 shares to 10 shares, or set stop-loss at 10% below current price.",
      potentialSavings: 0,
      timeframe: "weekly"
    },
    data: {
      symbol: "TSLA",
      beta: 2.01,
      volatility: 45.2,
      positionSize: 15.2,
      recommendedSize: 10.0,
      currentPrice: 248.75
    },
    createdAt: "2025-07-01T10:20:00Z",
    isRead: true,
    isActioned: true,
    tags: ["stocks", "volatility", "risk"]
  },
  {
    id: "insight_006",
    type: "cashflow_analysis",
    title: "Strong Cash Flow This Month",
    description: "Your cash flow is positive by $1,300 this month. Consider increasing your emergency fund or investment contributions.",
    category: "cashflow",
    priority: "low",
    confidence: 0.91,
    impact: "low",
    actionable: true,
    recommendation: {
      action: "optimize_surplus",
      details: "Allocate $800 to house down payment goal and $500 to additional investment contributions.",
      potentialSavings: 0,
      timeframe: "monthly"
    },
    data: {
      monthlyIncome: 5500.00,
      monthlyExpenses: 4200.00,
      surplus: 1300.00,
      recommendedAllocation: {
        houseGoal: 800.00,
        investments: 500.00
      }
    },
    createdAt: "2025-06-30T23:59:00Z",
    isRead: true,
    isActioned: false,
    tags: ["cashflow", "surplus", "allocation"]
  },
  {
    id: "insight_007",
    type: "tax_optimization",
    title: "Tax-Loss Harvesting Opportunity",
    description: "Your Treasury bonds are showing a 2% loss. Consider tax-loss harvesting to offset gains from NVIDIA (+49.5%).",
    category: "taxes",
    priority: "medium",
    confidence: 0.85,
    impact: "medium",
    actionable: true,
    recommendation: {
      action: "tax_loss_harvesting",
      details: "Sell Treasury bonds at a $200 loss to offset some of your NVIDIA gains for tax purposes.",
      potentialSavings: 60.00,
      timeframe: "annual"
    },
    data: {
      lossAmount: 200.00,
      gainAmount: 1612.93,
      potentialTaxSavings: 60.00,
      taxRate: 0.30
    },
    createdAt: "2025-06-28T13:10:00Z",
    isRead: false,
    isActioned: false,
    tags: ["taxes", "harvesting", "optimization"]
  },
  {
    id: "insight_008",
    type: "subscription_analysis",
    title: "Subscription Audit Needed",
    description: "You have recurring subscriptions totaling $31/month. Netflix and Spotify are your active subscriptions.",
    category: "subscriptions",
    priority: "low",
    confidence: 0.96,
    impact: "low",
    actionable: true,
    recommendation: {
      action: "review_subscriptions",
      details: "Your subscription spending is reasonable. Consider bundling services or family plans for additional savings.",
      potentialSavings: 8.00,
      timeframe: "monthly"
    },
    data: {
      totalSubscriptions: 31.00,
      activeServices: ["Netflix", "Spotify"],
      potentialSavings: 8.00,
      utilizationRate: 0.85
    },
    createdAt: "2025-06-25T08:45:00Z",
    isRead: true,
    isActioned: false,
    tags: ["subscriptions", "recurring", "optimization"]
  },
  {
    id: "insight_009",
    type: "credit_score",
    title: "Excellent Credit Score",
    description: "Your credit score of 750 is excellent! You qualify for the best rates on loans and credit cards.",
    category: "credit",
    priority: "low",
    confidence: 0.99,
    impact: "low",
    actionable: false,
    recommendation: {
      action: "maintain_score",
      details: "Keep your credit utilization below 30% and continue making on-time payments to maintain this excellent score.",
      potentialSavings: 0,
      timeframe: "ongoing"
    },
    data: {
      creditScore: 750,
      scoreRange: "excellent",
      utilizationRate: 0.25,
      paymentHistory: 1.0
    },
    createdAt: "2025-06-20T12:00:00Z",
    isRead: true,
    isActioned: false,
    tags: ["credit", "score", "excellent"]
  },
  {
    id: "insight_010",
    type: "emergency_fund",
    title: "Emergency Fund Goal Achieved",
    description: "Congratulations! You've successfully built your 6-month emergency fund. Consider your next financial milestone.",
    category: "goals",
    priority: "low",
    confidence: 1.0,
    impact: "low",
    actionable: true,
    recommendation: {
      action: "set_next_goal",
      details: "With your emergency fund complete, focus on maximizing your house down payment savings or increase retirement contributions.",
      potentialSavings: 0,
      timeframe: "ongoing"
    },
    data: {
      targetAmount: 25000.00,
      currentAmount: 25000.00,
      completionDate: "2025-06-15T00:00:00Z",
      nextGoals: ["house", "retirement"]
    },
    createdAt: "2025-06-15T00:00:00Z",
    isRead: true,
    isActioned: true,
    tags: ["emergency", "achievement", "milestone"]
  }
];

// Helper functions for mock AI insights
export const getInsightsByCategory = (category: string): AIInsight[] => {
  return mockAIInsights.filter(insight => insight.category === category);
};

export const getInsightsByPriority = (priority: 'high' | 'medium' | 'low'): AIInsight[] => {
  return mockAIInsights.filter(insight => insight.priority === priority);
};

export const getInsightsByType = (type: string): AIInsight[] => {
  return mockAIInsights.filter(insight => insight.type === type);
};

export const getUnreadInsights = (): AIInsight[] => {
  return mockAIInsights.filter(insight => !insight.isRead);
};

export const getActionableInsights = (): AIInsight[] => {
  return mockAIInsights.filter(insight => insight.actionable && !insight.isActioned);
};

export const getRecentInsights = (days: number = 7): AIInsight[] => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return mockAIInsights.filter(insight => {
    const insightDate = new Date(insight.createdAt);
    return insightDate >= cutoffDate;
  });
};

export const getTotalPotentialSavings = (): number => {
  return mockAIInsights
    .filter(insight => insight.recommendation.potentialSavings > 0)
    .reduce((total, insight) => total + insight.recommendation.potentialSavings, 0);
};

export const getInsightsByTag = (tag: string): AIInsight[] => {
  return mockAIInsights.filter(insight => insight.tags.includes(tag));
};

export const getInsightStats = () => {
  const total = mockAIInsights.length;
  const unread = getUnreadInsights().length;
  const actionable = getActionableInsights().length;
  const highPriority = getInsightsByPriority('high').length;
  const potentialSavings = getTotalPotentialSavings();
  
  return {
    total,
    unread,
    actionable,
    highPriority,
    potentialSavings,
    readPercentage: ((total - unread) / total) * 100
  };
};