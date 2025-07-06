// src/services/api/transactionService.ts
import { mockTransactions } from '../mock/mockTransactions';
import { Transaction, TransactionStatus, TransactionType, AccountType, ServiceResponse } from '../../types';

export interface TransactionFilters {
  startDate?: string;
  endDate?: string;
  category?: string;
  merchant?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface TransactionStats {
  totalIncome: number;
  totalExpenses: number;
  netAmount: number;
  transactionCount: number;
  topCategory: string;
  averageTransaction: number;
}

export interface CreateTransactionRequest {
  amount: number;
  description: string;
  category: string;
  merchant: {
    id: string;
    name: string;
    category: string;
  };
  date?: string;
  notes?: string;
}

class TransactionService {
  private useMockData = __DEV__;

  async getTransactions(
    filters?: TransactionFilters
  ): Promise<ServiceResponse<Transaction[]>> {
    try {
      if (this.useMockData) {
        let filteredTransactions = [...mockTransactions];

        if (filters) {
          filteredTransactions = filteredTransactions.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            
            if (filters.startDate && transactionDate < new Date(filters.startDate)) {
              return false;
            }
            
            if (filters.endDate && transactionDate > new Date(filters.endDate)) {
              return false;
            }
            
            if (filters.category && transaction.category !== filters.category) {
              return false;
            }
            
            if (filters.merchant && !transaction.merchant.name.toLowerCase().includes(filters.merchant.toLowerCase())) {
              return false;
            }
            
            if (filters.minAmount && transaction.amount < filters.minAmount) {
              return false;
            }
            
            if (filters.maxAmount && transaction.amount > filters.maxAmount) {
              return false;
            }
            
            return true;
          });
        }

        return {
          data: filteredTransactions,
          success: true
        };
      }
      
      // Real API call will go here later
      throw new Error('Real API not implemented yet');
    } catch (error) {
      return {
        data: [],
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async getTransactionById(id: string): Promise<ServiceResponse<Transaction | null>> {
    try {
      if (this.useMockData) {
        const transaction = mockTransactions.find(t => t.id === id) || null;
        return {
          data: transaction,
          success: true
        };
      }
      
      // Real API call will go here later
      throw new Error('Real API not implemented yet');
    } catch (error) {
      return {
        data: null,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async createTransaction(
    transactionData: CreateTransactionRequest
  ): Promise<ServiceResponse<Transaction>> {
    try {
      if (this.useMockData) {
        const newTransaction: Transaction = {
          id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          amount: transactionData.amount,
          description: transactionData.description,
          category: transactionData.category,
          date: transactionData.date || new Date().toISOString(),
          merchant: transactionData.merchant,
          account: {
            id: "acc_default",
            name: "Default Account",
            type: AccountType.CHECKING,
            bank: { id: "bank_default", name: "Default Bank", supportedFeatures: [] },
            balance: 0,
            currency: "USD",
            isActive: true,
            accountNumber: "****0000",
            lastSync: new Date().toISOString()
          },
          type: transactionData.amount > 0 ? TransactionType.INCOME : TransactionType.EXPENSE,
          status: TransactionStatus.COMPLETED,
          tags: [],
          notes: transactionData.notes,
          metadata: {
            source: "manual",
            userModified: false
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        // In a real app, this would persist to a database
        return {
          data: newTransaction,
          success: true
        };
      }
      
      // Real API call will go here later
      throw new Error('Real API not implemented yet');
    } catch (error) {
      return {
        data: {} as Transaction,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async updateTransaction(
    id: string,
    updates: Partial<CreateTransactionRequest>
  ): Promise<ServiceResponse<Transaction>> {
    try {
      if (this.useMockData) {
        const existingTransaction = mockTransactions.find(t => t.id === id);
        
        if (!existingTransaction) {
          throw new Error('Transaction not found');
        }

        const updatedTransaction: Transaction = {
          ...existingTransaction,
          ...updates,
          merchant: updates.merchant || existingTransaction.merchant,
          updatedAt: new Date().toISOString()
        };

        return {
          data: updatedTransaction,
          success: true
        };
      }
      
      // Real API call will go here later
      throw new Error('Real API not implemented yet');
    } catch (error) {
      return {
        data: {} as Transaction,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async deleteTransaction(id: string): Promise<ServiceResponse<boolean>> {
    try {
      if (this.useMockData) {
        const transactionExists = mockTransactions.some(t => t.id === id);
        
        if (!transactionExists) {
          throw new Error('Transaction not found');
        }

        // In a real app, this would delete from database
        return {
          data: true,
          success: true
        };
      }
      
      // Real API call will go here later
      throw new Error('Real API not implemented yet');
    } catch (error) {
      return {
        data: false,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async getTransactionStats(
    filters?: TransactionFilters
  ): Promise<ServiceResponse<TransactionStats>> {
    try {
      if (this.useMockData) {
        const transactionsResponse = await this.getTransactions(filters);
        
        if (!transactionsResponse.success) {
          throw new Error(transactionsResponse.error);
        }

        const transactions = transactionsResponse.data;
        
        const income = transactions
          .filter(t => t.amount > 0)
          .reduce((sum, t) => sum + t.amount, 0);
        
        const expenses = Math.abs(
          transactions
            .filter(t => t.amount < 0)
            .reduce((sum, t) => sum + t.amount, 0)
        );

        const categoryCount = transactions.reduce((acc, t) => {
          acc[t.category] = (acc[t.category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const topCategory = Object.entries(categoryCount)
          .sort(([, a], [, b]) => b - a)[0]?.[0] || 'none';

        const stats: TransactionStats = {
          totalIncome: income,
          totalExpenses: expenses,
          netAmount: income - expenses,
          transactionCount: transactions.length,
          topCategory,
          averageTransaction: transactions.length > 0 
            ? transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0) / transactions.length 
            : 0
        };

        return {
          data: stats,
          success: true
        };
      }
      
      // Real API call will go here later
      throw new Error('Real API not implemented yet');
    } catch (error) {
      return {
        data: {
          totalIncome: 0,
          totalExpenses: 0,
          netAmount: 0,
          transactionCount: 0,
          topCategory: 'none',
          averageTransaction: 0
        },
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async getTransactionsByCategory(): Promise<ServiceResponse<Record<string, Transaction[]>>> {
    try {
      if (this.useMockData) {
        const transactionsResponse = await this.getTransactions();
        
        if (!transactionsResponse.success) {
          throw new Error(transactionsResponse.error);
        }

        const transactions = transactionsResponse.data;
        const grouped = transactions.reduce((acc, transaction) => {
          const category = transaction.category;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(transaction);
          return acc;
        }, {} as Record<string, Transaction[]>);

        return {
          data: grouped,
          success: true
        };
      }
      
      // Real API call will go here later
      throw new Error('Real API not implemented yet');
    } catch (error) {
      return {
        data: {},
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
}

export const transactionService = new TransactionService();