// src/hooks/useBudget.ts
import { useState, useEffect, useCallback } from 'react';
import { budgetService, CreateBudgetRequest } from '../services/api';
import { Budget, BudgetCategory } from '../types/budget';

interface BudgetState {
  budgets: Budget[];
  currentBudget: Budget | null;
  categories: BudgetCategory[];
  isLoading: boolean;
  error: string | null;
  totalBudget: number;
  totalSpent: number;
  totalRemaining: number;
  overBudgetCategories: BudgetCategory[];
  monthlyProgress: {
    [month: string]: {
      budgeted: number;
      spent: number;
      remaining: number;
    };
  };
}

interface BudgetActions {
  loadBudgets: () => Promise<void>;
  loadCurrentBudget: () => Promise<void>;
  createBudget: (budget: CreateBudgetRequest) => Promise<boolean>;
  updateBudget: (id: string, updates: Partial<Budget>) => Promise<boolean>;
  deleteBudget: (id: string) => Promise<boolean>;
  addCategory: (budgetId: string, category: Omit<BudgetCategory, 'id'>) => Promise<boolean>;
  updateCategory: (budgetId: string, categoryId: string, updates: Partial<BudgetCategory>) => Promise<boolean>;
  deleteCategory: (budgetId: string, categoryId: string) => Promise<boolean>;
  getBudgetById: (id: string) => Budget | undefined;
  getCategoryById: (categoryId: string) => BudgetCategory | undefined;
  getCategoryProgress: (categoryId: string) => { progress: number; status: 'good' | 'warning' | 'over' };
  getBudgetSummary: (budgetId: string) => { totalBudget: number; totalSpent: number; totalRemaining: number };
  getMonthlyComparison: (months: number) => { [month: string]: { budgeted: number; spent: number; variance: number } };
  updateMonthlyProgress: (month: string, data: { budgeted: number; spent: number; remaining: number }) => void;
  clearError: () => void;
}

