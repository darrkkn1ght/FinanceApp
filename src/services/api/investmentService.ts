// src/services/api/investmentService.ts
import { mockInvestments } from '../mock/mockInvestments';
import { Investment, InvestmentType, ServiceResponse, Portfolio, RiskLevel } from '../../types';

export interface InvestmentFilters {
  type?: InvestmentType;
  sector?: string;
  riskLevel?: 'low' | 'medium' | 'high';
  minValue?: number;
  maxValue?: number;
}

export interface InvestmentPerformance {
  totalValue: number;
  totalGain: number;
  totalGainPercent: number;
  dayChange: number;
  dayChangePercent: number;
  bestPerformer: Investment;
  worstPerformer: Investment;
}

export interface CreateInvestmentRequest {
  symbol: string;
  name: string;
  type: InvestmentType;
  shares: number;
  purchasePrice: number;
  purchaseDate: string;
  broker?: string;
  notes?: string;
}

export interface PortfolioAllocation {
  type: string;
  value: number;
  percentage: number;
  count: number;
}

export interface InvestmentAlert {
  id: string;
  investmentId: string;
  type: 'price_target' | 'stop_loss' | 'gain_target';
  condition: 'above' | 'below';
  targetPrice: number;
  isActive: boolean;
  createdAt: string;
}

class InvestmentService {
  private useMockData = true; // Use mock data for development

