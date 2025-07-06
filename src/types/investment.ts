// Investment and portfolio management types
import { AmountRange, DateRange } from './index';
import { PaginationInfo, TransactionStatus } from './transaction';

export interface Investment {
    id: string;
    symbol: string;
    name: string;
    type: InvestmentType;
    shares: number;
    currentPrice: number;
    purchasePrice: number;
    purchaseDate: string;
    currentValue: number;
    totalCost: number;
    gainLoss: number;
    gainLossPercentage: number;
    dividendYield: number;
    sector: string;
    exchange: string;
    currency: string;
    account: {
      id: string;
      name: string;
      type: string;
    };
    metadata: InvestmentMetadata;
  }
  
  export interface InvestmentMetadata {
    marketCap: number;
    peRatio: number;
    eps: number;
    beta: number;
    lastUpdated: string;
  }
  
  export interface Portfolio {
    id: string;
    name: string;
    description?: string;
    totalValue: number;
    totalCost: number;
    totalGainLoss: number;
    totalGainLossPercent: number;
    dayChange: number;
    dayChangePercent: number;
    holdings: Holding[];
    diversification: Diversification;
    riskProfile: RiskProfile;
    performance: PerformanceMetrics;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Holding {
    id: string;
    investment: Investment;
    quantity: number;
    averageCost: number;
    totalCost: number;
    currentValue: number;
    gainLoss: number;
    gainLossPercent: number;
    dayChange: number;
    dayChangePercent: number;
    weight: number;
    transactions: InvestmentTransaction[];
    firstPurchaseDate: string;
    lastTransactionDate: string;
  }
  
  export interface InvestmentTransaction {
    id: string;
    type: InvestmentTransactionType;
    investmentId: string;
    portfolioId: string;
    quantity: number;
    price: number;
    totalAmount: number;
    fees: number;
    netAmount: number;
    date: string;
    description?: string;
    orderId?: string;
    source: TransactionSource;
    status: TransactionStatus;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Diversification {
    byAssetClass: AssetAllocation[];
    bySector: SectorAllocation[];
    byGeography: GeographicAllocation[];
    byMarketCap: MarketCapAllocation[];
    riskScore: number;
    concentrationRisk: number;
  }
  
  export interface AssetAllocation {
    assetClass: AssetClass;
    value: number;
    percentage: number;
    targetPercentage?: number;
    deviation?: number;
  }
  
  export interface SectorAllocation {
    sector: string;
    value: number;
    percentage: number;
    holdings: number;
  }
  
  export interface GeographicAllocation {
    region: string;
    country: string;
    value: number;
    percentage: number;
  }
  
  export interface MarketCapAllocation {
    category: MarketCapCategory;
    value: number;
    percentage: number;
  }
  
  export interface RiskProfile {
    score: number;
    level: RiskLevel;
    factors: RiskFactor[];
    volatility: number;
    sharpeRatio: number;
    maxDrawdown: number;
    beta: number;
  }
  
  export interface RiskFactor {
    factor: string;
    impact: 'low' | 'medium' | 'high';
    description: string;
  }
  
  export interface PerformanceMetrics {
    returns: Returns;
    volatility: VolatilityMetrics;
    ratios: PerformanceRatios;
    drawdowns: DrawdownMetrics;
    benchmarkComparison: BenchmarkComparison;
  }
  
  export interface Returns {
    day: number;
    week: number;
    month: number;
    quarter: number;
    year: number;
    ytd: number;
    threeYear: number;
    fiveYear: number;
    inception: number;
  }
  
  export interface VolatilityMetrics {
    daily: number;
    weekly: number;
    monthly: number;
    annual: number;
  }
  
  export interface PerformanceRatios {
    sharpeRatio: number;
    sortinoRatio: number;
    calmarRatio: number;
    informationRatio: number;
    treynorRatio: number;
  }
  
  export interface DrawdownMetrics {
    current: number;
    maximum: number;
    averageRecoveryTime: number;
    longestDrawdown: number;
  }
  
  export interface BenchmarkComparison {
    benchmarkName: string;
    benchmarkSymbol: string;
    alpha: number;
    beta: number;
    correlation: number;
    trackingError: number;
    informationRatio: number;
  }
  
  export interface MarketData {
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
    volume: number;
    marketCap: number;
    timestamp: string;
  }
  
  export interface PriceHistory {
    symbol: string;
    period: TimePeriod;
    prices: PricePoint[];
    indicators: TechnicalIndicators;
  }
  
  export interface PricePoint {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    adjustedClose: number;
  }
  
  export interface TechnicalIndicators {
    sma20: number;
    sma50: number;
    sma200: number;
    ema12: number;
    ema26: number;
    rsi: number;
    macd: MACDIndicator;
    bollingerBands: BollingerBands;
  }
  
  export interface MACDIndicator {
    macd: number;
    signal: number;
    histogram: number;
  }
  
  export interface BollingerBands {
    upper: number;
    middle: number;
    lower: number;
  }
  
  export interface Watchlist {
    id: string;
    name: string;
    description?: string;
    investments: Investment[];
    alerts: PriceAlert[];
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface PriceAlert {
    id: string;
    investmentId: string;
    type: AlertType;
    condition: AlertCondition;
    targetPrice: number;
    currentPrice: number;
    isActive: boolean;
    triggered: boolean;
    triggeredAt?: string;
    createdAt: string;
  }
  
  export interface InvestmentNews {
    id: string;
    title: string;
    summary: string;
    content: string;
    source: string;
    author: string;
    publishedAt: string;
    url: string;
    imageUrl?: string;
    sentiment: NewsSentiment;
    relevantSymbols: string[];
    tags: string[];
  }
  
  export interface DividendHistory {
    id: string;
    investmentId: string;
    exDate: string;
    paymentDate: string;
    amount: number;
    currency: string;
    type: DividendType;
    frequency: DividendFrequency;
    yield: number;
  }
  
  export interface EarningsData {
    id: string;
    investmentId: string;
    quarter: string;
    year: number;
    reportDate: string;
    actualEPS: number;
    estimatedEPS: number;
    surprise: number;
    surprisePercent: number;
    revenue: number;
    estimatedRevenue: number;
  }
  
  // Enums
  export enum InvestmentType {
    STOCK = 'stock',
    ETF = 'etf',
    MUTUAL_FUND = 'mutual_fund',
    BOND = 'bond',
    CRYPTOCURRENCY = 'cryptocurrency',
    COMMODITY = 'commodity',
    REIT = 'reit',
    OPTION = 'option',
    FUTURE = 'future'
  }
  
  export enum InvestmentTransactionType {
    BUY = 'buy',
    SELL = 'sell',
    DIVIDEND = 'dividend',
    SPLIT = 'split',
    MERGER = 'merger',
    SPINOFF = 'spinoff'
  }
  
  export enum TransactionSource {
    MANUAL = 'manual',
    BROKER_SYNC = 'broker_sync',
    CSV_IMPORT = 'csv_import',
    API_IMPORT = 'api_import'
  }
  

  
  export enum AssetClass {
    EQUITY = 'equity',
    FIXED_INCOME = 'fixed_income',
    COMMODITY = 'commodity',
    REAL_ESTATE = 'real_estate',
    CASH = 'cash',
    ALTERNATIVE = 'alternative'
  }
  
  export enum MarketCapCategory {
    LARGE_CAP = 'large_cap',
    MID_CAP = 'mid_cap',
    SMALL_CAP = 'small_cap',
    MICRO_CAP = 'micro_cap'
  }
  
  export enum RiskLevel {
    VERY_LOW = 'very_low',
    LOW = 'low',
    MODERATE = 'moderate',
    HIGH = 'high',
    VERY_HIGH = 'very_high'
  }
  
  export enum TimePeriod {
    ONE_DAY = '1d',
    ONE_WEEK = '1w',
    ONE_MONTH = '1m',
    THREE_MONTHS = '3m',
    SIX_MONTHS = '6m',
    ONE_YEAR = '1y',
    TWO_YEARS = '2y',
    FIVE_YEARS = '5y',
    TEN_YEARS = '10y',
    MAX = 'max'
  }
  
  export enum AlertType {
    PRICE_ABOVE = 'price_above',
    PRICE_BELOW = 'price_below',
    PERCENTAGE_CHANGE = 'percentage_change',
    VOLUME_SPIKE = 'volume_spike',
    NEWS_ALERT = 'news_alert'
  }
  
  export enum AlertCondition {
    GREATER_THAN = 'greater_than',
    LESS_THAN = 'less_than',
    EQUALS = 'equals',
    PERCENTAGE_UP = 'percentage_up',
    PERCENTAGE_DOWN = 'percentage_down'
  }
  
  export enum NewsSentiment {
    VERY_POSITIVE = 'very_positive',
    POSITIVE = 'positive',
    NEUTRAL = 'neutral',
    NEGATIVE = 'negative',
    VERY_NEGATIVE = 'very_negative'
  }
  
  export enum DividendType {
    CASH = 'cash',
    STOCK = 'stock',
    SPECIAL = 'special'
  }
  
  export enum DividendFrequency {
    ANNUAL = 'annual',
    SEMI_ANNUAL = 'semi_annual',
    QUARTERLY = 'quarterly',
    MONTHLY = 'monthly',
    IRREGULAR = 'irregular'
  }
  
  // Form types
  export interface InvestmentTransactionFormData {
    type: InvestmentTransactionType;
    symbol: string;
    quantity: number;
    price: number;
    fees: number;
    date: string;
    description?: string;
    portfolioId: string;
  }
  
  export interface PortfolioFormData {
    name: string;
    description?: string;
    initialInvestment?: number;
    riskTolerance: RiskLevel;
    investmentGoals: string[];
  }
  
  export interface WatchlistFormData {
    name: string;
    description?: string;
    symbols: string[];
  }
  
  export interface PriceAlertFormData {
    investmentId: string;
    type: AlertType;
    condition: AlertCondition;
    targetPrice: number;
    message?: string;
  }
  
  // Filter and search types
  export interface InvestmentFilters {
    types?: InvestmentType[];
    sectors?: string[];
    exchanges?: string[];
    priceRange?: AmountRange;
    marketCapRange?: AmountRange;
    dividendYieldRange?: AmountRange;
    peRatioRange?: AmountRange;
    searchText?: string;
  }
  
  export interface PortfolioFilters {
    dateRange?: DateRange;
    performanceRange?: AmountRange;
    riskLevels?: RiskLevel[];
    assetClasses?: AssetClass[];
  }
  
  // Service response types
  export interface InvestmentServiceResponse<T> {
    data: T;
    success: boolean;
    error?: string;
    pagination?: PaginationInfo;
  }
  

  
  // Component props types
  export interface InvestmentCardProps {
    investment: Investment;
    holding?: Holding;
    onPress?: (investment: Investment) => void;
    onAddToWatchlist?: (investment: Investment) => void;
    onSetAlert?: (investment: Investment) => void;
    showPerformance?: boolean;
    showHolding?: boolean;
    compact?: boolean;
  }
  
  export interface PortfolioCardProps {
    portfolio: Portfolio;
    onPress?: (portfolio: Portfolio) => void;
    onEdit?: (portfolio: Portfolio) => void;
    onDelete?: (portfolioId: string) => void;
    showPerformance?: boolean;
    showHoldings?: boolean;
  }
  
  export interface HoldingCardProps {
    holding: Holding;
    onPress?: (holding: Holding) => void;
    onSell?: (holding: Holding) => void;
    onAddMore?: (holding: Holding) => void;
    showPerformance?: boolean;
    showTransactions?: boolean;
  }
  
  // Hook return types
  export interface UseInvestmentsReturn {
    investments: Investment[];
    portfolios: Portfolio[];
    watchlists: Watchlist[];
    marketData: MarketData[];
    isLoading: boolean;
    error: string | null;
    searchInvestments: (query: string) => Promise<InvestmentServiceResponse<Investment[]>>;
    getInvestment: (symbol: string) => Promise<InvestmentServiceResponse<Investment>>;
    getPortfolio: (id: string) => Promise<InvestmentServiceResponse<Portfolio>>;
    createPortfolio: (data: PortfolioFormData) => Promise<InvestmentServiceResponse<Portfolio>>;
    updatePortfolio: (id: string, data: Partial<Portfolio>) => Promise<InvestmentServiceResponse<Portfolio>>;
    deletePortfolio: (id: string) => Promise<InvestmentServiceResponse<void>>;
    addTransaction: (data: InvestmentTransactionFormData) => Promise<InvestmentServiceResponse<InvestmentTransaction>>;
    createWatchlist: (data: WatchlistFormData) => Promise<InvestmentServiceResponse<Watchlist>>;
    addToWatchlist: (watchlistId: string, symbol: string) => Promise<InvestmentServiceResponse<Watchlist>>;
    removeFromWatchlist: (watchlistId: string, symbol: string) => Promise<InvestmentServiceResponse<Watchlist>>;
    createAlert: (data: PriceAlertFormData) => Promise<InvestmentServiceResponse<PriceAlert>>;
    getMarketData: (symbols: string[]) => Promise<InvestmentServiceResponse<MarketData[]>>;
    getPriceHistory: (symbol: string, period: TimePeriod) => Promise<InvestmentServiceResponse<PriceHistory>>;
    getNews: (symbol?: string) => Promise<InvestmentServiceResponse<InvestmentNews[]>>;
    refreshData: () => Promise<void>;
  }
  
  // Screen props types
  export interface InvestmentScreenProps {
    navigation: any;
    route: any;
  }
  
  export interface InvestmentsScreenProps extends InvestmentScreenProps {}
  export interface PortfolioScreenProps extends InvestmentScreenProps {
    route: {
      params: {
        portfolioId: string;
      };
    };
  }
  export interface InvestmentDetailsScreenProps extends InvestmentScreenProps {
    route: {
      params: {
        symbol: string;
      };
    };
  }
  export interface WatchlistScreenProps extends InvestmentScreenProps {
    route: {
      params: {
        watchlistId: string;
      };
    };
  }