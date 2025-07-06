import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import { Button } from '../../components/common/Button';
import { AuthStackParamList } from '../../types/navigation';

interface WelcomeScreenProps {
  navigation: NavigationProp<AuthStackParamList, 'Welcome'>;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('Onboarding');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80' }}
        style={styles.backgroundImage}
        blurRadius={2}
      >
        <View style={styles.overlay}>
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>💰</Text>
              <Text style={styles.appName}>FinanceApp</Text>
              <Text style={styles.tagline}>Your Personal Finance Assistant</Text>
            </View>

            <View style={styles.heroSection}>
              <Text style={styles.heroTitle}>
                Take Control of Your{'\n'}Financial Future
              </Text>
              <Text style={styles.heroSubtitle}>
                Track expenses, manage budgets, and grow your wealth with AI-powered insights
              </Text>
            </View>

            <View style={styles.features}>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>📊</Text>
                <Text style={styles.featureText}>Smart Analytics</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>💡</Text>
                <Text style={styles.featureText}>AI Insights</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🔒</Text>
                <Text style={styles.featureText}>Bank-Level Security</Text>
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <Button
              title="Get Started"
              onPress={handleGetStarted}
              style={styles.primaryButton}
            />
            
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleLogin}
            >
              <Text style={styles.secondaryButtonText}>
                Already have an account? Log In
              </Text>
            </TouchableOpacity>

            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By continuing, you agree to our{' '}
                <Text style={styles.termsLink}>Terms of Service</Text>
                {' '}and{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    fontSize: 48,
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#E0E0E0',
    textAlign: 'center',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#E0E0E0',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  featureItem: {
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    color: '#E0E0E0',
    textAlign: 'center',
    fontWeight: '600',
  },
  footer: {
    paddingTop: 20,
  },
  primaryButton: {
    marginBottom: 16,
  },
  secondaryButton: {
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 20,
  },
  secondaryButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  termsContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  termsText: {
    fontSize: 12,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
});

export default WelcomeScreen;