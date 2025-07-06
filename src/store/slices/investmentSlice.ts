// src/store/slices/investmentSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { investmentService, InvestmentPerformance } from '../../services/api/investmentService';
import { Investment, Portfolio } from '../../types/investment';

interface InvestmentState {
  investments: Investment[];
  portfolio: Portfolio | null;
  performance: InvestmentPerformance | null;
  totalValue: number;
  totalGain: number;
  totalGainPercentage: number;
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

const initialState: InvestmentState = {
  investments: [],
  portfolio: null,
  performance: null,
  totalValue: 0,
  totalGain: 0,
  totalGainPercentage: 0,
  isLoading: false,
  error: null,
  lastUpdated: null,
};

// Async thunks
export const fetchInvestments = createAsyncThunk(
  'investment/fetchInvestments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await investmentService.getInvestments();
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to fetch investments');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const fetchPortfolio = createAsyncThunk(
  'investment/fetchPortfolio',
  async (_, { rejectWithValue }) => {
    try {
      const response = await investmentService.getPortfolio();
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to fetch portfolio');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const fetchPerformance = createAsyncThunk(
  'investment/fetchPerformance',
  async (period: '1D' | '1W' | '1M' | '3M' | '6M' | '1Y', { rejectWithValue }) => {
    try {
      const response = await investmentService.getPortfolioPerformance();
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to fetch performance');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const addInvestment = createAsyncThunk(
  'investment/addInvestment',
  async (investment: Omit<Investment, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      const response = await investmentService.createInvestment(investment);
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to add investment');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const updateInvestment = createAsyncThunk(
  'investment/updateInvestment',
  async ({ id, updates }: { id: string; updates: Partial<Investment> }, { rejectWithValue }) => {
    try {
      const response = await investmentService.updateInvestment(id, updates);
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to update investment');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

export const deleteInvestment = createAsyncThunk(
  'investment/deleteInvestment',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await investmentService.deleteInvestment(id);
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to delete investment');
      }
      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

const investmentSlice = createSlice({
  name: 'investment',
  initialState,
  reducers: {
    clearInvestmentError: (state) => {
      state.error = null;
    },
    updateInvestmentPrice: (state, action: PayloadAction<{ symbol: string; price: number }>) => {
      const { symbol, price } = action.payload;
      const investment = state.investments.find(inv => inv.symbol === symbol);
      if (investment) {
        investment.currentPrice = price;
        investment.currentValue = investment.shares * price;
        investment.gainLoss = investment.currentValue - investment.totalCost;
        investment.gainLossPercentage = ((investment.gainLoss / investment.totalCost) * 100);
        investment.metadata.lastUpdated = new Date().toISOString();
      }
      // Recalculate totals
      state.totalValue = state.investments.reduce((sum, inv) => sum + inv.currentValue, 0);
      const totalCost = state.investments.reduce((sum, inv) => sum + inv.totalCost, 0);
      state.totalGain = state.totalValue - totalCost;
      state.totalGainPercentage = totalCost > 0 ? ((state.totalGain / totalCost) * 100) : 0;
    },
    refreshInvestmentData: (state) => {
      state.lastUpdated = new Date().toISOString();
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch investments
      .addCase(fetchInvestments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInvestments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.investments = action.payload;
        state.totalValue = action.payload.reduce((sum, inv) => sum + inv.currentValue, 0);
        const totalCost = action.payload.reduce((sum, inv) => sum + inv.totalCost, 0);
        state.totalGain = state.totalValue - totalCost;
        state.totalGainPercentage = totalCost > 0 ? ((state.totalGain / totalCost) * 100) : 0;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchInvestments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch portfolio
      .addCase(fetchPortfolio.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPortfolio.fulfilled, (state, action) => {
        state.isLoading = false;
        state.portfolio = action.payload;
      })
      .addCase(fetchPortfolio.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch performance
      .addCase(fetchPerformance.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPerformance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.performance = action.payload;
      })
      .addCase(fetchPerformance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Add investment
      .addCase(addInvestment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addInvestment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.investments.push(action.payload);
        state.totalValue += action.payload.currentValue;
        const totalCost = state.investments.reduce((sum, inv) => sum + inv.totalCost, 0);
        state.totalGain = state.totalValue - totalCost;
        state.totalGainPercentage = totalCost > 0 ? ((state.totalGain / totalCost) * 100) : 0;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(addInvestment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update investment
      .addCase(updateInvestment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateInvestment.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.investments.findIndex(inv => inv.id === action.payload.id);
        if (index !== -1) {
          state.investments[index] = action.payload;
          state.totalValue = state.investments.reduce((sum, inv) => sum + inv.currentValue, 0);
          const totalCost = state.investments.reduce((sum, inv) => sum + inv.totalCost, 0);
          state.totalGain = state.totalValue - totalCost;
          state.totalGainPercentage = totalCost > 0 ? ((state.totalGain / totalCost) * 100) : 0;
          state.lastUpdated = new Date().toISOString();
        }
      })
      .addCase(updateInvestment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete investment
      .addCase(deleteInvestment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteInvestment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.investments = state.investments.filter(inv => inv.id !== action.payload);
        state.totalValue = state.investments.reduce((sum, inv) => sum + inv.currentValue, 0);
        const totalCost = state.investments.reduce((sum, inv) => sum + inv.totalCost, 0);
        state.totalGain = state.totalValue - totalCost;
        state.totalGainPercentage = totalCost > 0 ? ((state.totalGain / totalCost) * 100) : 0;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(deleteInvestment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  clearInvestmentError, 
  updateInvestmentPrice, 
  refreshInvestmentData 
} = investmentSlice.actions;

export default investmentSlice.reducer;
