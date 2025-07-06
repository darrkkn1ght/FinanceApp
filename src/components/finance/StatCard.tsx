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
  sparklineData?: number[]; // Array of values for mini chart
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changePercentage,
  icon,
  trend = 'stable',
  onPress,
  color,
  sparklineData = []
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
        return '#10B981'; // Modern green
      case 'expense':
        return '#EF4444'; // Modern red
      case 'balance':
        return '#3B82F6'; // Modern blue
      case 'savings':
        return '#059669'; // Darker green
      case 'investment':
        return '#8B5CF6'; // Modern purple
      default:
        return '#6B7280'; // Modern gray
    }
  };

  const getIconBackground = (): string => {
    const iconColor = getIconColor();
    // Create a subtle gradient-like effect with very light background
    return `${iconColor}08`; // Very light background
  };

  const getTrendColor = (): string => {
    switch (trend) {
      case 'up':
        return '#10B981';
      case 'down':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getTrendBackground = (): string => {
    const trendColor = getTrendColor();
    return `${trendColor}08`; // Very light background
  };

  const getTrendIcon = (): string => {
    switch (trend) {
      case 'up':
        return '↗';
      case 'down':
        return '↘';
      default:
        return '→';
    }
  };

  const renderSparkline = () => {
    if (sparklineData.length < 2) return null;

    const maxValue = Math.max(...sparklineData);
    const minValue = Math.min(...sparklineData);
    const range = maxValue - minValue || 1;

    return (
      <View style={styles.sparklineContainer}>
        {sparklineData.map((point, index) => {
          const height = range > 0 ? ((point - minValue) / range) * 20 : 10;
          const opacity = 0.3 + (index / sparklineData.length) * 0.7; // Gradient effect
          return (
            <View
              key={index}
              style={[
                styles.sparklineBar,
                {
                  height: Math.max(height, 2),
                  backgroundColor: getIconColor(),
                  opacity: opacity,
                }
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { 
          backgroundColor: '#FFFFFF',
          borderColor: '#F3F4F6'
        }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      {/* Header with icon and trend */}
      <View style={styles.header}>
        <View style={[
          styles.iconContainer,
          { backgroundColor: getIconBackground() }
        ]}>
          <Icon 
            name={icon} 
            size={20} 
            color={getIconColor()} 
          />
        </View>
        
        {trend !== 'stable' && (
          <View style={[
            styles.trendContainer,
            { backgroundColor: getTrendBackground() }
          ]}>
            <Text style={[
              styles.trendIcon,
              { color: getTrendColor() }
            ]}>
              {getTrendIcon()}
            </Text>
          </View>
        )}
      </View>

      {/* Main content */}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>
          {formatCurrency(value)}
        </Text>
        
        {/* Change indicator */}
        {(change !== undefined || changePercentage !== undefined) && (
          <View style={styles.changeContainer}>
            <View style={[
              styles.changeBadge,
              { backgroundColor: getTrendBackground() }
            ]}>
              {changePercentage !== undefined && (
                <Text style={[
                  styles.changePercentage,
                  { color: getTrendColor() }
                ]}>
                  {changePercentage > 0 ? '+' : ''}{changePercentage.toFixed(1)}%
                </Text>
              )}
            </View>
            <Text style={styles.changeLabel}>vs last month</Text>
          </View>
        )}
      </View>

      {/* Sparkline chart */}
      {renderSparkline()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    minHeight: 160,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendIcon: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  value: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  changeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 10,
  },
  changePercentage: {
    fontSize: 12,
    fontWeight: '600',
  },
  changeLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  sparklineContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 24,
    gap: 4,
    marginTop: 12,
  },
  sparklineBar: {
    flex: 1,
    borderRadius: 2,
    minHeight: 2,
  },
}); 