import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Card } from '../../components/common/Card';
import { MainStackParamList } from '../../types/navigation';

interface NotificationsScreenProps {
  navigation: NavigationProp<MainStackParamList>;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ navigation: _navigation }) => {
  // Push Notifications
  const [pushEnabled, setPushEnabled] = useState(true);
  const [transactionAlerts, setTransactionAlerts] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [goalReminders, setGoalReminders] = useState(true);
  const [investmentUpdates, setInvestmentUpdates] = useState(false);
  const [aiInsights, setAiInsights] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [monthlyReports, setMonthlyReports] = useState(true);

  // Email Notifications
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [emailWeeklyReports, setEmailWeeklyReports] = useState(true);
  const [emailMonthlyReports, setEmailMonthlyReports] = useState(true);
  const [emailSecurityAlerts, setEmailSecurityAlerts] = useState(true);
  const [emailPromotions, setEmailPromotions] = useState(false);

  // Quiet Hours
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(true);
  const [quietStart, _setQuietStart] = useState('10:00 PM');
  const [quietEnd, _setQuietEnd] = useState('7:00 AM');

  const handleTimeSelection = (_type: 'start' | 'end') => {
    Alert.alert(
      'Select Time',
      'Time picker will be implemented with proper time selection component',
      [{ text: 'OK' }]
    );
  };

  const NotificationOption: React.FC<{
    title: string;
    description: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
    disabled?: boolean;
  }> = ({ title, description, value, onValueChange, disabled = false }) => (
    <View style={[styles.optionContainer, disabled && styles.disabledOption]}>
      <View style={styles.optionTextContainer}>
        <Text style={[styles.optionTitle, disabled && styles.disabledText]}>
          {title}
        </Text>
        <Text style={[styles.optionDescription, disabled && styles.disabledText]}>
          {description}
        </Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ false: '#E5E5E5', true: '#4CAF50' }}
        thumbColor={value ? '#FFFFFF' : '#FFFFFF'}
      />
    </View>
  );

  const TimeSelector: React.FC<{
    title: string;
    time: string;
    onPress: () => void;
    disabled?: boolean;
  }> = ({ title, time, onPress, disabled = false }) => (
    <TouchableOpacity
      style={[styles.timeSelector, disabled && styles.disabledOption]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.timeSelectorTitle, disabled && styles.disabledText]}>
        {title}
      </Text>
      <Text style={[styles.timeSelectorTime, disabled && styles.disabledText]}>
        {time}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Push Notifications</Text>
        
        <NotificationOption
          title="Push Notifications"
          description="Enable or disable all push notifications"
          value={pushEnabled}
          onValueChange={setPushEnabled}
        />
        
        <NotificationOption
          title="Transaction Alerts"
          description="Get notified when transactions are detected"
          value={transactionAlerts}
          onValueChange={setTransactionAlerts}
          disabled={!pushEnabled}
        />
        
        <NotificationOption
          title="Budget Alerts"
          description="Get notified when approaching budget limits"
          value={budgetAlerts}
          onValueChange={setBudgetAlerts}
          disabled={!pushEnabled}
        />
        
        <NotificationOption
          title="Goal Reminders"
          description="Get reminded about your financial goals"
          value={goalReminders}
          onValueChange={setGoalReminders}
          disabled={!pushEnabled}
        />
        
        <NotificationOption
          title="Investment Updates"
          description="Get notified about significant portfolio changes"
          value={investmentUpdates}
          onValueChange={setInvestmentUpdates}
          disabled={!pushEnabled}
        />
        
        <NotificationOption
          title="AI Insights"
          description="Receive personalized financial insights"
          value={aiInsights}
          onValueChange={setAiInsights}
          disabled={!pushEnabled}
        />
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Reports</Text>
        
        <NotificationOption
          title="Weekly Reports"
          description="Get weekly spending and saving summaries"
          value={weeklyReports}
          onValueChange={setWeeklyReports}
          disabled={!pushEnabled}
        />
        
        <NotificationOption
          title="Monthly Reports"
          description="Get comprehensive monthly financial reports"
          value={monthlyReports}
          onValueChange={setMonthlyReports}
          disabled={!pushEnabled}
        />
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Email Notifications</Text>
        
        <NotificationOption
          title="Email Notifications"
          description="Enable or disable all email notifications"
          value={emailEnabled}
          onValueChange={setEmailEnabled}
        />
        
        <NotificationOption
          title="Weekly Reports"
          description="Receive weekly reports via email"
          value={emailWeeklyReports}
          onValueChange={setEmailWeeklyReports}
          disabled={!emailEnabled}
        />
        
        <NotificationOption
          title="Monthly Reports"
          description="Receive monthly reports via email"
          value={emailMonthlyReports}
          onValueChange={setEmailMonthlyReports}
          disabled={!emailEnabled}
        />
        
        <NotificationOption
          title="Security Alerts"
          description="Get notified about account security events"
          value={emailSecurityAlerts}
          onValueChange={setEmailSecurityAlerts}
          disabled={!emailEnabled}
        />
        
        <NotificationOption
          title="Promotions & Tips"
          description="Receive financial tips and feature updates"
          value={emailPromotions}
          onValueChange={setEmailPromotions}
          disabled={!emailEnabled}
        />
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Quiet Hours</Text>
        
        <NotificationOption
          title="Enable Quiet Hours"
          description="Disable notifications during specified hours"
          value={quietHoursEnabled}
          onValueChange={setQuietHoursEnabled}
        />
        
        <View style={styles.timeSelectionContainer}>
          <TimeSelector
            title="Start Time"
            time={quietStart}
            onPress={() => handleTimeSelection('start')}
            disabled={!quietHoursEnabled}
          />
          
          <TimeSelector
            title="End Time"
            time={quietEnd}
            onPress={() => handleTimeSelection('end')}
            disabled={!quietHoursEnabled}
          />
        </View>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Notification Preferences</Text>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Sound & Vibration</Text>
          <Text style={styles.infoDescription}>
            Notification sounds and vibration patterns are controlled by your device settings.
          </Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Notification History</Text>
          <Text style={styles.infoDescription}>
            You can view your notification history in the main notifications panel.
          </Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Privacy</Text>
          <Text style={styles.infoDescription}>
            Sensitive information like account balances are hidden in notification previews.
          </Text>
        </View>
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
  timeSelectionContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  timeSelector: {
    flex: 1,
    padding: 12,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  timeSelectorTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
    marginBottom: 4,
  },
  timeSelectorTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
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
  disabledOption: {
    opacity: 0.5,
  },
  disabledText: {
    color: '#CCCCCC',
  },
  bottomSpacing: {
    height: 20,
  },
});

export default NotificationsScreen;