import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ViewStyle } from 'react-native';
import { BarChart as RNBarChart } from 'react-native-chart-kit';

interface BarChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarChartDataPoint[];
  width?: number;
  height?: number;
  showGrid?: boolean;
  showLabels?: boolean;
  showValues?: boolean;
  animated?: boolean;
  colors?: string[];
  onBarPress?: (dataPoint: BarChartDataPoint, index: number) => void;
  title?: string;
  subtitle?: string;
  formatValue?: (value: number) => string;
  yAxisSuffix?: string;
  yAxisPrefix?: string;
  maxValue?: number;
  minValue?: number;
  horizontalLabelRotation?: number;
  verticalLabelRotation?: number;
  style?: ViewStyle;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  width = Dimensions.get('window').width - 32,
  height = 220,
  showGrid = true,
  showLabels = true,
  showValues = true,
  animated: _animated = false,
  colors = ['#2196F3', '#4CAF50', '#FF9800', '#F44336', '#9C27B0', '#00BCD4'],
  onBarPress,
  title,
  subtitle,
  formatValue,
  yAxisSuffix = '',
  yAxisPrefix = '',
  maxValue: _maxValue,
  minValue,
  horizontalLabelRotation = 0,
  verticalLabelRotation = 0,
  style,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  // Animation state removed - not being used

  const handleBarPress = (index: number) => {
    setSelectedIndex(index);
    if (onBarPress) {
      onBarPress(data[index], index);
    }
  };

  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        data: data.map(item => item.value),
        colors: data.map((item, index) => 
          (_opacity = 1) => item.color || colors[index % colors.length]
        ),
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#FFFFFF',
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(102, 102, 102, ${opacity})`,
    style: {
      borderRadius: 0,
    },
    propsForDots: {
      r: '0',
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
    yAxisSuffix,
    yAxisPrefix,
    yLabelsOffset: 10,
    xLabelsOffset: 10,
    horizontalLabelRotation,
    verticalLabelRotation,
  };

  const maxDataValue = Math.max(...data.map(item => item.value));
  const minDataValue = Math.min(...data.map(item => item.value));

  const getBarColor = (index: number) => {
    if (selectedIndex === index) {
      return '#1976D2'; // Darker blue for selected bar
    }
    return data[index].color || colors[index % colors.length];
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

      {/* Chart */}
      <View style={styles.chartContainer}>
        <RNBarChart
          data={chartData}
          width={width}
          height={height}
          chartConfig={chartConfig}
          style={styles.chart}
          showValuesOnTopOfBars={showValues}
          withHorizontalLabels={showLabels}
          withVerticalLabels={showLabels}
          fromZero={minValue === undefined}
          segments={5}
          yAxisLabel=""
          yAxisSuffix=""
        />
      </View>

      {/* Custom Bar Values */}
      {showValues && (
        <View style={styles.valuesContainer}>
          {data.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.valueItem,
                { backgroundColor: getBarColor(index) },
                selectedIndex === index && styles.selectedValueItem
              ]}
              onPress={() => handleBarPress(index)}
            >
              <Text style={styles.valueText}>
                {formatValue ? formatValue(item.value) : `${yAxisPrefix}${item.value}${yAxisSuffix}`}
              </Text>
              <Text style={styles.labelText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Selected Bar Info */}
      {selectedIndex !== null && (
        <View style={styles.selectedInfo}>
          <Text style={styles.selectedLabel}>
            {data[selectedIndex].label}
          </Text>
          <Text style={styles.selectedValue}>
            {formatValue 
              ? formatValue(data[selectedIndex].value) 
              : `${yAxisPrefix}${data[selectedIndex].value}${yAxisSuffix}`
            }
          </Text>
        </View>
      )}

      {/* Statistics */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Max</Text>
          <Text style={styles.statValue}>
            {formatValue 
              ? formatValue(maxDataValue) 
              : `${yAxisPrefix}${maxDataValue}${yAxisSuffix}`
            }
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Min</Text>
          <Text style={styles.statValue}>
            {formatValue 
              ? formatValue(minDataValue) 
              : `${yAxisPrefix}${minDataValue}${yAxisSuffix}`
            }
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Avg</Text>
          <Text style={styles.statValue}>
            {formatValue 
              ? formatValue(data.reduce((sum, item) => sum + item.value, 0) / data.length) 
              : `${yAxisPrefix}${Math.round(data.reduce((sum, item) => sum + item.value, 0) / data.length)}${yAxisSuffix}`
            }
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
  chartContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  chart: {
    borderRadius: 8,
  },
  valuesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  valueItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginHorizontal: 4,
    marginVertical: 2,
    minWidth: 60,
    alignItems: 'center',
  },
  selectedValueItem: {
    transform: [{ scale: 1.05 }],
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  valueText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  labelText: {
    fontSize: 10,
    color: '#FFFFFF',
    textAlign: 'center',
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
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
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
});

export default BarChart;