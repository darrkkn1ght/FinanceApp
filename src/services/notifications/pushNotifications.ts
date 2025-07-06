// src/services/notifications/pushNotifications.ts
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export interface PushNotificationData {
  title: string;
  body: string;
  data?: {
    screen?: string;
    params?: Record<string, unknown>;
    type?: 'transaction' | 'budget' | 'goal' | 'investment' | 'ai_insight';
  };
}

class PushNotificationService {
  private isInitialized = false;

  async initialize(): Promise<boolean> {
    try {
      // Configure notification behavior
      await Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });

      // Request permissions
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.warn('Push notification permissions not granted');
        return false;
      }

      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize push notifications:', error);
      return false;
    }
  }

  async getExpoPushToken(): Promise<string | null> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      const token = await Notifications.getExpoPushTokenAsync({
        projectId: 'your-expo-project-id', // Replace with your actual project ID
      });

      return token.data;
    } catch (error) {
      console.error('Failed to get Expo push token:', error);
      return null;
    }
  }

  async sendPushNotification(notification: PushNotificationData): Promise<boolean> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: notification.title,
          body: notification.body,
          data: notification.data,
        },
        trigger: { seconds: 1 },
      });

      return true;
    } catch (error) {
      console.error('Failed to send push notification:', error);
      return false;
    }
  }

  async sendTransactionAlert(amount: number, merchant: string): Promise<boolean> {
    const notification: PushNotificationData = {
      title: 'New Transaction',
      body: `${amount < 0 ? 'Spent' : 'Received'} $${Math.abs(amount).toFixed(2)} at ${merchant}`,
      data: {
        screen: 'Transactions',
        type: 'transaction',
      },
    };

    return this.sendPushNotification(notification);
  }

  async sendBudgetAlert(category: string, percentage: number): Promise<boolean> {
    const notification: PushNotificationData = {
      title: 'Budget Alert',
      body: `You've used ${percentage}% of your ${category} budget`,
      data: {
        screen: 'Budget',
        params: { category },
        type: 'budget',
      },
    };

    return this.sendPushNotification(notification);
  }

  async sendGoalMilestone(goalName: string, progress: number): Promise<boolean> {
    const notification: PushNotificationData = {
      title: 'Goal Milestone! 🎉',
      body: `You've reached ${progress}% of your ${goalName} goal`,
      data: {
        screen: 'Goals',
        params: { goalName },
        type: 'goal',
      },
    };

    return this.sendPushNotification(notification);
  }

  async sendInvestmentAlert(symbol: string, changePercent: number): Promise<boolean> {
    const notification: PushNotificationData = {
      title: 'Investment Alert',
      body: `${symbol} is ${changePercent > 0 ? 'up' : 'down'} ${Math.abs(changePercent).toFixed(2)}%`,
      data: {
        screen: 'Investments',
        params: { symbol },
        type: 'investment',
      },
    };

    return this.sendPushNotification(notification);
  }

  async sendAIInsight(insight: string): Promise<boolean> {
    const notification: PushNotificationData = {
      title: 'AI Insight',
      body: insight,
      data: {
        screen: 'AICoach',
        type: 'ai_insight',
      },
    };

    return this.sendPushNotification(notification);
  }

  async clearAllNotifications(): Promise<void> {
    try {
      await Notifications.dismissAllNotificationsAsync();
    } catch (error) {
      console.error('Failed to clear notifications:', error);
    }
  }

  async getBadgeCount(): Promise<number> {
    try {
      return await Notifications.getBadgeCountAsync();
    } catch (error) {
      console.error('Failed to get badge count:', error);
      return 0;
    }
  }

  async setBadgeCount(count: number): Promise<boolean> {
    try {
      await Notifications.setBadgeCountAsync(count);
      return true;
    } catch (error) {
      console.error('Failed to set badge count:', error);
      return false;
    }
  }

  addNotificationListener(
    callback: (notification: Notifications.Notification) => void
  ): Notifications.Subscription {
    return Notifications.addNotificationReceivedListener(callback);
  }

  addNotificationResponseListener(
    callback: (response: Notifications.NotificationResponse) => void
  ): Notifications.Subscription {
    return Notifications.addNotificationResponseReceivedListener(callback);
  }

  removeNotificationListener(subscription: Notifications.Subscription): void {
    subscription.remove();
  }
}

export const pushNotificationService = new PushNotificationService();