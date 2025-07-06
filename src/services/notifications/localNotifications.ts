// src/services/notifications/localNotifications.ts
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LocalNotificationSchedule {
  id: string;
  title: string;
  body: string;
  trigger: {
    type: 'daily' | 'weekly' | 'monthly' | 'date';
    hour?: number;
    minute?: number;
    weekday?: number; // 1-7 (Sunday = 1)
    day?: number; // 1-31
    date?: string; // ISO string
  };
  data?: Record<string, unknown>;
}

class LocalNotificationService {
  private readonly STORAGE_KEY = '@finance_app_notifications';

  async scheduleNotification(notification: LocalNotificationSchedule): Promise<boolean> {
    try {
      let trigger: Notifications.NotificationTriggerInput | Notifications.DateTriggerInput;

      switch (notification.trigger.type) {
        case 'daily':
          trigger = {
            hour: notification.trigger.hour!,
            minute: notification.trigger.minute!,
            repeats: true,
          };
          break;

        case 'weekly':
          trigger = {
            weekday: notification.trigger.weekday || 1,
            hour: notification.trigger.hour!,
            minute: notification.trigger.minute!,
            repeats: true,
          };
          break;

        case 'monthly':
          trigger = {
            day: notification.trigger.day || 1,
            hour: notification.trigger.hour!,
            minute: notification.trigger.minute!,
            repeats: true,
          };
          break;

        case 'date':
          trigger = {
            date: new Date(notification.trigger.date!),
          };
          break;

        default:
          throw new Error('Invalid trigger type');
      }

      await Notifications.scheduleNotificationAsync({
        identifier: notification.id,
        content: {
          title: notification.title,
          body: notification.body,
          data: notification.data,
        },
        trigger,
      });

      // Save to storage for management
      await this.saveNotificationToStorage(notification);

      return true;
    } catch (error) {
      console.error('Failed to schedule local notification:', error);
      return false;
    }
  }

  async cancelNotification(id: string): Promise<boolean> {
    try {
      await Notifications.cancelScheduledNotificationAsync(id);
      await this.removeNotificationFromStorage(id);
      return true;
    } catch (error) {
      console.error('Failed to cancel notification:', error);
      return false;
    }
  }

  async cancelAllNotifications(): Promise<boolean> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      await AsyncStorage.removeItem(this.STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Failed to cancel all notifications:', error);
      return false;
    }
  }

  async getScheduledNotifications(): Promise<LocalNotificationSchedule[]> {
    try {
      const stored = await AsyncStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to get scheduled notifications:', error);
      return [];
    }
  }

  async scheduleTransactionReminder(hour: number, minute: number): Promise<boolean> {
    const notification: LocalNotificationSchedule = {
      id: 'transaction_reminder',
      title: 'Track Your Expenses',
      body: 'Don\'t forget to log your transactions today!',
      trigger: {
        type: 'daily',
        hour,
        minute,
      },
      data: {
        screen: 'AddTransaction',
        type: 'reminder',
      },
    };

    return this.scheduleNotification(notification);
  }

  async scheduleBudgetReview(day: number, hour: number, minute: number): Promise<boolean> {
    const notification: LocalNotificationSchedule = {
      id: 'budget_review',
      title: 'Budget Review Time',
      body: 'Check how you\'re doing with your monthly budget',
      trigger: {
        type: 'monthly',
        day,
        hour,
        minute,
      },
      data: {
        screen: 'Budget',
        type: 'review',
      },
    };

    return this.scheduleNotification(notification);
  }

  async scheduleGoalCheckIn(weekday: number, hour: number, minute: number): Promise<boolean> {
    const notification: LocalNotificationSchedule = {
      id: 'goal_checkin',
      title: 'Goal Check-in',
      body: 'How are you progressing towards your financial goals?',
      trigger: {
        type: 'weekly',
        weekday,
        hour,
        minute,
      },
      data: {
        screen: 'Goals',
        type: 'checkin',
      },
    };

    return this.scheduleNotification(notification);
  }

  async scheduleInvestmentReview(hour: number, minute: number): Promise<boolean> {
    const notification: LocalNotificationSchedule = {
      id: 'investment_review',
      title: 'Investment Portfolio Review',
      body: 'Time to review your investment portfolio',
      trigger: {
        type: 'weekly',
        weekday: 1, // Sunday
        hour,
        minute,
      },
      data: {
        screen: 'Investments',
        type: 'review',
      },
    };

    return this.scheduleNotification(notification);
  }

  async scheduleBillReminder(
    billName: string,
    amount: number,
    dueDate: string
  ): Promise<boolean> {
    const reminderDate = new Date(dueDate);
    reminderDate.setDate(reminderDate.getDate() - 3); // 3 days before due date

    const notification: LocalNotificationSchedule = {
      id: `bill_reminder_${billName.toLowerCase().replace(/\s+/g, '_')}`,
      title: 'Bill Reminder',
      body: `${billName} ($${amount.toFixed(2)}) is due in 3 days`,
      trigger: {
        type: 'date',
        date: reminderDate.toISOString(),
      },
      data: {
        screen: 'Transactions',
        type: 'bill_reminder',
        billName,
        amount,
        dueDate,
      },
    };

    return this.scheduleNotification(notification);
  }

  async scheduleAIInsightReminder(hour: number, minute: number): Promise<boolean> {
    const notification: LocalNotificationSchedule = {
      id: 'ai_insight_reminder',
      title: 'AI Insights Available',
      body: 'Check out personalized financial insights from your AI coach',
      trigger: {
        type: 'daily',
        hour,
        minute,
      },
      data: {
        screen: 'AICoach',
        type: 'ai_reminder',
      },
    };

    return this.scheduleNotification(notification);
  }

  private async saveNotificationToStorage(notification: LocalNotificationSchedule): Promise<void> {
    try {
      const existing = await this.getScheduledNotifications();
      const updated = existing.filter((n) => n.id !== notification.id);
      updated.push(notification);
      await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save notification to storage:', error);
    }
  }

  private async removeNotificationFromStorage(id: string): Promise<void> {
    try {
      const existing = await this.getScheduledNotifications();
      const updated = existing.filter(n => n.id !== id);
      await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to remove notification from storage:', error);
    }
  }

  async isNotificationScheduled(id: string): Promise<boolean> {
    try {
      const notifications = await this.getScheduledNotifications();
      return notifications.some(n => n.id === id);
    } catch (error) {
      console.error('Failed to check notification status:', error);
      return false;
    }
  }

  async getAllScheduledNotificationIds(): Promise<string[]> {
    try {
      const systemNotifications = await Notifications.getAllScheduledNotificationsAsync();
      return systemNotifications.map((n) => n.identifier);
    } catch (error) {
      console.error('Failed to get all scheduled notifications:', error);
      return [];
    }
  }

  async cleanupExpiredNotifications(): Promise<void> {
    try {
      const stored = await this.getScheduledNotifications();
      const systemIds = await this.getAllScheduledNotificationIds();
      
      // Remove stored notifications that are no longer in the system
      const validNotifications = stored.filter((n) => systemIds.includes(n.id));
      
      await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(validNotifications));
    } catch (error) {
      console.error('Failed to cleanup expired notifications:', error);
    }
  }
}

export const localNotificationService = new LocalNotificationService();