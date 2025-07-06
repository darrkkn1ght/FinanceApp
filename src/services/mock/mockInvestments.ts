import { Investment, InvestmentType } from '../../types/investment';

export const mockInvestments: Investment[] = [
  {
    id: "inv_1001",
    symbol: "AAPL",
    name: "Apple Inc.",
    type: InvestmentType.STOCK,
    shares: 25.5,
    currentPrice: 190.85,
    purchasePrice: 175.30,
    purchaseDate: "2025-03-15T09:30:00Z",
    currentValue: 4866.68,
    totalCost: 4470.15,
    gainLoss: 396.53,
    gainLossPercentage: 8.87,
    dividendYield: 0.52,
    sector: "Technology",
    exchange: "NASDAQ",
    currency: "USD",
    account: {
      id: "acc_investment_001",
      name: "Fidelity Investment Account",
      type: "investment"
    },
    metadata: {
      marketCap: 2890000000000,
      peRatio: 28.5,
      eps: 6.70,
      beta: 1.25,
      lastUpdated: "2025-07-05T16:00:00Z"
    }
  },
  {
    id: "inv_1002",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    type: InvestmentType.STOCK,
    shares: 18.0,
    currentPrice: 415.20,
    purchasePrice: 380.50,
    purchaseDate: "2025-02-10T14:20:00Z",
    currentValue: 7473.60,
    totalCost: 6849.00,
    gainLoss: 624.60,
    gainLossPercentage: 9.12,
    dividendYield: 0.72,
    sector: "Technology",
    exchange: "NASDAQ",
    currency: "USD",
    account: {
      id: "acc_investment_001",
      name: "Fidelity Investment Account",
      type: "investment"
    },
    metadata: {
      marketCap: 3080000000000,
      peRatio: 32.1,
      eps: 12.93,
      beta: 0.91,
      lastUpdated: "2025-07-05T16:00:00Z"
    }
  },
  {
    id: "inv_1003",
    symbol: "GOOGL",
    name: "Alphabet Inc. Class A",
    type: InvestmentType.STOCK,
    shares: 12.3,
    currentPrice: 142.85,
    purchasePrice: 138.90,
    purchaseDate: "2025-01-20T10:15:00Z",
    currentValue: 1757.06,
    totalCost: 1708.47,
    gainLoss: 48.59,
    gainLossPercentage: 2.84,
    dividendYield: 0.0,
    sector: "Technology",
    exchange: "NASDAQ",
    currency: "USD",
    account: {
      id: "acc_investment_001",
      name: "Fidelity Investment Account",
      type: "investment"
    },
    metadata: {
      marketCap: 1750000000000,
      peRatio: 25.8,
      eps: 5.53,
      beta: 1.05,
      lastUpdated: "2025-07-05T16:00:00Z"
    }
  },
  {
    id: "inv_1004",
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    type: InvestmentType.STOCK,
    shares: 8.7,
    currentPrice: 185.90,
    purchasePrice: 165.45,
    purchaseDate: "2025-04-05T11:45:00Z",
    currentValue: 1617.33,
    totalCost: 1439.42,
    gainLoss: 177.91,
    gainLossPercentage: 12.36,
    dividendYield: 0.0,
    sector: "Consumer Discretionary",
    exchange: "NASDAQ",
    currency: "USD",
    account: {
      id: "acc_investment_001",
      name: "Fidelity Investment Account",
      type: "investment"
    },
    metadata: {
      marketCap: 1920000000000,
      peRatio: 45.2,
      eps: 4.11,
      beta: 1.15,
      lastUpdated: "2025-07-05T16:00:00Z"
    }
  },
  {
    id: "inv_1005",
    symbol: "TSLA",
    name: "Tesla Inc.",
    type: InvestmentType.STOCK,
    shares: 15.2,
    currentPrice: 248.75,
    purchasePrice: 195.20,
    purchaseDate: "2025-05-12T13:30:00Z",
    currentValue: 3781.00,
    totalCost: 2967.04,
    gainLoss: 813.96,
    gainLossPercentage: 27.44,
    dividendYield: 0.0,
    sector: "Consumer Discretionary",
    exchange: "NASDAQ",
    currency: "USD",
    account: {
      id: "acc_investment_001",
      name: "Fidelity Investment Account",
      type: "investment"
    },
    metadata: {
      marketCap: 790000000000,
      peRatio: 62.5,
      eps: 3.98,
      beta: 2.01,
      lastUpdated: "2025-07-05T16:00:00Z"
    }
  },
  {
    id: "inv_1006",
    symbol: "SPY",
    name: "SPDR S&P 500 ETF Trust",
    type: InvestmentType.ETF,
    shares: 45.8,
    currentPrice: 535.20,
    purchasePrice: 485.75,
    purchaseDate: "2025-01-08T09:00:00Z",
    currentValue: 24512.16,
    totalCost: 22247.35,
    gainLoss: 2264.81,
    gainLossPercentage: 10.18,
    dividendYield: 1.25,
    sector: "Diversified",
    exchange: "NYSE",
    currency: "USD",
    account: {
      id: "acc_investment_001",
      name: "Fidelity Investment Account",
      type: "investment"
    },
    metadata: {
      marketCap: 515000000000,
      peRatio: 0.0,
      eps: 0.0,
      beta: 1.0,
      lastUpdated: "2025-07-05T16:00:00Z"
    }
  },
  {
    id: "inv_1007",
    symbol: "VTI",
    name: "Vanguard Total Stock Market ETF",
    type: InvestmentType.ETF,
    shares: 38.5,
    currentPrice: 268.40,
    purchasePrice: 245.90,
    purchaseDate: "2025-02-28T10:30:00Z",
    currentValue: 10333.40,
    totalCost: 9467.15,
    gainLoss: 866.25,
    gainLossPercentage: 9.15,
    dividendYield: 1.32,
    sector: "Diversified",
    exchange: "NYSE",
    currency: "USD",
    account: {
      id: "acc_investment_001",
      name: "Fidelity Investment Account",
      type: "investment"
    },
    metadata: {
      marketCap: 385000000000,
      peRatio: 0.0,
      eps: 0.0,
      beta: 1.0,
      lastUpdated: "2025-07-05T16:00:00Z"
    }
  },
  {
    id: "inv_1008",
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    type: InvestmentType.STOCK,
    shares: 6.2,
    currentPrice: 785.45,
    purchasePrice: 525.30,
    purchaseDate: "2025-03-22T14:15:00Z",
    currentValue: 4869.79,
    totalCost: 3256.86,
    gainLoss: 1612.93,
    gainLossPercentage: 49.52,
    dividendYield: 0.03,
    sector: "Technology",
    exchange: "NASDAQ",
    currency: "USD",
    account: {
      id: "acc_investment_001",
      name: "Fidelity Investment Account",
      type: "investment"
    },
    metadata: {
      marketCap: 1930000000000,
      peRatio: 75.3,
      eps: 10.43,
      beta: 1.68,
      lastUpdated: "2025-07-05T16:00:00Z"
    }
  },
  {
    id: "inv_1009",
    symbol: "BTC",
    name: "Bitcoin",
    type: InvestmentType.CRYPTOCURRENCY,
    shares: 0.156,
    currentPrice: 67850.00,
    purchasePrice: 58400.00,
    purchaseDate: "2025-04-18T16:20:00Z",
    currentValue: 10584.60,
    totalCost: 9110.40,
    gainLoss: 1474.20,
    gainLossPercentage: 16.18,
    dividendYield: 0.0,
    sector: "Cryptocurrency",
    exchange: "Coinbase",
    currency: "USD",
    account: {
      id: "acc_crypto_001",
      name: "Coinbase Account",
      type: "crypto"
    },
    metadata: {
      marketCap: 1340000000000,
      peRatio: 0.0,
      eps: 0.0,
      beta: 1.5,
      lastUpdated: "2025-07-05T16:00:00Z"
    }
  },
  {
    id: "inv_1010",
    symbol: "ETH",
    name: "Ethereum",
    type: InvestmentType.CRYPTOCURRENCY,
    shares: 2.45,
    currentPrice: 3420.80,
    purchasePrice: 2985.50,
    purchaseDate: "2025-05-02T12:10:00Z",
    currentValue: 8380.96,
    totalCost: 7314.48,
    gainLoss: 1066.48,
    gainLossPercentage: 14.58,
    dividendYield: 0.0,
    sector: "Cryptocurrency",
    exchange: "Coinbase",
    currency: "USD",
    account: {
      id: "acc_crypto_001",
      name: "Coinbase Account",
      type: "crypto"
    },
    metadata: {
      marketCap: 412000000000,
      peRatio: 0.0,
      eps: 0.0,
      beta: 1.3,
      lastUpdated: "2025-07-05T16:00:00Z"
    }
  },
  {
    id: "inv_1011",
    symbol: "BOND",
    name: "US Treasury 10-Year Bond",
    type: InvestmentType.BOND,
    shares: 10000.0,
    currentPrice: 0.98,
    purchasePrice: 1.00,
    purchaseDate: "2025-06-01T09:00:00Z",
    currentValue: 9800.00,
    totalCost: 10000.00,
    gainLoss: -200.00,
    gainLossPercentage: -2.0,
    dividendYield: 4.25,
    sector: "Government",
    exchange: "Treasury",
    currency: "USD",
    account: {
      id: "acc_investment_001",
      name: "Fidelity Investment Account",
      type: "investment"
    },
    metadata: {
      marketCap: 0,
      peRatio: 0.0,
      eps: 0.0,
      beta: 0.1,
      lastUpdated: "2025-07-05T16:00:00Z"
    }
  },
  {
    id: "inv_1012",
    symbol: "REIT",
    name: "Real Estate Investment Trust",
    type: InvestmentType.REIT,
    shares: 125.0,
    currentPrice: 85.60,
    purchasePrice: 78.90,
    purchaseDate: "2025-01-15T11:25:00Z",
    currentValue: 10700.00,
    totalCost: 9862.50,
    gainLoss: 837.50,
    gainLossPercentage: 8.49,
    dividendYield: 3.85,
    sector: "Real Estate",
    exchange: "NYSE",
    currency: "USD",
    account: {
      id: "acc_investment_001",
      name: "Fidelity Investment Account",
      type: "investment"
    },
    metadata: {
      marketCap: 25000000000,
      peRatio: 18.5,
      eps: 4.63,
      beta: 0.85,
      lastUpdated: "2025-07-05T16:00:00Z"
    }
  }
];

