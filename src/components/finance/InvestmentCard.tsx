import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface InvestmentCardProps {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  previousPrice: number;
  shares: number;
  totalValue: number;
  totalGainLoss: number;
  gainLossPercentage: number;
  marketCap?: string;
  dividend?: number;
  currency?: string;
  onPress?: () => void;
  onBuyMore?: () => void;
}

export const InvestmentCard: React.FC<InvestmentCardProps> = ({
  id,
  symbol,
  name,
  currentPrice,
  previousPrice,
  shares,
  totalValue,
  totalGainLoss,
  gainLossPercentage,
  marketCap,
  dividend,
  currency = 'USD',
  onPress,
  onBuyMore
}) => {
  const isGain = totalGainLoss >= 0;
  const isPriceUp = currentPrice >= previousPrice;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercentage = ((priceChange / previousPrice) * 100);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  const formatMarketCap = (marketCap: string) => {
    return marketCap;
  };

  const getGainLossColor = () => {
    return isGain ? '#38A169' : '#E53E3E';
  };

  const getPriceChangeColor = () => {
    return isPriceUp ? '#38A169' : '#E53E3E';
  };

  const getSymbolIcon = (symbol: string) => {
    const iconMap: { [key: string]: string } = {
      'AAPL': '🍎',
      'GOOGL': '🔍',
      'MSFT': '💻',
      'AMZN': '📦',
      'TSLA': '🚗',
      'NVDA': '🖥️',
      'META': '👥',
      'NFLX': '🎬',
      'DIS': '🏰',
      'UBER': '🚕',
      'SPOT': '🎵',
      'PYPL': '💳',
      'SQ': '💰',
      'COIN': '₿',
      'BTC': '₿',
      'ETH': '💎',
      'SPY': '📊',
      'QQQ': '📈',
      'VTI': '🏛️',
      'default': '📊'
    };
    
    return iconMap[symbol.toUpperCase()] || iconMap.default;
  };

  const getRiskIndicator = () => {
    const absGainLoss = Math.abs(gainLossPercentage);
    if (absGainLoss >= 20) return { level: 'High', color: '#E53E3E' };
    if (absGainLoss >= 10) return { level: 'Medium', color: '#F56500' };
    return { level: 'Low', color: '#38A169' };
  };

  const risk = getRiskIndicator();

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.symbolSection}>
          <Text style={styles.symbolIcon}>
            {getSymbolIcon(symbol)}
          </Text>
          <View style={styles.symbolInfo}>
            <Text style={styles.symbol}>{symbol}</Text>
            <Text style={styles.name} numberOfLines={1}>
              {name}
            </Text>
          </View>
        </View>
        
        <View style={styles.priceSection}>
          <Text style={styles.currentPrice}>
            {formatCurrency(currentPrice)}
          </Text>
          <View style={styles.priceChange}>
            <Text style={[
              styles.priceChangeText,
              { color: getPriceChangeColor() }
            ]}>
              {isPriceUp ? '▲' : '▼'} {formatCurrency(Math.abs(priceChange))}
            </Text>
            <Text style={[
              styles.priceChangePercentage,
              { color: getPriceChangeColor() }
            ]}>
              {formatPercentage(priceChangePercentage)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.holdingsSection}>
        <View style={styles.sharesInfo}>
          <Text style={styles.sharesLabel}>Shares Owned</Text>
          <Text style={styles.sharesValue}>
            {shares.toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 4
            })}
          </Text>
        </View>
        
        <View style={styles.totalValueInfo}>
          <Text style={styles.totalValueLabel}>Total Value</Text>
          <Text style={styles.totalValue}>
            {formatCurrency(totalValue)}
          </Text>
        </View>
      </View>

      <View style={styles.performanceSection}>
        <View style={styles.gainLossContainer}>
          <Text style={styles.gainLossLabel}>
            {isGain ? 'Total Gain' : 'Total Loss'}
          </Text>
          <View style={styles.gainLossValues}>
            <Text style={[
              styles.gainLossAmount,
              { color: getGainLossColor() }
            ]}>
              {isGain ? '+' : ''}{formatCurrency(totalGainLoss)}
            </Text>
            <Text style={[
              styles.gainLossPercentage,
              { color: getGainLossColor() }
            ]}>
              {formatPercentage(gainLossPercentage)}
            </Text>
          </View>
        </View>

        <View style={styles.riskIndicator}>
          <Text style={styles.riskLabel}>Risk Level</Text>
          <View style={[styles.riskBadge, { backgroundColor: risk.color }]}>
            <Text style={styles.riskText}>{risk.level}</Text>
          </View>
        </View>
      </View>

      {(marketCap || dividend) && (
        <View style={styles.additionalInfo}>
          {marketCap && (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Market Cap</Text>
              <Text style={styles.infoValue}>{formatMarketCap(marketCap)}</Text>
            </View>
          )}
          
          {dividend && (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Dividend Yield</Text>
              <Text style={styles.infoValue}>{dividend.toFixed(2)}%</Text>
            </View>
          )}
        </View>
      )}

      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.buyButton}
          onPress={onBuyMore}
          activeOpacity={0.8}
        >
          <Text style={styles.buyButtonText}>Buy More</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.viewButton}
          onPress={onPress}
          activeOpacity={0.8}
        >
          <Text style={styles.viewButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  symbolSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  symbolIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  symbolInfo: {
    flex: 1,
  },
  symbol: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  name: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  priceSection: {
    alignItems: 'flex-end',
  },
  currentPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  priceChange: {
    alignItems: 'flex-end',
  },
  priceChangeText: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  priceChangePercentage: {
    fontSize: 12,
    fontWeight: '600',
  },
  holdingsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingVertical: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  sharesInfo: {
    alignItems: 'flex-start',
  },
  sharesLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  sharesValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  totalValueInfo: {
    alignItems: 'flex-end',
  },
  totalValueLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  performanceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  gainLossContainer: {
    flex: 1,
  },
  gainLossLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  gainLossValues: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gainLossAmount: {
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  gainLossPercentage: {
    fontSize: 14,
    fontWeight: '600',
  },
  riskIndicator: {
    alignItems: 'flex-end',
  },
  riskLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  riskText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  additionalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  buyButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  viewButton: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  viewButtonText: {
    color: '#1A1A1A',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default InvestmentCard;