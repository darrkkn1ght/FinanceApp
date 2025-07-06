// Transaction and financial data types
export interface Transaction {
    id: string;
    amount: number;
    description: string;
    category: string;
    subcategory?: string;
    date: string;
    merchant: Merchant;
    account: Account;
    type: TransactionType;
    status: TransactionStatus;
    tags: string[];
    notes?: string;
    location?: Location;
    receipt?: Receipt;
    recurring?: RecurringTransaction;
    metadata: TransactionMetadata;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Merchant {
    id: string;
    name: string;
    category: string;
    logo?: string;
    website?: string;
    phone?: string;
    address?: Address;
  }
  
  export interface Account {
    id: string;
    name: string;
    type: AccountType;
    bank: Bank;
    balance: number;
    currency: string;
    isActive: boolean;
    accountNumber: string;
    routingNumber?: string;
    lastSync: string;
  }
  
  export interface Bank {
    id: string;
    name: string;
    logo?: string;
    website?: string;
    supportedFeatures: BankFeature[];
  }
  
  export interface BankFeature {
    feature: string;
    enabled: boolean;
    description?: string;
  }
  
  export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }
  
  export interface Location {
    latitude: number;
    longitude: number;
    address?: Address;
  }
  
  export interface Receipt {
    id: string;
    imageUrl: string;
    ocrText?: string;
    items: ReceiptItem[];
    total: number;
    tax: number;
    tip?: number;
    uploadedAt: string;
  }
  
  export interface ReceiptItem {
    name: string;
    quantity: number;
    price: number;
    category?: string;
  }
  
  export interface RecurringTransaction {
    id: string;
    frequency: RecurringFrequency;
    nextDate: string;
    endDate?: string;
    isActive: boolean;
    variableAmount: boolean;
    averageAmount: number;
  }
  
  export interface TransactionMetadata {
    source: 'manual' | 'bank_sync' | 'receipt_scan' | 'ai_categorized';
    confidence?: number;
    originalCategory?: string;
    userModified: boolean;
    syncedAt?: string;
  }
  
  export enum TransactionType {
    EXPENSE = 'expense',
    INCOME = 'income',
    TRANSFER = 'transfer',
    REFUND = 'refund',
    INVESTMENT = 'investment'
  }
  
  export enum TransactionStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    FAILED = 'failed',
    CANCELLED = 'cancelled'
  }
  
  export enum AccountType {
    CHECKING = 'checking',
    SAVINGS = 'savings',
    CREDIT_CARD = 'credit_card',
    INVESTMENT = 'investment',
    LOAN = 'loan',
    MORTGAGE = 'mortgage'
  }
  
  export enum RecurringFrequency {
    DAILY = 'daily',
    WEEKLY = 'weekly',
    BIWEEKLY = 'biweekly',
    MONTHLY = 'monthly',
    QUARTERLY = 'quarterly',
    YEARLY = 'yearly'
  }
  
  // Transaction filtering and sorting
  export interface TransactionFilters {
    dateRange?: DateRange;
    categories?: string[];
    accounts?: string[];
    merchants?: string[];
    amountRange?: AmountRange;
    types?: TransactionType[];
    tags?: string[];
    searchText?: string;
  }
  
  export interface DateRange {
    startDate: string;
    endDate: string;
  }
  
  export interface AmountRange {
    min: number;
    max: number;
  }
  
  export interface TransactionSortOptions {
    field: 'date' | 'amount' | 'merchant' | 'category';
    direction: 'asc' | 'desc';
  }
  
  // Analytics and insights
  export interface TransactionAnalytics {
    totalIncome: number;
    totalExpenses: number;
    netIncome: number;
    averageTransaction: number;
    transactionCount: number;
    categoriesBreakdown: CategoryBreakdown[];
    monthlyTrends: MonthlyTrend[];
    topMerchants: MerchantSpending[];
  }
  
  export interface CategoryBreakdown {
    category: string;
    amount: number;
    percentage: number;
    transactionCount: number;
    trend: 'up' | 'down' | 'stable';
  }
  
  export interface MonthlyTrend {
    month: string;
    income: number;
    expenses: number;
    netIncome: number;
    transactionCount: number;
  }
  
  export interface MerchantSpending {
    merchant: Merchant;
    totalSpent: number;
    transactionCount: number;
    averageAmount: number;
    lastTransaction: string;
  }
  
  // Form types
  export interface TransactionFormData {
    amount: number;
    description: string;
    category: string;
    subcategory?: string;
    date: string;
    merchantName: string;
    accountId: string;
    tags: string[];
    location?: Location;
    receipt?: File;
    isRecurring?: boolean;
    recurringData?: Partial<RecurringTransaction>;
  }
  
  export interface TransactionFormErrors {
    amount?: string;
    description?: string;
    category?: string;
    date?: string;
    merchantName?: string;
    accountId?: string;
    general?: string;
  }
  
  // Service response types
  export interface TransactionServiceResponse<T> {
    data: T;
    success: boolean;
    error?: string;
    pagination?: PaginationInfo;
  }
  
  export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }
  
  // Component props types
  export interface TransactionCardProps {
    transaction: Transaction;
    onPress?: (transaction: Transaction) => void;
    onEdit?: (transaction: Transaction) => void;
    onDelete?: (transactionId: string) => void;
    showAccount?: boolean;
    showCategory?: boolean;
    compact?: boolean;
  }
  
  export interface TransactionListProps {
    transactions: Transaction[];
    isLoading?: boolean;
    onRefresh?: () => void;
    onLoadMore?: () => void;
    onTransactionPress?: (transaction: Transaction) => void;
    onTransactionEdit?: (transaction: Transaction) => void;
    onTransactionDelete?: (transactionId: string) => void;
    groupBy?: 'date' | 'category' | 'merchant' | 'none';
    showFilters?: boolean;
    emptyMessage?: string;
  }
  
  // Hook return types
  export interface UseTransactionsReturn {
    transactions: Transaction[];
    isLoading: boolean;
    error: string | null;
    analytics: TransactionAnalytics | null;
    filters: TransactionFilters;
    sortOptions: TransactionSortOptions;
    pagination: PaginationInfo | null;
    addTransaction: (transaction: TransactionFormData) => Promise<TransactionServiceResponse<Transaction>>;
    updateTransaction: (id: string, updates: Partial<Transaction>) => Promise<TransactionServiceResponse<Transaction>>;
    deleteTransaction: (id: string) => Promise<TransactionServiceResponse<void>>;
    getTransactions: (filters?: TransactionFilters) => Promise<TransactionServiceResponse<Transaction[]>>;
    getTransaction: (id: string) => Promise<TransactionServiceResponse<Transaction>>;
    categorizeTransaction: (id: string, category: string) => Promise<TransactionServiceResponse<Transaction>>;
    duplicateTransaction: (id: string) => Promise<TransactionServiceResponse<Transaction>>;
    exportTransactions: (format: 'csv' | 'pdf' | 'xlsx') => Promise<TransactionServiceResponse<string>>;
    setFilters: (filters: TransactionFilters) => void;
    setSortOptions: (options: TransactionSortOptions) => void;
    refreshTransactions: () => Promise<void>;
    loadMoreTransactions: () => Promise<void>;
  }
  
  // Screen props types
  export interface TransactionScreenProps {
    navigation: any;
    route: any;
  }
  
  export interface AddTransactionScreenProps extends TransactionScreenProps {}
  export interface TransactionDetailsScreenProps extends TransactionScreenProps {
    route: {
      params: {
        transactionId: string;
      };
    };
  }
  export interface TransactionsScreenProps extends TransactionScreenProps {}