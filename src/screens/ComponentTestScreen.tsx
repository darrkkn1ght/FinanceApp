import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { 
  TransactionCard, 
  AccountCard, 
  BudgetProgress, 
  GoalCard, 
  InvestmentCard 
} from '../components/finance';
import { AccountType, TransactionType, TransactionStatus } from '../types/transaction';

export const ComponentTestScreen: React.FC = () => {
  // Mock data for testing components
  const mockTransactions = [
    {
      id: "txn_001",
      amount: -45.67,
      description: "Starbucks Coffee Downtown",
      category: "dining",
      date: "2025-07-05T10:30:00Z",
      merchant: {
        id: "merchant_001",
        name: "Starbucks",
        category: "coffee_shop"
      },
      account: {
        id: "acc_001",
        name: "Primary Checking",
        type: AccountType.CHECKING,
        balance: 5432.18,
        bank: {
          id: "bank_001",
          name: "Chase Bank",
          supportedFeatures: []
        },
        currency: "USD",
        isActive: true,
        accountNumber: "12345678901234",
        lastSync: "2025-07-05T10:30:00Z"
      },
      type: TransactionType.EXPENSE,
      status: TransactionStatus.COMPLETED,
      tags: [],
      notes: "",
      createdAt: "2025-07-05T10:30:00Z",
      updatedAt: "2025-07-05T10:30:00Z",
      metadata: {
        source: 'manual' as const,
        userModified: false
      }
    },
    {
      id: "txn_002",
      amount: 2500.00,
      description: "Salary Deposit",
      category: "income",
      date: "2025-07-04T09:00:00Z",
      merchant: {
        id: "merchant_002",
        name: "ABC Corporation",
        category: "employer"
      },
      account: {
        id: "acc_001",
        name: "Primary Checking",
        type: AccountType.CHECKING,
        balance: 5432.18,
        bank: {
          id: "bank_001",
          name: "Chase Bank",
          supportedFeatures: []
        },
        currency: "USD",
        isActive: true,
        accountNumber: "12345678901234",
        lastSync: "2025-07-05T10:30:00Z"
      },
      type: TransactionType.INCOME,
      status: TransactionStatus.COMPLETED,
      tags: [],
      notes: "",
      createdAt: "2025-07-04T09:00:00Z",
      updatedAt: "2025-07-04T09:00:00Z",
      metadata: {
        source: 'manual' as const,
        userModified: false
      }
    },
    {
      id: "txn_003",
      amount: -125.45,
      description: "Whole Foods Market",
      category: "groceries",
      date: "2025-07-03T15:45:00Z",
      merchant: {
        id: "merchant_003",
        name: "Whole Foods",
        category: "grocery_store"
      },
      account: {
        id: "acc_001",
        name: "Primary Checking",
        type: AccountType.CHECKING,
        balance: 5432.18,
        bank: {
          id: "bank_001",
          name: "Chase Bank",
          supportedFeatures: []
        },
        currency: "USD",
        isActive: true,
        accountNumber: "12345678901234",
        lastSync: "2025-07-05T10:30:00Z"
      },
      type: TransactionType.EXPENSE,
      status: TransactionStatus.COMPLETED,
      tags: [],
      notes: "",
      createdAt: "2025-07-03T15:45:00Z",
      updatedAt: "2025-07-03T15:45:00Z",
      metadata: {
        source: 'manual' as const,
        userModified: false
      }
    },
    {
      id: "txn_004",
      amount: -25.00,
      description: "Uber Ride",
      category: "transportation",
      date: "2025-07-02T18:20:00Z",
      merchant: {
        id: "merchant_004",
        name: "Uber",
        category: "rideshare"
      },
      account: {
        id: "acc_001",
        name: "Primary Checking",
        type: AccountType.CHECKING,
        balance: 5432.18,
        bank: {
          id: "bank_001",
          name: "Chase Bank",
          supportedFeatures: []
        },
        currency: "USD",
        isActive: true,
        accountNumber: "12345678901234",
        lastSync: "2025-07-05T10:30:00Z"
      },
      type: TransactionType.EXPENSE,
      status: TransactionStatus.COMPLETED,
      tags: [],
      notes: "",
      createdAt: "2025-07-02T18:20:00Z",
      updatedAt: "2025-07-02T18:20:00Z",
      metadata: {
        source: 'manual' as const,
        userModified: false
      }
    }
  ];

  const mockAccounts = [
    {
      accountName: "Primary Checking",
      accountType: "checking" as const,
      balance: 5432.18,
      bankName: "Chase Bank",
      accountNumber: "12345678901234",
      isActive: true
    },
    {
      accountName: "Emergency Savings",
      accountType: "savings" as const,
      balance: 12500.00,
      bankName: "Bank of America",
      accountNumber: "98765432109876",
      isActive: true
    },
    {
      accountName: "Travel Rewards Card",
      accountType: "credit" as const,
      balance: 1250.75,
      bankName: "Capital One",
      accountNumber: "55556666777788",
      isActive: true
    },
    {
      accountName: "Investment Account",
      accountType: "investment" as const,
      balance: 25750.30,
      bankName: "Fidelity",
      accountNumber: "11112222333344",
      isActive: false
    }
  ];

  const mockBudgets = [
    {
      category: "Dining & Restaurants",
      budgetAmount: 500,
      spentAmount: 350
    },
    {
      category: "Groceries",
      budgetAmount: 400,
      spentAmount: 480
    },
    {
      category: "Transportation",
      budgetAmount: 300,
      spentAmount: 180
    },
    {
      category: "Entertainment",
      budgetAmount: 200,
      spentAmount: 120
    }
  ];

  const mockGoals = [
    {
      id: "goal_001",
      title: "Emergency Fund",
      description: "6 months of expenses for financial security",
      targetAmount: 15000,
      currentAmount: 8500,
      targetDate: "2025-12-31T23:59:59Z",
      category: "savings",
      priority: "high" as const
    },
    {
      id: "goal_002",
      title: "Vacation to Japan",
      description: "Cherry blossom season trip with family",
      targetAmount: 5000,
      currentAmount: 3200,
      targetDate: "2026-03-15T23:59:59Z",
      category: "travel",
      priority: "medium" as const
    },
    {
      id: "goal_003",
      title: "New Car Down Payment",
      description: "20% down payment for Tesla Model 3",
      targetAmount: 12000,
      currentAmount: 4800,
      targetDate: "2025-09-30T23:59:59Z",
      category: "vehicle",
      priority: "high" as const
    }
  ];

  const mockInvestments = [
    {
      id: "inv_001",
      symbol: "AAPL",
      name: "Apple Inc.",
      currentPrice: 189.45,
      previousPrice: 187.10,
      priceChange: 2.35,
      percentageChange: 1.26,
      shares: 25.5,
      totalValue: 4830.98,
      totalGainLoss: 235.50,
      gainLossPercentage: 5.13
    },
    {
      id: "inv_002",
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      currentPrice: 2750.80,
      previousPrice: 2766.00,
      priceChange: -15.20,
      percentageChange: -0.55,
      shares: 5.2,
      totalValue: 14304.16,
      totalGainLoss: -79.04,
      gainLossPercentage: -0.55
    },
    {
      id: "inv_003",
      symbol: "TSLA",
      name: "Tesla Inc.",
      currentPrice: 245.67,
      previousPrice: 233.22,
      priceChange: 12.45,
      percentageChange: 5.34,
      shares: 15.8,
      totalValue: 3881.59,
      totalGainLoss: 196.71,
      gainLossPercentage: 5.34
    },
    {
      id: "inv_004",
      symbol: "MSFT",
      name: "Microsoft Corp.",
      currentPrice: 345.22,
      previousPrice: 348.00,
      priceChange: -2.78,
      percentageChange: -0.80,
      shares: 18.3,
      totalValue: 6317.53,
      totalGainLoss: -50.94,
      gainLossPercentage: -0.80
    }
  ];

  const handleTransactionPress = (transaction: typeof mockTransactions[0]) => {
    console.log('Transaction pressed:', transaction.id);
  };

  const handleAccountPress = (account: typeof mockAccounts[0]) => {
    console.log('Account pressed:', account.accountName);
  };

  const handleGoalPress = (goal: typeof mockGoals[0]) => {
    console.log('Goal pressed:', goal.title);
  };

  const handleInvestmentPress = (investment: typeof mockInvestments[0]) => {
    console.log('Investment pressed:', investment.symbol);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Component Testing Screen</Text>
          <Text style={styles.subtitle}>Testing all finance components</Text>
        </View>

        {/* Transaction Cards Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💳 Transaction Cards</Text>
          {mockTransactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              onPress={() => handleTransactionPress(transaction)}
            />
          ))}
        </View>

        {/* Account Cards Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏦 Account Cards</Text>
          {mockAccounts.map((account, index) => (
            <AccountCard
              key={index}
              accountName={account.accountName}
              accountType={account.accountType}
              balance={account.balance}
              bankName={account.bankName}
              accountNumber={account.accountNumber}
              isActive={account.isActive}
              onPress={() => handleAccountPress(account)}
            />
          ))}
        </View>

        {/* Budget Progress Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Budget Progress</Text>
          {mockBudgets.map((budget, index) => (
            <BudgetProgress
              key={index}
              category={budget.category}
              budgetAmount={budget.budgetAmount}
              spentAmount={budget.spentAmount}
            />
          ))}
        </View>

        {/* Goal Cards Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Goal Cards</Text>
          {mockGoals.map((goal, index) => (
            <GoalCard
              key={index}
              _id={goal.id}
              title={goal.title}
              targetAmount={goal.targetAmount}
              currentAmount={goal.currentAmount}
              targetDate={goal.targetDate}
              category={goal.category}
              priority={goal.priority}
              onPress={() => handleGoalPress(goal)}
            />
          ))}
        </View>

        {/* Investment Cards Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📈 Investment Cards</Text>
          {mockInvestments.map((investment, index) => (
            <InvestmentCard
              key={index}
              id={investment.id}
              symbol={investment.symbol}
              name={investment.name}
              currentPrice={investment.currentPrice}
              previousPrice={investment.previousPrice}
              shares={investment.shares}
              totalValue={investment.totalValue}
              totalGainLoss={investment.totalGainLoss}
              gainLossPercentage={investment.gainLossPercentage}
              onPress={() => handleInvestmentPress(investment)}
            />
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            All components are working correctly! 🎉
          </Text>
          <Text style={styles.footerSubtext}>
            Ready for integration into main app screens
          </Text>
        </View>
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
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  footerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
  },
});

export default ComponentTestScreen;