import React, { useEffect, useRef } from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  variant?: 'default' | 'fullscreen' | 'bottom-sheet' | 'center';
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  showCloseButton?: boolean;
  closeOnBackdropPress?: boolean;
  closeOnBackButton?: boolean;
  animationType?: 'slide' | 'fade' | 'none';
  style?: ViewStyle;
  headerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  contentStyle?: ViewStyle;
  overlayStyle?: ViewStyle;
  scrollable?: boolean;
  maxHeight?: number;
}

const { height: screenHeight } = Dimensions.get('window');

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  variant = 'default',
  size = 'medium',
  showCloseButton = true,
  closeOnBackdropPress = true,
  closeOnBackButton = true,
  animationType = 'slide',
  style,
  headerStyle,
  titleStyle,
  contentStyle,
  overlayStyle,
  scrollable = false,
  maxHeight = screenHeight * 0.8,
}) => {
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnimation, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnimation, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnimation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, slideAnimation, fadeAnimation]);

  const getModalStyle = (): ViewStyle => {
    const baseStyle: ViewStyle[] = [styles.modal];
    
    switch (variant) {
      case 'default':
        baseStyle.push(styles.defaultModal);
        break;
      case 'fullscreen':
        baseStyle.push(styles.fullscreenModal);
        break;
      case 'bottom-sheet':
        baseStyle.push(styles.bottomSheetModal);
        break;
      case 'center':
        baseStyle.push(styles.centerModal);
        break;
    }
    
    switch (size) {
      case 'small':
        baseStyle.push(styles.smallModal);
        break;
      case 'medium':
        baseStyle.push(styles.mediumModal);
        break;
      case 'large':
        baseStyle.push(styles.largeModal);
        break;
      case 'fullscreen':
        baseStyle.push(styles.fullscreenSize);
        break;
    }
    
    return StyleSheet.flatten([baseStyle, style]);
  };

  const getAnimatedStyle = (): ViewStyle => {
    const baseTransform = [];
    
    if (variant === 'bottom-sheet') {
      baseTransform.push({
        translateY: slideAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [300, 0],
        }),
      });
    } else if (variant === 'center') {
      baseTransform.push({
        scale: slideAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1],
        }),
      });
    }
    
    return {
      transform: baseTransform,
      opacity: fadeAnimation,
    };
  };

  const getContentStyle = (): ViewStyle => {
    const baseStyle: ViewStyle[] = [styles.content];
    
    if (scrollable) {
      baseStyle.push({ maxHeight });
    }
    
    return StyleSheet.flatten([baseStyle, contentStyle]);
  };

  const handleBackdropPress = () => {
    if (closeOnBackdropPress) {
      onClose();
    }
  };

  const ModalContent = () => (
    <Animated.View style={[getModalStyle(), getAnimatedStyle()]}>
      {(title || showCloseButton) && (
        <View style={[styles.header, headerStyle]}>
          {title && (
            <Text style={[styles.title, titleStyle]}>{title}</Text>
          )}
          {showCloseButton && (
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      
      {scrollable ? (
        <ScrollView
          style={getContentStyle()}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={getContentStyle()}>
          {children}
        </View>
      )}
    </Animated.View>
  );

  return (
    <RNModal
      visible={visible}
      transparent={true}
      animationType={animationType === 'none' ? 'none' : 'fade'}
      onRequestClose={closeOnBackButton ? onClose : undefined}
      statusBarTranslucent={variant === 'fullscreen'}
    >
      <Animated.View
        style={[styles.overlay, overlayStyle, { opacity: fadeAnimation }]}
      >
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
        
        <ModalContent />
      </Animated.View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    maxWidth: '90%',
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  // Variant styles
  defaultModal: {
    margin: 20,
  },
  fullscreenModal: {
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    margin: 0,
    borderRadius: 0,
  },
  bottomSheetModal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    maxWidth: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  centerModal: {
    // Uses default center positioning
  },
  // Size styles
  smallModal: {
    maxWidth: 320,
    minWidth: 280,
  },
  mediumModal: {
    maxWidth: 400,
    minWidth: 320,
  },
  largeModal: {
    maxWidth: 500,
    minWidth: 400,
  },
  fullscreenSize: {
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FAFAFA',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: '300',
    color: '#666666',
    lineHeight: 20,
  },
  content: {
    padding: 20,
  },
});

export default Modal;