export const useBudget = (): BudgetState & BudgetActions => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [currentBudget, setCurrentBudget] = useState<Budget | null>(null);
  const [categories, setCategories] = useState<BudgetCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [monthlyProgress, setMonthlyProgress] = useState<{
    [month: string]: {
      budgeted: number;
      spent: number;
      remaining: number;
    };
  }>({});

  const calculateTotals = useCallback(() => {
    const totalBudget = categories.reduce((sum, cat) => sum + cat.budgetedAmount, 0);
    const totalSpent = categories.reduce((sum, cat) => sum + cat.spentAmount, 0);
    const totalRemaining = totalBudget - totalSpent;
    
    return { totalBudget, totalSpent, totalRemaining };
  }, [categories]);

  const { totalBudget, totalSpent, totalRemaining } = calculateTotals();

  const overBudgetCategories = categories.filter(cat => cat.spentAmount > cat.budgetedAmount);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const updateMonthlyProgress = useCallback((month: string, data: { budgeted: number; spent: number; remaining: number }) => {
    setMonthlyProgress(prev => ({
      ...prev,
      [month]: data
    }));
  }, []);

  const loadBudgets = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await budgetService.getBudgets();
      
      if (response.success && response.data) {
        setBudgets(response.data);
      } else {
        setError(response.error || 'Failed to load budgets');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load budgets');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadCurrentBudget = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await budgetService.getCurrentBudget();
      
      if (response.success && response.data) {
        setCurrentBudget(response.data);
        setCategories(response.data.categories);
      } else {
        setError(response.error || 'Failed to load current budget');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load current budget');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createBudget = useCallback(async (budget: CreateBudgetRequest): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await budgetService.createBudget(budget);
      
      if (response.success && response.data) {
        setBudgets(prev => [...prev, response.data!]);
        return true;
      } else {
        setError(response.error || 'Failed to create budget');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create budget');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateBudget = useCallback(async (id: string, updates: Partial<Budget>): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Convert Budget type to UpdateBudgetRequest type
      const budgetUpdates = {
        ...(updates.name && { name: updates.name }),
        ...(updates.description && { description: updates.description }),
        ...(updates.period && { period: updates.period }),
        ...(updates.startDate && { startDate: updates.startDate }),
        ...(updates.endDate && { endDate: updates.endDate }),
        ...(updates.totalIncome && { totalIncome: updates.totalIncome })
      };
      
      const response = await budgetService.updateBudget(id, budgetUpdates);
      
      if (response.success && response.data) {
        setBudgets(prev => prev.map(budget => budget.id === id ? response.data! : budget));
        
        if (currentBudget?.id === id) {
          setCurrentBudget(response.data);
          setCategories(response.data.categories);
        }
        
        return true;
      } else {
        setError(response.error || 'Failed to update budget');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update budget');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [currentBudget]);

  const deleteBudget = useCallback(async (id: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await budgetService.deleteBudget(id);
      
      if (response.success) {
        setBudgets(prev => prev.filter(budget => budget.id !== id));
        
        if (currentBudget?.id === id) {
          setCurrentBudget(null);
          setCategories([]);
        }
        
        return true;
      } else {
        setError(response.error || 'Failed to delete budget');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete budget');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [currentBudget]);

  const addCategory = useCallback(async (budgetId: string, category: Omit<BudgetCategory, 'id'>): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Convert BudgetCategory type to CreateCategoryRequest type
      const categoryRequest = {
        name: category.name,
        description: category.description,
        budgetedAmount: category.budgetedAmount,
        color: category.color,
        icon: category.icon
      };
      
      const response = await budgetService.addCategory(budgetId, categoryRequest);
      
      if (response.success && response.data) {
        setCategories(prev => [...prev, response.data!]);
        return true;
      } else {
        setError(response.error || 'Failed to add category');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add category');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateCategory = useCallback(async (budgetId: string, categoryId: string, updates: Partial<BudgetCategory>): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Convert to UpdateCategoryRequest type
      const categoryUpdates = {
        ...(updates.name && { name: updates.name }),
        ...(updates.description && { description: updates.description }),
        ...(updates.budgetedAmount && { budgetedAmount: updates.budgetedAmount }),
        ...(updates.color && { color: updates.color }),
        ...(updates.icon && { icon: updates.icon })
      };
      
      const response = await budgetService.updateCategory(budgetId, categoryId, categoryUpdates);
      
      if (response.success && response.data) {
        setCategories(prev => prev.map(cat => cat.id === categoryId ? response.data! : cat));
        return true;
      } else {
        setError(response.error || 'Failed to update category');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update category');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteCategory = useCallback(async (budgetId: string, categoryId: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await budgetService.deleteCategory(budgetId, categoryId);
      
      if (response.success) {
        setCategories(prev => prev.filter(cat => cat.id !== categoryId));
        return true;
      } else {
        setError(response.error || 'Failed to delete category');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete category');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getBudgetById = useCallback((id: string): Budget | undefined => {
    return budgets.find(budget => budget.id === id);
  }, [budgets]);

  const getCategoryById = useCallback((categoryId: string): BudgetCategory | undefined => {
    return categories.find(cat => cat.id === categoryId);
  }, [categories]);

  const getCategoryProgress = useCallback((categoryId: string): { progress: number; status: 'good' | 'warning' | 'over' } => {
    const category = getCategoryById(categoryId);
    
    if (!category) {
      return { progress: 0, status: 'good' };
    }
    
    const progress = (category.spentAmount / category.budgetedAmount) * 100;
    
    let status: 'good' | 'warning' | 'over' = 'good';
    if (progress >= 100) {
      status = 'over';
    } else if (progress >= 80) {
      status = 'warning';
    }
    
    return { progress, status };
  }, [getCategoryById]);

  const getBudgetSummary = useCallback((budgetId: string): { totalBudget: number; totalSpent: number; totalRemaining: number } => {
    const budget = getBudgetById(budgetId);
    
    if (!budget) {
      return { totalBudget: 0, totalSpent: 0, totalRemaining: 0 };
    }
    
    const totalBudget = budget.categories.reduce((sum, cat) => sum + cat.budgetedAmount, 0);
    const totalSpent = budget.categories.reduce((sum, cat) => sum + cat.spentAmount, 0);
    const totalRemaining = totalBudget - totalSpent;
    
    return { totalBudget, totalSpent, totalRemaining };
  }, [getBudgetById]);

  const getMonthlyComparison = useCallback((months: number): { [month: string]: { budgeted: number; spent: number; variance: number } } => {
    const comparison: { [month: string]: { budgeted: number; spent: number; variance: number } } = {};
    
    // Generate last N months
    for (let i = 0; i < months; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      const monthData = monthlyProgress[monthKey] || { budgeted: 0, spent: 0, remaining: 0 };
      
      comparison[monthKey] = {
        budgeted: monthData.budgeted,
        spent: monthData.spent,
        variance: monthData.budgeted - monthData.spent,
      };
    }
    
    return comparison;
  }, [monthlyProgress]);

  useEffect(() => {
    loadBudgets();
    loadCurrentBudget();
  }, [loadBudgets, loadCurrentBudget]);

  return {
    budgets,
    currentBudget,
    categories,
    isLoading,
    error,
    totalBudget,
    totalSpent,
    totalRemaining,
    overBudgetCategories,
    monthlyProgress,
    loadBudgets,
    loadCurrentBudget,
    createBudget,
    updateBudget,
    deleteBudget,
    addCategory,
    updateCategory,
    deleteCategory,
    getBudgetById,
    getCategoryById,
    getCategoryProgress,
    getBudgetSummary,
    getMonthlyComparison,
    updateMonthlyProgress,
    clearError,
  };
};