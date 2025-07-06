import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface AccountCardProps {
  accountName: string;
  accountType: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  bankName: string;
  accountNumber: string;
  isActive?: boolean;
  onPress?: () => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({
  accountName,
  accountType,
  balance,
  bankName,
  accountNumber,
  isActive = true,
  onPress
}) => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatAccountNumber = (accountNum: string): string => {
    if (accountNum.length <= 4) return accountNum;
    return `****${accountNum.slice(-4)}`;
  };

  const getAccountTypeColor = (type: string): string => {
    const colors: { [key: string]: string } = {
      checking: '#2E7D32',
      savings: '#1976D2',
      credit: '#F57C00',
      investment: '#7B1FA2'
    };
    return colors[type] || '#757575';
  };

  const getAccountTypeIcon = (type: string): string => {
    const icons: { [key: string]: string } = {
      checking: '💳',
      savings: '🏦',
      credit: '💰',
      investment: '📈'
    };
    return icons[type] || '💳';
  };

  const getBalanceColor = (type: string, amount: number): string => {
    if (type === 'credit') {
      return amount > 0 ? '#D32F2F' : '#2E7D32';
    }
    return amount >= 0 ? '#2E7D32' : '#D32F2F';
  };

  const getBalancePrefix = (type: string, amount: number): string => {
    if (type === 'credit' && amount > 0) {
      return '-';
    }
    return amount >= 0 ? '' : '-';
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { opacity: isActive ? 1 : 0.7 }
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={!isActive}
    >
      <View style={styles.header}>
        <View style={styles.accountInfo}>
          <View style={styles.iconContainer}>
            <Text style={styles.accountIcon}>
              {getAccountTypeIcon(accountType)}
            </Text>
          </View>
          <View style={styles.accountDetails}>
            <Text style={styles.accountName}>{accountName}</Text>
            <Text style={[
              styles.accountType,
              { color: getAccountTypeColor(accountType) }
            ]}>
              {accountType.charAt(0).toUpperCase() + accountType.slice(1)}
            </Text>
          </View>
        </View>
        
        <View style={styles.balanceContainer}>
          <Text style={[
            styles.balance,
            { color: getBalanceColor(accountType, balance) }
          ]}>
            {getBalancePrefix(accountType, balance)}{formatCurrency(Math.abs(balance))}
          </Text>
          <Text style={styles.balanceLabel}>
            {accountType === 'credit' ? 'Available Credit' : 'Balance'}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.footer}>
        <Text style={styles.bankName}>{bankName}</Text>
        <Text style={styles.accountNumber}>
          {formatAccountNumber(accountNumber)}
        </Text>
      </View>

      <View style={[
        styles.statusIndicator,
        { backgroundColor: isActive ? '#4CAF50' : '#9E9E9E' }
      ]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  accountIcon: {
    fontSize: 18,
  },
  accountDetails: {
    flex: 1,
  },
  accountName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  accountType: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  balanceContainer: {
    alignItems: 'flex-end',
  },
  balance: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  balanceLabel: {
    fontSize: 12,
    color: '#757575',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bankName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  accountNumber: {
    fontSize: 14,
    color: '#757575',
    fontFamily: 'monospace',
  },
  statusIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default AccountCard;