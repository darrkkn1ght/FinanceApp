import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Card } from '../../components/common/Card';
import { MainStackParamList } from '../../types/navigation';

interface SettingsScreenProps {
  navigation: NavigationProp<MainStackParamList>;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation: _navigation }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive' },
      ]
    );
  };

  const SettingsItem: React.FC<{
    title: string;
    subtitle?: string;
    onPress: () => void;
    showArrow?: boolean;
  }> = ({ title, subtitle, onPress, showArrow = true }) => (
    <TouchableOpacity
      style={styles.settingsItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingsItemContent}>
        <View style={styles.settingsItemText}>
          <Text style={styles.settingsItemTitle}>{title}</Text>
          {subtitle && (
            <Text style={styles.settingsItemSubtitle}>{subtitle}</Text>
          )}
        </View>
        {showArrow && (
          <Text style={styles.settingsItemArrow}>›</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const SettingsToggle: React.FC<{
    title: string;
    subtitle?: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
  }> = ({ title, subtitle, value, onValueChange }) => (
    <View style={styles.settingsItem}>
      <View style={styles.settingsItemContent}>
        <View style={styles.settingsItemText}>
          <Text style={styles.settingsItemTitle}>{title}</Text>
          {subtitle && (
            <Text style={styles.settingsItemSubtitle}>{subtitle}</Text>
          )}
        </View>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#E5E5E5', true: '#4CAF50' }}
          thumbColor={value ? '#FFFFFF' : '#FFFFFF'}
        />
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Section */}
      <Card style={styles.card}>
        <TouchableOpacity
          style={styles.profileSection}
          onPress={() => Alert.alert('Profile', 'Profile screen navigation will be implemented')}
          activeOpacity={0.7}
        >
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>JD</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john.doe@example.com</Text>
          </View>
          <Text style={styles.profileArrow}>›</Text>
        </TouchableOpacity>
      </Card>

      {/* General Settings */}
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>General</Text>
        
        <SettingsToggle
          title="Dark Mode"
          subtitle="Switch between light and dark themes"
          value={darkMode}
          onValueChange={setDarkMode}
        />
        
        <SettingsToggle
          title="Notifications"
          subtitle="Enable push notifications"
          value={notifications}
          onValueChange={setNotifications}
        />
        
        <SettingsItem
          title="Notifications Settings"
          subtitle="Manage notification preferences"
          onPress={() => Alert.alert('Notifications', 'Notifications screen navigation will be implemented')}
        />
        
        <SettingsItem
          title="Currency"
          subtitle="USD - United States Dollar"
          onPress={() => Alert.alert('Currency', 'Currency selection will be implemented')}
        />
        
        <SettingsItem
          title="Language"
          subtitle="English"
          onPress={() => Alert.alert('Language', 'Language selection will be implemented')}
        />
      </Card>

      {/* Security Settings */}
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Security</Text>
        
        <SettingsToggle
          title="Biometric Authentication"
          subtitle="Use fingerprint or face ID"
          value={biometricAuth}
          onValueChange={setBiometricAuth}
        />
        
        <SettingsItem
          title="Security Settings"
          subtitle="Manage your account security"
          onPress={() => Alert.alert('Security', 'Security screen navigation will be implemented')}
        />
        
        <SettingsItem
          title="Privacy Policy"
          subtitle="Read our privacy policy"
          onPress={() => Alert.alert('Privacy Policy', 'Privacy policy will be implemented')}
        />
        
        <SettingsItem
          title="Terms of Service"
          subtitle="Read our terms of service"
          onPress={() => Alert.alert('Terms of Service', 'Terms of service will be implemented')}
        />
      </Card>

      {/* Data & Storage */}
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Data & Storage</Text>
        
        <SettingsItem
          title="Export Data"
          subtitle="Download your financial data"
          onPress={() => Alert.alert('Export Data', 'Data export will be implemented')}
        />
        
        <SettingsItem
          title="Clear Cache"
          subtitle="Free up storage space"
          onPress={() => Alert.alert('Clear Cache', 'Cache clearing will be implemented')}
        />
        
        <SettingsItem
          title="Data Usage"
          subtitle="View app data usage statistics"
          onPress={() => Alert.alert('Data Usage', 'Data usage stats will be implemented')}
        />
      </Card>

      {/* Support */}
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Support</Text>
        
        <SettingsItem
          title="Help Center"
          subtitle="Get help and support"
          onPress={() => Alert.alert('Help Center', 'Help center will be implemented')}
        />
        
        <SettingsItem
          title="Contact Us"
          subtitle="Send feedback or report issues"
          onPress={() => Alert.alert('Contact Us', 'Contact form will be implemented')}
        />
        
        <SettingsItem
          title="Rate App"
          subtitle="Rate us on the App Store"
          onPress={() => Alert.alert('Rate App', 'App rating will be implemented')}
        />
        
        <SettingsItem
          title="About"
          subtitle="Version 1.0.0"
          onPress={() => Alert.alert('About', 'About screen will be implemented')}
        />
      </Card>

      {/* Account Actions */}
      <Card style={styles.card}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </Card>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  card: {
    margin: 16,
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileAvatarText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666666',
  },
  profileArrow: {
    fontSize: 24,
    color: '#CCCCCC',
    fontWeight: '300',
  },
  settingsItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingsItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingsItemText: {
    flex: 1,
  },
  settingsItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  settingsItemSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  settingsItemArrow: {
    fontSize: 24,
    color: '#CCCCCC',
    fontWeight: '300',
  },
  logoutButton: {
    backgroundColor: '#FF5252',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bottomSpacing: {
    height: 20,
  },
});

export default SettingsScreen;