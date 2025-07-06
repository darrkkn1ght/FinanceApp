import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  RefreshControl,
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp } from '@react-navigation/native';

import { InvestmentCard } from '../../components/finance/InvestmentCard';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { LineChart } from '../../components/charts/LineChart';
import { PieChart } from '../../components/charts/PieChart';
import { investmentService } from '../../services/api/investmentService';
import { Investment, Portfolio } from '../../types/investment';
import { TabStackParamList } from '../../types/navigation';

interface InvestmentsScreenProps {
  navigation: NavigationProp<TabStackParamList, 'Investments'>;
}

export const InvestmentsScreen: React.FC<InvestmentsScreenProps> = ({ navigation }) => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL'>('1M');

  useEffect(() => {
    loadInvestmentData();
  }, []);

  const loadInvestmentData = async () => {
    try {
      setLoading(true);
      const [investmentsResponse, portfolioResponse] = await Promise.all([
        investmentService.getInvestments(),
        investmentService.getPortfolio()
      ]);

      if (investmentsResponse.success) {
        setInvestments(investmentsResponse.data);
      } else {
        Alert.alert('Error', investmentsResponse.error || 'Failed to load investments');
      }

      if (portfolioResponse.success) {
        setPortfolio(portfolioResponse.data);
      } else {
        Alert.alert('Error', portfolioResponse.error || 'Failed to load portfolio');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load investment data');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadInvestmentData();
    setRefreshing(false);
  };

  const handleInvestmentPress = (investment: Investment) => {
    // Navigate to investment details screen
    Alert.alert('Investment Details', `Selected: ${investment.name}`);
  };

  const handleAddInvestment = () => {
    Alert.alert('Add Investment', 'This feature will be implemented soon!');
  };

  const timeframeButtons = ['1D', '1W', '1M', '3M', '1Y', 'ALL'] as const;

  const portfolioChartData = portfolio?.performance?.returns ? [
    { x: 0, y: portfolio.performance.returns.month },
    { x: 1, y: portfolio.performance.returns.quarter },
    { x: 2, y: portfolio.performance.returns.year },
    { x: 3, y: portfolio.performance.returns.ytd },
  ] : [];

  const allocationData = portfolio?.diversification?.byAssetClass?.map((item, index) => ({
    name: item.assetClass,
    value: item.percentage,
    color: ['#2196F3', '#4CAF50', '#FF9800', '#F44336', '#9C27B0', '#00BCD4'][index % 6],
  })) || [];

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingSpinner size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>My Investments</Text>
          <Button
            title="Add Investment"
            onPress={handleAddInvestment}
            variant="primary"
            size="small"
          />
        </View>

        {/* Portfolio Overview */}
        {portfolio && (
          <Card style={styles.portfolioCard}>
            <Text style={styles.sectionTitle}>Portfolio Overview</Text>
            <View style={styles.portfolioStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>${portfolio.totalValue.toLocaleString()}</Text>
                <Text style={styles.statLabel}>Total Value</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[
                  styles.statValue,
                  { color: portfolio.totalGainLoss >= 0 ? '#2E7D32' : '#D32F2F' }
                ]}>
                  ${Math.abs(portfolio.totalGainLoss).toLocaleString()}
                </Text>
                <Text style={styles.statLabel}>
                  {portfolio.totalGainLoss >= 0 ? 'Total Gain' : 'Total Loss'}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[
                  styles.statValue,
                  { color: portfolio.totalGainLossPercent >= 0 ? '#2E7D32' : '#D32F2F' }
                ]}>
                  {portfolio.totalGainLossPercent >= 0 ? '+' : ''}
                  {portfolio.totalGainLossPercent.toFixed(2)}%
                </Text>
                <Text style={styles.statLabel}>Return</Text>
              </View>
            </View>
          </Card>
        )}

        {/* Performance Chart */}
        {portfolio && (
          <Card style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.sectionTitle}>Performance</Text>
              <View style={styles.timeframeButtons}>
                {timeframeButtons.map(timeframe => (
                  <TouchableOpacity
                    key={timeframe}
                    style={[
                      styles.timeframeButton,
                      selectedTimeframe === timeframe && styles.timeframeButtonActive
                    ]}
                    onPress={() => setSelectedTimeframe(timeframe)}
                  >
                    <Text style={[
                      styles.timeframeButtonText,
                      selectedTimeframe === timeframe && styles.timeframeButtonTextActive
                    ]}>
                      {timeframe}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <LineChart
              data={portfolioChartData}
              width={350}
              height={200}
              color="#2196F3"
              showGrid={true}
              animated={true}
            />
          </Card>
        )}

        {/* Asset Allocation */}
        {portfolio && portfolio.diversification?.byAssetClass && (
          <Card style={styles.chartCard}>
            <Text style={styles.sectionTitle}>Asset Allocation</Text>
            <PieChart
              data={allocationData}
              width={350}
              height={220}
              showLabels={true}
              showLegend={true}
              animated={true}
            />
          </Card>
        )}

        {/* Individual Investments */}
        <View style={styles.investmentsSection}>
          <Text style={styles.sectionTitle}>Individual Holdings</Text>
          {investments.map(investment => (
            <InvestmentCard
              key={investment.id}
              id={investment.id}
              symbol={investment.symbol}
              name={investment.name}
              currentPrice={investment.currentPrice}
              previousPrice={investment.currentPrice * 0.98} // Mock previous price
              shares={investment.shares}
              totalValue={investment.currentValue}
              totalGainLoss={investment.gainLoss}
              gainLossPercentage={investment.gainLossPercentage}
              onPress={() => handleInvestmentPress(investment)}
            />
          ))}
        </View>

        {/* Investment Summary */}
        {portfolio && (
          <Card style={styles.summaryCard}>
            <Text style={styles.sectionTitle}>Investment Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Cost</Text>
              <Text style={styles.summaryValue}>${portfolio.totalCost.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Current Value</Text>
              <Text style={styles.summaryValue}>${portfolio.totalValue.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Unrealized P&L</Text>
              <Text style={[
                styles.summaryValue,
                { color: portfolio.totalGainLoss >= 0 ? '#2E7D32' : '#D32F2F' }
              ]}>
                {portfolio.totalGainLoss >= 0 ? '+' : ''}${portfolio.totalGainLoss.toLocaleString()}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Return %</Text>
              <Text style={[
                styles.summaryValue,
                { color: portfolio.totalGainLossPercent >= 0 ? '#2E7D32' : '#D32F2F' }
              ]}>
                {portfolio.totalGainLossPercent >= 0 ? '+' : ''}{portfolio.totalGainLossPercent.toFixed(2)}%
              </Text>
            </View>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  portfolioCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  portfolioStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  chartCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  timeframeButtons: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 2,
  },
  timeframeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  timeframeButtonActive: {
    backgroundColor: '#2196F3',
  },
  timeframeButtonText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  timeframeButtonTextActive: {
    color: '#FFFFFF',
  },
  investmentsSection: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  summaryCard: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
});

export default InvestmentsScreen;