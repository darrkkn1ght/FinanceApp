import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewStyle, Text } from 'react-native';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  variant?: 'default' | 'overlay' | 'inline';
  text?: string;
  textColor?: string;
  speed?: number;
  style?: ViewStyle;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = '#2E7D32',
  variant = 'default',
  text,
  textColor = '#666666',
  speed = 1000,
  style,
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spin = () => {
      spinValue.setValue(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration: speed,
        useNativeDriver: true,
      }).start(() => spin());
    };

    spin();

    return () => {
      spinValue.stopAnimation();
    };
  }, [spinValue, speed]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const getSpinnerSize = () => {
    switch (size) {
      case 'small':
        return 20;
      case 'medium':
        return 32;
      case 'large':
        return 48;
      default:
        return 32;
    }
  };

  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle[] = [styles.container];
    
    switch (variant) {
      case 'default':
        baseStyle.push(styles.defaultContainer);
        break;
      case 'overlay':
        baseStyle.push(styles.overlayContainer);
        break;
      case 'inline':
        baseStyle.push(styles.inlineContainer);
        break;
    }
    
    return StyleSheet.flatten([baseStyle, style]);
  };

  const getSpinnerStyle = (): ViewStyle => {
    const spinnerSize = getSpinnerSize();
    const borderWidth = Math.max(2, spinnerSize / 8);
    
    return {
      width: spinnerSize,
      height: spinnerSize,
      borderRadius: spinnerSize / 2,
      borderWidth,
      borderColor: `${color}20`,
      borderTopColor: color,
      transform: [{ rotate: spin }],
    };
  };

  const getTextStyle = () => {
    const baseStyle: any[] = [styles.text];
    
    switch (size) {
      case 'small':
        baseStyle.push(styles.smallText);
        break;
      case 'medium':
        baseStyle.push(styles.mediumText);
        break;
      case 'large':
        baseStyle.push(styles.largeText);
        break;
    }
    
    return StyleSheet.flatten([baseStyle, { color: textColor }]);
  };

  const SpinnerContent = () => (
    <View style={styles.spinnerContent}>
      <Animated.View style={getSpinnerStyle()} />
      {text && <Text style={getTextStyle()}>{text}</Text>}
    </View>
  );

  if (variant === 'overlay') {
    return (
      <View style={getContainerStyle()}>
        <View style={styles.overlayBackground} />
        <SpinnerContent />
      </View>
    );
  }

  return (
    <View style={getContainerStyle()}>
      <SpinnerContent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultContainer: {
    padding: 16,
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  inlineContainer: {
    padding: 8,
  },
  overlayBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  spinnerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 12,
    marginTop: 8,
  },
  mediumText: {
    fontSize: 14,
    marginTop: 12,
  },
  largeText: {
    fontSize: 16,
    marginTop: 16,
  },
});

export default LoadingSpinner;