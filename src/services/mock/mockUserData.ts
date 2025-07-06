import { User } from '../../types/auth';

export const mockUserData: User = {
  id: "user_12345",
  email: "john.doe@email.com",
  firstName: "John",
  lastName: "Doe",
  fullName: "John Doe",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  phone: "+1-555-0123",
  dateOfBirth: "1990-05-15",
  address: {
    street: "123 Pine Street",
    city: "Seattle",
    state: "WA",
    zipCode: "98101",
    country: "USA"
  },
  preferences: {
    currency: "USD",
    language: "en",
    timezone: "America/Los_Angeles",
    notifications: {
      email: true,
      push: true,
      sms: false,
      budget: true,
      goals: true,
      investments: true,
      transactions: true
    },
    privacy: {
      shareData: false,
      analytics: true,
      marketing: false
    },
    theme: "light"
  },
  financialProfile: {
    monthlyIncome: 5500.00,
    monthlyExpenses: 4200.00,
    riskTolerance: "moderate",
    investmentGoals: ["retirement", "house", "emergency_fund"],
    employmentStatus: "full_time",
    occupation: "Software Engineer",
    employer: "Tech Corp Inc",
    creditScore: 750,
    creditScoreDate: "2025-06-01T00:00:00Z"
  },
  accounts: [
    {
      id: "acc_checking_001",
      name: "Chase Checking",
      type: "checking",
      balance: 8500.00,
      currency: "USD",
      institution: "Chase Bank",
      accountNumber: "****1234",
      isActive: true,
      isPrimary: true
    },
    {
      id: "acc_savings_001",
      name: "Chase Savings",
      type: "savings",
      balance: 25000.00,
      currency: "USD",
      institution: "Chase Bank",
      accountNumber: "****5678",
      isActive: true,
      isPrimary: false
    },
    {
      id: "acc_credit_001",
      name: "Chase Freedom",
      type: "credit",
      balance: -1250.00,
      currency: "USD",
      institution: "Chase Bank",
      accountNumber: "****9012",
      isActive: true,
      isPrimary: false,
      creditLimit: 5000.00
    },
    {
      id: "acc_investment_001",
      name: "Fidelity Investment Account",
      type: "investment",
      balance: 75000.00,
      currency: "USD",
      institution: "Fidelity",
      accountNumber: "****3456",
      isActive: true,
      isPrimary: false
    },
    {
      id: "acc_crypto_001",
      name: "Coinbase Account",
      type: "crypto",
      balance: 18965.56,
      currency: "USD",
      institution: "Coinbase",
      accountNumber: "****7890",
      isActive: true,
      isPrimary: false
    }
  ],
  budgets: [
    {
      id: "budget_001",
      name: "Monthly Budget",
      category: "overall",
      amount: 4200.00,
      spent: 3850.00,
      remaining: 350.00,
      period: "monthly",
      startDate: "2025-07-01T00:00:00Z",
      endDate: "2025-07-31T23:59:59Z",
      isActive: true
    },
    {
      id: "budget_002",
      name: "Dining Budget",
      category: "dining",
      amount: 400.00,
      spent: 125.37,
      remaining: 274.63,
      period: "monthly",
      startDate: "2025-07-01T00:00:00Z",
      endDate: "2025-07-31T23:59:59Z",
      isActive: true
    },
    {
      id: "budget_003",
      name: "Shopping Budget",
      category: "shopping",
      amount: 300.00,
      spent: 389.99,
      remaining: -89.99,
      period: "monthly",
      startDate: "2025-07-01T00:00:00Z",
      endDate: "2025-07-31T23:59:59Z",
      isActive: true
    },
    {
      id: "budget_004",
      name: "Entertainment Budget",
      category: "entertainment",
      amount: 200.00,
      spent: 31.00,
      remaining: 169.00,
      period: "monthly",
      startDate: "2025-07-01T00:00:00Z",
      endDate: "2025-07-31T23:59:59Z",
      isActive: true
    }
  ],
  goals: [
    {
      id: "goal_001",
      name: "Emergency Fund",
      description: "Build 6 months of expenses emergency fund",
      targetAmount: 25000.00,
      currentAmount: 25000.00,
      targetDate: "2025-12-31T00:00:00Z",
      category: "emergency",
      isCompleted: true,
      completedDate: "2025-06-15T00:00:00Z",
      priority: "high"
    },
    {
      id: "goal_002",
      name: "House Down Payment",
      description: "Save for 20% down payment on house",
      targetAmount: 80000.00,
      currentAmount: 35000.00,
      targetDate: "2026-12-31T00:00:00Z",
      category: "house",
      isCompleted: false,
      completedDate: null,
      priority: "high"
    },
    {
      id: "goal_003",
      name: "Retirement Fund",
      description: "Build retirement savings",
      targetAmount: 1000000.00,
      currentAmount: 75000.00,
      targetDate: "2055-12-31T00:00:00Z",
      category: "retirement",
      isCompleted: false,
      completedDate: null,
      priority: "medium"
    },
    {
      id: "goal_004",
      name: "Vacation Fund",
      description: "Save for European vacation",
      targetAmount: 5000.00,
      currentAmount: 1200.00,
      targetDate: "2025-12-31T00:00:00Z",
      category: "vacation",
      isCompleted: false,
      completedDate: null,
      priority: "low"
    }
  ],
  achievements: [
    {
      id: "achievement_001",
      name: "First Investment",
      description: "Made your first investment",
      category: "investing",
      earnedDate: "2025-01-08T00:00:00Z",
      points: 100
    },
    {
      id: "achievement_002",
      name: "Budget Master",
      description: "Stayed within budget for 3 consecutive months",
      category: "budgeting",
      earnedDate: "2025-06-30T00:00:00Z",
      points: 250
    },
    {
      id: "achievement_003",
      name: "Emergency Fund Complete",
      description: "Completed your emergency fund goal",
      category: "saving",
      earnedDate: "2025-06-15T00:00:00Z",
      points: 500
    }
  ],
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-07-05T12:00:00Z",
  lastLoginAt: "2025-07-05T08:30:00Z",
  isVerified: true,
  isActive: true,
  subscriptionPlan: "premium",
  subscriptionExpiry: "2025-12-31T23:59:59Z"
};

