import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'small' | 'medium' | 'large';
  margin?: 'none' | 'small' | 'medium' | 'large';
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'medium',
  margin = 'medium',
  onPress,
  style,
  disabled = false,
}) => {
  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle[] = [styles.card];
    
    // Variant styles
    switch (variant) {
      case 'default':
        baseStyle.push(styles.defaultCard);
        break;
      case 'elevated':
        baseStyle.push(styles.elevatedCard);
        break;
      case 'outlined':
        baseStyle.push(styles.outlinedCard);
        break;
      case 'filled':
        baseStyle.push(styles.filledCard);
        break;
    }
    
    // Padding styles
    switch (padding) {
      case 'none':
        baseStyle.push(styles.noPadding);
        break;
      case 'small':
        baseStyle.push(styles.smallPadding);
        break;
      case 'medium':
        baseStyle.push(styles.mediumPadding);
        break;
      case 'large':
        baseStyle.push(styles.largePadding);
        break;
    }
    
    // Margin styles
    switch (margin) {
      case 'none':
        baseStyle.push(styles.noMargin);
        break;
      case 'small':
        baseStyle.push(styles.smallMargin);
        break;
      case 'medium':
        baseStyle.push(styles.mediumMargin);
        break;
      case 'large':
        baseStyle.push(styles.largeMargin);
        break;
    }
    
    // State styles
    if (disabled) {
      baseStyle.push(styles.disabledCard);
    }
    
    return StyleSheet.flatten([baseStyle, style]);
  };

  const CardContent = () => (
    <View style={getCardStyle()}>
      {children}
    </View>
  );

  if (onPress && !disabled) {
    return (
      <TouchableOpacity 
        onPress={onPress}
        activeOpacity={0.7}
        style={styles.touchable}
      >
        <CardContent />
      </TouchableOpacity>
    );
  }

  return <CardContent />;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  touchable: {
    borderRadius: 12,
  },
  // Variant styles
  defaultCard: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  elevatedCard: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  outlinedCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filledCard: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  // Padding styles
  noPadding: {
    padding: 0,
  },
  smallPadding: {
    padding: 8,
  },
  mediumPadding: {
    padding: 16,
  },
  largePadding: {
    padding: 24,
  },
  // Margin styles
  noMargin: {
    margin: 0,
  },
  smallMargin: {
    margin: 4,
  },
  mediumMargin: {
    margin: 8,
  },
  largeMargin: {
    margin: 16,
  },
  // State styles
  disabledCard: {
    opacity: 0.6,
  },
});

export default Card;