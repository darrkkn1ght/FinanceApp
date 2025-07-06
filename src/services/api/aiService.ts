import { mockAIInsights } from '../mock/mockAIInsights';
import { 
  AIInsight, 
  AIRecommendation, 
  ChatMessage, 
  AIServiceResponse 
} from '../../types/ai';
import { ServiceResponse } from '../../types';

class AIService {
  private useMockData = __DEV__;

  async getInsights(): Promise<AIServiceResponse<AIInsight[]>> {
    try {
      if (this.useMockData) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return {
          data: mockAIInsights,
          success: true,
        };
      }
      
      // Real API call will go here later
      const response = await fetch('/api/ai/insights');
      const data = await response.json();
      
      return {
        data: data.insights,
        success: true,
      };
    } catch (error) {
      console.error('Error fetching AI insights:', error);
      return {
        data: [],
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch insights',
      };
    }
  }

  async getRecommendations(): Promise<ServiceResponse<AIRecommendation[]>> {
    try {
      if (this.useMockData) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockRecommendations: AIRecommendation[] = [
          {
            id: 'rec_001',
            title: 'Optimize Your Coffee Spending',
            description: 'You\'ve spent $127 on coffee this month. Consider brewing at home to save $80/month.',
            category: 'spending',
            priority: 'high',
            type: 'action',
            actionItems: ['Reduce coffee shop visits', 'Brew coffee at home'],
            isCompleted: false,
            estimatedSavings: 960,
            estimatedTime: '1 month',
            createdAt: '2025-07-06T08:00:00Z',
            tags: ['spending', 'coffee', 'budget']
          },
          {
            id: 'rec_002',
            title: 'Increase Emergency Fund',
            description: 'Your emergency fund covers only 2 months of expenses. Aim for 3-6 months for better security.',
            category: 'savings',
            priority: 'medium',
            type: 'action',
            actionItems: ['Increase monthly savings', 'Set up automatic transfers'],
            isCompleted: false,
            estimatedSavings: 0,
            estimatedTime: '6 months',
            createdAt: '2025-07-06T08:00:00Z',
            tags: ['savings', 'emergency', 'security']
          },
          {
            id: 'rec_003',
            title: 'Consider Index Fund Investment',
            description: 'With $2,500 in savings, consider diversifying into low-cost index funds for long-term growth.',
            category: 'investment',
            priority: 'medium',
            type: 'action',
            actionItems: ['Research index funds', 'Set up investment account'],
            isCompleted: false,
            estimatedSavings: 0,
            estimatedTime: '5+ years',
            createdAt: '2025-07-06T08:00:00Z',
            tags: ['investment', 'diversification', 'long-term']
          },
          {
            id: 'rec_004',
            title: 'Review Subscription Services',
            description: 'You have 8 active subscriptions totaling $89/month. Some may be unused.',
            category: 'spending',
            priority: 'low',
            type: 'action',
            actionItems: ['Review all subscriptions', 'Cancel unused services'],
            isCompleted: false,
            estimatedSavings: 480,
            estimatedTime: '1 week',
            createdAt: '2025-07-06T08:00:00Z',
            tags: ['subscriptions', 'spending', 'optimization']
          },
        ];
        
        return {
          data: mockRecommendations,
          success: true,
        };
      }
      
      // Real API call will go here later
      const response = await fetch('/api/ai/recommendations');
      const data = await response.json();
      
      return {
        data: data.recommendations,
        success: true,
      };
    } catch (error) {
      console.error('Error fetching AI recommendations:', error);
      return {
        data: [],
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch recommendations',
      };
    }
  }

  async getChatHistory(): Promise<ServiceResponse<ChatMessage[]>> {
    try {
      if (this.useMockData) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 600));
        
        const mockChatHistory: ChatMessage[] = [
          {
            id: 'msg_001',
            content: 'Hello! I\'m your AI financial coach. How can I help you today?',
            role: 'assistant',
            timestamp: '2025-07-06T08:00:00Z',
          },
          {
            id: 'msg_002',
            content: 'I want to understand my spending patterns better',
            role: 'user',
            timestamp: '2025-07-06T08:01:00Z',
          },
          {
            id: 'msg_003',
            content: 'Great question! Based on your recent transactions, I can see you spend the most on dining ($347 this month) and shopping ($298). Your largest expense category is rent/housing at $1,200. Would you like me to analyze any specific category?',
            role: 'assistant',
            timestamp: '2025-07-06T08:01:30Z',
          },
        ];
        
        return {
          data: mockChatHistory,
          success: true,
        };
      }
      
      // Real API call will go here later
      const response = await fetch('/api/ai/chat/history');
      const data = await response.json();
      
      return {
        data: data.messages,
        success: true,
      };
    } catch (error) {
      console.error('Error fetching chat history:', error);
      return {
        data: [],
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch chat history',
      };
    }
  }

  async sendChatMessage(message: string): Promise<ServiceResponse<ChatMessage>> {
    try {
      if (this.useMockData) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Generate mock AI response based on message content
        const aiResponse = this.generateMockAIResponse(message);
        
        const aiMessage: ChatMessage = {
          id: `msg_${Date.now()}`,
          content: aiResponse,
          role: 'assistant',
          timestamp: new Date().toISOString(),
        };
        
        return {
          data: aiMessage,
          success: true,
        };
      }
      
      // Real API call will go here later
      const response = await fetch('/api/ai/chat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      
      const data = await response.json();
      
      return {
        data: data.response,
        success: true,
      };
    } catch (error) {
      console.error('Error sending chat message:', error);
      return {
        data: {
          id: `error_${Date.now()}`,
          content: 'Sorry, I encountered an error. Please try again.',
          role: 'assistant',
          timestamp: new Date().toISOString(),
        },
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send message',
      };
    }
  }

  async generateInsight(category: string): Promise<ServiceResponse<AIInsight>> {
    try {
      if (this.useMockData) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        const mockInsight: AIInsight = {
          id: `insight_${Date.now()}`,
          type: 'spending_pattern',
          title: `${category} Analysis`,
          description: `Based on your recent ${category} activity, here are some insights...`,
          category: category,
          priority: 'medium',
          confidence: 0.8,
          impact: 'medium',
          actionable: true,
          recommendation: {
            action: 'analyze',
            details: `Review your ${category} spending patterns`,
            potentialSavings: 0,
            timeframe: 'monthly'
          },
          data: { category },
          createdAt: new Date().toISOString(),
          isRead: false,
          isActioned: false,
          tags: [category, 'analysis']
        };
        
        return {
          data: mockInsight,
          success: true,
        };
      }
      
      // Real API call will go here later
      const response = await fetch('/api/ai/insights/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category }),
      });
      
      const data = await response.json();
      
      return {
        data: data.insight,
        success: true,
      };
    } catch (error) {
      console.error('Error generating insight:', error);
      return {
        data: {} as AIInsight,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate insight',
      };
    }
  }

  async generateBudgetSuggestions(income: number, expenses: number[]): Promise<ServiceResponse<AIRecommendation[]>> {
    try {
      if (this.useMockData) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockSuggestions: AIRecommendation[] = [
          {
            id: 'budget_001',
            title: '50/30/20 Budget Plan',
            description: 'Allocate 50% to needs, 30% to wants, 20% to savings',
            category: 'budgeting',
            priority: 'high',
            type: 'action',
            actionItems: ['Review current spending', 'Set up budget categories'],
            isCompleted: false,
            estimatedSavings: 0,
            estimatedTime: '1 month',
            createdAt: new Date().toISOString(),
            tags: ['budget', 'planning']
          }
        ];
        
        return { data: mockSuggestions, success: true };
      }
      
      const response = await fetch('/api/ai/budget/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ income, expenses }),
      });
      
      const data = await response.json();
      return { data: data.suggestions, success: true };
    } catch (error) {
      return { data: [], success: false, error: error instanceof Error ? error.message : 'Failed to generate budget suggestions' };
    }
  }

  async analyzeSpendingPatterns(transactions: any[]): Promise<ServiceResponse<{ patterns: any[], alerts: any[] }>> {
    try {
      if (this.useMockData) {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        return {
          data: {
            patterns: [
              { category: 'dining', trend: 'increasing', change: 15 },
              { category: 'shopping', trend: 'decreasing', change: -8 }
            ],
            alerts: [
              { category: 'dining', severity: 'medium', message: 'Spending 20% above average' }
            ]
          },
          success: true
        };
      }
      
      const response = await fetch('/api/ai/patterns/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactions }),
      });
      
      const data = await response.json();
      return { data: data.analysis, success: true };
    } catch (error) {
      return { data: { patterns: [], alerts: [] }, success: false, error: error instanceof Error ? error.message : 'Failed to analyze patterns' };
    }
  }

  async getInvestmentAdvice(riskTolerance: string, timeline: string): Promise<ServiceResponse<AIRecommendation[]>> {
    try {
      if (this.useMockData) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockAdvice: AIRecommendation[] = [
          {
            id: 'invest_001',
            title: 'Diversified Portfolio Recommendation',
            description: 'Based on your risk tolerance, consider a 60/40 stock/bond allocation',
            category: 'investment',
            priority: 'medium',
            type: 'action',
            actionItems: ['Review current portfolio', 'Consider rebalancing'],
            isCompleted: false,
            estimatedSavings: 0,
            estimatedTime: '5+ years',
            createdAt: new Date().toISOString(),
            tags: ['investment', 'portfolio', 'diversification']
          }
        ];
        
        return { data: mockAdvice, success: true };
      }
      
      const response = await fetch('/api/ai/investment/advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ riskTolerance, timeline }),
      });
      
      const data = await response.json();
      return { data: data.advice, success: true };
    } catch (error) {
      return { data: [], success: false, error: error instanceof Error ? error.message : 'Failed to get investment advice' };
    }
  }

  async optimizePortfolio(currentHoldings: any[]): Promise<ServiceResponse<AIRecommendation[]>> {
    try {
      if (this.useMockData) {
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        const mockOptimizations: AIRecommendation[] = [
          {
            id: 'portfolio_001',
            title: 'Rebalance Portfolio',
            description: 'Consider rebalancing to maintain target allocation',
            category: 'investment',
            priority: 'medium',
            type: 'action',
            actionItems: ['Review current allocation', 'Execute rebalancing trades'],
            isCompleted: false,
            estimatedSavings: 0,
            estimatedTime: '1 month',
            createdAt: new Date().toISOString(),
            tags: ['portfolio', 'rebalancing', 'risk']
          }
        ];
        
        return { data: mockOptimizations, success: true };
      }
      
      const response = await fetch('/api/ai/portfolio/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ holdings: currentHoldings }),
      });
      
      const data = await response.json();
      return { data: data.optimizations, success: true };
    } catch (error) {
      return { data: [], success: false, error: error instanceof Error ? error.message : 'Failed to optimize portfolio' };
    }
  }

  async predictFutureSpending(category: string, months: number): Promise<ServiceResponse<number[]>> {
    try {
      if (this.useMockData) {
        await new Promise(resolve => setTimeout(resolve, 600));
        
        const predictions = Array.from({ length: months }, (_, i) => 
          Math.floor(Math.random() * 500) + 200
        );
        
        return { data: predictions, success: true };
      }
      
      const response = await fetch('/api/ai/spending/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, months }),
      });
      
      const data = await response.json();
      return { data: data.predictions, success: true };
    } catch (error) {
      return { data: [], success: false, error: error instanceof Error ? error.message : 'Failed to predict spending' };
    }
  }

  async generateGoalStrategy(goal: any): Promise<ServiceResponse<AIRecommendation>> {
    try {
      if (this.useMockData) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockStrategy: AIRecommendation = {
          id: 'goal_001',
          title: 'Goal Achievement Strategy',
          description: 'Monthly contribution plan to reach your target',
          category: 'planning',
          priority: 'high',
          type: 'action',
          actionItems: ['Set up automatic contributions', 'Track progress monthly'],
          isCompleted: false,
          estimatedSavings: 0,
          estimatedTime: '12 months',
          createdAt: new Date().toISOString(),
          tags: ['goals', 'planning', 'savings']
        };
        
        return { data: mockStrategy, success: true };
      }
      
      const response = await fetch('/api/ai/goal/strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal }),
      });
      
      const data = await response.json();
      return { data: data.strategy, success: true };
    } catch (error) {
      return { data: {} as AIRecommendation, success: false, error: error instanceof Error ? error.message : 'Failed to generate goal strategy' };
    }
  }

  async getFinancialScore(): Promise<ServiceResponse<{ score: number, goalProgress: any[] }>> {
    try {
      if (this.useMockData) {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        return {
          data: {
            score: 78,
            goalProgress: [
              { goalId: 'goal_1', progress: 65, timeRemaining: 180, onTrack: true }
            ]
          },
          success: true
        };
      }
      
      const response = await fetch('/api/ai/score');
      const data = await response.json();
      return { data: data.score, success: true };
    } catch (error) {
      return { data: { score: 0, goalProgress: [] }, success: false, error: error instanceof Error ? error.message : 'Failed to get financial score' };
    }
  }

  private generateMockAIResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('budget')) {
      return 'I can help you with budgeting! Based on your current spending, you have room to optimize in dining and entertainment. Would you like me to suggest a budget plan?';
    }
    
    if (lowerMessage.includes('save') || lowerMessage.includes('saving')) {
      return 'Great goal! I notice you could save about $200/month by reducing dining out and subscription services. Setting up automatic transfers to savings can help build this habit.';
    }
    
    if (lowerMessage.includes('invest') || lowerMessage.includes('investment')) {
      return 'Investment planning is smart! With your current savings rate, you could consider starting with index funds or ETFs. I recommend starting with 10-15% of your income in diversified investments.';
    }
    
    if (lowerMessage.includes('debt')) {
      return 'Let\'s tackle your debt strategically! I can help you prioritize high-interest debt first while maintaining minimum payments on others. Would you like a debt payoff plan?';
    }
    
    if (lowerMessage.includes('spending')) {
      return 'Your spending analysis shows dining ($347) and shopping ($298) are your top variable expenses. These are good areas to focus on for immediate savings impact.';
    }
    
    if (lowerMessage.includes('goal')) {
      return 'Financial goals are important! What specific goal are you working toward? Emergency fund, vacation, house down payment, or retirement? I can help create a timeline and savings plan.';
    }
    
    // Default response
    return 'I understand you\'re looking for financial guidance. Based on your transaction history, I can provide insights on budgeting, saving, investing, or debt management. What would you like to focus on?';
  }
}

export const aiService = new AIService();