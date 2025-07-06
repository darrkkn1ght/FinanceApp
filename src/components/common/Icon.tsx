import React from 'react';
import { Text, StyleSheet, ViewStyle } from 'react-native';

export type IconType = 
  | 'wallet' 
  | 'credit-card' 
  | 'bank' 
  | 'chart-line' 
  | 'income' 
  | 'expense' 
  | 'balance'
  | 'savings' 
  | 'investment' 
  | 'budget' 
  | 'goal' 
  | 'transaction' 
  | 'analytics' 
  | 'settings' 
  | 'notification' 
  | 'profile' 
  | 'home' 
  | 'search' 
  | 'plus' 
  | 'minus' 
  | 'arrow-right' 
  | 'arrow-left' 
  | 'check' 
  | 'close' 
  | 'edit' 
  | 'delete' 
  | 'calendar' 
  | 'clock' 
  | 'location' 
  | 'phone' 
  | 'email' 
  | 'lock' 
  | 'eye' 
  | 'eye-off' 
  | 'star' 
  | 'heart' 
  | 'share' 
  | 'download' 
  | 'upload' 
  | 'refresh' 
  | 'filter' 
  | 'sort' 
  | 'menu' 
  | 'back' 
  | 'forward' 
  | 'up' 
  | 'down';

interface IconProps {
  name: IconType;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 24, 
  color = '#1A1A1A',
  style 
}) => {
  const getIconSymbol = (iconName: IconType): string => {
    const iconMap: Record<IconType, string> = {
      'wallet': '💳',
      'credit-card': '💳',
      'bank': '🏦',
      'chart-line': '📈',
      'income': '💰',
      'expense': '💸',
      'balance': '💳',
      'savings': '🏦',
      'investment': '📈',
      'budget': '📊',
      'goal': '🎯',
      'transaction': '💱',
      'analytics': '📊',
      'settings': '⚙️',
      'notification': '🔔',
      'profile': '👤',
      'home': '🏠',
      'search': '🔍',
      'plus': '+',
      'minus': '-',
      'arrow-right': '→',
      'arrow-left': '←',
      'check': '✓',
      'close': '✕',
      'edit': '✎',
      'delete': '🗑',
      'calendar': '📅',
      'clock': '🕐',
      'location': '📍',
      'phone': '📞',
      'email': '📧',
      'lock': '🔒',
      'eye': '👁',
      'eye-off': '🙈',
      'star': '⭐',
      'heart': '❤️',
      'share': '📤',
      'download': '⬇️',
      'upload': '⬆️',
      'refresh': '🔄',
      'filter': '🔧',
      'sort': '↕️',
      'menu': '☰',
      'back': '←',
      'forward': '→',
      'up': '↑',
      'down': '↓',
    };
    
    return iconMap[iconName] || '?';
  };

  const isEmoji = (symbol: string): boolean => {
    return symbol.length > 1 || symbol.charCodeAt(0) > 127;
  };

  const iconSymbol = getIconSymbol(name);

  if (isEmoji(iconSymbol)) {
    return (
      <Text style={[
        styles.emojiIcon,
        { fontSize: size, color },
        style
      ]}>
        {iconSymbol}
      </Text>
    );
  }

  return (
    <Text style={[
      styles.textIcon,
      { fontSize: size, color },
      style
    ]}>
      {iconSymbol}
    </Text>
  );
};

const styles = StyleSheet.create({
  emojiIcon: {
    textAlign: 'center',
  },
  textIcon: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
}); 