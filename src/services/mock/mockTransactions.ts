import { Transaction, AccountType, TransactionType, TransactionStatus } from '../../types/transaction';

export const mockTransactions: Transaction[] = [
  {
    id: "txn_1234567890",
    amount: -45.67,
    description: "Starbucks Coffee Downtown",
    category: "dining",
    subcategory: "coffee_shop",
    date: "2025-07-05T10:30:00Z",
    merchant: {
      id: "merchant_starbucks",
      name: "Starbucks",
      category: "coffee_shop"
    },
    account: {
      id: "acc_checking_001",
      name: "Chase Checking",
      type: AccountType.CHECKING,
      bank: {
        id: "bank_chase",
        name: "Chase Bank",
        supportedFeatures: []
      },
      balance: 2500.00,
      currency: "USD",
      isActive: true,
      accountNumber: "****1234",
      lastSync: "2025-07-05T10:30:00Z"
    },
    type: TransactionType.EXPENSE,
    status: TransactionStatus.COMPLETED,
    tags: ["coffee", "morning"],
    receipt: undefined,
    location: {
      latitude: 47.6062,
      longitude: -122.3321
    },
    metadata: {
      source: "manual",
      userModified: false
    },
    createdAt: "2025-07-05T10:30:00Z",
    updatedAt: "2025-07-05T10:30:00Z"
  },
  {
    id: "txn_1234567891",
    amount: 3250.00,
    description: "Salary Deposit",
    category: "income",
    subcategory: "salary",
    date: "2025-07-01T08:00:00Z",
    merchant: {
      id: "merchant_techcorp",
      name: "Tech Corp Inc",
      category: "employer"
    },
    account: {
      id: "acc_checking_001",
      name: "Chase Checking",
      type: AccountType.CHECKING,
      bank: {
        id: "bank_chase",
        name: "Chase Bank",
        supportedFeatures: []
      },
      balance: 2500.00,
      currency: "USD",
      isActive: true,
      accountNumber: "****1234",
      lastSync: "2025-07-01T08:00:00Z"
    },
    type: TransactionType.INCOME,
    status: TransactionStatus.COMPLETED,
    tags: ["salary", "monthly"],
    receipt: undefined,
    location: undefined,
    metadata: {
      source: "bank_sync",
      userModified: false
    },
    createdAt: "2025-07-01T08:00:00Z",
    updatedAt: "2025-07-01T08:00:00Z"
  },
  {
    id: "txn_1234567892",
    amount: -89.99,
    description: "Amazon Prime Purchase",
    category: "shopping",
    subcategory: "online",
    date: "2025-07-04T14:25:00Z",
    merchant: {
      id: "merchant_amazon",
      name: "Amazon",
      category: "online_retail"
    },
    account: {
      id: "acc_credit_001",
      name: "Chase Freedom",
      type: AccountType.CREDIT_CARD,
      bank: {
        id: "bank_chase",
        name: "Chase Bank",
        supportedFeatures: []
      },
      balance: -1500.00,
      currency: "USD",
      isActive: true,
      accountNumber: "****5678",
      lastSync: "2025-07-04T14:25:00Z"
    },
    type: TransactionType.EXPENSE,
    status: TransactionStatus.COMPLETED,
    tags: ["online", "electronics"],
    receipt: undefined,
    location: undefined,
    metadata: {
      source: "bank_sync",
      userModified: false
    },
    createdAt: "2025-07-04T14:25:00Z",
    updatedAt: "2025-07-04T14:25:00Z"
  },
  {
    id: "txn_1234567893",
    amount: -1200.00,
    description: "Rent Payment",
    category: "housing",
    subcategory: "rent",
    date: "2025-07-01T09:00:00Z",
    merchant: {
      id: "merchant_westfield",
      name: "Westfield Apartments",
      category: "property_management"
    },
    account: {
      id: "acc_checking_001",
      name: "Chase Checking",
      type: AccountType.CHECKING,
      bank: {
        id: "bank_chase",
        name: "Chase Bank",
        supportedFeatures: []
      },
      balance: 2500.00,
      currency: "USD",
      isActive: true,
      accountNumber: "****1234",
      lastSync: "2025-07-01T09:00:00Z"
    },
    type: TransactionType.EXPENSE,
    status: TransactionStatus.COMPLETED,
    tags: ["housing", "monthly", "fixed"],
    receipt: undefined,
    location: undefined,
    metadata: {
      source: "manual",
      userModified: false
    },
    createdAt: "2025-07-01T09:00:00Z",
    updatedAt: "2025-07-01T09:00:00Z"
  },
  {
    id: "txn_1234567894",
    amount: -65.43,
    description: "Whole Foods Market",
    category: "groceries",
    subcategory: "supermarket",
    date: "2025-07-03T18:45:00Z",
    merchant: {
      id: "merchant_wholefoods",
      name: "Whole Foods Market",
      category: "grocery_store"
    },
    account: {
      id: "acc_checking_001",
      name: "Chase Checking",
      type: AccountType.CHECKING,
      bank: {
        id: "bank_chase",
        name: "Chase Bank",
        supportedFeatures: []
      },
      balance: 2500.00,
      currency: "USD",
      isActive: true,
      accountNumber: "****1234",
      lastSync: "2025-07-03T18:45:00Z"
    },
    type: TransactionType.EXPENSE,
    status: TransactionStatus.COMPLETED,
    tags: ["groceries", "organic"],
    receipt: undefined,
    location: {
      latitude: 47.6205,
      longitude: -122.3212
    },
    metadata: {
      source: "manual",
      userModified: false
    },
    createdAt: "2025-07-03T18:45:00Z",
    updatedAt: "2025-07-03T18:45:00Z"
  },
  {
    id: "txn_1234567895",
    amount: -25.00,
    description: "Uber Ride",
    category: "transportation",
    subcategory: "rideshare",
    date: "2025-07-02T19:30:00Z",
    merchant: {
      id: "merchant_uber",
      name: "Uber",
      category: "transportation"
    },
    account: {
      id: "acc_credit_001",
      name: "Chase Freedom",
      type: AccountType.CREDIT_CARD,
      bank: {
        id: "bank_chase",
        name: "Chase Bank",
        supportedFeatures: []
      },
      balance: -1500.00,
      currency: "USD",
      isActive: true,
      accountNumber: "****5678",
      lastSync: "2025-07-02T19:30:00Z"
    },
    type: TransactionType.EXPENSE,
    status: TransactionStatus.COMPLETED,
    tags: ["transportation", "rideshare"],
    notes: "Ride to downtown",
    receipt: undefined,
    location: undefined,
    metadata: {
      source: "bank_sync",
      userModified: false
    },
    createdAt: "2025-07-02T19:30:00Z",
    updatedAt: "2025-07-02T19:30:00Z"
  },
  {
    id: "txn_1234567896",
    amount: -150.00,
    description: "Electric Bill",
    category: "utilities",
    subcategory: "electricity",
    date: "2025-06-30T12:00:00Z",
    merchant: {
      id: "merchant_seattlecitylight",
      name: "Seattle City Light",
      category: "utility_company"
    },
    account: {
      id: "acc_checking_001",
      name: "Chase Checking",
      type: AccountType.CHECKING,
      bank: {
        id: "bank_chase",
        name: "Chase Bank",
        supportedFeatures: []
      },
      balance: 2500.00,
      currency: "USD",
      isActive: true,
      accountNumber: "****1234",
      lastSync: "2025-06-30T12:00:00Z"
    },
    type: TransactionType.EXPENSE,
    status: TransactionStatus.COMPLETED,
    tags: ["utilities", "monthly", "fixed"],
    notes: "Monthly electric bill",
    receipt: undefined,
    location: undefined,
    metadata: {
      source: "manual",
      userModified: false
    },
    createdAt: "2025-06-30T12:00:00Z",
    updatedAt: "2025-06-30T12:00:00Z"
  },
  {
    id: "txn_1234567897",
    amount: -12.50,
    description: "Netflix Subscription",
    category: "entertainment",
    subcategory: "streaming",
    date: "2025-07-01T12:00:00Z",
    merchant: {
      id: "merchant_netflix",
      name: "Netflix",
      category: "streaming_service"
    },
    account: {
      id: "acc_credit_001",
      name: "Chase Freedom",
      type: AccountType.CREDIT_CARD,
      bank: {
        id: "bank_chase",
        name: "Chase Bank",
        supportedFeatures: []
      },
      balance: -1500.00,
      currency: "USD",
      isActive: true,
      accountNumber: "****5678",
      lastSync: "2025-07-01T12:00:00Z"
    },
    type: TransactionType.EXPENSE,
    status: TransactionStatus.COMPLETED,
    tags: ["entertainment", "subscription", "monthly"],
    notes: "Monthly Netflix subscription",
    receipt: undefined,
    location: undefined,
    metadata: {
      source: "bank_sync",
      userModified: false
    },
    createdAt: "2025-07-01T12:00:00Z",
    updatedAt: "2025-07-01T12:00:00Z"
  },
  {
    id: "txn_1234567898",
    amount: -78.90,
    description: "Shell Gas Station",
    category: "transportation",
    subcategory: "fuel",
    date: "2025-07-02T07:15:00Z",
    merchant: {
      id: "merchant_shell",
      name: "Shell",
      category: "gas_station"
    },
    account: {
      id: "acc_credit_001",
      name: "Chase Freedom",
      type: AccountType.CREDIT_CARD,
      bank: {
        id: "bank_chase",
        name: "Chase Bank",
        supportedFeatures: []
      },
      balance: -1500.00,
      currency: "USD",
      isActive: true,
      accountNumber: "****5678",
      lastSync: "2025-07-02T07:15:00Z"
    },
    type: TransactionType.EXPENSE,
    status: TransactionStatus.COMPLETED,
    tags: ["gas", "transportation"],
    notes: "Weekly gas fill-up",
    receipt: undefined,
    location: {
      latitude: 47.6097,
      longitude: -122.3331
    },
    metadata: {
      source: "manual",
      userModified: false
    },
    createdAt: "2025-07-02T07:15:00Z",
    updatedAt: "2025-07-02T07:15:00Z"
  },
  {
    id: "txn_1234567899",
    amount: 500.00,
    description: "Freelance Project Payment",
    category: "income",
    subcategory: "freelance",
    date: "2025-07-03T16:00:00Z",
    merchant: {
      id: "merchant_designagency",
      name: "Design Agency LLC",
      category: "client"
    },
    account: {
      id: "acc_checking_001",
      name: "Chase Checking",
      type: AccountType.CHECKING,
      bank: {
        id: "bank_chase",
        name: "Chase Bank",
        supportedFeatures: []
      },
      balance: 2500.00,
      currency: "USD",
      isActive: true,
      accountNumber: "****1234",
      lastSync: "2025-07-03T16:00:00Z"
    },
    type: TransactionType.INCOME,
    status: TransactionStatus.COMPLETED,
    tags: ["freelance", "design", "project"],
    notes: "Website design project completion",
    receipt: undefined,
    location: undefined,
    metadata: {
      source: "bank_sync",
      userModified: false
    },
    createdAt: "2025-07-03T16:00:00Z",
    updatedAt: "2025-07-03T16:00:00Z"
  },
  {
    id: "txn_1234567900",
    amount: -35.20,
    description: "Chipotle Mexican Grill",
    category: "dining",
    subcategory: "fast_casual",
    date: "2025-07-04T12:30:00Z",
    merchant: {
      id: "merchant_chipotle",
      name: "Chipotle",
      category: "restaurant"
    },
    account: {
      id: "acc_credit_001",
      name: "Chase Freedom",
      type: AccountType.CREDIT_CARD,
      bank: {
        id: "bank_chase",
        name: "Chase Bank",
        supportedFeatures: []
      },
      balance: -1500.00,
      currency: "USD",
      isActive: true,
      accountNumber: "****5678",
      lastSync: "2025-07-04T12:30:00Z"
    },
    type: TransactionType.EXPENSE,
    status: TransactionStatus.COMPLETED,
    tags: ["lunch", "fast_casual"],
    notes: "Team lunch",
    receipt: undefined,
    location: {
      latitude: 47.6588,
      longitude: -122.3131
    },
    metadata: {
      source: "manual",
      userModified: false
    },
    createdAt: "2025-07-04T12:30:00Z",
    updatedAt: "2025-07-04T12:30:00Z"
  },
  {
    id: "txn_1234567901",
    amount: -299.99,
    description: "Nike Store Purchase",
    category: "shopping",
    subcategory: "clothing",
    date: "2025-07-01T15:45:00Z",
    merchant: {
      id: "merchant_nike",
      name: "Nike",
      category: "retail_store"
    },
    account: {
      id: "acc_credit_001",
      name: "Chase Freedom",
      type: AccountType.CREDIT_CARD,
      bank: {
        id: "bank_chase",
        name: "Chase Bank",
        supportedFeatures: []
      },
      balance: -1500.00,
      currency: "USD",
      isActive: true,
      accountNumber: "****5678",
      lastSync: "2025-07-01T15:45:00Z"
    },
    type: TransactionType.EXPENSE,
    status: TransactionStatus.COMPLETED,
    tags: ["clothing", "athletic", "shoes"],
    notes: "New running shoes",
    receipt: undefined,
    location: {
      latitude: 47.6159,
      longitude: -122.2036
    },
    metadata: {
      source: "manual",
      userModified: false
    },
    createdAt: "2025-07-01T15:45:00Z",
    updatedAt: "2025-07-01T15:45:00Z"
  },
  {
    id: "txn_1234567902",
    amount: -95.00,
    description: "Gym Membership",
    category: "health",
    subcategory: "fitness",
    date: "2025-07-01T10:00:00Z",
    merchant: {
      id: "merchant_lafitness",
      name: "LA Fitness",
      category: "fitness_center"
    },
    account: {
      id: "acc_checking_001",
      name: "Chase Checking",
      type: AccountType.CHECKING,
      bank: {
        id: "bank_chase",
        name: "Chase Bank",
        supportedFeatures: []
      },
      balance: 2500.00,
      currency: "USD",
      isActive: true,
      accountNumber: "****1234",
      lastSync: "2025-07-01T10:00:00Z"
    },
    type: TransactionType.EXPENSE,
    status: TransactionStatus.COMPLETED,
    tags: ["fitness", "health", "monthly"],
    notes: "Monthly gym membership",
    receipt: undefined,
    location: undefined,
    metadata: {
      source: "manual",
      userModified: false
    },
    createdAt: "2025-07-01T10:00:00Z",
    updatedAt: "2025-07-01T10:00:00Z"
  },
  {
    id: "txn_1234567903",
    amount: -42.75,
    description: "CVS Pharmacy",
    category: "health",
    subcategory: "pharmacy",
    date: "2025-07-02T14:20:00Z",
    merchant: {
      id: "merchant_cvs",
      name: "CVS Pharmacy",
      category: "pharmacy"
    },
    account: {
      id: "acc_checking_001",
      name: "Chase Checking",
      type: AccountType.CHECKING,
      bank: {
        id: "bank_chase",
        name: "Chase Bank",
        supportedFeatures: []
      },
      balance: 2500.00,
      currency: "USD",
      isActive: true,
      accountNumber: "****1234",
      lastSync: "2025-07-02T14:20:00Z"
    },
    type: TransactionType.EXPENSE,
    status: TransactionStatus.COMPLETED,
    tags: ["pharmacy", "health", "medication"],
    notes: "Monthly prescriptions",
    receipt: undefined,
    location: {
      latitude: 47.6244,
      longitude: -122.3200
    },
    metadata: {
      source: "manual",
      userModified: false
    },
    createdAt: "2025-07-02T14:20:00Z",
    updatedAt: "2025-07-02T14:20:00Z"
  },
  {
    id: "txn_1234567904",
    amount: -18.50,
    description: "Spotify Premium",
    category: "entertainment",
    subcategory: "music",
    date: "2025-07-01T11:30:00Z",
    merchant: {
      id: "merchant_spotify",
      name: "Spotify",
      category: "streaming_service"
    },
    account: {
      id: "acc_credit_001",
      name: "Chase Freedom",
      type: AccountType.CREDIT_CARD,
      bank: {
        id: "bank_chase",
        name: "Chase Bank",
        supportedFeatures: []
      },
      balance: -1500.00,
      currency: "USD",
      isActive: true,
      accountNumber: "****5678",
      lastSync: "2025-07-01T11:30:00Z"
    },
    type: TransactionType.EXPENSE,
    status: TransactionStatus.COMPLETED,
    tags: ["music", "subscription", "monthly"],
    notes: "Monthly Spotify premium",
    receipt: undefined,
    location: undefined,
    metadata: {
      source: "bank_sync",
      userModified: false
    },
    createdAt: "2025-07-01T11:30:00Z",
    updatedAt: "2025-07-01T11:30:00Z"
  }
];

// Helper functions for mock data
export const getTransactionsByCategory = (category: string): Transaction[] => {
  return mockTransactions.filter(transaction => transaction.category === category);
};

export const getTransactionsByDateRange = (startDate: string, endDate: string): Transaction[] => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return mockTransactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return transactionDate >= start && transactionDate <= end;
  });
};

export const getTransactionsByType = (type: 'income' | 'expense'): Transaction[] => {
  return mockTransactions.filter(transaction => transaction.type === type);
};

export const getTotalExpenses = (): number => {
  return mockTransactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);
};

export const getTotalIncome = (): number => {
  return mockTransactions
    .filter(transaction => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0);
};