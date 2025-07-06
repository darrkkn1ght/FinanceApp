// src/services/utils/dateUtils.ts

export interface DateRangeFilter {
    startDate: string;
    endDate: string;
  }
  
  export interface DateGrouping {
    daily: string;
    weekly: string;
    monthly: string;
    yearly: string;
  }
  
  /**
   * Formats a date string to a human-readable format
   */
  export const formatDate = (dateString: string, format: 'short' | 'medium' | 'long' = 'medium'): string => {
    try {
      const date = new Date(dateString);
      
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }
  
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);
  
      // Return relative time for recent dates
      if (diffInSeconds < 60) {
        return 'Just now';
      } else if (diffInMinutes < 60) {
        return `${diffInMinutes}m ago`;
      } else if (diffInHours < 24) {
        return `${diffInHours}h ago`;
      } else if (diffInDays === 1) {
        return 'Yesterday';
      } else if (diffInDays < 7) {
        return `${diffInDays}d ago`;
      }
  
      // Format based on requested format
      switch (format) {
        case 'short':
          return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          });
        case 'medium':
          return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });
        case 'long':
          return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          });
        default:
          return date.toLocaleDateString('en-US');
      }
    } catch (_error) {
      return 'Invalid Date';
    }
  };
  
  /**
   * Formats a date for display in transaction lists
   */
  export const formatTransactionDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
      const transactionDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
      if (transactionDate.getTime() === today.getTime()) {
        return 'Today';
      } else if (transactionDate.getTime() === yesterday.getTime()) {
        return 'Yesterday';
      } else {
        return formatDate(dateString, 'short');
      }
    } catch (_error) {
      return formatDate(dateString, 'short');
    }
  };
  
  /**
   * Gets the start and end dates for a given period
   */
  export const getDateRange = (period: 'week' | 'month' | 'quarter' | 'year'): DateRangeFilter => {
    const now = new Date();
    const startDate = new Date(now);
    
    switch (period) {
      case 'week': {
        const dayOfWeek = now.getDay();
        startDate.setDate(now.getDate() - dayOfWeek);
        break;
      }
      case 'month':
        startDate.setDate(1);
        break;
      case 'quarter': {
        const currentMonth = now.getMonth();
        const quarterStartMonth = Math.floor(currentMonth / 3) * 3;
        startDate.setMonth(quarterStartMonth, 1);
        break;
      }
      case 'year':
        startDate.setMonth(0, 1);
        break;
    }
    
    startDate.setHours(0, 0, 0, 0);
    
    return {
      startDate: startDate.toISOString(),
      endDate: now.toISOString(),
    };
  };
  
  /**
   * Groups transactions by date periods
   */
  export const groupByDatePeriod = (dateString: string): DateGrouping => {
    const date = new Date(dateString);
    
    return {
      daily: date.toISOString().split('T')[0], // YYYY-MM-DD
      weekly: getWeekKey(date),
      monthly: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,
      yearly: String(date.getFullYear()),
    };
  };
  
  /**
   * Gets a week key for grouping (e.g., "2025-W01")
   */
  export const getWeekKey = (date: Date): string => {
    const year = date.getFullYear();
    const start = new Date(year, 0, 1);
    const days = Math.floor((date.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
    const week = Math.ceil((days + start.getDay() + 1) / 7);
    
    return `${year}-W${String(week).padStart(2, '0')}`;
  };
  
  /**
   * Checks if a date is within a specified range
   */
  export const isDateInRange = (dateString: string, startDate: string, endDate: string): boolean => {
    try {
      const date = new Date(dateString);
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      return date >= start && date <= end;
    } catch (_error) {
      return false;
    }
  };
  
  /**
   * Gets the current month name
   */
  export const getCurrentMonthName = (): string => {
    const now = new Date();
    return now.toLocaleDateString('en-US', { month: 'long' });
  };
  
  /**
   * Gets an array of month names for the current year
   */
  export const getMonthsForYear = (year?: number): string[] => {
    const targetYear = year || new Date().getFullYear();
    const months: string[] = [];
    
    for (let month = 0; month < 12; month++) {
      const date = new Date(targetYear, month, 1);
      months.push(date.toLocaleDateString('en-US', { month: 'short' }));
    }
    
    return months;
  };
  
  /**
   * Calculates the number of days between two dates
   */
  export const daysBetween = (startDate: string, endDate: string): number => {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return diffDays;
    } catch (_error) {
      return 0;
    }
  };
  
  /**
   * Formats time for display (e.g., "10:30 AM")
   */
  export const formatTime = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } catch (_error) {
      return '';
    }
  };
  
  /**
   * Gets the start of the current day
   */
  export const getStartOfDay = (date?: Date): string => {
    const targetDate = date || new Date();
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);
    return startOfDay.toISOString();
  };
  
  /**
   * Gets the end of the current day
   */
  export const getEndOfDay = (date?: Date): string => {
    const targetDate = date || new Date();
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);
    return endOfDay.toISOString();
  };