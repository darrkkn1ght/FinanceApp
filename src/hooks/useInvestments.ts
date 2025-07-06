// src/hooks/useInvestments.ts
import { useState, useEffect, useCallback } from 'react';
import { investmentService } from '../services/api/investmentService';
import { Investment, Portfolio } from '../types/investment';
import { CreateInvestmentRequest } from '../services/api';

interface InvestmentsState {
  investments: Investment[];
  portfolio: Portfolio | null;
  isLoading: boolean;
  error: string | null;
  watchlist: Investment[];
  marketData: {
    [symbol: string]: {
      currentPrice: number;
      change: number;
      changePercent: number;
      volume: number;
    };
  };
  totalValue: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
}

interface InvestmentsActions {
  loadInvestments: () => Promise<void>;
  loadPortfolio: () => Promise<void>;
  addInvestment: (investment: CreateInvestmentRequest) => Promise<boolean>;
  updateInvestment: (id: string, updates: Partial<Investment>) => Promise<boolean>;
  deleteInvestment: (id: string) => Promise<boolean>;
  addToWatchlist: (symbol: string) => Promise<boolean>;
  removeFromWatchlist: (symbol: string) => Promise<boolean>;
  refreshMarketData: () => Promise<void>;
  getInvestmentById: (id: string) => Investment | undefined;
  getInvestmentsByType: (type: string) => Investment[];
  calculatePortfolioAllocation: () => { [category: string]: number };
  getTopPerformers: (limit?: number) => Investment[];
  getWorstPerformers: (limit?: number) => Investment[];
  clearError: () => void;
}

export const useInvestments = (): InvestmentsState & InvestmentsActions => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [watchlist, setWatchlist] = useState<Investment[]>([]);
  const [marketData, setMarketData] = useState<{
    [symbol: string]: {
      currentPrice: number;
      change: number;
      changePercent: number;
      volume: number;
    };
  }>({});

  const calculateMetrics = useCallback(() => {
    const totalValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
    const totalCost = investments.reduce((sum, inv) => sum + inv.totalCost, 0);
    const totalGainLoss = totalValue - totalCost;
    const totalGainLossPercent = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0;

    return {
      totalValue,
      totalGainLoss,
      totalGainLossPercent,
    };
  }, [investments]);

  const { totalValue, totalGainLoss, totalGainLossPercent } = calculateMetrics();

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const loadInvestments = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await investmentService.getInvestments();
      
      if (response.success && response.data) {
        setInvestments(response.data);
      } else {
        setError(response.error || 'Failed to load investments');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load investments');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadPortfolio = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await investmentService.getPortfolio();
      
      if (response.success && response.data) {
        setPortfolio(response.data);
      } else {
        setError(response.error || 'Failed to load portfolio');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load portfolio');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addInvestment = useCallback(async (investment: CreateInvestmentRequest): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await investmentService.createInvestment(investment);
      
      if (response.success && response.data) {
        setInvestments(prev => [...prev, response.data!]);
        return true;
      } else {
        setError(response.error || 'Failed to add investment');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add investment');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateInvestment = useCallback(async (id: string, updates: Partial<Investment>): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await investmentService.updateInvestment(id, updates);
      
      if (response.success && response.data) {
        setInvestments(prev => prev.map(inv => inv.id === id ? response.data! : inv));
        return true;
      } else {
        setError(response.error || 'Failed to update investment');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update investment');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteInvestment = useCallback(async (id: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await investmentService.deleteInvestment(id);
      
      if (response.success) {
        setInvestments(prev => prev.filter(inv => inv.id !== id));
        return true;
      } else {
        setError(response.error || 'Failed to delete investment');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete investment');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addToWatchlist = useCallback(async (symbol: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await investmentService.addToWatchlist(symbol);
      
      if (response.success && response.data) {
        setWatchlist(prev => [...prev, response.data!]);
        return true;
      } else {
        setError(response.error || 'Failed to add to watchlist');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add to watchlist');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeFromWatchlist = useCallback(async (symbol: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await investmentService.removeFromWatchlist(symbol);
      
      if (response.success) {
        setWatchlist(prev => prev.filter(inv => inv.symbol !== symbol));
        return true;
      } else {
        setError(response.error || 'Failed to remove from watchlist');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove from watchlist');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshMarketData = useCallback(async () => {
    try {
      const symbols = Array.from(new Set([
        ...investments.map(inv => inv.symbol),
        ...watchlist.map(inv => inv.symbol),
      ]));
      
      const response = await investmentService.getMarketData(symbols);
      
      if (response.success && response.data) {
        setMarketData(response.data);
      } else {
        setError(response.error || 'Failed to refresh market data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh market data');
    }
  }, [investments, watchlist]);

  const getInvestmentById = useCallback((id: string): Investment | undefined => {
    return investments.find(inv => inv.id === id);
  }, [investments]);

  const getInvestmentsByType = useCallback((type: string): Investment[] => {
    return investments.filter(inv => inv.type === type);
  }, [investments]);

  const calculatePortfolioAllocation = useCallback((): { [category: string]: number } => {
    const allocation: { [category: string]: number } = {};
    const totalValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
    
    investments.forEach(inv => {
      const category = inv.type || 'Other';
      allocation[category] = (allocation[category] || 0) + inv.currentValue;
    });
    
    // Convert to percentages
    Object.keys(allocation).forEach(category => {
      allocation[category] = (allocation[category] / totalValue) * 100;
    });
    
    return allocation;
  }, [investments]);

  const getTopPerformers = useCallback((limit: number = 5): Investment[] => {
    return [...investments]
      .sort((a, b) => b.gainLossPercentage - a.gainLossPercentage)
      .slice(0, limit);
  }, [investments]);

  const getWorstPerformers = useCallback((limit: number = 5): Investment[] => {
    return [...investments]
      .sort((a, b) => a.gainLossPercentage - b.gainLossPercentage)
      .slice(0, limit);
  }, [investments]);

  useEffect(() => {
    loadInvestments();
    loadPortfolio();
  }, [loadInvestments, loadPortfolio]);

  useEffect(() => {
    if (investments.length > 0 || watchlist.length > 0) {
      refreshMarketData();
    }
  }, [investments, watchlist]);

  // Auto-refresh market data every 30 seconds
  useEffect(() => {
    const interval = globalThis.setInterval(() => {
      if (investments.length > 0 || watchlist.length > 0) {
        refreshMarketData();
      }
    }, 30000);

    return () => globalThis.clearInterval(interval);
  }, [investments, watchlist, refreshMarketData]);

  return {
    investments,
    portfolio,
    isLoading,
    error,
    watchlist,
    marketData,
    totalValue,
    totalGainLoss,
    totalGainLossPercent,
    loadInvestments,
    loadPortfolio,
    addInvestment,
    updateInvestment,
    deleteInvestment,
    addToWatchlist,
    removeFromWatchlist,
    refreshMarketData,
    getInvestmentById,
    getInvestmentsByType,
    calculatePortfolioAllocation,
    getTopPerformers,
    getWorstPerformers,
    clearError,
  };
};