  async getInvestments(
    filters?: InvestmentFilters
  ): Promise<ServiceResponse<Investment[]>> {
    try {
      if (this.useMockData) {
        let filteredInvestments = [...mockInvestments];

        if (filters) {
          filteredInvestments = filteredInvestments.filter(investment => {
            if (filters.type && investment.type !== filters.type) {
              return false;
            }
            
            if (filters.sector && investment.sector !== filters.sector) {
              return false;
            }
            
            if (filters.minValue && investment.currentValue < filters.minValue) {
              return false;
            }
            
            if (filters.maxValue && investment.currentValue > filters.maxValue) {
              return false;
            }
            
            return true;
          });
        }

        return {
          data: filteredInvestments,
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

  async getInvestmentById(id: string): Promise<ServiceResponse<Investment | null>> {
    try {
      if (this.useMockData) {
        const investment = mockInvestments.find(i => i.id === id) || null;
        return {
          data: investment,
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

  async createInvestment(
    investmentData: CreateInvestmentRequest
  ): Promise<ServiceResponse<Investment>> {
    try {
      if (this.useMockData) {
        const newInvestment: Investment = {
          id: `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          symbol: investmentData.symbol.toUpperCase(),
          name: investmentData.name,
          type: investmentData.type,
          shares: investmentData.shares,
          currentPrice: investmentData.purchasePrice,
          purchasePrice: investmentData.purchasePrice,
          purchaseDate: investmentData.purchaseDate,
          currentValue: investmentData.shares * investmentData.purchasePrice,
          totalCost: investmentData.shares * investmentData.purchasePrice,
          gainLoss: 0,
          gainLossPercentage: 0,
          dividendYield: 0,
          sector: this.getSectorFromType(investmentData.type),
          exchange: "NASDAQ",
          currency: "USD",
          account: {
            id: "acc_investment_001",
            name: "Investment Account",
            type: "investment"
          },
          metadata: {
            marketCap: 0,
            peRatio: 0,
            eps: 0,
            beta: 1.0,
            lastUpdated: new Date().toISOString()
          }
        };

        return {
          data: newInvestment,
          success: true
        };
      }
      
      // Real API call will go here later
      throw new Error('Real API not implemented yet');
    } catch (error) {
      return {
        data: {} as Investment,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async updateInvestment(
    id: string,
    updates: Partial<CreateInvestmentRequest>
  ): Promise<ServiceResponse<Investment>> {
    try {
      if (this.useMockData) {
        const existingInvestment = mockInvestments.find(i => i.id === id);
        
        if (!existingInvestment) {
          throw new Error('Investment not found');
        }

        const updatedInvestment: Investment = {
          ...existingInvestment,
          ...updates
        };

        // Recalculate values if shares or price changed
        if (updates.shares !== undefined || updates.purchasePrice !== undefined) {
          updatedInvestment.currentValue = updatedInvestment.shares * updatedInvestment.currentPrice;
          updatedInvestment.totalCost = updatedInvestment.shares * updatedInvestment.purchasePrice;
          updatedInvestment.gainLoss = updatedInvestment.currentValue - updatedInvestment.totalCost;
          updatedInvestment.gainLossPercentage = updatedInvestment.totalCost > 0 ? 
            (updatedInvestment.gainLoss / updatedInvestment.totalCost) * 100 : 0;
        }

        return {
          data: updatedInvestment,
          success: true
        };
      }
      
      // Real API call will go here later
      throw new Error('Real API not implemented yet');
    } catch (error) {
      return {
        data: {} as Investment,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async deleteInvestment(id: string): Promise<ServiceResponse<boolean>> {
    try {
      if (this.useMockData) {
        const investmentExists = mockInvestments.some(i => i.id === id);
        
        if (!investmentExists) {
          throw new Error('Investment not found');
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

  async getPortfolioPerformance(): Promise<ServiceResponse<InvestmentPerformance>> {
    try {
      if (this.useMockData) {
        const investmentsResponse = await this.getInvestments();
        
        if (!investmentsResponse.success) {
          throw new Error(investmentsResponse.error);
        }

        const investments = investmentsResponse.data;
        
        if (investments.length === 0) {
          const emptyPerformance: InvestmentPerformance = {
            totalValue: 0,
            totalGain: 0,
            totalGainPercent: 0,  
            dayChange: 0,
            dayChangePercent: 0,
            bestPerformer: {} as Investment,
            worstPerformer: {} as Investment
          };
          
          return {
            data: emptyPerformance,
            success: true
          };
        }

        const totalValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
        const totalGain = investments.reduce((sum, inv) => sum + inv.gainLoss, 0);
        const totalCost = investments.reduce((sum, inv) => sum + inv.totalCost, 0);

        const bestPerformer = investments.reduce((best, current) => 
          current.gainLossPercentage > best.gainLossPercentage ? current : best
        );

        const worstPerformer = investments.reduce((worst, current) => 
          current.gainLossPercentage < worst.gainLossPercentage ? current : worst
        );

        const performance: InvestmentPerformance = {
          totalValue,
          totalGain,
          totalGainPercent: totalCost > 0 ? (totalGain / totalCost) * 100 : 0,
          dayChange: 0, // Not available in current interface
          dayChangePercent: 0, // Not available in current interface
          bestPerformer,
          worstPerformer
        };

        return {
          data: performance,
          success: true
        };
      }
      
      // Real API call will go here later
      throw new Error('Real API not implemented yet');
    } catch (error) {
      return {
        data: {
          totalValue: 0,
          totalGain: 0,
          totalGainPercent: 0,
          dayChange: 0,
          dayChangePercent: 0,
          bestPerformer: {} as Investment,
          worstPerformer: {} as Investment
        },
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async getPortfolioAllocation(): Promise<ServiceResponse<PortfolioAllocation[]>> {
    try {
      if (this.useMockData) {
        const investmentsResponse = await this.getInvestments();
        
        if (!investmentsResponse.success) {
          throw new Error(investmentsResponse.error);
        }

        const investments = investmentsResponse.data;
        const totalValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);

        const allocationMap = investments.reduce((acc, investment) => {
          const type = investment.type;
          if (!acc[type]) {
            acc[type] = {
              type,
              value: 0,
              percentage: 0,
              count: 0
            };
          }
          acc[type].value += investment.currentValue;
          acc[type].count += 1;
          return acc;
        }, {} as Record<string, PortfolioAllocation>);

        const allocations = Object.values(allocationMap).map(allocation => ({
          ...allocation,
          percentage: totalValue > 0 ? (allocation.value / totalValue) * 100 : 0
        }));

        return {
          data: allocations,
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

  async getInvestmentHistory(
    investmentId: string,
    days: number = 30
  ): Promise<ServiceResponse<Array<{ date: string; price: number; volume?: number }>>> {
    try {
      if (this.useMockData) {
        const investment = mockInvestments.find(i => i.id === investmentId);
        
        if (!investment) {
          throw new Error('Investment not found');
        }

        // Generate mock historical data
        const history = [];
        const endDate = new Date();
        const startPrice = investment.purchasePrice;
        
        for (let i = days; i >= 0; i--) {
          const date = new Date(endDate);
          date.setDate(date.getDate() - i);
          
          // Generate realistic price movement
          const randomChange = (Math.random() - 0.5) * 0.1; // ±5% max daily change
          const price = i === 0 ? investment.currentPrice : startPrice * (1 + randomChange * (days - i) / days);
          
          history.push({
            date: date.toISOString(),
            price: Math.max(0.01, price), // Ensure positive price
            volume: Math.floor(Math.random() * 1000000) + 100000 // Random volume
          });
        }

        return {
          data: history,
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

  async searchInvestments(query: string): Promise<ServiceResponse<Investment[]>> {
    try {
      if (this.useMockData) {
        const searchResults = mockInvestments.filter(investment =>
          investment.name.toLowerCase().includes(query.toLowerCase()) ||
          investment.symbol.toLowerCase().includes(query.toLowerCase())
        );

        return {
          data: searchResults,
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

  async getInvestmentAlerts(investmentId?: string): Promise<ServiceResponse<InvestmentAlert[]>> {
    try {
      if (this.useMockData) {
        // Mock alerts data
        const mockAlerts: InvestmentAlert[] = [
          {
            id: 'alert_1',
            investmentId: 'inv_1',
            type: 'price_target',
            condition: 'above',
            targetPrice: 200,
            isActive: true,
            createdAt: new Date().toISOString()
          },
          {
            id: 'alert_2',
            investmentId: 'inv_2',
            type: 'stop_loss',
            condition: 'below',
            targetPrice: 50,
            isActive: true,
            createdAt: new Date().toISOString()
          }
        ];

        const filteredAlerts = investmentId 
          ? mockAlerts.filter(alert => alert.investmentId === investmentId)
          : mockAlerts;

        return {
          data: filteredAlerts,
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

  async createInvestmentAlert(
    investmentId: string,
    type: 'price_target' | 'stop_loss' | 'gain_target',
    condition: 'above' | 'below',
    targetPrice: number
  ): Promise<ServiceResponse<InvestmentAlert>> {
    try {
      if (this.useMockData) {
        const newAlert: InvestmentAlert = {
          id: `alert_${Date.now()}`,
          investmentId,
          type,
          condition,
          targetPrice,
          isActive: true,
          createdAt: new Date().toISOString()
        };

        return {
          data: newAlert,
          success: true
        };
      }
      
      // Real API call will go here later
      throw new Error('Real API not implemented yet');
    } catch (error) {
      return {
        data: {} as InvestmentAlert,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async updateInvestmentAlert(
    alertId: string,
    updates: Partial<Pick<InvestmentAlert, 'targetPrice' | 'isActive'>>
  ): Promise<ServiceResponse<InvestmentAlert>> {
    try {
      if (this.useMockData) {
        // Mock alert update
        const updatedAlert: InvestmentAlert = {
          id: alertId,
          investmentId: 'inv_1',
          type: 'price_target',
          condition: 'above',
          targetPrice: updates.targetPrice || 200,
          isActive: updates.isActive !== undefined ? updates.isActive : true,
          createdAt: new Date().toISOString()
        };

        return {
          data: updatedAlert,
          success: true
        };
      }
      
      // Real API call will go here later
      throw new Error('Real API not implemented yet');
    } catch (error) {
      return {
        data: {} as InvestmentAlert,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async deleteInvestmentAlert(_alertId: string): Promise<ServiceResponse<boolean>> {
    try {
      if (this.useMockData) {
        // Mock alert deletion
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

  async getPortfolio(): Promise<ServiceResponse<Portfolio | null>> {
    try {
      if (this.useMockData) {
        // Create a mock portfolio from investments
        const totalValue = mockInvestments.reduce((sum, inv) => sum + inv.currentValue, 0);
        const totalCost = mockInvestments.reduce((sum, inv) => sum + inv.totalCost, 0);
        const totalGainLoss = totalValue - totalCost;
        const totalGainLossPercent = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0;

        const portfolio: Portfolio = {
          id: 'portfolio_1',
          name: 'My Portfolio',
          description: 'Main investment portfolio',
          totalValue,
          totalCost,
          totalGainLoss,
          totalGainLossPercent,
          dayChange: totalGainLoss * 0.01, // Mock daily change
          dayChangePercent: 1.0,
          holdings: mockInvestments.map(inv => ({
            id: `holding_${inv.id}`,
            investment: inv,
            quantity: inv.shares,
            averageCost: inv.purchasePrice,
            totalCost: inv.totalCost,
            currentValue: inv.currentValue,
            gainLoss: inv.gainLoss,
            gainLossPercent: inv.gainLossPercentage,
            dayChange: inv.gainLoss * 0.01,
            dayChangePercent: 1.0,
            weight: totalValue > 0 ? (inv.currentValue / totalValue) * 100 : 0,
            transactions: [],
            firstPurchaseDate: inv.purchaseDate,
            lastTransactionDate: inv.purchaseDate
          })),
          diversification: {
            byAssetClass: [],
            bySector: [],
            byGeography: [],
            byMarketCap: [],
            riskScore: 0.5,
            concentrationRisk: 0.3
          },
          riskProfile: {
            score: 0.6,
            level: 'moderate' as RiskLevel,
            factors: [],
            volatility: 0.15,
            sharpeRatio: 1.2,
            maxDrawdown: -0.1,
            beta: 1.0
          },
          performance: {
            returns: {
              day: 0.01,
              week: 0.05,
              month: 0.02,
              quarter: 0.08,
              year: 0.12,
              ytd: 0.08,
              threeYear: 0.25,
              fiveYear: 0.45,
              inception: 0.35
            },
            volatility: {
              daily: 0.015,
              weekly: 0.035,
              monthly: 0.08,
              annual: 0.15
            },
            ratios: {
              sharpeRatio: 1.2,
              sortinoRatio: 1.5,
              calmarRatio: 1.8,
              informationRatio: 0.8,
              treynorRatio: 0.12
            },
            drawdowns: {
              current: -0.02,
              maximum: -0.15,
              averageRecoveryTime: 45,
              longestDrawdown: 120
            },
            benchmarkComparison: {
              benchmarkName: 'S&P 500',
              benchmarkSymbol: '^GSPC',
              alpha: 0.02,
              beta: 1.0,
              correlation: 0.85,
              trackingError: 0.05,
              informationRatio: 0.4
            }
          },
          isDefault: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        return {
          data: portfolio,
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

  async addToWatchlist(symbol: string): Promise<ServiceResponse<Investment>> {
    try {
      if (this.useMockData) {
        // Mock implementation - create a watchlist item
        const watchlistItem: Investment = {
          id: `watch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          symbol: symbol.toUpperCase(),
          name: `${symbol.toUpperCase()} Stock`,
          type: 'stock' as InvestmentType,
          shares: 0,
          currentPrice: 100 + Math.random() * 900,
          purchasePrice: 0,
          purchaseDate: new Date().toISOString(),
          currentValue: 0,
          totalCost: 0,
          gainLoss: 0,
          gainLossPercentage: 0,
          dividendYield: 0,
          sector: 'Technology',
          exchange: "NASDAQ",
          currency: "USD",
          account: {
            id: "acc_watchlist_001",
            name: "Watchlist",
            type: "watchlist"
          },
          metadata: {
            marketCap: 0,
            peRatio: 0,
            eps: 0,
            beta: 1.0,
            lastUpdated: new Date().toISOString()
          }
        };

        return {
          data: watchlistItem,
          success: true
        };
      }
      
      // Real API call will go here later
      throw new Error('Real API not implemented yet');
    } catch (error) {
      return {
        data: {} as Investment,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async removeFromWatchlist(_symbol: string): Promise<ServiceResponse<boolean>> {
    try {
      if (this.useMockData) {
        // Mock implementation - in real app, this would remove from watchlist
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

  async getMarketData(symbols: string[]): Promise<ServiceResponse<{ [symbol: string]: { currentPrice: number; change: number; changePercent: number; volume: number } }>> {
    try {
      if (this.useMockData) {
        const marketData: { [symbol: string]: { currentPrice: number; change: number; changePercent: number; volume: number } } = {};
        
        symbols.forEach(symbol => {
          const basePrice = 50 + Math.random() * 200;
          const change = (Math.random() - 0.5) * 10;
          const changePercent = (change / basePrice) * 100;
          const volume = Math.floor(Math.random() * 1000000) + 100000;
          
          marketData[symbol] = {
            currentPrice: basePrice + change,
            change,
            changePercent,
            volume
          };
        });

        return {
          data: marketData,
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

  // Helper methods
  private getSectorFromType(type: InvestmentType): string {
    const sectorMap: Record<InvestmentType, string> = {
      [InvestmentType.STOCK]: 'Technology',
      [InvestmentType.ETF]: 'Mixed',
      [InvestmentType.BOND]: 'Fixed Income',
      [InvestmentType.CRYPTOCURRENCY]: 'Cryptocurrency',
      [InvestmentType.MUTUAL_FUND]: 'Mixed',
      [InvestmentType.COMMODITY]: 'Commodity',
      [InvestmentType.REIT]: 'Real Estate',
      [InvestmentType.OPTION]: 'Derivatives',
      [InvestmentType.FUTURE]: 'Derivatives'
    };
    return sectorMap[type] || 'Other';
  }

  private getRiskLevelFromType(type: InvestmentType): 'low' | 'medium' | 'high' {
    const riskMap: Record<InvestmentType, 'low' | 'medium' | 'high'> = {
      [InvestmentType.BOND]: 'low',
      [InvestmentType.ETF]: 'medium',
      [InvestmentType.MUTUAL_FUND]: 'medium',
      [InvestmentType.STOCK]: 'high',
      [InvestmentType.CRYPTOCURRENCY]: 'high',
      [InvestmentType.COMMODITY]: 'high',
      [InvestmentType.REIT]: 'medium',
      [InvestmentType.OPTION]: 'high',
      [InvestmentType.FUTURE]: 'high'
    };
    return riskMap[type] || 'medium';
  }
}

export const investmentService = new InvestmentService();