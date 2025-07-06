import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  Image 
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import { Button } from '../../components/common/Button';
import { AuthStackParamList } from '../../types/navigation';

interface OnboardingScreenProps {
  navigation: NavigationProp<AuthStackParamList, 'Onboarding'>;
}

interface OnboardingSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  backgroundColor: string;
  illustration: string;
}

const { width: screenWidth } = Dimensions.get('window');

const onboardingSlides: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Track Your Finances',
    subtitle: 'Effortlessly',
    description: 'Connect your accounts and get a complete view of your financial life in one place. No more switching between apps.',
    icon: '📊',
    backgroundColor: '#E8F5E8',
    illustration: 'chart-dashboard',
  },
  {
    id: '2',
    title: 'Smart Budgeting',
    subtitle: 'Made Simple',
    description: 'Set budgets that work for your lifestyle. Get intelligent insights and alerts to help you stay on track.',
    icon: '💰',
    backgroundColor: '#E3F2FD',
    illustration: 'budget-planning',
  },
  {
    id: '3',
    title: 'AI-Powered Insights',
    subtitle: 'Personal Finance Coach',
    description: 'Get personalized recommendations and insights powered by AI to help you make better financial decisions.',
    icon: '🤖',
    backgroundColor: '#F3E5F5',
    illustration: 'ai-assistant',
  },
  {
    id: '4',
    title: 'Investment Tracking',
    subtitle: 'Grow Your Wealth',
    description: 'Monitor your investments and portfolio performance. Get alerts about market changes and opportunities.',
    icon: '📈',
    backgroundColor: '#FFF3E0',
    illustration: 'investment-growth',
  },
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentSlide(slideIndex);
  };

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      const nextSlide = currentSlide + 1;
      setCurrentSlide(nextSlide);
      scrollViewRef.current?.scrollTo({
        x: nextSlide * screenWidth,
        animated: true,
      });
    }
  };

  const handleSkip = () => {
    navigation.navigate('Login');
  };

  const handleGetStarted = () => {
    navigation.navigate('Register');
  };

  const handleDotPress = (index: number) => {
    setCurrentSlide(index);
    scrollViewRef.current?.scrollTo({
      x: index * screenWidth,
      animated: true,
    });
  };

  const isLastSlide = currentSlide === onboardingSlides.length - 1;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={handleSkip}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {onboardingSlides.map((slide, index) => (
          <View 
            key={slide.id} 
            style={[
              styles.slide,
              { backgroundColor: slide.backgroundColor }
            ]}
          >
            <View style={styles.slideContent}>
              <View style={styles.illustrationContainer}>
                <Text style={styles.illustrationIcon}>{slide.icon}</Text>
                <View style={styles.illustrationPlaceholder}>
                  <Text style={styles.illustrationText}>
                    {slide.illustration}
                  </Text>
                </View>
              </View>

              <View style={styles.textContent}>
                <Text style={styles.slideTitle}>{slide.title}</Text>
                <Text style={styles.slideSubtitle}>{slide.subtitle}</Text>
                <Text style={styles.slideDescription}>{slide.description}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {onboardingSlides.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dot,
                index === currentSlide && styles.activeDot
              ]}
              onPress={() => handleDotPress(index)}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          {isLastSlide ? (
            <Button
              title="Get Started"
              onPress={handleGetStarted}
              style={styles.getStartedButton}
            />
          ) : (
            <View style={styles.navigationButtons}>
              <TouchableOpacity
                style={styles.previousButton}
                onPress={() => {
                  if (currentSlide > 0) {
                    const prevSlide = currentSlide - 1;
                    setCurrentSlide(prevSlide);
                    scrollViewRef.current?.scrollTo({
                      x: prevSlide * screenWidth,
                      animated: true,
                    });
                  }
                }}
                disabled={currentSlide === 0}
              >
                <Text style={[
                  styles.previousText,
                  currentSlide === 0 && styles.disabledText
                ]}>
                  Previous
                </Text>
              </TouchableOpacity>

              <Button
                title="Next"
                onPress={handleNext}
                style={styles.nextButton}
              />
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.loginPrompt}
          onPress={handleSkip}
        >
          <Text style={styles.loginPromptText}>
            Already have an account?{' '}
            <Text style={styles.loginLink}>Log In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    zIndex: 1,
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width: screenWidth,
    flex: 1,
    paddingHorizontal: 24,
  },
  slideContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  illustrationIcon: {
    fontSize: 48,
    marginBottom: 24,
  },
  illustrationPlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
  },
  illustrationText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  textContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 8,
  },
  slideSubtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 16,
  },
  slideDescription: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    backgroundColor: '#FFFFFF',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#2E7D32',
    width: 24,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  getStartedButton: {
    width: '100%',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  previousButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  previousText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '600',
  },
  disabledText: {
    color: '#CCCCCC',
  },
  nextButton: {
    minWidth: 120,
  },
  loginPrompt: {
    alignItems: 'center',
  },
  loginPromptText: {
    fontSize: 16,
    color: '#666666',
  },
  loginLink: {
    color: '#2E7D32',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default OnboardingScreen;