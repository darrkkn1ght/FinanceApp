import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Transaction } from '../../types/transaction';

interface TransactionCardProps {
  transaction: Transaction;
  onPress?: (transaction: Transaction) => void;
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (transactionId: string) => void;
  showActions?: boolean;
  compact?: boolean;
}

const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    dining: '🍽️',
    shopping: '🛍️',
    transportation: '🚗',
    entertainment: '🎬',
    bills: '💡',
    healthcare: '🏥',
    education: '📚',
    travel: '✈️',
    income: '💰',
    savings: '🏦',
    other: '📝',
  };
  return icons[category] || '📝';
};

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    dining: '#FF6B6B',
    shopping: '#4ECDC4',
    transportation: '#45B7D1',
    entertainment: '#96CEB4',
    bills: '#FFEAA7',
    healthcare: '#DDA0DD',
    education: '#98D8C8',
    travel: '#F7DC6F',
    income: '#82E0AA',
    savings: '#85C1E9',
    other: '#D7DBDD',
  };
  return colors[category] || '#D7DBDD';
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return 'Today';
  } else if (diffDays === 2) {
    return 'Yesterday';
  } else if (diffDays <= 7) {
    return `${diffDays - 1} days ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  }
};

const formatAmount = (amount: number): { text: string; color: string } => {
  const isIncome = amount > 0;
  const formattedAmount = Math.abs(amount).toFixed(2);
  
  return {
    text: `${isIncome ? '+' : '-'}$${formattedAmount}`,
    color: isIncome ? '#38A169' : '#E53E3E',
  };
};

export const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  onPress,
  onEdit,
  onDelete,
  showActions = false,
  compact = false,
}) => {
  const categoryIcon = getCategoryIcon(transaction.category);
  const categoryColor = getCategoryColor(transaction.category);
  const formattedDate = formatDate(transaction.date);
  const { text: amountText, color: amountColor } = formatAmount(transaction.amount);

  const handlePress = () => {
    if (onPress) {
      onPress(transaction);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(transaction);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            if (onDelete) {
              onDelete(transaction.id);
            }
          },
        },
      ]
    );
  };

  const getCategoryDisplayName = (category: string): string => {
    const names: Record<string, string> = {
      dining: 'Dining & Food',
      shopping: 'Shopping',
      transportation: 'Transportation',
      entertainment: 'Entertainment',
      bills: 'Bills & Utilities',
      healthcare: 'Healthcare',
      education: 'Education',
      travel: 'Travel',
      income: 'Income',
      savings: 'Savings',
      other: 'Other',
    };
    return names[category] || 'Other';
  };

  if (compact) {
    return (
      <TouchableOpacity
        style={styles.compactContainer}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={[styles.compactIcon, { backgroundColor: categoryColor }]}>
          <Text style={styles.compactIconText}>{categoryIcon}</Text>
        </View>
        
        <View style={styles.compactContent}>
          <Text style={styles.compactDescription} numberOfLines={1}>
            {transaction.description}
          </Text>
          <Text style={styles.compactMerchant} numberOfLines={1}>
            {transaction.merchant.name}
          </Text>
        </View>
        
        <View style={styles.compactRight}>
          <Text style={[styles.compactAmount, { color: amountColor }]}>
            {amountText}
          </Text>
          <Text style={styles.compactDate}>{formattedDate}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <View style={[styles.iconContainer, { backgroundColor: categoryColor }]}>
            <Text style={styles.iconText}>{categoryIcon}</Text>
          </View>
          
          <View style={styles.transactionInfo}>
            <Text style={styles.description} numberOfLines={2}>
              {transaction.description}
            </Text>
            <Text style={styles.merchant} numberOfLines={1}>
              {transaction.merchant.name}
            </Text>
            <Text style={styles.category}>
              {getCategoryDisplayName(transaction.category)}
            </Text>
          </View>
        </View>
        
        <View style={styles.rightSection}>
          <Text style={[styles.amount, { color: amountColor }]}>
            {amountText}
          </Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
      </View>

      {showActions && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleEdit}>
            <Text style={styles.actionButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton]} 
            onPress={handleDelete}
          >
            <Text style={[styles.actionButtonText, styles.deleteButtonText]}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftSection: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
  },
  transactionInfo: {
    flex: 1,
    marginRight: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
    lineHeight: 20,
  },
  merchant: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 2,
  },
  category: {
    fontSize: 12,
    color: '#94A3B8',
    textTransform: 'capitalize',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#94A3B8',
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
  deleteButton: {
    backgroundColor: '#FEF2F2',
  },
  deleteButtonText: {
    color: '#DC2626',
  },
  // Compact styles
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  compactIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  compactIconText: {
    fontSize: 16,
  },
  compactContent: {
    flex: 1,
    marginRight: 8,
  },
  compactDescription: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  compactMerchant: {
    fontSize: 12,
    color: '#64748B',
  },
  compactRight: {
    alignItems: 'flex-end',
  },
  compactAmount: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  compactDate: {
    fontSize: 10,
    color: '#94A3B8',
  },
});

export default TransactionCard;