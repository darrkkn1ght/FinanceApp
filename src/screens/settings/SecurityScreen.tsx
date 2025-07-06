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

interface SecurityScreenProps {
  navigation: NavigationProp<MainStackParamList>;
}

export const SecurityScreen: React.FC<SecurityScreenProps> = ({ navigation: _navigation }) => {
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [pinEnabled, setPinEnabled] = useState(false);
  const [autoLockEnabled, setAutoLockEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleChangePIN = () => {
    Alert.alert(
      'Change PIN',
      'This feature will be implemented with secure PIN management',
      [{ text: 'OK' }]
    );
  };

  const handleChangePassword = () => {
    Alert.alert(
      'Change Password',
      'This feature will be implemented with secure password management',
      [{ text: 'OK' }]
    );
  };

  const handleBackupData = () => {
    Alert.alert(
      'Backup Data',
      'This feature will be implemented with secure cloud backup',
      [{ text: 'OK' }]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive' },
      ]
    );
  };

  const SecurityOption: React.FC<{
    title: string;
    description: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
  }> = ({ title, description, value, onValueChange }) => (
    <View style={styles.optionContainer}>
      <View style={styles.optionTextContainer}>
        <Text style={styles.optionTitle}>{title}</Text>
        <Text style={styles.optionDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#E5E5E5', true: '#4CAF50' }}
        thumbColor={value ? '#FFFFFF' : '#FFFFFF'}
      />
    </View>
  );

  const ActionButton: React.FC<{
    title: string;
    description: string;
    onPress: () => void;
    danger?: boolean;
  }> = ({ title, description, onPress, danger = false }) => (
    <TouchableOpacity
      style={styles.actionButton}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.actionTextContainer}>
        <Text style={[styles.actionTitle, danger && styles.dangerText]}>
          {title}
        </Text>
        <Text style={styles.actionDescription}>{description}</Text>
      </View>
      <Text style={[styles.actionArrow, danger && styles.dangerText]}>›</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Authentication</Text>
        
        <SecurityOption
          title="Biometric Authentication"
          description="Use fingerprint or face recognition to unlock the app"
          value={biometricEnabled}
          onValueChange={setBiometricEnabled}
        />
        
        <SecurityOption
          title="PIN Authentication"
          description="Use a 4-digit PIN to unlock the app"
          value={pinEnabled}
          onValueChange={setPinEnabled}
        />
        
        <SecurityOption
          title="Auto-Lock"
          description="Automatically lock the app after 5 minutes of inactivity"
          value={autoLockEnabled}
          onValueChange={setAutoLockEnabled}
        />
        
        <SecurityOption
          title="Two-Factor Authentication"
          description="Add an extra layer of security to your account"
          value={twoFactorEnabled}
          onValueChange={setTwoFactorEnabled}
        />
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Account Security</Text>
        
        <ActionButton
          title="Change PIN"
          description="Update your 4-digit PIN"
          onPress={handleChangePIN}
        />
        
        <ActionButton
          title="Change Password"
          description="Update your account password"
          onPress={handleChangePassword}
        />
        
        <ActionButton
          title="Backup Data"
          description="Securely backup your financial data"
          onPress={handleBackupData}
        />
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Privacy & Data</Text>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Data Encryption</Text>
          <Text style={styles.infoDescription}>
            Your financial data is encrypted using AES-256 encryption both in transit and at rest.
          </Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Data Sharing</Text>
          <Text style={styles.infoDescription}>
            We never share your personal financial data with third parties without your explicit consent.
          </Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Account Deletion</Text>
          <Text style={styles.infoDescription}>
            You can delete your account at any time. All data will be permanently removed.
          </Text>
        </View>
      </Card>

      <Card style={{ ...styles.card, ...styles.dangerCard }}>
        <Text style={styles.sectionTitle}>Danger Zone</Text>
        
        <ActionButton
          title="Delete Account"
          description="Permanently delete your account and all data"
          onPress={handleDeleteAccount}
          danger={true}
        />
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
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: '#666666',
  },
  actionArrow: {
    fontSize: 24,
    color: '#CCCCCC',
    fontWeight: '300',
  },
  infoContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  infoDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  dangerCard: {
    borderColor: '#FF5252',
    borderWidth: 1,
  },
  dangerText: {
    color: '#FF5252',
  },
  bottomSpacing: {
    height: 20,
  },
});

export default SecurityScreen;