// Helper functions for mock investment data
export const getInvestmentsByType = (type: string): Investment[] => {
  return mockInvestments.filter(investment => investment.type === type);
};

export const getInvestmentsBySector = (sector: string): Investment[] => {
  return mockInvestments.filter(investment => investment.sector === sector);
};

export const getTotalPortfolioValue = (): number => {
  return mockInvestments.reduce((total, investment) => total + investment.currentValue, 0);
};

export const getTotalInvestmentCost = (): number => {
  return mockInvestments.reduce((total, investment) => total + investment.totalCost, 0);
};

export const getTotalGainLoss = (): number => {
  return mockInvestments.reduce((total, investment) => total + investment.gainLoss, 0);
};

export const getPortfolioGainLossPercentage = (): number => {
  const totalCost = getTotalInvestmentCost();
  const totalGainLoss = getTotalGainLoss();
  return totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0;
};

export const getTopPerformers = (limit: number = 5): Investment[] => {
  return mockInvestments
    .sort((a, b) => b.gainLossPercentage - a.gainLossPercentage)
    .slice(0, limit);
};

export const getWorstPerformers = (limit: number = 5): Investment[] => {
  return mockInvestments
    .sort((a, b) => a.gainLossPercentage - b.gainLossPercentage)
    .slice(0, limit);
};

export const getDiversificationData = () => {
  const sectorMap = new Map<string, number>();
  
  mockInvestments.forEach(investment => {
    const currentValue = sectorMap.get(investment.sector) || 0;
    sectorMap.set(investment.sector, currentValue + investment.currentValue);
  });
  
  return Array.from(sectorMap.entries()).map(([sector, value]) => ({
    sector,
    value,
    percentage: (value / getTotalPortfolioValue()) * 100
  }));
};