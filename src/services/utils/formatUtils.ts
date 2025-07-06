// src/services/utils/formatUtils.ts

export interface CurrencyFormatOptions {
    currency?: string;
    locale?: string;
    showSymbol?: boolean;
    showCents?: boolean;
    abbreviated?: boolean;
  }
  
  export interface NumberFormatOptions {
    decimals?: number;
    abbreviated?: boolean;
    showSign?: boolean;
  }
  
  /**
   * Formats a number as currency
   */
  export const formatCurrency = (
    amount: number,
    options: CurrencyFormatOptions = {}
  ): string => {
    const {
      currency = 'USD',
      locale = 'en-US',
      showSymbol = true,
      showCents = true,
      abbreviated = false,
    } = options;
  
    try {
      // Handle abbreviated format for large numbers
      if (abbreviated && Math.abs(amount) >= 1000) {
        return formatAbbreviatedCurrency(amount, showSymbol);
      }
  
      // Format with standard currency formatter
      const formatter = new Intl.NumberFormat(locale, {
        style: showSymbol ? 'currency' : 'decimal',
        currency: currency,
        minimumFractionDigits: showCents ? 2 : 0,
        maximumFractionDigits: showCents ? 2 : 0,
      });
  
      return formatter.format(amount);
    } catch (_error) {
      // Fallback formatting
      const sign = amount < 0 ? '-' : '';
      const absAmount = Math.abs(amount);
      const dollars = Math.floor(absAmount);
      const cents = Math.round((absAmount - dollars) * 100);
      
      if (showCents) {
        return `${sign}${showSymbol ? '$' : ''}${dollars}.${cents.toString().padStart(2, '0')}`;
      } else {
        return `${sign}${showSymbol ? '$' : ''}${dollars}`;
      }
    }
  };
  
  /**
   * Formats currency with abbreviations (K, M, B)
   */
  export const formatAbbreviatedCurrency = (amount: number, showSymbol: boolean = true): string => {
    const absAmount = Math.abs(amount);
    const sign = amount < 0 ? '-' : '';
    const symbol = showSymbol ? '$' : '';
    
    if (absAmount >= 1000000000) {
      return `${sign}${symbol}${(absAmount / 1000000000).toFixed(1)}B`;
    } else if (absAmount >= 1000000) {
      return `${sign}${symbol}${(absAmount / 1000000).toFixed(1)}M`;
    } else if (absAmount >= 1000) {
      return `${sign}${symbol}${(absAmount / 1000).toFixed(1)}K`;
    } else {
      return `${sign}${symbol}${absAmount.toFixed(0)}`;
    }
  };
  
  /**
   * Formats a number with specified options
   */
  export const formatNumber = (
    value: number,
    options: NumberFormatOptions = {}
  ): string => {
    const {
      decimals = 2,
      abbreviated = false,
      showSign = false,
    } = options;
  
    try {
      let formattedValue = value;
      let suffix = '';
  
      // Handle abbreviated format
      if (abbreviated && Math.abs(value) >= 1000) {
        if (Math.abs(value) >= 1000000000) {
          formattedValue = value / 1000000000;
          suffix = 'B';
        } else if (Math.abs(value) >= 1000000) {
          formattedValue = value / 1000000;
          suffix = 'M';
        } else if (Math.abs(value) >= 1000) {
          formattedValue = value / 1000;
          suffix = 'K';
        }
      }
  
      // Format the number
      const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: abbreviated ? 1 : decimals,
        maximumFractionDigits: abbreviated ? 1 : decimals,
        signDisplay: showSign ? 'always' : 'auto',
      });
  
      return formatter.format(formattedValue) + suffix;
    } catch (_error) {
      return value.toFixed(decimals);
    }
  };
  
  /**
   * Formats a percentage
   */
  export const formatPercentage = (value: number, decimals: number = 1): string => {
    try {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
      
      return formatter.format(value / 100);
    } catch (_error) {
      return `${value.toFixed(decimals)}%`;
    }
  };
  
  /**
   * Formats transaction amount with proper color coding
   */
  export const formatTransactionAmount = (amount: number): {
    formatted: string;
    color: string;
    isPositive: boolean;
  } => {
    const isPositive = amount > 0;
    const absAmount = Math.abs(amount);
    
    return {
      formatted: formatCurrency(absAmount),
      color: isPositive ? '#2E7D32' : '#D32F2F',
      isPositive,
    };
  };
  
  /**
   * Formats account balance with proper styling
   */
  export const formatAccountBalance = (balance: number): {
    formatted: string;
    color: string;
    isLow: boolean;
  } => {
    const isLow = balance < 100; // Consider balance low if under $100
    
    return {
      formatted: formatCurrency(balance),
      color: isLow ? '#FF6B35' : '#2E7D32',
      isLow,
    };
  };
  
  /**
   * Formats budget progress
   */
  export const formatBudgetProgress = (spent: number, budget: number): {
    percentage: number;
    remaining: string;
    status: 'safe' | 'warning' | 'exceeded';
  } => {
    const percentage = budget > 0 ? (spent / budget) * 100 : 0;
    const remaining = budget - spent;
    
    let status: 'safe' | 'warning' | 'exceeded' = 'safe';
    if (percentage >= 100) {
      status = 'exceeded';
    } else if (percentage >= 80) {
      status = 'warning';
    }
    
    return {
      percentage: Math.min(percentage, 100),
      remaining: formatCurrency(remaining),
      status,
    };
  };
  
  /**
   * Formats investment returns
   */
  export const formatInvestmentReturn = (currentValue: number, initialValue: number): {
    amount: string;
    percentage: string;
    color: string;
    isPositive: boolean;
  } => {
    const returnAmount = currentValue - initialValue;
    const returnPercentage = initialValue > 0 ? (returnAmount / initialValue) * 100 : 0;
    const isPositive = returnAmount >= 0;
    
    return {
      amount: formatCurrency(Math.abs(returnAmount)),
      percentage: formatPercentage(Math.abs(returnPercentage)),
      color: isPositive ? '#2E7D32' : '#D32F2F',
      isPositive,
    };
  };
  
  /**
   * Formats phone number
   */
  export const formatPhoneNumber = (phone: string): string => {
    // Remove all non-numeric characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
      return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
    
    return phone; // Return original if can't format
  };
  
  /**
   * Formats card number with masking
   */
  export const formatCardNumber = (cardNumber: string, showLast: number = 4): string => {
    const cleaned = cardNumber.replace(/\D/g, '');
    
    if (cleaned.length >= showLast) {
      const lastDigits = cleaned.slice(-showLast);
      const maskedPart = '*'.repeat(cleaned.length - showLast);
      return `${maskedPart}${lastDigits}`;
    }
    
    return cardNumber;
  };
  
  /**
   * Capitalizes the first letter of each word
   */
  export const capitalizeWords = (text: string): string => {
    return text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  /**
   * Formats category name for display
   */
  export const formatCategoryName = (category: string): string => {
    return category
      .replace(/[_-]/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  /**
   * Truncates text with ellipsis
   */
  export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) {
      return text;
    }
    
    return text.slice(0, maxLength - 3) + '...';
  };
  
  /**
   * Formats file size
   */
  export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };