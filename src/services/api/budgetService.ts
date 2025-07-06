import { Budget, BudgetCategory, ServiceResponse, BudgetPeriod, CategoryType, Priority, BudgetStatus, WeekStartDay, RoundingMethod, TrendDirection } from '../../types';

// Global declarations
declare const __DEV__: boolean;
declare function fetch(url: string, options?: unknown): Promise<{ json(): Promise<unknown> }>;

// Helper function for delays
const delay = (ms: number) => new Promise(resolve => {
  // Use a simple delay without setTimeout for now
  const start = Date.now();
  while (Date.now() - start < ms) {
    // Busy wait - not ideal but works for mock data
  }
  resolve(undefined);
});

export interface CreateBudgetRequest {
  name: string;
  description?: string;
  period: BudgetPeriod;
  startDate: string;
  endDate?: string;
  totalIncome: number;
  categories: Omit<BudgetCategory, 'id'>[];
}

export interface UpdateBudgetRequest {
  name?: string;
  description?: string;
  period?: BudgetPeriod;
  startDate?: string;
  endDate?: string;
  totalIncome?: number;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
  budgetedAmount: number;
  color?: string;
  icon?: string;
}

export interface UpdateCategoryRequest {
  name?: string;
  description?: string;
  budgetedAmount?: number;
  color?: string;
  icon?: string;
}

class BudgetService {
  private useMockData = __DEV__;

  async getBudgets(): Promise<ServiceResponse<Budget[]>> {
    try {
      if (this.useMockData) {
        // Simulate API delay
        await delay(800);

        const mockBudgets: Budget[] = [
          {
            id: 'budget_001',
            name: 'Monthly Budget',
            description: 'Main monthly budget',
            period: BudgetPeriod.MONTHLY,
            startDate: '2025-01-01',
            endDate: '2025-01-31',
            totalIncome: 5000,
            totalExpenses: 3200,
            totalAllocated: 4500,
            remainingAmount: 1800,
            categories: [
              {
                id: 'cat_001',
                name: 'Housing',
                description: 'Rent and utilities',
                icon: 'home',
                color: '#4CAF50',
                budgetedAmount: 1500,
                spentAmount: 1200,
                remainingAmount: 300,
                percentageUsed: 80,
                subcategories: [],
                transactions: [],
                type: CategoryType.EXPENSE,
                priority: Priority.HIGH,
                isEssential: true,
                rollover: false,
                alerts: [],
                history: [],
                createdAt: '2025-01-01T00:00:00Z',
                updatedAt: '2025-01-15T00:00:00Z'
              },
              {
                id: 'cat_002',
                name: 'Food & Dining',
                description: 'Groceries and restaurants',
                icon: 'restaurant',
                color: '#FF9800',
                budgetedAmount: 800,
                spentAmount: 650,
                remainingAmount: 150,
                percentageUsed: 81.25,
                subcategories: [],
                transactions: [],
                type: CategoryType.EXPENSE,
                priority: Priority.MEDIUM,
                isEssential: true,
                rollover: false,
                alerts: [],
                history: [],
                createdAt: '2025-01-01T00:00:00Z',
                updatedAt: '2025-01-15T00:00:00Z'
              }
            ],
            goals: [],
            status: BudgetStatus.ACTIVE,
            settings: {
              autoRollover: false,
              alertThreshold: 80,
              includeTransfers: true,
              includeInvestments: false,
              weekStartDay: WeekStartDay.MONDAY,
              roundingMethod: RoundingMethod.NONE,
              notifications: {
                enabled: true,
                overspendingAlert: true,
                lowBalanceAlert: true,
                goalDeadlineAlert: true,
                monthlyReport: true,
                weeklyReport: false,
                thresholdPercentage: 80
              },
              categorization: {
                autoAssign: true,
                defaultCategory: 'other',
                learnFromHistory: true,
                suggestCategories: true
              }
            },
            analytics: {
              totalSpent: 3200,
              totalRemaining: 1800,
              averageDailySpend: 106.67,
              projectedEndAmount: 3300,
              savingsRate: 36,
              topCategories: [
                { category: 'Housing', amount: 1200, percentage: 37.5, trend: TrendDirection.UP },
                { category: 'Food & Dining', amount: 650, percentage: 20.3, trend: TrendDirection.STABLE }
              ],
              spendingTrends: [],
              budgetVariance: {
                categories: [],
                totalVariance: 0,
                totalVariancePercentage: 0,
                positiveVariance: 0,
                negativeVariance: 0
              },
              recommendations: []
            },
            isActive: true,
            isTemplate: false,
            createdAt: '2025-01-01T00:00:00Z',
            updatedAt: '2025-01-15T00:00:00Z'
          }
        ];

        return {
          data: mockBudgets,
          success: true
        };
      }

      // Real API call will go here later
      const response = await fetch('/api/budgets');
      const data = await response.json() as { budgets: Budget[] };

      return {
        data: data.budgets,
        success: true
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch budgets'
      };
    }
  }

  async getCurrentBudget(): Promise<ServiceResponse<Budget>> {
    try {
      if (this.useMockData) {
        // Simulate API delay
        await delay(600);

        const mockCurrentBudget: Budget = {
          id: 'budget_001',
          name: 'Monthly Budget',
          description: 'Main monthly budget',
          period: BudgetPeriod.MONTHLY,
          startDate: '2025-01-01',
          endDate: '2025-01-31',
          totalIncome: 5000,
          totalExpenses: 3200,
          totalAllocated: 4500,
          remainingAmount: 1800,
          categories: [
            {
              id: 'cat_001',
              name: 'Housing',
              description: 'Rent and utilities',
              icon: 'home',
              color: '#4CAF50',
              budgetedAmount: 1500,
              spentAmount: 1200,
              remainingAmount: 300,
              percentageUsed: 80,
              subcategories: [],
              transactions: [],
              type: CategoryType.EXPENSE,
              priority: Priority.HIGH,
              isEssential: true,
              rollover: false,
              alerts: [],
              history: [],
              createdAt: '2025-01-01T00:00:00Z',
              updatedAt: '2025-01-15T00:00:00Z'
            }
          ],
          goals: [],
          status: BudgetStatus.ACTIVE,
          settings: {
            autoRollover: false,
            alertThreshold: 80,
            includeTransfers: true,
            includeInvestments: false,
            weekStartDay: WeekStartDay.MONDAY,
            roundingMethod: RoundingMethod.NONE,
            notifications: {
              enabled: true,
              overspendingAlert: true,
              lowBalanceAlert: true,
              goalDeadlineAlert: true,
              monthlyReport: true,
              weeklyReport: false,
              thresholdPercentage: 80
            },
            categorization: {
              autoAssign: true,
              defaultCategory: 'other',
              learnFromHistory: true,
              suggestCategories: true
            }
          },
          analytics: {
            totalSpent: 3200,
            totalRemaining: 1800,
            averageDailySpend: 106.67,
            projectedEndAmount: 3300,
            savingsRate: 36,
            topCategories: [],
            spendingTrends: [],
            budgetVariance: {
              categories: [],
              totalVariance: 0,
              totalVariancePercentage: 0,
              positiveVariance: 0,
              negativeVariance: 0
            },
            recommendations: []
          },
          isActive: true,
          isTemplate: false,
          createdAt: '2025-01-01T00:00:00Z',
          updatedAt: '2025-01-15T00:00:00Z'
        };

        return {
          data: mockCurrentBudget,
          success: true
        };
      }

      // Real API call will go here later
      const response = await fetch('/api/budgets/current');
      const data = await response.json() as { budget: Budget };

      return {
        data: data.budget,
        success: true
      };
    } catch (error) {
      return {
        data: {} as Budget,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch current budget'
      };
    }
  }

  async createBudget(budget: CreateBudgetRequest): Promise<ServiceResponse<Budget>> {
    try {
      if (this.useMockData) {
        // Simulate API delay
        await delay(1000);

        const newBudget: Budget = {
          id: `budget_${Date.now()}`,
          name: budget.name,
          description: budget.description,
          period: budget.period,
          startDate: budget.startDate,
          endDate: budget.endDate || '',
          totalIncome: budget.totalIncome,
          totalExpenses: 0,
          totalAllocated: budget.categories.reduce((sum, cat) => sum + cat.budgetedAmount, 0),
          remainingAmount: budget.totalIncome,
          categories: budget.categories.map((cat, index) => ({
            ...cat,
            id: `cat_${Date.now()}_${index}`,
            spentAmount: 0,
            remainingAmount: cat.budgetedAmount,
            percentageUsed: 0,
            subcategories: [],
            transactions: [],
            alerts: [],
            history: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })),
          goals: [],
          status: BudgetStatus.ACTIVE,
          settings: {
            autoRollover: false,
            alertThreshold: 80,
            includeTransfers: true,
            includeInvestments: false,
            weekStartDay: WeekStartDay.MONDAY,
            roundingMethod: RoundingMethod.NONE,
            notifications: {
              enabled: true,
              overspendingAlert: true,
              lowBalanceAlert: true,
              goalDeadlineAlert: true,
              monthlyReport: true,
              weeklyReport: false,
              thresholdPercentage: 80
            },
            categorization: {
              autoAssign: true,
              defaultCategory: 'other',
              learnFromHistory: true,
              suggestCategories: true
            }
          },
          analytics: {
            totalSpent: 0,
            totalRemaining: budget.totalIncome,
            averageDailySpend: 0,
            projectedEndAmount: 0,
            savingsRate: 100,
            topCategories: [],
            spendingTrends: [],
            budgetVariance: {
              categories: [],
              totalVariance: 0,
              totalVariancePercentage: 0,
              positiveVariance: 0,
              negativeVariance: 0
            },
            recommendations: []
          },
          isActive: true,
          isTemplate: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        return {
          data: newBudget,
          success: true
        };
      }

      // Real API call will go here later
      const response = await fetch('/api/budgets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(budget),
      });

      const data = await response.json() as { budget: Budget };

      return {
        data: data.budget,
        success: true
      };
    } catch (error) {
      return {
        data: {} as Budget,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create budget'
      };
    }
  }

  async updateBudget(id: string, updates: UpdateBudgetRequest): Promise<ServiceResponse<Budget>> {
    try {
      if (this.useMockData) {
        // Simulate API delay
        await delay(800);

        // Mock update - in real implementation, this would update the existing budget
        const updatedBudget: Budget = {
          id,
          name: updates.name || 'Updated Budget',
          description: updates.description,
          period: updates.period || BudgetPeriod.MONTHLY,
          startDate: updates.startDate || '2025-01-01',
          endDate: updates.endDate || '',
          totalIncome: updates.totalIncome || 5000,
          totalExpenses: 3200,
          totalAllocated: 4500,
          remainingAmount: 1800,
          categories: [],
          goals: [],
          status: BudgetStatus.ACTIVE,
          settings: {
            autoRollover: false,
            alertThreshold: 80,
            includeTransfers: true,
            includeInvestments: false,
            weekStartDay: WeekStartDay.MONDAY,
            roundingMethod: RoundingMethod.NONE,
            notifications: {
              enabled: true,
              overspendingAlert: true,
              lowBalanceAlert: true,
              goalDeadlineAlert: true,
              monthlyReport: true,
              weeklyReport: false,
              thresholdPercentage: 80
            },
            categorization: {
              autoAssign: true,
              defaultCategory: 'other',
              learnFromHistory: true,
              suggestCategories: true
            }
          },
          analytics: {
            totalSpent: 3200,
            totalRemaining: 1800,
            averageDailySpend: 106.67,
            projectedEndAmount: 3300,
            savingsRate: 36,
            topCategories: [],
            spendingTrends: [],
            budgetVariance: {
              categories: [],
              totalVariance: 0,
              totalVariancePercentage: 0,
              positiveVariance: 0,
              negativeVariance: 0
            },
            recommendations: []
          },
          isActive: true,
          isTemplate: false,
          createdAt: '2025-01-01T00:00:00Z',
          updatedAt: new Date().toISOString()
        };

        return {
          data: updatedBudget,
          success: true
        };
      }

      // Real API call will go here later
      const response = await fetch(`/api/budgets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json() as { budget: Budget };

      return {
        data: data.budget,
        success: true
      };
    } catch (error) {
      return {
        data: {} as Budget,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update budget'
      };
    }
  }

  async deleteBudget(id: string): Promise<ServiceResponse<boolean>> {
    try {
      if (this.useMockData) {
        // Simulate API delay
        await delay(600);

        return {
          data: true,
          success: true
        };
      }

      // Real API call will go here later
      await fetch(`/api/budgets/${id}`, {
        method: 'DELETE',
      });

      return {
        data: true,
        success: true
      };
    } catch (error) {
      return {
        data: false,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete budget'
      };
    }
  }

  async addCategory(budgetId: string, category: CreateCategoryRequest): Promise<ServiceResponse<BudgetCategory>> {
    try {
      if (this.useMockData) {
        // Simulate API delay
        await delay(800);

        const newCategory: BudgetCategory = {
          id: `cat_${Date.now()}`,
          name: category.name,
          description: category.description,
          icon: category.icon,
          color: category.color || '#2196F3',
          budgetedAmount: category.budgetedAmount,
          spentAmount: 0,
          remainingAmount: category.budgetedAmount,
          percentageUsed: 0,
          subcategories: [],
          transactions: [],
          type: CategoryType.EXPENSE,
          priority: Priority.MEDIUM,
          isEssential: false,
          rollover: false,
          alerts: [],
          history: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        return {
          data: newCategory,
          success: true
        };
      }

      // Real API call will go here later
      const response = await fetch(`/api/budgets/${budgetId}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      });

      const data = await response.json() as { category: BudgetCategory };

      return {
        data: data.category,
        success: true
      };
    } catch (error) {
      return {
        data: {} as BudgetCategory,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to add category'
      };
    }
  }

  async updateCategory(budgetId: string, categoryId: string, updates: UpdateCategoryRequest): Promise<ServiceResponse<BudgetCategory>> {
    try {
      if (this.useMockData) {
        // Simulate API delay
        await delay(600);

        const updatedCategory: BudgetCategory = {
          id: categoryId,
          name: updates.name || 'Updated Category',
          description: updates.description,
          icon: updates.icon,
          color: updates.color || '#2196F3',
          budgetedAmount: updates.budgetedAmount || 500,
          spentAmount: 200,
          remainingAmount: (updates.budgetedAmount || 500) - 200,
          percentageUsed: 40,
          subcategories: [],
          transactions: [],
          type: CategoryType.EXPENSE,
          priority: Priority.MEDIUM,
          isEssential: false,
          rollover: false,
          alerts: [],
          history: [],
          createdAt: '2025-01-01T00:00:00Z',
          updatedAt: new Date().toISOString()
        };

        return {
          data: updatedCategory,
          success: true
        };
      }

      // Real API call will go here later
      const response = await fetch(`/api/budgets/${budgetId}/categories/${categoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json() as { category: BudgetCategory };

      return {
        data: data.category,
        success: true
      };
    } catch (error) {
      return {
        data: {} as BudgetCategory,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update category'
      };
    }
  }

  async deleteCategory(budgetId: string, categoryId: string): Promise<ServiceResponse<boolean>> {
    try {
      if (this.useMockData) {
        // Simulate API delay
        await delay(500);

        return {
          data: true,
          success: true
        };
      }

      // Real API call will go here later
      await fetch(`/api/budgets/${budgetId}/categories/${categoryId}`, {
        method: 'DELETE',
      });

      return {
        data: true,
        success: true
      };
    } catch (error) {
      return {
        data: false,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete category'
      };
    }
  }
}

export const budgetService = new BudgetService(); 