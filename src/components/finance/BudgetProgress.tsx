import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface BudgetProgressProps {
  category: string;
  budgetAmount: number;
  spentAmount: number;
  currency?: string;
  onPress?: () => void;
}

export const BudgetProgress: React.FC<BudgetProgressProps> = ({
  category,
  budgetAmount,
  spentAmount,
  currency = 'USD',
  onPress
}) => {
  const progressPercentage = Math.min((spentAmount / budgetAmount) * 100, 100);
  const remainingAmount = budgetAmount - spentAmount;
  const isOverBudget = spentAmount > budgetAmount;
  const isNearLimit = progressPercentage >= 80 && !isOverBudget;

  const getProgressColor = () => {
    if (isOverBudget) return '#E53E3E';
    if (isNearLimit) return '#F56500';
    return '#38A169';
  };

  const getStatusText = () => {
    if (isOverBudget) {
      return `$${(spentAmount - budgetAmount).toFixed(2)} over budget`;
    }
    return `$${remainingAmount.toFixed(2)} remaining`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const CategoryIcon = ({ category }: { category: string }) => {
    const iconMap: { [key: string]: string } = {
      'dining': '🍽️',
      'groceries': '🛒',
      'transportation': '🚗',
      'entertainment': '🎬',
      'shopping': '🛍️',
      'utilities': '💡',
      'healthcare': '⚕️',
      'education': '📚',
      'travel': '✈️',
      'personal': '👤',
      'fitness': '💪',
      'subscriptions': '📺',
      'default': '📊'
    };
    
    return (
      <Text style={styles.categoryIcon}>
        {iconMap[category.toLowerCase()] || iconMap.default}
      </Text>
    );
  };

  return (
    <TouchableOpacity 
      style={[styles.container, isOverBudget && styles.overBudgetContainer]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.categoryInfo}>
          <CategoryIcon category={category} />
          <Text style={styles.categoryName}>{category}</Text>
        </View>
        <View style={styles.amountInfo}>
          <Text style={[styles.spentAmount, isOverBudget && styles.overBudgetText]}>
            {formatCurrency(spentAmount)}
          </Text>
          <Text style={styles.budgetAmount}>
            of {formatCurrency(budgetAmount)}
          </Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View 
            style={[
              styles.progressBar,
              { 
                width: `${progressPercentage}%`,
                backgroundColor: getProgressColor()
              }
            ]}
          />
        </View>
        <Text style={styles.progressPercentage}>
          {progressPercentage.toFixed(0)}%
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={[
          styles.statusText,
          isOverBudget && styles.overBudgetText,
          isNearLimit && styles.nearLimitText
        ]}>
          {getStatusText()}
        </Text>
        
        {isOverBudget && (
          <View style={styles.warningBadge}>
            <Text style={styles.warningText}>Over Budget</Text>
          </View>
        )}
        
        {isNearLimit && (
          <View style={styles.cautionBadge}>
            <Text style={styles.cautionText}>Near Limit</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  overBudgetContainer: {
    borderColor: '#FED7D7',
    backgroundColor: '#FFFAFA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    textTransform: 'capitalize',
  },
  amountInfo: {
    alignItems: 'flex-end',
  },
  spentAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  budgetAmount: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  overBudgetText: {
    color: '#E53E3E',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTrack: {
    flex: 1,
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  progressPercentage: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    minWidth: 32,
    textAlign: 'right',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  nearLimitText: {
    color: '#F56500',
  },
  warningBadge: {
    backgroundColor: '#FED7D7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  warningText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#E53E3E',
  },
  cautionBadge: {
    backgroundColor: '#FEEBC8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  cautionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F56500',
  },
});

export default BudgetProgress;