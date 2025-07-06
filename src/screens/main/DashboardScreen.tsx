import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import { TransactionCard } from '../../components/finance/TransactionCard';
import { AccountCard } from '../../components/finance/AccountCard';
import { BudgetProgress } from '../../components/finance/BudgetProgress';
import { AIInsightCard } from '../../components/ai/AIInsightCard';
import { StatCard } from '../../components/finance/StatCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

import { transactionService } from '../../services/api/transactionService';
import { investmentService } from '../../services/api/investmentService';
import { aiService } from '../../services/api/aiService';

import { Transaction } from '../../types/transaction';
import { Investment } from '../../types/investment';
import { AIInsight } from '../../types/ai';
import { MainStackParamList } from '../../types/navigation';




interface DashboardScreenProps {
  navigation: NavigationProp<MainStackParamList>;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load transactions
      const transactionsResponse = await transactionService.getTransactions();
      if (transactionsResponse.success) {
        setTransactions(transactionsResponse.data);
      }
      
      // Load investments
      const investmentsResponse = await investmentService.getInvestments();
      if (investmentsResponse.success) {
        setInvestments(investmentsResponse.data);
      }
      
      // Load AI insights
      const insightsResponse = await aiService.getInsights();
      if (insightsResponse.success) {
        setAiInsights(insightsResponse.data);
      }
    } catch (_error) {
      Alert.alert('Error', 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const calculateTotalBalance = (): number => {
    return investments.reduce((total, inv) => total + inv.currentValue, 0);
  };

  const calculateMonthlySpending = (): number => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return transactions
      .filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate.getMonth() === currentMonth && 
               transactionDate.getFullYear() === currentYear &&
               t.amount < 0;
      })
      .reduce((total, t) => total + Math.abs(t.amount), 0);
  };

  const calculateMonthlyIncome = (): number => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return transactions
      .filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate.getMonth() === currentMonth && 
               transactionDate.getFullYear() === currentYear &&
               t.amount > 0;
      })
      .reduce((total, t) => total + t.amount, 0);
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning!</Text>
        <Text style={styles.subtitle}>Here's your financial overview</Text>
      </View>

      {/* Main Balance Card */}
      <View style={styles.balanceSection}>
        <AccountCard
          accountName="Total Portfolio"
          accountType="investment"
          balance={calculateTotalBalance()}
          bankName="All Accounts"
          accountNumber="****"
          onPress={() => Alert.alert('Coming Soon', 'Portfolio details will be implemented soon')}
        />
      </View>

      {/* Income and Expenses */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>Monthly Summary</Text>
            <Text style={styles.sectionSubtitle}>This Month</Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          <StatCard
            title="Income"
            value={calculateMonthlyIncome()}
            changePercentage={12.5}
            icon="income"
            trend="up"
            sparklineData={[3200, 3500, 3800, 4200, 4100, 4500, 4800]}
            onPress={() => navigation.navigate('TransactionDetails', { transactionId: 'income' })}
          />
          <StatCard
            title="Expenses"
            value={calculateMonthlySpending()}
            changePercentage={-8.2}
            icon="expense"
            trend="down"
            sparklineData={[2800, 3200, 2900, 3100, 2800, 2600, 2400]}
            onPress={() => navigation.navigate('TransactionDetails', { transactionId: 'expenses' })}
          />
        </View>
      </View>

      {/* AI Insights */}
      {aiInsights.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>AI Insights</Text>
            <TouchableOpacity onPress={() => Alert.alert('Coming Soon', 'AI Coach will be implemented soon')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {aiInsights.map((insight) => (
            <AIInsightCard
              key={insight.id}
              title={insight.title}
              description={insight.description}
              category="spending"
              priority="medium"
              onPress={() => Alert.alert('Coming Soon', 'AI Coach will be implemented soon')}
            />
          ))}
        </View>
      )}

      {/* Budget Progress */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Budget Overview</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Budget')}>
            <Text style={styles.seeAll}>Manage</Text>
          </TouchableOpacity>
        </View>
        <BudgetProgress
          category="Dining"
          budgetAmount={600}
          spentAmount={420.50}
          onPress={() => navigation.navigate('Budget')}
        />
        <BudgetProgress
          category="Shopping"
          budgetAmount={400}
          spentAmount={280.75}
          onPress={() => navigation.navigate('Budget')}
        />
      </View>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity onPress={() => Alert.alert('Coming Soon', 'Transaction details will be implemented soon')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        {transactions.slice(0, 3).map((transaction) => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
            onPress={() => navigation.navigate('TransactionDetails', { transactionId: transaction.id })}
          />
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => navigation.navigate('AddTransaction')}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: '#2E7D32' }]}>
              <Text style={styles.quickActionIconText}>+</Text>
            </View>
            <Text style={styles.quickActionText}>Add Transaction</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => navigation.navigate('Budget')}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: '#1976D2' }]}>
              <Text style={styles.quickActionIconText}>📊</Text>
            </View>
            <Text style={styles.quickActionText}>View Budget</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => navigation.navigate('Goals')}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: '#7B1FA2' }]}>
              <Text style={styles.quickActionIconText}>🎯</Text>
            </View>
            <Text style={styles.quickActionText}>Goals</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  greeting: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  balanceSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitleContainer: {
    flexDirection: 'column',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  seeAll: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  quickAction: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionIconText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  quickActionText: {
    fontSize: 12,
    color: '#757575',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default DashboardScreen;
