import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ViewStyle } from 'react-native';
import { LineChart as RNLineChart } from 'react-native-chart-kit';

interface LineChartDataPoint {
  x: number;
  y: number;
  label?: string;
  date?: string;
}

interface LineChartProps {
  data: LineChartDataPoint[];
  width?: number;
  height?: number;
  color?: string;
  showGrid?: boolean;
  showDots?: boolean;
  showLabels?: boolean;
  animated?: boolean;
  onDataPointPress?: (dataPoint: LineChartDataPoint, index: number) => void;
  title?: string;
  subtitle?: string;
  formatValue?: (value: number) => string;
  yAxisSuffix?: string;
  yAxisPrefix?: string;
  fillShadowGradient?: boolean;
  strokeWidth?: number;
  bezier?: boolean;
  withInnerLines?: boolean;
  withOuterLines?: boolean;
  withVerticalLines?: boolean;
  withHorizontalLines?: boolean;
  style?: ViewStyle;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  width = Dimensions.get('window').width - 32,
  height = 220,
  color = '#2196F3',
  showGrid = true,
  showDots = true,
  showLabels: _showLabels = true,
  animated: _animated = false,
  onDataPointPress,
  title,
  subtitle,
  formatValue,
  yAxisSuffix = '',
  yAxisPrefix = '',
  fillShadowGradient = true,
  strokeWidth = 2,
  bezier = true,
  withInnerLines = true,
  withOuterLines = true,
  withVerticalLines = true,
  withHorizontalLines = true,
  style,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleDataPointPress = (dataPoint: { index: number; value: number; x: number; y: number }) => {
    setSelectedIndex(dataPoint.index);
    setTooltipPosition({ x: dataPoint.x, y: dataPoint.y });
    setTooltipVisible(true);
    
    if (onDataPointPress) {
      onDataPointPress(data[dataPoint.index], dataPoint.index);
    }

    // Tooltip will be hidden when user selects another point or clears selection
  };

