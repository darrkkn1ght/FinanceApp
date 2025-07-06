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

  const getCardBackground = (): string => {
    const iconColor = getIconColor();
    // Create a subtle gradient-like effect
    return `${iconColor}03`; // Extremely light background
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
          const height = range > 0 ? ((point - minValue) / range) * 24 : 12;
          return (
            <View
              key={index}
              style={[
                styles.sparklineBar,
                {
                  height: Math.max(height, 3),
                  backgroundColor: getIconColor(),
                  opacity: 0.8 + (index / sparklineData.length) * 0.2, // Fade effect
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
          backgroundColor: getCardBackground(),
          borderColor: `${getIconColor()}15`
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
          { backgroundColor: getIconColor() }
        ]}>
          <Icon 
            name={icon} 
            size={18} 
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

      {/* Main content */}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[
          styles.value,
          { color: getIconColor() }
        ]}>
          {formatCurrency(value)}
        </Text>
        
        {/* Change indicator */}
        {(change !== undefined || changePercentage !== undefined) && (
          <View style={styles.changeContainer}>
            <View style={[
              styles.changeBadge,
              { backgroundColor: getTrendColor() }
            ]}>
              {changePercentage !== undefined && (
                <Text style={styles.changePercentage}>
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
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    minHeight: 140,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  trendContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  trendIcon: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 6,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  changeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  changePercentage: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  changeLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  sparklineContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 28,
    gap: 3,
    marginTop: 8,
  },
  sparklineBar: {
    flex: 1,
    borderRadius: 2,
    minHeight: 3,
  },
}); 