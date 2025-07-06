import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { PieChart as RNPieChart } from 'react-native-chart-kit';

interface PieChartDataPoint {
  name: string;
  value: number;
  color: string;
  legendFontColor?: string;
  legendFontSize?: number;
}

interface PieChartProps {
  data: PieChartDataPoint[];
  width?: number;
  height?: number;
  showLabels?: boolean;
  showLegend?: boolean;
  showPercentages?: boolean;
  showValues?: boolean;
  animated?: boolean;
  onSlicePress?: (dataPoint: PieChartDataPoint, index: number) => void;
  title?: string;
  subtitle?: string;
  formatValue?: (value: number) => string;
  centerText?: string;
  hasLegend?: boolean;
  legendPosition?: 'bottom' | 'right' | 'top';
  paddingLeft?: number;
  style?: any;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  width = Dimensions.get('window').width - 32,
  height = 220,
  showLabels = true,
  showLegend = true,
  showPercentages = true,
  showValues = false,
  animated = false,
  onSlicePress,
  title,
  subtitle,
  formatValue,
  centerText,
  hasLegend = true,
  legendPosition = 'bottom',
  paddingLeft = 15,
  style,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimationProgress(1);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimationProgress(1);
    }
  }, [animated]);

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  const enhancedData = data.map((item, index) => ({
    ...item,
    percentage: (item.value / totalValue) * 100,
    legendFontColor: item.legendFontColor || '#666666',
    legendFontSize: item.legendFontSize || 12,
  }));

  const handleSlicePress = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
    if (onSlicePress) {
      onSlicePress(data[index], index);
    }
  };

  const chartConfig = {
    backgroundColor: '#FFFFFF',
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(102, 102, 102, ${opacity})`,
    style: {
      borderRadius: 0,
    },
  };

  const getLegendItems = () => {
    return enhancedData.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.legendItem,
          selectedIndex === index && styles.selectedLegendItem
        ]}
        onPress={() => handleSlicePress(index)}
      >
        <View style={[styles.legendColor, { backgroundColor: item.color }]} />
        <View style={styles.legendTextContainer}>
          <Text style={styles.legendName}>{item.name}</Text>
          <View style={styles.legendValues}>
            {showValues && (
              <Text style={styles.legendValue}>
                {formatValue ? formatValue(item.value) : item.value.toLocaleString()}
              </Text>
            )}
            {showPercentages && (
              <Text style={styles.legendPercentage}>
                {item.percentage.toFixed(1)}%
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    ));
  };

  const getSelectedItemInfo = () => {
    if (selectedIndex === null) return null;
    const item = enhancedData[selectedIndex];
    return (
      <View style={styles.selectedInfo}>
        <Text style={styles.selectedTitle}>Selected: {item.name}</Text>
        <Text style={styles.selectedValue}>
          {formatValue ? formatValue(item.value) : item.value.toLocaleString()}
        </Text>
        <Text style={styles.selectedPercentage}>
          {item.percentage.toFixed(2)}% of total
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {/* Header */}
      {(title || subtitle) && (
        <View style={styles.header}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}

      {/* Chart Container */}
      <View style={styles.chartContainer}>
        <RNPieChart
          data={enhancedData}
          width={width}
          height={height}
          chartConfig={chartConfig}
          accessor="value"
          backgroundColor="transparent"
          paddingLeft={paddingLeft.toString()}
          absolute={showLabels}
          hasLegend={false} // We'll create our own legend
          style={styles.chart}
        />
        
        {/* Center Text */}
        {centerText && (
          <View style={styles.centerTextContainer}>
            <Text style={styles.centerText}>{centerText}</Text>
          </View>
        )}
      </View>

      {/* Selected Item Info */}
      {getSelectedItemInfo()}

      {/* Custom Legend */}
      {showLegend && (
        <View style={[
          styles.legendContainer,
          legendPosition === 'right' && styles.legendRight,
          legendPosition === 'top' && styles.legendTop
        ]}>
          <Text style={styles.legendTitle}>Legend</Text>
          {getLegendItems()}
        </View>
      )}

      {/* Statistics */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total</Text>
          <Text style={styles.statValue}>
            {formatValue ? formatValue(totalValue) : totalValue.toLocaleString()}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Categories</Text>
          <Text style={styles.statValue}>{data.length}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Largest</Text>
          <Text style={styles.statValue}>
            {Math.max(...enhancedData.map(item => item.percentage)).toFixed(1)}%
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Smallest</Text>
          <Text style={styles.statValue}>
            {Math.min(...enhancedData.map(item => item.percentage)).toFixed(1)}%
          </Text>
        </View>
      </View>

      {/* Data Breakdown */}
      <View style={styles.breakdownContainer}>
        <Text style={styles.breakdownTitle}>Data Breakdown</Text>
        {enhancedData
          .sort((a, b) => b.value - a.value)
          .map((item, index) => (
            <View key={index} style={styles.breakdownItem}>
              <View style={styles.breakdownLeft}>
                <View style={[styles.breakdownColor, { backgroundColor: item.color }]} />
                <Text style={styles.breakdownName}>{item.name}</Text>
              </View>
              <View style={styles.breakdownRight}>
                <Text style={styles.breakdownValue}>
                  {formatValue ? formatValue(item.value) : item.value.toLocaleString()}
                </Text>
                <Text style={styles.breakdownPercentage}>
                  {item.percentage.toFixed(1)}%
                </Text>
              </View>
            </View>
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
  },
  header: {
    marginBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  chart: {
    borderRadius: 8,
  },
  centerTextContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  selectedInfo: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  selectedTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  selectedValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2196F3',
    marginBottom: 2,
  },
  selectedPercentage: {
    fontSize: 12,
    color: '#666666',
  },
  legendContainer: {
    marginBottom: 16,
  },
  legendRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 120,
  },
  legendTop: {
    marginBottom: 16,
    marginTop: -16,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  selectedLegendItem: {
    backgroundColor: '#E3F2FD',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendTextContainer: {
    flex: 1,
  },
  legendName: {
    fontSize: 12,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  legendValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  legendValue: {
    fontSize: 10,
    color: '#666666',
  },
  legendPercentage: {
    fontSize: 10,
    color: '#2196F3',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  breakdownContainer: {
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    padding: 12,
  },
  breakdownTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  breakdownLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  breakdownColor: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  breakdownName: {
    fontSize: 12,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  breakdownRight: {
    alignItems: 'flex-end',
  },
  breakdownValue: {
    fontSize: 12,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  breakdownPercentage: {
    fontSize: 10,
    color: '#2196F3',
    fontWeight: '500',
  },
});

export default PieChart;