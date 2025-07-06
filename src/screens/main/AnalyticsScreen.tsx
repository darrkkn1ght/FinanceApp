import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import { Card } from '../../components/common/Card';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { LineChart } from '../../components/charts/LineChart';
import { PieChart } from '../../components/charts/PieChart';
import { BarChart } from '../../components/charts/BarChart';
import { transactionService } from '../../services/api/transactionService';
import { Transaction } from '../../types/transaction';
import { TabStackParamList } from '../../types/navigation';

const { width: screenWidth } = Dimensions.get('window');

interface AnalyticsScreenProps {
  navigation: NavigationProp<TabStackParamList, 'Analytics'>;
}

interface SpendingAnalytics {
  totalSpending: number;
  totalIncome: number;
  netSavings: number;
  categoryBreakdown: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
  monthlyTrends: Array<{
    month: string;
    spending: number;
    income: number;
  }>;
  topMerchants: Array<{
    name: string;
    amount: number;
    transactions: number;
  }>;
}

const timeFrameOptions = [
  { label: '1M', value: '1month' },
  { label: '3M', value: '3months' },
  { label: '6M', value: '6months' },
  { label: '1Y', value: '1year' },
];

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({ navigation: _navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('3months');
  const [analytics, setAnalytics] = useState<SpendingAnalytics | null>(null);
  const [activeChart, setActiveChart] = useState<'spending' | 'category' | 'trends'>('spending');

  const loadAnalytics = async (showRefreshing = false) => {
    try {
      if (showRefreshing) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      const response = await transactionService.getTransactions();
      
      if (response.success) {
        const analyticsData = processTransactionData(response.data);
        setAnalytics(analyticsData);
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const processTransactionData = (transactions: Transaction[]): SpendingAnalytics => {
    const now = new Date();
    const timeFrameMonths = selectedTimeFrame === '1month' ? 1 : 
                          selectedTimeFrame === '3months' ? 3 :
                          selectedTimeFrame === '6months' ? 6 : 12;
    
    const cutoffDate = new Date(now.getFullYear(), now.getMonth() - timeFrameMonths, 1);
    
    const filteredTransactions = transactions.filter(t => 
      new Date(t.date) >= cutoffDate
    );

    const totalSpending = filteredTransactions
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const totalIncome = filteredTransactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);

    const netSavings = totalIncome - totalSpending;

    // Category breakdown
    const categoryMap = new Map<string, number>();
    filteredTransactions
      .filter(t => t.amount < 0)
      .forEach(t => {
        const current = categoryMap.get(t.category) || 0;
        categoryMap.set(t.category, current + Math.abs(t.amount));
      });

    const categoryBreakdown = Array.from(categoryMap.entries())
      .map(([category, amount]) => ({
        category: category.charAt(0).toUpperCase() + category.slice(1),
        amount,
        percentage: (amount / totalSpending) * 100,
      }))
      .sort((a, b) => b.amount - a.amount);

    // Monthly trends
    const monthlyMap = new Map<string, { spending: number; income: number }>();
    filteredTransactions.forEach(t => {
      const date = new Date(t.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyMap.has(monthKey)) {
        monthlyMap.set(monthKey, { spending: 0, income: 0 });
      }
      
      const monthData = monthlyMap.get(monthKey)!;
      if (t.amount < 0) {
        monthData.spending += Math.abs(t.amount);
      } else {
        monthData.income += t.amount;
      }
    });

    const monthlyTrends = Array.from(monthlyMap.entries())
      .map(([month, data]) => ({
        month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short' }),
        ...data,
      }))
      .sort((a, b) => a.month.localeCompare(b.month));

    // Top merchants
    const merchantMap = new Map<string, { amount: number; transactions: number }>();
    filteredTransactions
      .filter(t => t.amount < 0)
      .forEach(t => {
        const current = merchantMap.get(t.merchant.name) || { amount: 0, transactions: 0 };
        merchantMap.set(t.merchant.name, {
          amount: current.amount + Math.abs(t.amount),
          transactions: current.transactions + 1,
        });
      });

    const topMerchants = Array.from(merchantMap.entries())
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

    return {
      totalSpending,
      totalIncome,
      netSavings,
      categoryBreakdown,
      monthlyTrends,
      topMerchants,
    };
  };

  const onRefresh = () => {
    loadAnalytics(true);
  };

  useEffect(() => {
    loadAnalytics();
  }, [selectedTimeFrame]);

  const renderTimeFrameSelector = () => (
    <View style={styles.timeFrameContainer}>
      {timeFrameOptions.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.timeFrameButton,
            selectedTimeFrame === option.value && styles.timeFrameButtonActive,
          ]}
          onPress={() => setSelectedTimeFrame(option.value)}
        >
          <Text
            style={[
              styles.timeFrameButtonText,
              selectedTimeFrame === option.value && styles.timeFrameButtonTextActive,
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderOverviewCards = () => {
    if (!analytics) return null;

    return (
      <View style={styles.overviewContainer}>
        <View style={styles.overviewRow}>
          <Card style={styles.overviewCard}>
            <Text style={styles.overviewLabel}>Total Spending</Text>
            <Text style={styles.overviewAmount}>
              ${analytics.totalSpending.toFixed(2)}
            </Text>
          </Card>
          <Card style={styles.overviewCard}>
            <Text style={styles.overviewLabel}>Total Income</Text>
            <Text style={[styles.overviewAmount, styles.incomeAmount]}>
              ${analytics.totalIncome.toFixed(2)}
            </Text>
          </Card>
        </View>
        <Card style={styles.savingsCard}>
          <Text style={styles.overviewLabel}>Net Savings</Text>
          <Text
            style={[
              styles.overviewAmount,
              styles.savingsAmount,
              analytics.netSavings >= 0 ? styles.positiveAmount : styles.negativeAmount,
            ]}
          >
            ${analytics.netSavings.toFixed(2)}
          </Text>
        </Card>
      </View>
    );
  };

  const renderChartSelector = () => (
    <View style={styles.chartSelectorContainer}>
      <TouchableOpacity
        style={[
          styles.chartSelectorButton,
          activeChart === 'spending' && styles.chartSelectorButtonActive,
        ]}
        onPress={() => setActiveChart('spending')}
      >
        <Text
          style={[
            styles.chartSelectorText,
            activeChart === 'spending' && styles.chartSelectorTextActive,
          ]}
        >
          Spending
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.chartSelectorButton,
          activeChart === 'category' && styles.chartSelectorButtonActive,
        ]}
        onPress={() => setActiveChart('category')}
      >
        <Text
          style={[
            styles.chartSelectorText,
            activeChart === 'category' && styles.chartSelectorTextActive,
          ]}
        >
          Categories
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.chartSelectorButton,
          activeChart === 'trends' && styles.chartSelectorButtonActive,
        ]}
        onPress={() => setActiveChart('trends')}
      >
        <Text
          style={[
            styles.chartSelectorText,
            activeChart === 'trends' && styles.chartSelectorTextActive,
          ]}
        >
          Trends
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderActiveChart = () => {
    if (!analytics) return null;

    // Convert data to chart formats
    const barChartData = analytics.categoryBreakdown.slice(0, 6).map(item => ({
      label: item.category,
      value: item.amount,
    }));

    const pieChartData = analytics.categoryBreakdown.slice(0, 6).map((item, index) => ({
      name: item.category,
      value: item.amount,
      color: ['#2196F3', '#4CAF50', '#FF9800', '#F44336', '#9C27B0', '#00BCD4'][index % 6],
    }));

    const lineChartData = analytics.monthlyTrends.map((item, index) => ({
      x: index,
      y: item.spending,
      label: item.month,
    }));

    switch (activeChart) {
      case 'spending':
        return (
          <Card style={styles.chartCard}>
            <Text style={styles.chartTitle}>Spending Overview</Text>
            <BarChart
              data={barChartData}
              width={screenWidth - 64}
              height={220}
              showGrid={true}
              animated={true}
            />
          </Card>
        );
      case 'category':
        return (
          <Card style={styles.chartCard}>
            <Text style={styles.chartTitle}>Category Breakdown</Text>
            <PieChart
              data={pieChartData}
              width={screenWidth - 64}
              height={220}
              showLegend={true}
              animated={true}
            />
          </Card>
        );
      case 'trends':
        return (
          <Card style={styles.chartCard}>
            <Text style={styles.chartTitle}>Monthly Trends</Text>
            <LineChart
              data={lineChartData}
              width={screenWidth - 64}
              height={220}
              showGrid={true}
              animated={true}
            />
          </Card>
        );
      default:
        return null;
    }
  };

  const renderTopMerchants = () => {
    if (!analytics) return null;

    return (
      <Card style={styles.merchantsCard}>
        <Text style={styles.sectionTitle}>Top Merchants</Text>
        {analytics.topMerchants.map((merchant, index) => (
          <View key={`${merchant.name}-${index}`} style={styles.merchantRow}>
            <View style={styles.merchantInfo}>
              <Text style={styles.merchantName}>{merchant.name}</Text>
              <Text style={styles.merchantTransactions}>
                {merchant.transactions} transaction{merchant.transactions !== 1 ? 's' : ''}
              </Text>
            </View>
            <Text style={styles.merchantAmount}>${merchant.amount.toFixed(2)}</Text>
          </View>
        ))}
      </Card>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>Analytics</Text>
        <Text style={styles.subtitle}>Your spending insights</Text>
      </View>

      {renderTimeFrameSelector()}
      {renderOverviewCards()}
      {renderChartSelector()}
      {renderActiveChart()}
      {renderTopMerchants()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
  timeFrameContainer: {
    flexDirection: 'row',
    margin: 20,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
  },
  timeFrameButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  timeFrameButtonActive: {
    backgroundColor: '#007AFF',
  },
  timeFrameButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  timeFrameButtonTextActive: {
    color: '#FFFFFF',
  },
  overviewContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  overviewRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  overviewCard: {
    flex: 1,
    padding: 16,
  },
  savingsCard: {
    padding: 16,
  },
  overviewLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  overviewAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  incomeAmount: {
    color: '#2E7D32',
  },
  savingsAmount: {
    fontSize: 28,
  },
  positiveAmount: {
    color: '#2E7D32',
  },
  negativeAmount: {
    color: '#D32F2F',
  },
  chartSelectorContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
  },
  chartSelectorButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  chartSelectorButtonActive: {
    backgroundColor: '#007AFF',
  },
  chartSelectorText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  chartSelectorTextActive: {
    color: '#FFFFFF',
  },
  chartCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  merchantsCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  merchantRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  merchantInfo: {
    flex: 1,
  },
  merchantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  merchantTransactions: {
    fontSize: 14,
    color: '#666666',
  },
  merchantAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D32F2F',
  },
});

export default AnalyticsScreen;