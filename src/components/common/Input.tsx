import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';

interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  error?: string;
  required?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'decimal-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  variant = 'default',
  size = 'medium',
  disabled = false,
  error,
  required = false,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  multiline = false,
  numberOfLines = 1,
  maxLength,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  inputStyle,
  onFocus,
  onBlur,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle[] = [styles.container];
    
    // Size styles
    switch (size) {
      case 'small':
        baseStyle.push(styles.smallContainer);
        break;
      case 'medium':
        baseStyle.push(styles.mediumContainer);
        break;
      case 'large':
        baseStyle.push(styles.largeContainer);
        break;
    }
    
    return StyleSheet.flatten([baseStyle, style]);
  };

  const getInputContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle[] = [styles.inputContainer];
    
    // Variant styles
    switch (variant) {
      case 'default':
        baseStyle.push(styles.defaultInput);
        break;
      case 'outlined':
        baseStyle.push(styles.outlinedInput);
        break;
      case 'filled':
        baseStyle.push(styles.filledInput);
        break;
    }
    
    // Size styles
    switch (size) {
      case 'small':
        baseStyle.push(styles.smallInput);
        break;
      case 'medium':
        baseStyle.push(styles.mediumInput);
        break;
      case 'large':
        baseStyle.push(styles.largeInput);
        break;
    }
    
    // State styles
    if (isFocused) {
      baseStyle.push(styles.focusedInput);
    }
    
    if (error) {
      baseStyle.push(styles.errorInput);
    }
    
    if (disabled) {
      baseStyle.push(styles.disabledInput);
    }
    
    return StyleSheet.flatten(baseStyle);
  };

  const getTextInputStyle = (): TextStyle => {
    const baseStyle: TextStyle[] = [styles.textInput];
    
    // Size styles
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
    
    // State styles
    if (disabled) {
      baseStyle.push(styles.disabledText);
    }
    
    if (leftIcon) {
      baseStyle.push(styles.textWithLeftIcon);
    }
    
    if (rightIcon) {
      baseStyle.push(styles.textWithRightIcon);
    }
    
    return StyleSheet.flatten([baseStyle, inputStyle]);
  };

  return (
    <View style={getContainerStyle()}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      
      <View style={getInputContainerStyle()}>
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          style={getTextInputStyle()}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9E9E9E"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        
        {rightIcon && (
          <TouchableOpacity
            style={styles.rightIconContainer}
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  smallContainer: {
    marginBottom: 12,
  },
  mediumContainer: {
    marginBottom: 16,
  },
  largeContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  required: {
    color: '#D32F2F',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  // Variant styles
  defaultInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  outlinedInput: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    backgroundColor: 'transparent',
  },
  filledInput: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  // Size styles
  smallInput: {
    minHeight: 36,
    paddingHorizontal: 12,
  },
  mediumInput: {
    minHeight: 44,
    paddingHorizontal: 16,
  },
  largeInput: {
    minHeight: 52,
    paddingHorizontal: 20,
  },
  // State styles
  focusedInput: {
    borderColor: '#2E7D32',
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  errorInput: {
    borderColor: '#D32F2F',
  },
  disabledInput: {
    backgroundColor: '#F5F5F5',
    borderColor: '#E0E0E0',
    opacity: 0.6,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
    paddingVertical: 0,
  },
  // Text size styles
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  // Text state styles
  disabledText: {
    color: '#9E9E9E',
  },
  textWithLeftIcon: {
    marginLeft: 8,
  },
  textWithRightIcon: {
    marginRight: 8,
  },
  leftIconContainer: {
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIconContainer: {
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#D32F2F',
    marginTop: 4,
    marginLeft: 4,
  },
});

export default Input;