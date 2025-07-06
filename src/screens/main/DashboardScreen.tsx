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
import { GoalCard } from '../../components/finance/GoalCard';
import { AIInsightCard } from '../../components/ai/AIInsightCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Card } from '../../components/common/Card';

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
      
      // Load recent transactions
      const transactionsResponse = await transactionService.getTransactions();
      if (transactionsResponse.success) {
        setTransactions(transactionsResponse.data.slice(0, 5)); // Show only 5 recent
      }

      // Load investment data
      const investmentsResponse = await investmentService.getInvestments();
      if (investmentsResponse.success) {
        setInvestments(investmentsResponse.data);
      }

      // Load AI insights
      const aiInsightsResponse = await aiService.getInsights();
      if (aiInsightsResponse.success) {
        setAiInsights(aiInsightsResponse.data.slice(0, 3)); // Show top 3
      }
    } catch (error) {
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
    return investments.reduce((total, investment) => total + investment.currentValue, 0);
  };

  const calculateMonthlySpending = (): number => {
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    
    return transactions
      .filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate.getMonth() === thisMonth && 
               transactionDate.getFullYear() === thisYear &&
               transaction.amount < 0;
      })
      .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);
  };

  const calculateMonthlyIncome = (): number => {
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    
    return transactions
      .filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate.getMonth() === thisMonth && 
               transactionDate.getFullYear() === thisYear &&
               transaction.amount > 0;
      })
      .reduce((total, transaction) => total + transaction.amount, 0);
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (loading) {
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
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Good Morning!</Text>
        <Text style={styles.subtitle}>Here's your financial overview</Text>
      </View>

      {/* Account Balance Cards */}
      <View style={styles.balanceSection}>
        <AccountCard
          accountName="Total Balance"
          accountType="investment"
          balance={calculateTotalBalance()}
          bankName="Portfolio"
          accountNumber="1234"
          onPress={() => Alert.alert('Coming Soon', 'Investment details will be implemented soon')}
        />
        <View style={styles.balanceRow}>
          <AccountCard
            accountName="Monthly Income"
            accountType="checking"
            balance={calculateMonthlyIncome()}
            bankName="Income"
            accountNumber="5678"
            onPress={() => Alert.alert('Coming Soon', 'Transaction details will be implemented soon')}
          />
          <AccountCard
            accountName="Monthly Spending"
            accountType="credit"
            balance={-calculateMonthlySpending()}
            bankName="Expenses"
            accountNumber="9012"
            onPress={() => Alert.alert('Coming Soon', 'Transaction details will be implemented soon')}
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
          <TouchableOpacity onPress={() => Alert.alert('Coming Soon', 'Budget management will be implemented soon')}>
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
          spentAmount={180.25}
          onPress={() => navigation.navigate('Budget')}
        />
        <BudgetProgress
          category="Entertainment"
          budgetAmount={200}
          spentAmount={95.75}
          onPress={() => navigation.navigate('Budget')}
        />
      </View>

      {/* Financial Goals */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Financial Goals</Text>
          <TouchableOpacity onPress={() => Alert.alert('Coming Soon', 'Goals will be implemented soon')}>
            <Text style={styles.seeAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <GoalCard
          id="1"
          title="Emergency Fund"
          targetAmount={5000}
          currentAmount={2500}
          targetDate="2025-12-31"
          category="emergency"
          priority="high"
          onPress={() => Alert.alert('Coming Soon', 'Goals will be implemented soon')}
        />
        <GoalCard
          id="2"
          title="Vacation Fund"
          targetAmount={3000}
          currentAmount={800}
          targetDate="2025-08-15"
          category="vacation"
          priority="medium"
          onPress={() => Alert.alert('Coming Soon', 'Goals will be implemented soon')}
        />
      </View>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity onPress={() => Alert.alert('Coming Soon', 'Transactions will be implemented soon')}>
            <Text style={styles.seeAll}>View All</Text>
          </TouchableOpacity>
        </View>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              onPress={() => Alert.alert('Coming Soon', 'Transaction details will be implemented soon')}
            />
          ))
        ) : (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyText}>No recent transactions</Text>
          </Card>
        )}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => Alert.alert('Coming Soon', 'Add transaction will be implemented soon')}
          >
            <Text style={styles.quickActionText}>Add Transaction</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => Alert.alert('Coming Soon', 'AI Coach will be implemented soon')}
          >
            <Text style={styles.quickActionText}>Ask AI Coach</Text>
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
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
  balanceSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 12,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  seeAll: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: '500',
  },
  emptyCard: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 12,
  },
  quickAction: {
    flex: 1,
    backgroundColor: '#2E7D32',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  quickActionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DashboardScreen;
