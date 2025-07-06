import { Account, AccountType } from '../../types/transaction';

// Mock bank accounts
export const mockBankAccounts: Account[] = [
  {
    id: 'acc_001',
    name: 'Primary Checking',
    type: AccountType.CHECKING,
    bank: {
      id: 'chase',
      name: 'Chase Bank',
      logo: 'https://logo.clearbit.com/chase.com',
      supportedFeatures: [
        { feature: 'transactions', enabled: true, description: 'Transaction history' },
        { feature: 'balance', enabled: true, description: 'Account balance' },
        { feature: 'transfers', enabled: true, description: 'Money transfers' }
      ]
    },
    balance: 5432.18,
    currency: 'USD',
    isActive: true,
    accountNumber: '12345678901234',
    lastSync: '2025-07-05T10:30:00Z'
  },
  {
    id: 'acc_002',
    name: 'Emergency Savings',
    type: AccountType.SAVINGS,
    bank: {
      id: 'bofa',
      name: 'Bank of America',
      logo: 'https://logo.clearbit.com/bankofamerica.com',
      supportedFeatures: [
        { feature: 'transactions', enabled: true, description: 'Transaction history' },
        { feature: 'balance', enabled: true, description: 'Account balance' },
        { feature: 'transfers', enabled: true, description: 'Money transfers' }
      ]
    },
    balance: 12500.00,
    currency: 'USD',
    isActive: true,
    accountNumber: '98765432109876',
    lastSync: '2025-07-05T10:30:00Z'
  },
  {
    id: 'acc_003',
    name: 'Travel Rewards Card',
    type: AccountType.CREDIT_CARD,
    bank: {
      id: 'capital',
      name: 'Capital One',
      logo: 'https://logo.clearbit.com/capitalone.com',
      supportedFeatures: [
        { feature: 'transactions', enabled: true, description: 'Transaction history' },
        { feature: 'balance', enabled: true, description: 'Account balance' }
      ]
    },
    balance: 1250.75,
    currency: 'USD',
    isActive: true,
    accountNumber: '55556666777788',
    lastSync: '2025-07-05T10:30:00Z'
  }
];

// Mock bank transactions (simplified version of Transaction type)
export const mockBankTransactions: Array<{
  id: string;
  accountId: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: 'expense' | 'income';
  status: 'completed' | 'pending';
}> = [
  {
    id: 'txn_001',
    accountId: 'acc_001',
    amount: -45.67,
    description: 'Starbucks Coffee Downtown',
    category: 'dining',
    date: '2025-07-05T10:30:00Z',
    type: 'expense',
    status: 'completed'
  },
  {
    id: 'txn_002',
    accountId: 'acc_001',
    amount: 2500.00,
    description: 'Salary Deposit',
    category: 'income',
    date: '2025-07-04T09:00:00Z',
    type: 'income',
    status: 'completed'
  },
  {
    id: 'txn_003',
    accountId: 'acc_001',
    amount: -125.45,
    description: 'Whole Foods Market',
    category: 'groceries',
    date: '2025-07-03T15:45:00Z',
    type: 'expense',
    status: 'completed'
  },
  {
    id: 'txn_004',
    accountId: 'acc_002',
    amount: 500.00,
    description: 'Monthly Savings Transfer',
    category: 'transfer',
    date: '2025-07-01T00:00:00Z',
    type: 'income',
    status: 'completed'
  },
  {
    id: 'txn_005',
    accountId: 'acc_003',
    amount: -89.99,
    description: 'Amazon.com',
    category: 'shopping',
    date: '2025-07-02T14:20:00Z',
    type: 'expense',
    status: 'completed'
  }
]; 