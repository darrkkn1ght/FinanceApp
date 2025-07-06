import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '../common/Icon';

interface StatCardProps {
  title: string;
  value: number;
  change?: number;
  changePercentage?: number;
  icon: 'income' | 'expense' | 'balance' | 'savings' | 'investment';
  trend?: 'up' | 'down' | 'stable';
  onPress?: () => void;
  color?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changePercentage,
  icon,
  trend = 'stable',
  onPress,
  color
}) => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getIconColor = (): string => {
    if (color) return color;
    
    switch (icon) {
      case 'income':
        return '#2E7D32';
      case 'expense':
        return '#D32F2F';
      case 'balance':
        return '#1976D2';
      case 'savings':
        return '#388E3C';
      case 'investment':
        return '#7B1FA2';
      default:
        return '#757575';
    }
  };

  const getBackgroundColor = (): string => {
    const iconColor = getIconColor();
    return `${iconColor}15`; // 15% opacity
  };

  const getTrendColor = (): string => {
    switch (trend) {
      case 'up':
        return '#2E7D32';
      case 'down':
        return '#D32F2F';
      default:
        return '#757575';
    }
  };

  const getTrendIcon = (): string => {
    switch (trend) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      default:
        return '→';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: getBackgroundColor() }
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={!onPress}
    >
      <View style={styles.header}>
        <View style={[
          styles.iconContainer,
          { backgroundColor: getIconColor() }
        ]}>
          <Icon 
            name={icon} 
            size={20} 
            color="#FFFFFF" 
          />
        </View>
        
        {trend !== 'stable' && (
          <View style={[
            styles.trendContainer,
            { backgroundColor: getTrendColor() }
          ]}>
            <Text style={styles.trendIcon}>{getTrendIcon()}</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[
          styles.value,
          { color: getIconColor() }
        ]}>
          {formatCurrency(value)}
        </Text>
        
        {(change !== undefined || changePercentage !== undefined) && (
          <View style={styles.changeContainer}>
            {change !== undefined && (
              <Text style={[
                styles.change,
                { color: getTrendColor() }
              ]}>
                {change > 0 ? '+' : ''}{formatCurrency(change)}
              </Text>
            )}
            {changePercentage !== undefined && (
              <Text style={[
                styles.changePercentage,
                { color: getTrendColor() }
              ]}>
                {changePercentage > 0 ? '+' : ''}{changePercentage.toFixed(1)}%
              </Text>
            )}
            <Text style={styles.changeLabel}>vs last month</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendIcon: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
    fontWeight: '500',
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  change: {
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
  changePercentage: {
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
  changeLabel: {
    fontSize: 11,
    color: '#9E9E9E',
  },
}); 