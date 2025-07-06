import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { BudgetProgress } from '../../components/finance/BudgetProgress';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { budgetService } from '../../services/api';
import { Budget, BudgetCategory } from '../../types/budget';
import { MainStackParamList } from '../../types/navigation';

interface BudgetScreenProps {
  navigation: NavigationProp<MainStackParamList, 'Budget'>;
}

export const BudgetScreen: React.FC<BudgetScreenProps> = ({ navigation: _navigation }) => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [_categories, setCategories] = useState<BudgetCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<'monthly' | 'weekly' | 'yearly'>('monthly');

  useEffect(() => {
    loadBudgetData();
  }, [selectedPeriod]);

  const loadBudgetData = async () => {
    try {
      const budgetResponse = await budgetService.getBudgets();

      if (budgetResponse.success && budgetResponse.data) {
        setBudgets(budgetResponse.data);
        // Extract categories from budgets
        const allCategories = budgetResponse.data.flatMap(budget => budget.categories);
        setCategories(allCategories);
      } else {
        Alert.alert('Error', 'Failed to load budget data');
      }
    } catch (_error) {
      Alert.alert('Error', 'Something went wrong while loading budgets');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadBudgetData();
  };

  const handleCreateBudget = () => {
    // TODO: Navigate to budget form when implemented
    Alert.alert('Coming Soon', 'Budget form will be implemented soon');
  };

  const handleEditBudget = (_budget: Budget) => {
    // TODO: Navigate to budget form when implemented
    Alert.alert('Coming Soon', 'Budget editing will be implemented soon');
  };

  const handleDeleteBudget = (budgetId: string) => {
    Alert.alert(
      'Delete Budget',
      'Are you sure you want to delete this budget?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const response = await budgetService.deleteBudget(budgetId);
            if (response.success) {
              setBudgets(budgets.filter(b => b.id !== budgetId));
              Alert.alert('Success', 'Budget deleted successfully');
            } else {
              Alert.alert('Error', 'Failed to delete budget');
            }
          },
        },
      ]
    );
  };

  const getTotalBudgetAmount = () => {
    return budgets.reduce((sum, budget) => {
      const budgetTotal = budget.categories.reduce((catSum, cat) => catSum + cat.budgetedAmount, 0);
      return sum + budgetTotal;
    }, 0);
  };

  const getTotalSpentAmount = () => {
    return budgets.reduce((sum, budget) => {
      const spentTotal = budget.categories.reduce((catSum, cat) => catSum + cat.spentAmount, 0);
      return sum + spentTotal;
    }, 0);
  };

  const renderPeriodSelector = () => (
    <View style={styles.periodSelector}>
      {(['monthly', 'weekly', 'yearly'] as const).map((period) => (
        <TouchableOpacity
          key={period}
          style={[
            styles.periodButton,
            selectedPeriod === period && styles.periodButtonActive,
          ]}
          onPress={() => setSelectedPeriod(period)}
        >
          <Text
            style={[
              styles.periodButtonText,
              selectedPeriod === period && styles.periodButtonTextActive,
            ]}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderBudgetOverview = () => (
    <Card style={styles.overviewCard}>
      <Text style={styles.overviewTitle}>Budget Overview</Text>
      <View style={styles.overviewContent}>
        <View style={styles.overviewItem}>
          <Text style={styles.overviewLabel}>Total Budget</Text>
          <Text style={styles.overviewAmount}>
            ${getTotalBudgetAmount().toFixed(2)}
          </Text>
        </View>
        <View style={styles.overviewItem}>
          <Text style={styles.overviewLabel}>Total Spent</Text>
          <Text style={[styles.overviewAmount, styles.spentAmount]}>
            ${getTotalSpentAmount().toFixed(2)}
          </Text>
        </View>
        <View style={styles.overviewItem}>
          <Text style={styles.overviewLabel}>Remaining</Text>
          <Text style={[styles.overviewAmount, styles.remainingAmount]}>
            ${(getTotalBudgetAmount() - getTotalSpentAmount()).toFixed(2)}
          </Text>
        </View>
      </View>
      <BudgetProgress
        category="Overall Budget"
        budgetAmount={getTotalBudgetAmount()}
        spentAmount={getTotalSpentAmount()}
      />
    </Card>
  );

  const renderBudgetItem = (budget: Budget) => {
    const budgetTotal = budget.categories.reduce((sum, cat) => sum + cat.budgetedAmount, 0);
    const spentTotal = budget.categories.reduce((sum, cat) => sum + cat.spentAmount, 0);
    const progressPercentage = budgetTotal > 0 ? (spentTotal / budgetTotal) * 100 : 0;
    const isOverBudget = progressPercentage > 100;
    const category = budget.categories[0]; // Use first category for display

    return (
      <Card key={budget.id} style={styles.budgetItem}>
        <View style={styles.budgetHeader}>
          <View style={styles.budgetInfo}>
            <View style={styles.budgetTitleRow}>
              <Ionicons
                name={category?.icon as keyof typeof Ionicons.glyphMap || 'wallet-outline'}
                size={24}
                color={category?.color || '#2E7D32'}
                style={styles.budgetIcon}
              />
              <Text style={styles.budgetTitle}>{budget.name}</Text>
            </View>
            <Text style={styles.budgetCategory}>{category?.name}</Text>
          </View>
          <View style={styles.budgetActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleEditBudget(budget)}
            >
              <Ionicons name="create-outline" size={20} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleDeleteBudget(budget.id)}
            >
              <Ionicons name="trash-outline" size={20} color="#E53E3E" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.budgetAmount}>
          <Text style={styles.spentText}>
            ${spentTotal.toFixed(2)} spent of ${budgetTotal.toFixed(2)}
          </Text>
          <Text style={[styles.remainingText, isOverBudget && styles.overBudgetText]}>
            {isOverBudget
              ? `$${(spentTotal - budgetTotal).toFixed(2)} over budget`
              : `$${(budgetTotal - spentTotal).toFixed(2)} remaining`}
          </Text>
        </View>

        <BudgetProgress
          category={category?.name || budget.name}
          budgetAmount={budgetTotal}
          spentAmount={spentTotal}
        />
      </Card>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="wallet-outline" size={64} color="#CCCCCC" />
      <Text style={styles.emptyStateTitle}>No Budgets Yet</Text>
      <Text style={styles.emptyStateDescription}>
        Create your first budget to start tracking your spending
      </Text>
      <Button
        title="Create Budget"
        onPress={handleCreateBudget}
        style={styles.emptyStateButton}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {renderPeriodSelector()}
        
        {budgets.length > 0 ? (
          <>
            {renderBudgetOverview()}
            <View style={styles.budgetList}>
              <Text style={styles.sectionTitle}>Budget Categories</Text>
              {budgets.map(renderBudgetItem)}
            </View>
          </>
        ) : (
          renderEmptyState()
        )}
      </ScrollView>

      <View style={styles.floatingButton}>
        <TouchableOpacity
          style={styles.fab}
          onPress={handleCreateBudget}
        >
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
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
  },
  scrollView: {
    flex: 1,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: '#2E7D32',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  periodButtonTextActive: {
    color: '#FFFFFF',
  },
  overviewCard: {
    margin: 16,
    marginBottom: 8,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  overviewContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  overviewItem: {
    alignItems: 'center',
  },
  overviewLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  overviewAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  spentAmount: {
    color: '#E53E3E',
  },
  remainingAmount: {
    color: '#2E7D32',
  },
  overviewProgress: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  budgetList: {
    paddingBottom: 80,
  },
  budgetItem: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  budgetInfo: {
    flex: 1,
  },
  budgetTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  budgetIcon: {
    marginRight: 8,
  },
  budgetTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  budgetCategory: {
    fontSize: 14,
    color: '#666',
  },
  budgetActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  budgetAmount: {
    marginBottom: 12,
  },
  spentText: {
    fontSize: 14,
    color: '#1A1A1A',
    marginBottom: 2,
  },
  remainingText: {
    fontSize: 12,
    color: '#2E7D32',
  },
  overBudgetText: {
    color: '#E53E3E',
  },
  budgetProgress: {
    marginBottom: 8,
  },
  alertsContainer: {
    marginTop: 8,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    padding: 8,
    borderRadius: 6,
    marginBottom: 4,
  },
  alertText: {
    fontSize: 12,
    color: '#F57C00',
    marginLeft: 6,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyStateButton: {
    minWidth: 160,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  fab: {
    backgroundColor: '#2E7D32',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});

export default BudgetScreen;