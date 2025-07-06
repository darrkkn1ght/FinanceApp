import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface GoalCardProps {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  currency?: string;
  onPress?: () => void;
  onAddFunds?: () => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({
  id,
  title,
  targetAmount,
  currentAmount,
  targetDate,
  category,
  priority,
  currency = 'USD',
  onPress,
  onAddFunds
}) => {
  const progressPercentage = Math.min((currentAmount / targetAmount) * 100, 100);
  const remainingAmount = targetAmount - currentAmount;
  const isCompleted = currentAmount >= targetAmount;
  
  // Calculate days until target date
  const targetDateObj = new Date(targetDate);
  const today = new Date();
  const daysUntilTarget = Math.ceil((targetDateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const isOverdue = daysUntilTarget < 0;

  const getPriorityColor = () => {
    switch (priority) {
      case 'high': return '#E53E3E';
      case 'medium': return '#F56500';
      case 'low': return '#38A169';
      default: return '#64748B';
    }
  };

  const getProgressColor = () => {
    if (isCompleted) return '#38A169';
    if (progressPercentage >= 75) return '#48BB78';
    if (progressPercentage >= 50) return '#F56500';
    return '#E53E3E';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTimeStatus = () => {
    if (isCompleted) return 'Completed! 🎉';
    if (isOverdue) return `${Math.abs(daysUntilTarget)} days overdue`;
    if (daysUntilTarget === 0) return 'Due today!';
    if (daysUntilTarget === 1) return 'Due tomorrow';
    if (daysUntilTarget <= 7) return `${daysUntilTarget} days left`;
    if (daysUntilTarget <= 30) return `${Math.ceil(daysUntilTarget / 7)} weeks left`;
    return `${Math.ceil(daysUntilTarget / 30)} months left`;
  };

  const CategoryIcon = ({ category }: { category: string }) => {
    const iconMap: { [key: string]: string } = {
      'vacation': '🏖️',
      'emergency': '🚨',
      'car': '🚗',
      'house': '🏠',
      'education': '🎓',
      'wedding': '💒',
      'retirement': '🏖️',
      'electronics': '📱',
      'health': '⚕️',
      'investment': '📈',
      'business': '💼',
      'gift': '🎁',
      'default': '🎯'
    };
    
    return (
      <Text style={styles.categoryIcon}>
        {iconMap[category.toLowerCase()] || iconMap.default}
      </Text>
    );
  };

  return (
    <TouchableOpacity 
      style={[styles.container, isCompleted && styles.completedContainer]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <CategoryIcon category={category} />
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.category}>{category}</Text>
          </View>
        </View>
        
        <View style={styles.priorityContainer}>
          <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor() }]}>
            <Text style={styles.priorityText}>
              {priority.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.amountSection}>
        <View style={styles.amountRow}>
          <Text style={styles.currentAmount}>
            {formatCurrency(currentAmount)}
          </Text>
          <Text style={styles.targetAmount}>
            of {formatCurrency(targetAmount)}
          </Text>
        </View>
        
        <Text style={[styles.remainingAmount, isCompleted && styles.completedText]}>
          {isCompleted ? 'Goal Achieved!' : `${formatCurrency(remainingAmount)} to go`}
        </Text>
      </View>

      <View style={styles.progressSection}>
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
        <View style={styles.timeInfo}>
          <Text style={styles.targetDateLabel}>Target Date:</Text>
          <Text style={[styles.targetDateText, isOverdue && styles.overdueText]}>
            {formatDate(targetDate)}
          </Text>
        </View>
        
        <Text style={[
          styles.timeStatus,
          isCompleted && styles.completedText,
          isOverdue && styles.overdueText
        ]}>
          {getTimeStatus()}
        </Text>
      </View>

      {!isCompleted && (
        <TouchableOpacity 
          style={styles.addFundsButton}
          onPress={onAddFunds}
          activeOpacity={0.8}
        >
          <Text style={styles.addFundsText}>+ Add Funds</Text>
        </TouchableOpacity>
      )}

      {isCompleted && (
        <View style={styles.completedBadge}>
          <Text style={styles.completedBadgeText}>🎉 Goal Achieved!</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  completedContainer: {
    borderColor: '#C6F6D5',
    backgroundColor: '#F0FFF4',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#64748B',
    textTransform: 'capitalize',
  },
  priorityContainer: {
    marginLeft: 12,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  amountSection: {
    marginBottom: 16,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  currentAmount: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A1A',
    marginRight: 8,
  },
  targetAmount: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
  remainingAmount: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  completedText: {
    color: '#38A169',
    fontWeight: '600',
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTrack: {
    flex: 1,
    height: 10,
    backgroundColor: '#F1F5F9',
    borderRadius: 5,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    minWidth: 36,
    textAlign: 'right',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  timeInfo: {
    flex: 1,
  },
  targetDateLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 2,
  },
  targetDateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  overdueText: {
    color: '#E53E3E',
  },
  timeStatus: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    textAlign: 'right',
  },
  addFundsButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
  },
  addFundsText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  completedBadge: {
    backgroundColor: '#C6F6D5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
  },
  completedBadgeText: {
    color: '#38A169',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default GoalCard;