// Helper functions for mock user data
export const getUserAccounts = () => {
  return mockUserData.accounts;
};

export const getActiveAccounts = () => {
  return mockUserData.accounts?.filter(account => account.isActive) || [];
};

export const getPrimaryAccount = () => {
  return mockUserData.accounts?.find(account => account.isPrimary);
};

export const getAccountById = (accountId: string) => {
  return mockUserData.accounts?.find(account => account.id === accountId);
};

export const getTotalAccountBalance = () => {
  return mockUserData.accounts?.reduce((total, account) => {
    // Don't include credit card debt in total balance
    if (account.type === 'credit') {
      return total;
    }
    return total + account.balance;
  }, 0) || 0;
};

export const getNetWorth = () => {
  return mockUserData.accounts?.reduce((total, account) => {
    return total + account.balance;
  }, 0) || 0;
};

export const getActiveBudgets = () => {
  return mockUserData.budgets?.filter(budget => budget.isActive) || [];
};

export const getBudgetByCategory = (category: string) => {
  return mockUserData.budgets?.find(budget => budget.category === category);
};

export const getActiveGoals = () => {
  return mockUserData.goals?.filter(goal => !goal.isCompleted) || [];
};

export const getCompletedGoals = () => {
  return mockUserData.goals?.filter(goal => goal.isCompleted) || [];
};

export const getGoalProgress = (goalId: string) => {
  const goal = mockUserData.goals?.find(g => g.id === goalId);
  if (!goal) return 0;
  return (goal.currentAmount / goal.targetAmount) * 100;
};

export const getUserAchievements = () => {
  return mockUserData.achievements;
};

export const getTotalAchievementPoints = () => {
  return mockUserData.achievements?.reduce((total, achievement) => total + achievement.points, 0) || 0;
};