  const chartData = {
    labels: data.map((item, index) => 
      item.label || item.date || index.toString()
    ),
    datasets: [
      {
        data: data.map(item => item.y),
        color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
        strokeWidth,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#FFFFFF',
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: 0,
    color: (opacity = 1) => color.replace(')', `, ${opacity})`).replace('rgb', 'rgba'),
    labelColor: (opacity = 1) => `rgba(102, 102, 102, ${opacity})`,
    style: {
      borderRadius: 0,
    },
    propsForDots: {
      r: showDots ? '4' : '0',
      strokeWidth: '2',
      stroke: color,
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: showGrid ? '#E0E0E0' : 'transparent',
      strokeWidth: 1,
    },
    propsForLabels: {
      fontSize: 12,
    },
    formatYLabel: formatValue ? ((value: string) => formatValue(parseFloat(value))) : ((value: string) => {
      const num = parseFloat(value);
      return `${yAxisPrefix}${num}${yAxisSuffix}`;
    }),
    fillShadowGradient: fillShadowGradient ? color : 'transparent',
    fillShadowGradientOpacity: 0.1,
  };

  const maxValue = Math.max(...data.map(item => item.y));
  const minValue = Math.min(...data.map(item => item.y));
  const avgValue = data.reduce((sum, item) => sum + item.y, 0) / data.length;

  const getTrendDirection = () => {
    if (data.length < 2) return 'neutral';
    const firstValue = data[0].y;
    const lastValue = data[data.length - 1].y;
    const change = ((lastValue - firstValue) / firstValue) * 100;
    
    if (change > 1) return 'up';
    if (change < -1) return 'down';
    return 'neutral';
  };

  const getTrendColor = () => {
    const trend = getTrendDirection();
    switch (trend) {
      case 'up': return '#4CAF50';
      case 'down': return '#F44336';
      default: return '#FF9800';
    }
  };

  const getTrendPercentage = () => {
    if (data.length < 2) return 0;
    const firstValue = data[0].y;
    const lastValue = data[data.length - 1].y;
    return ((lastValue - firstValue) / firstValue) * 100;
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

      {/* Trend Indicator */}
      <View style={styles.trendContainer}>
        <View style={[styles.trendIndicator, { backgroundColor: getTrendColor() }]}>
          <Text style={styles.trendText}>
            {getTrendDirection() === 'up' ? '↗' : getTrendDirection() === 'down' ? '↘' : '→'}
          </Text>
        </View>
        <Text style={[styles.trendPercentage, { color: getTrendColor() }]}>
          {getTrendPercentage() >= 0 ? '+' : ''}{getTrendPercentage().toFixed(2)}%
        </Text>
      </View>

      {/* Chart */}
      <View style={styles.chartContainer}>
        <RNLineChart
          data={chartData}
          width={width}
          height={height}
          chartConfig={chartConfig}
          style={styles.chart}
          bezier={bezier}
          withInnerLines={withInnerLines}
          withOuterLines={withOuterLines}
          withVerticalLines={withVerticalLines}
          withHorizontalLines={withHorizontalLines}
          withDots={showDots}
          withShadow={fillShadowGradient}
          onDataPointClick={handleDataPointPress}
          segments={5}
        />
      </View>

      {/* Tooltip */}
      {tooltipVisible && selectedIndex !== null && (
        <View style={[styles.tooltip, { left: tooltipPosition.x - 50, top: tooltipPosition.y - 40 }]}>
          <Text style={styles.tooltipLabel}>
            {data[selectedIndex].label || data[selectedIndex].date || `Point ${selectedIndex + 1}`}
          </Text>
          <Text style={styles.tooltipValue}>
            {formatValue 
              ? formatValue(data[selectedIndex].y) 
              : `${yAxisPrefix}${data[selectedIndex].y}${yAxisSuffix}`
            }
          </Text>
        </View>
      )}

      {/* Data Points List */}
      {selectedIndex !== null && (
        <View style={styles.selectedInfo}>
          <Text style={styles.selectedLabel}>
            {data[selectedIndex].label || data[selectedIndex].date || `Data Point ${selectedIndex + 1}`}
          </Text>
          <Text style={styles.selectedValue}>
            {formatValue 
              ? formatValue(data[selectedIndex].y) 
              : `${yAxisPrefix}${data[selectedIndex].y}${yAxisSuffix}`
            }
          </Text>
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={() => setSelectedIndex(null)}
          >
            <Text style={styles.clearButtonText}>Clear Selection</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Statistics */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>High</Text>
          <Text style={styles.statValue}>
            {formatValue 
              ? formatValue(maxValue) 
              : `${yAxisPrefix}${maxValue}${yAxisSuffix}`
            }
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Low</Text>
          <Text style={styles.statValue}>
            {formatValue 
              ? formatValue(minValue) 
              : `${yAxisPrefix}${minValue}${yAxisSuffix}`
            }
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Avg</Text>
          <Text style={styles.statValue}>
            {formatValue 
              ? formatValue(avgValue) 
              : `${yAxisPrefix}${Math.round(avgValue)}${yAxisSuffix}`
            }
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Range</Text>
          <Text style={styles.statValue}>
            {formatValue 
              ? formatValue(maxValue - minValue) 
              : `${yAxisPrefix}${Math.round(maxValue - minValue)}${yAxisSuffix}`
            }
          </Text>
        </View>
      </View>

      {/* Data Summary */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Data Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Points:</Text>
          <Text style={styles.summaryValue}>{data.length}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Time Period:</Text>
          <Text style={styles.summaryValue}>
            {data.length > 0 && data[0].date && data[data.length - 1].date
              ? `${data[0].date} - ${data[data.length - 1].date}`
              : `${data.length} data points`
            }
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Trend:</Text>
          <Text style={[styles.summaryValue, { color: getTrendColor() }]}>
            {getTrendDirection() === 'up' ? 'Upward' : 
             getTrendDirection() === 'down' ? 'Downward' : 'Neutral'}
          </Text>
        </View>
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
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  trendIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  trendText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  trendPercentage: {
    fontSize: 16,
    fontWeight: '600',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  chart: {
    borderRadius: 8,
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 6,
    padding: 8,
    zIndex: 1000,
    minWidth: 100,
    alignItems: 'center',
  },
  tooltipLabel: {
    fontSize: 10,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  tooltipValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  selectedInfo: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  selectedLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  selectedValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2196F3',
    marginBottom: 8,
  },
  clearButton: {
    backgroundColor: '#2196F3',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  clearButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
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
  summaryContainer: {
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    padding: 12,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666666',
  },
  summaryValue: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1A1A1A',
  },
});

export default LineChart;