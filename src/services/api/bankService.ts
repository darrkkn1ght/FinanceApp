// src/services/api/bankService.ts
import { mockBankAccounts, mockBankTransactions } from '../mock/mockBankData';
import { Account, ServiceResponse, AccountType } from '../../types';

// Helper function for delays
const delay = (ms: number) => new Promise(resolve => {
  // Use a simple delay without setTimeout for now
  const start = Date.now();
  while (Date.now() - start < ms) {
    // Busy wait - not ideal but works for mock data
  }
  resolve(undefined);
});

// Define types for bank service
type BankAccount = Account;
type BankTransaction = {
  id: string;
  accountId: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: 'expense' | 'income';
  status: 'completed' | 'pending';
};

// Global declarations
declare const __DEV__: boolean;

class BankService {
  private useMockData = __DEV__;

  async getConnectedAccounts(): Promise<ServiceResponse<BankAccount[]>> {
    try {
      if (this.useMockData) {
        // Simulate API delay
        await delay(800);
        
        return {
          data: mockBankAccounts,
          success: true
        };
      }
      
      // Real API implementation will go here
      throw new Error('Real bank API not implemented yet');
    } catch (error) {
      return {
        data: [],
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async getAccountTransactions(accountId: string): Promise<ServiceResponse<BankTransaction[]>> {
    try {
      if (this.useMockData) {
        // Simulate API delay
        await delay(600);
        
        // Filter transactions for specific account
        const accountTransactions = mockBankTransactions.filter(
          transaction => transaction.accountId === accountId
        );
        
        return {
          data: accountTransactions,
          success: true
        };
      }
      
      // Real API implementation will go here
      throw new Error('Real bank API not implemented yet');
    } catch (error) {
      return {
        data: [],
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async getAccountBalance(accountId: string): Promise<ServiceResponse<number>> {
    try {
      if (this.useMockData) {
        // Simulate API delay
        await delay(400);
        
        const account = mockBankAccounts.find(acc => acc.id === accountId);
        
        if (!account) {
          throw new Error('Account not found');
        }
        
        return {
          data: account.balance,
          success: true
        };
      }
      
      // Real API implementation will go here
      throw new Error('Real bank API not implemented yet');
    } catch (error) {
      return {
        data: 0,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async connectBankAccount(bankName: string, _credentials: unknown): Promise<ServiceResponse<BankAccount>> {
    try {
      if (this.useMockData) {
        // Simulate API delay
        await delay(2000);
        
        // Create mock new account
        const newAccount: BankAccount = {
          id: `acc_${Date.now()}`,
          name: `${bankName} Checking`,
          type: AccountType.CHECKING,
          bank: {
            id: bankName.toLowerCase(),
            name: bankName,
            logo: `https://logo.clearbit.com/${bankName.toLowerCase()}.com`,
            supportedFeatures: [
              { feature: 'transactions', enabled: true, description: 'Transaction history' },
              { feature: 'balance', enabled: true, description: 'Account balance' },
              { feature: 'transfers', enabled: true, description: 'Money transfers' }
            ]
          },
          balance: 2500.00,
          currency: 'USD',
          isActive: true,
          accountNumber: '**** **** **** 1234',
          lastSync: new Date().toISOString()
        };
        
        return {
          data: newAccount,
          success: true
        };
      }
      
      // Real API implementation will go here
      throw new Error('Real bank API not implemented yet');
    } catch (error) {
      return {
        data: {} as BankAccount,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to connect bank account'
      };
    }
  }

  async disconnectBankAccount(_accountId: string): Promise<ServiceResponse<boolean>> {
    try {
      if (this.useMockData) {
        // Simulate API delay
        await delay(1000);
        
        return {
          data: true,
          success: true
        };
      }
      
      // Real API implementation will go here
      throw new Error('Real bank API not implemented yet');
    } catch (error) {
      return {
        data: false,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to disconnect bank account'
      };
    }
  }

  async syncBankAccount(accountId: string): Promise<ServiceResponse<BankTransaction[]>> {
    try {
      if (this.useMockData) {
        // Simulate sync delay
        await delay(3000);
        
        // Return recent transactions for this account
        const recentTransactions = mockBankTransactions
          .filter(transaction => transaction.accountId === accountId)
          .slice(0, 5);
        
        return {
          data: recentTransactions,
          success: true
        };
      }
      
      // Real API implementation will go here
      throw new Error('Real bank API not implemented yet');
    } catch (error) {
      return {
        data: [],
        success: false,
        error: error instanceof Error ? error.message : 'Failed to sync bank account'
      };
    }
  }

  async getBankInstitutions(): Promise<ServiceResponse<Array<{ name: string; logo: string; id: string }>>> {
    try {
      if (this.useMockData) {
        const institutions = [
          { id: 'chase', name: 'Chase Bank', logo: 'https://logo.clearbit.com/chase.com' },
          { id: 'bofa', name: 'Bank of America', logo: 'https://logo.clearbit.com/bankofamerica.com' },
          { id: 'wells', name: 'Wells Fargo', logo: 'https://logo.clearbit.com/wellsfargo.com' },
          { id: 'citi', name: 'Citibank', logo: 'https://logo.clearbit.com/citi.com' },
          { id: 'usbank', name: 'US Bank', logo: 'https://logo.clearbit.com/usbank.com' },
          { id: 'pnc', name: 'PNC Bank', logo: 'https://logo.clearbit.com/pnc.com' },
          { id: 'capital', name: 'Capital One', logo: 'https://logo.clearbit.com/capitalone.com' },
          { id: 'td', name: 'TD Bank', logo: 'https://logo.clearbit.com/td.com' }
        ];
        
        return {
          data: institutions,
          success: true
        };
      }
      
      // Real API implementation will go here
      throw new Error('Real bank API not implemented yet');
    } catch (error) {
      return {
        data: [],
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch bank institutions'
      };
    }
  }
}

export const bankService = new BankService();