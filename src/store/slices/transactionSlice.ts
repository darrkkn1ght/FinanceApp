// src/store/slices/transactionSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { transactionService, TransactionFilters } from '../../services/api/transactionService';
import { Transaction } from '../../types/transaction';

interface TransactionState {
  transactions: Transaction[];
  categories: string[];
  summary: unknown | null;
  filteredTransactions: Transaction[];
  activeFilters: TransactionFilters;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  hasMore: boolean;
  page: number;
}

const initialState: TransactionState = {
  transactions: [],
  categories: [],
  summary: null,
  filteredTransactions: [],
  activeFilters: {
    startDate: '',
    endDate: '',
    category: '',
    merchant: '',
    minAmount: 0,
    maxAmount: 0,
  },
  loading: false,
  error: null,
  lastUpdated: null,
  hasMore: true,
  page: 1,
};

// Async thunks
export const fetchTransactions = createAsyncThunk(
  'transaction/fetchTransactions',
  async (filters: TransactionFilters | undefined, { rejectWithValue }) => {
    try {
      const response = await transactionService.getTransactions(filters);
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to fetch transactions');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const fetchTransactionById = createAsyncThunk(
  'transaction/fetchTransactionById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await transactionService.getTransactionById(id);
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to fetch transaction');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const fetchTransactionCategories = createAsyncThunk(
  'transaction/fetchTransactionCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await transactionService.getTransactionsByCategory();
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to fetch transaction categories');
      }
      return Object.keys(response.data);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const fetchTransactionSummary = createAsyncThunk(
  'transaction/fetchTransactionSummary',
  async (_, { rejectWithValue }) => {
    try {
      const response = await transactionService.getTransactionStats();
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to fetch transaction summary');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const addTransaction = createAsyncThunk(
  'transaction/addTransaction',
  async (transaction: { amount: number; description: string; category: string; merchant: { id: string; name: string; category: string }; date?: string; notes?: string }, { rejectWithValue }) => {
    try {
      const response = await transactionService.createTransaction(transaction);
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to add transaction');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const updateTransaction = createAsyncThunk(
  'transaction/updateTransaction',
  async ({ id, updates }: { id: string; updates: Partial<Transaction> }, { rejectWithValue }) => {
    try {
      const response = await transactionService.updateTransaction(id, updates);
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to update transaction');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  'transaction/deleteTransaction',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await transactionService.deleteTransaction(id);
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to delete transaction');
      }
      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const bulkDeleteTransactions = createAsyncThunk(
  'transaction/bulkDeleteTransactions',
  async (ids: string[], { rejectWithValue }) => {
    try {
      // Since bulk delete doesn't exist, we'll delete them one by one
      const results = await Promise.all(
        ids.map(id => transactionService.deleteTransaction(id))
      );
      const failed = results.filter(r => !r.success);
      if (failed.length > 0) {
        return rejectWithValue('Some transactions failed to delete');
      }
      return ids;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const searchTransactions = createAsyncThunk(
  'transaction/searchTransactions',
  async (query: string, { rejectWithValue }) => {
    try {
      // Use getTransactions with a filter that includes the search term
      const response = await transactionService.getTransactions({
        merchant: query
      });
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to search transactions');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    clearTransactionError: (state) => {
      state.error = null;
    },
    setTransactionLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearTransactionData: (state) => {
      state.transactions = [];
      state.categories = [];
      state.summary = null;
      state.filteredTransactions = [];
      state.error = null;
      state.lastUpdated = null;
      state.hasMore = true;
      state.page = 1;
    },
    setTransactionFilters: (state, action: PayloadAction<TransactionFilters>) => {
      state.activeFilters = action.payload;
      state.filteredTransactions = applyFilters(state.transactions, action.payload);
    },
    clearTransactionFilters: (state) => {
      state.activeFilters = initialState.activeFilters;
      state.filteredTransactions = state.transactions;
    },
    updateTransactionFilter: (state, action: PayloadAction<{ key: keyof TransactionFilters; value: unknown }>) => {
      const { key, value } = action.payload;
      (state.activeFilters as Record<string, unknown>)[key] = value;
      state.filteredTransactions = applyFilters(state.transactions, state.activeFilters);
    },
    addTransactionToList: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload);
      state.filteredTransactions = applyFilters(state.transactions, state.activeFilters);
    },
    updateTransactionInList: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index] = action.payload;
        state.filteredTransactions = applyFilters(state.transactions, state.activeFilters);
      }
    },
    removeTransactionFromList: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
      state.filteredTransactions = applyFilters(state.transactions, state.activeFilters);
    },
    setTransactionPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    resetTransactionPagination: (state) => {
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch transactions
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
        state.filteredTransactions = applyFilters(state.transactions, state.activeFilters);
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch transaction by ID
      .addCase(fetchTransactionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionById.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          const existingIndex = state.transactions.findIndex(t => t.id === action.payload!.id);
          if (existingIndex !== -1) {
            state.transactions[existingIndex] = action.payload!;
          } else {
            state.transactions.unshift(action.payload!);
          }
          state.filteredTransactions = applyFilters(state.transactions, state.activeFilters);
        }
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchTransactionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch transaction categories
      .addCase(fetchTransactionCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchTransactionCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch transaction summary
      .addCase(fetchTransactionSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchTransactionSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Add transaction
      .addCase(addTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions.unshift(action.payload);
        state.filteredTransactions = applyFilters(state.transactions, state.activeFilters);
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Update transaction
      .addCase(updateTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.transactions.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
        state.filteredTransactions = applyFilters(state.transactions, state.activeFilters);
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Delete transaction
      .addCase(deleteTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = state.transactions.filter(t => t.id !== action.payload);
        state.filteredTransactions = applyFilters(state.transactions, state.activeFilters);
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Bulk delete transactions
      .addCase(bulkDeleteTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bulkDeleteTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = state.transactions.filter(t => !action.payload.includes(t.id));
        state.filteredTransactions = applyFilters(state.transactions, state.activeFilters);
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(bulkDeleteTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Search transactions
      .addCase(searchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredTransactions = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(searchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Helper function to apply filters
const applyFilters = (transactions: Transaction[], filters: TransactionFilters): Transaction[] => {
  return transactions.filter(transaction => {
    // Date range filter
    if (filters.startDate || filters.endDate) {
      const transactionDate = new Date(transaction.date);
      if (filters.startDate && transactionDate < new Date(filters.startDate)) {
        return false;
      }
      if (filters.endDate && transactionDate > new Date(filters.endDate)) {
        return false;
      }
    }
    
    // Category filter
    if (filters.category && transaction.category !== filters.category) {
      return false;
    }
    
    // Merchant filter
    if (filters.merchant && !transaction.merchant.name.toLowerCase().includes(filters.merchant.toLowerCase())) {
      return false;
    }
    
    // Amount range filter
    if (filters.minAmount !== undefined && transaction.amount < filters.minAmount) {
      return false;
    }
    if (filters.maxAmount !== undefined && transaction.amount > filters.maxAmount) {
      return false;
    }
    
    return true;
  });
};

export const {
  clearTransactionError,
  setTransactionLoading,
  clearTransactionData,
  setTransactionFilters,
  clearTransactionFilters,
  updateTransactionFilter,
  addTransactionToList,
  updateTransactionInList,
  removeTransactionFromList,
  setTransactionPage,
  resetTransactionPagination,
} = transactionSlice.actions;

export default transactionSlice.reducer;
