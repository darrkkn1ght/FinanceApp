// src/hooks/useTransactions.ts
import { useState, useEffect, useCallback } from 'react';
import { transactionService, CreateTransactionRequest, TransactionFilters } from '../services/api/transactionService';
import { Transaction } from '../types/transaction';

interface TransactionsState {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  filters: TransactionFilters;
  summary: {
    totalIncome: number;
    totalExpenses: number;
    netAmount: number;
    transactionCount: number;
  };
}

interface TransactionsActions {
  loadTransactions: (page?: number) => Promise<void>;
  addTransaction: (transaction: CreateTransactionRequest) => Promise<boolean>;
  updateTransaction: (id: string, updates: Partial<Transaction>) => Promise<boolean>;
  deleteTransaction: (id: string) => Promise<boolean>;
  applyFilters: (filters: Partial<TransactionFilters>) => void;
  clearFilters: () => void;
  refreshTransactions: () => Promise<void>;
  getTransactionById: (id: string) => Transaction | undefined;
  getTransactionsByCategory: (category: string) => Transaction[];
  getTransactionsByDateRange: (startDate: string, endDate: string) => Transaction[];
  clearError: () => void;
}

const initialFilters: TransactionFilters = {
  category: '',
  startDate: '',
  endDate: '',
  minAmount: 0,
  maxAmount: 0,
  merchant: '',
};

export const useTransactions = (): TransactionsState & TransactionsActions => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<TransactionFilters>(initialFilters);

  const calculateSummary = useCallback((transactionsList: Transaction[]) => {
    const totalIncome = transactionsList
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = Math.abs(
      transactionsList
        .filter(t => t.amount < 0)
        .reduce((sum, t) => sum + t.amount, 0)
    );

    return {
      totalIncome,
      totalExpenses,
      netAmount: totalIncome - totalExpenses,
      transactionCount: transactionsList.length,
    };
  }, []);

  const summary = calculateSummary(filteredTransactions);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const loadTransactions = useCallback(async (page: number = 1) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await transactionService.getTransactions();
      
      if (response.success && response.data) {
        setTransactions(response.data);
        setFilteredTransactions(response.data);
        setTotalPages(1);
        setCurrentPage(page);
      } else {
        setError(response.error || 'Failed to load transactions');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load transactions');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addTransaction = useCallback(async (transaction: CreateTransactionRequest): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await transactionService.createTransaction(transaction);
      
      if (response.success && response.data) {
        setTransactions(prev => [response.data!, ...prev]);
        setFilteredTransactions(prev => [response.data!, ...prev]);
        return true;
      } else {
        setError(response.error || 'Failed to add transaction');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add transaction');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateTransaction = useCallback(async (id: string, updates: Partial<Transaction>): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await transactionService.updateTransaction(id, updates);
      
      if (response.success && response.data) {
        setTransactions(prev => prev.map(t => t.id === id ? response.data! : t));
        setFilteredTransactions(prev => prev.map(t => t.id === id ? response.data! : t));
        return true;
      } else {
        setError(response.error || 'Failed to update transaction');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update transaction');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteTransaction = useCallback(async (id: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await transactionService.deleteTransaction(id);
      
      if (response.success) {
        setTransactions(prev => prev.filter(t => t.id !== id));
        setFilteredTransactions(prev => prev.filter(t => t.id !== id));
        return true;
      } else {
        setError(response.error || 'Failed to delete transaction');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete transaction');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const applyFilters = useCallback((newFilters: Partial<TransactionFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    let filtered = [...transactions];

    // Apply category filter
    if (updatedFilters.category) {
      filtered = filtered.filter(t => t.category === updatedFilters.category);
    }

    // Apply date range filter
    if (updatedFilters.startDate && updatedFilters.endDate) {
      filtered = filtered.filter(t => {
        const transactionDate = new Date(t.date);
        const startDate = new Date(updatedFilters.startDate!);
        const endDate = new Date(updatedFilters.endDate!);
        return transactionDate >= startDate && transactionDate <= endDate;
      });
    }

    // Apply amount range filter
    if (updatedFilters.minAmount !== undefined && updatedFilters.minAmount > 0) {
      filtered = filtered.filter(t => Math.abs(t.amount) >= updatedFilters.minAmount!);
    }

    if (updatedFilters.maxAmount !== undefined && updatedFilters.maxAmount > 0) {
      filtered = filtered.filter(t => Math.abs(t.amount) <= updatedFilters.maxAmount!);
    }

    // Apply merchant search filter
    if (updatedFilters.merchant) {
      const merchantTerm = updatedFilters.merchant.toLowerCase();
      filtered = filtered.filter(t => 
        t.description.toLowerCase().includes(merchantTerm) ||
        t.merchant.name.toLowerCase().includes(merchantTerm) ||
        t.category.toLowerCase().includes(merchantTerm)
      );
    }

    // Apply sorting by date (default)
    filtered.sort((a, b) => {
      const aDate = new Date(a.date).getTime();
      const bDate = new Date(b.date).getTime();
      return bDate - aDate; // Descending order
    });

    setFilteredTransactions(filtered);
  }, [filters, transactions]);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
    setFilteredTransactions(transactions);
  }, [transactions]);

  const refreshTransactions = useCallback(async () => {
    await loadTransactions(currentPage);
  }, [loadTransactions, currentPage]);

  const getTransactionById = useCallback((id: string): Transaction | undefined => {
    return transactions.find(t => t.id === id);
  }, [transactions]);

  const getTransactionsByCategory = useCallback((category: string): Transaction[] => {
    return transactions.filter(t => t.category === category);
  }, [transactions]);

  const getTransactionsByDateRange = useCallback((startDate: string, endDate: string): Transaction[] => {
    return transactions.filter(t => {
      const transactionDate = new Date(t.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return transactionDate >= start && transactionDate <= end;
    });
  }, [transactions]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  useEffect(() => {
    applyFilters({});
  }, [transactions]);

  return {
    transactions,
    filteredTransactions,
    isLoading,
    error,
    totalPages,
    currentPage,
    filters,
    summary,
    loadTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    applyFilters,
    clearFilters,
    refreshTransactions,
    getTransactionById,
    getTransactionsByCategory,
    getTransactionsByDateRange,
    clearError,
  };
};