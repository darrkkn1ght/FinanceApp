// src/store/slices/budgetSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { budgetService } from '../../services/api/';
import { Budget, BudgetCategory, BudgetPeriod } from '../../types/budget';

// Define request types inline to avoid import issues
interface CreateBudgetRequest {
  name: string;
  description?: string;
  period: BudgetPeriod;
  startDate: string;
  endDate?: string;
  totalIncome: number;
  categories: Omit<BudgetCategory, 'id'>[];
}

interface UpdateBudgetRequest {
  name?: string;
  description?: string;
  period?: BudgetPeriod;
  startDate?: string;
  endDate?: string;
  totalIncome?: number;
}

interface CreateCategoryRequest {
  name: string;
  description?: string;
  budgetedAmount: number;
  color?: string;
  icon?: string;
}

interface UpdateCategoryRequest {
  name?: string;
  description?: string;
  budgetedAmount?: number;
  color?: string;
  icon?: string;
}

interface BudgetState {
  budgets: Budget[];
  categories: BudgetCategory[];
  currentBudget: Budget | null;
  totalBudget: number;
  totalSpent: number;
  totalRemaining: number;
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

const initialState: BudgetState = {
  budgets: [],
  categories: [],
  currentBudget: null,
  totalBudget: 0,
  totalSpent: 0,
  totalRemaining: 0,
  isLoading: false,
  error: null,
  lastUpdated: null,
};

// Async thunks
export const fetchBudgets = createAsyncThunk(
  'budget/fetchBudgets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await budgetService.getBudgets();
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to fetch budgets');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const fetchCurrentBudget = createAsyncThunk(
  'budget/fetchCurrentBudget',
  async (_, { rejectWithValue }) => {
    try {
      const response = await budgetService.getCurrentBudget();
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to fetch current budget');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const createBudget = createAsyncThunk(
  'budget/createBudget',
  async (budget: CreateBudgetRequest, { rejectWithValue }) => {
    try {
      const response = await budgetService.createBudget(budget);
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to create budget');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const updateBudget = createAsyncThunk(
  'budget/updateBudget',
  async ({ id, updates }: { id: string; updates: UpdateBudgetRequest }, { rejectWithValue }) => {
    try {
      const response = await budgetService.updateBudget(id, updates);
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to update budget');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const deleteBudget = createAsyncThunk(
  'budget/deleteBudget',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await budgetService.deleteBudget(id);
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to delete budget');
      }
      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const addCategory = createAsyncThunk(
  'budget/addCategory',
  async ({ budgetId, category }: { budgetId: string; category: CreateCategoryRequest }, { rejectWithValue }) => {
    try {
      const response = await budgetService.addCategory(budgetId, category);
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to add category');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const updateCategory = createAsyncThunk(
  'budget/updateCategory',
  async ({ budgetId, categoryId, updates }: { budgetId: string; categoryId: string; updates: UpdateCategoryRequest }, { rejectWithValue }) => {
    try {
      const response = await budgetService.updateCategory(budgetId, categoryId, updates);
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to update category');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'budget/deleteCategory',
  async ({ budgetId, categoryId }: { budgetId: string; categoryId: string }, { rejectWithValue }) => {
    try {
      const response = await budgetService.deleteCategory(budgetId, categoryId);
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to delete category');
      }
      return categoryId;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    clearBudgetError: (state) => {
      state.error = null;
    },
    setCurrentBudget: (state, action: PayloadAction<string>) => {
      const budget = state.budgets.find(b => b.id === action.payload);
      if (budget) {
        state.currentBudget = budget;
        state.categories = budget.categories;
        // Recalculate totals
        state.totalBudget = budget.categories.reduce((sum: number, cat: BudgetCategory) => sum + cat.budgetedAmount, 0);
        state.totalSpent = budget.categories.reduce((sum: number, cat: BudgetCategory) => sum + cat.spentAmount, 0);
        state.totalRemaining = state.totalBudget - state.totalSpent;
      }
    },
    updateCategorySpending: (state, action: PayloadAction<{ categoryId: string; amount: number }>) => {
      const { categoryId, amount } = action.payload;
      const category = state.categories.find(c => c.id === categoryId);
      if (category) {
        category.spentAmount += amount;
        category.remainingAmount = category.budgetedAmount - category.spentAmount;
        category.percentageUsed = (category.spentAmount / category.budgetedAmount) * 100;
        category.updatedAt = new Date().toISOString();
      }
      // Recalculate totals
      state.totalSpent = state.categories.reduce((sum: number, cat: BudgetCategory) => sum + cat.spentAmount, 0);
      state.totalRemaining = state.totalBudget - state.totalSpent;
    },
    recalculateBudgetTotals: (state) => {
      state.totalBudget = state.categories.reduce((sum: number, cat: BudgetCategory) => sum + cat.budgetedAmount, 0);
      state.totalSpent = state.categories.reduce((sum: number, cat: BudgetCategory) => sum + cat.spentAmount, 0);
      state.totalRemaining = state.totalBudget - state.totalSpent;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch budgets
      .addCase(fetchBudgets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBudgets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.budgets = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchBudgets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch current budget
      .addCase(fetchCurrentBudget.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentBudget = action.payload;
        state.categories = action.payload.categories;
        // Recalculate totals
        state.totalBudget = action.payload.categories.reduce((sum: number, cat: BudgetCategory) => sum + cat.budgetedAmount, 0);
        state.totalSpent = action.payload.categories.reduce((sum: number, cat: BudgetCategory) => sum + cat.spentAmount, 0);
        state.totalRemaining = state.totalBudget - state.totalSpent;
      })
      .addCase(fetchCurrentBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create budget
      .addCase(createBudget.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        state.budgets.push(action.payload);
        state.currentBudget = action.payload;
        state.categories = action.payload.categories;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(createBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update budget
      .addCase(updateBudget.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.budgets.findIndex(b => b.id === action.payload.id);
        if (index !== -1) {
          state.budgets[index] = action.payload;
          if (state.currentBudget?.id === action.payload.id) {
            state.currentBudget = action.payload;
            state.categories = action.payload.categories;
          }
          state.lastUpdated = new Date().toISOString();
        }
      })
      .addCase(updateBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete budget
      .addCase(deleteBudget.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        state.budgets = state.budgets.filter(b => b.id !== action.payload);
        if (state.currentBudget?.id === action.payload) {
          state.currentBudget = null;
          state.categories = [];
        }
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(deleteBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Add category
      .addCase(addCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories.push(action.payload);
        // Recalculate totals
        state.totalBudget = state.categories.reduce((sum: number, cat: BudgetCategory) => sum + cat.budgetedAmount, 0);
        state.totalSpent = state.categories.reduce((sum: number, cat: BudgetCategory) => sum + cat.spentAmount, 0);
        state.totalRemaining = state.totalBudget - state.totalSpent;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update category
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.categories.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
          // Recalculate totals
          state.totalBudget = state.categories.reduce((sum: number, cat: BudgetCategory) => sum + cat.budgetedAmount, 0);
          state.totalSpent = state.categories.reduce((sum: number, cat: BudgetCategory) => sum + cat.spentAmount, 0);
          state.totalRemaining = state.totalBudget - state.totalSpent;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete category
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = state.categories.filter(c => c.id !== action.payload);
        // Recalculate totals
        state.totalBudget = state.categories.reduce((sum: number, cat: BudgetCategory) => sum + cat.budgetedAmount, 0);
        state.totalSpent = state.categories.reduce((sum: number, cat: BudgetCategory) => sum + cat.spentAmount, 0);
        state.totalRemaining = state.totalBudget - state.totalSpent;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  clearBudgetError, 
  setCurrentBudget, 
  updateCategorySpending, 
  recalculateBudgetTotals
} = budgetSlice.actions;

export default budgetSlice.reducer;
