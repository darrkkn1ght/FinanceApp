// src/services/utils/validationUtils.ts



export interface ValidationResult {
    isValid: boolean;
    errors: string[];
  }
  
  export interface PasswordValidationOptions {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumbers?: boolean;
    requireSpecialChars?: boolean;
  }
  
  export interface TransactionValidationData {
    amount: number;
    description: string;
    category: string;
    date: string;
  }
  
  export interface BudgetValidationData {
    name: string;
    amount: number;
    category: string;
    period: 'monthly' | 'weekly' | 'yearly';
  }
  
  export interface GoalValidationData {
    title: string;
    targetAmount: number;
    currentAmount?: number;
    targetDate: string;
    description?: string;
  }
  
  /**
   * Validates email format
   */
  export const validateEmail = (email: string): ValidationResult => {
    const errors: string[] = [];
    
    if (!email) {
      errors.push('Email is required');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.push('Please enter a valid email address');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  };
  
  /**
   * Validates password with customizable options
   */
  export const validatePassword = (
    password: string,
    options: PasswordValidationOptions = {}
  ): ValidationResult => {
    const {
      minLength = 8,
      requireUppercase = true,
      requireLowercase = true,
      requireNumbers = true,
      requireSpecialChars = true,
    } = options;
    
    const errors: string[] = [];
    
    if (!password) {
      errors.push('Password is required');
      return { isValid: false, errors };
    }
    
    if (password.length < minLength) {
      errors.push(`Password must be at least ${minLength} characters long`);
    }
    
    if (requireUppercase && !/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (requireLowercase && !/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (requireNumbers && !/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  };
  
  /**
   * Validates phone number
   */
  export const validatePhoneNumber = (phone: string): ValidationResult => {
    const errors: string[] = [];
    
    if (!phone) {
      errors.push('Phone number is required');
    } else {
      const cleaned = phone.replace(/\D/g, '');
      if (cleaned.length < 10 || cleaned.length > 11) {
        errors.push('Please enter a valid phone number');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  };
  
  /**
   * Validates transaction data
   */
  export const validateTransaction = (data: TransactionValidationData): ValidationResult => {
    const errors: string[] = [];
    
    // Validate amount
    if (data.amount === 0) {
      errors.push('Amount cannot be zero');
    } else if (Math.abs(data.amount) > 1000000) {
      errors.push('Amount cannot exceed $1,000,000');
    }
    
    // Validate description
    if (!data.description || data.description.trim().length === 0) {
      errors.push('Description is required');
    } else if (data.description.trim().length > 200) {
      errors.push('Description cannot exceed 200 characters');
    }
    
    // Validate category
    if (!data.category || data.category.trim().length === 0) {
      errors.push('Category is required');
    }
    
    // Validate date
    if (!data.date) {
      errors.push('Date is required');
    } else {
      const date = new Date(data.date);
      const now = new Date();
      
      if (isNaN(date.getTime())) {
        errors.push('Please enter a valid date');
      } else if (date > now) {
        errors.push('Date cannot be in the future');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  };
  
  /**
   * Validates budget data
   */
  export const validateBudget = (data: BudgetValidationData): ValidationResult => {
    const errors: string[] = [];
    
    // Validate name
    if (!data.name || data.name.trim().length === 0) {
      errors.push('Budget name is required');
    } else if (data.name.trim().length > 50) {
      errors.push('Budget name cannot exceed 50 characters');
    }
    
    // Validate amount
    if (data.amount <= 0) {
      errors.push('Budget amount must be greater than zero');
    } else if (data.amount > 1000000) {
      errors.push('Budget amount cannot exceed $1,000,000');
    }
    
    // Validate category
    if (!data.category || data.category.trim().length === 0) {
      errors.push('Category is required');
    }
    
    // Validate period
    const validPeriods = ['monthly', 'weekly', 'yearly'];
    if (!validPeriods.includes(data.period)) {
      errors.push('Please select a valid budget period');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  };
  
  /**
   * Validates goal data
   */
  export const validateGoal = (data: GoalValidationData): ValidationResult => {
    const errors: string[] = [];
    
    // Validate title
    if (!data.title || data.title.trim().length === 0) {
      errors.push('Goal title is required');
    } else if (data.title.trim().length > 100) {
      errors.push('Goal title cannot exceed 100 characters');
    }
    
    // Validate target amount
    if (data.targetAmount <= 0) {
      errors.push('Target amount must be greater than zero');
    } else if (data.targetAmount > 10000000) {
      errors.push('Target amount cannot exceed $10,000,000');
    }
    
    // Validate current amount
    if (data.currentAmount !== undefined) {
      if (data.currentAmount < 0) {
        errors.push('Current amount cannot be negative');
      } else if (data.currentAmount > data.targetAmount) {
        errors.push('Current amount cannot exceed target amount');
      }
    }
    
    // Validate target date
    if (!data.targetDate) {
      errors.push('Target date is required');
    } else {
      const targetDate = new Date(data.targetDate);
      const now = new Date();
      
      if (isNaN(targetDate.getTime())) {
        errors.push('Please enter a valid target date');
      } else if (targetDate <= now) {
        errors.push('Target date must be in the future');
      }
    }
    
    // Validate description
    if (data.description && data.description.length > 500) {
      errors.push('Description cannot exceed 500 characters');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  };
  
  /**
   * Validates amount input
   */
  export const validateAmount = (amount: number, options: {
    allowZero?: boolean;
    allowNegative?: boolean;
    maxAmount?: number;
    minAmount?: number;
  } = {}): ValidationResult => {
    const {
      allowZero = false,
      allowNegative = false,
      maxAmount = 1000000,
      minAmount = 0,
    } = options;
    
    const errors: string[] = [];
    
    if (isNaN(amount)) {
      errors.push('Please enter a valid amount');
    } else {
      if (!allowZero && amount === 0) {
        errors.push('Amount cannot be zero');
      }
      
      if (!allowNegative && amount < 0) {
        errors.push('Amount cannot be negative');
      }
      
      if (amount > maxAmount) {
        errors.push(`Amount cannot exceed $${maxAmount.toLocaleString()}`);
      }
      
      if (amount < minAmount) {
        errors.push(`Amount must be at least $${minAmount.toLocaleString()}`);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  };
  
  /**
   * Validates required fields
   */
  export const validateRequired = (value: unknown, fieldName: string): ValidationResult => {
    const errors: string[] = [];
    
    if (value === null || value === undefined) {
      errors.push(`${fieldName} is required`);
    } else if (typeof value === 'string' && value.trim().length === 0) {
      errors.push(`${fieldName} is required`);
    } else if (Array.isArray(value) && value.length === 0) {
      errors.push(`${fieldName} is required`);
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  };
  
  /**
   * Validates string length
   */
  export const validateLength = (
    value: string,
    fieldName: string,
    options: {
      min?: number;
      max?: number;
    } = {}
  ): ValidationResult => {
    const { min = 0, max = Infinity } = options;
    const errors: string[] = [];
    
    if (value.length < min) {
      errors.push(`${fieldName} must be at least ${min} characters long`);
    }
    
    if (value.length > max) {
      errors.push(`${fieldName} cannot exceed ${max} characters`);
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  };
  
  /**
   * Validates date format and constraints
   */
  export const validateDate = (
    dateString: string,
    fieldName: string,
    options: {
      allowFuture?: boolean;
      allowPast?: boolean;
      minDate?: string;
      maxDate?: string;
    } = {}
  ): ValidationResult => {
    const {
      allowFuture = true,
      allowPast = true,
      minDate,
      maxDate,
    } = options;
    
    const errors: string[] = [];
    
    if (!dateString) {
      errors.push(`${fieldName} is required`);
      return { isValid: false, errors };
    }
    
    const date = new Date(dateString);
    const now = new Date();
    
    if (isNaN(date.getTime())) {
      errors.push(`Please enter a valid ${fieldName.toLowerCase()}`);
      return { isValid: false, errors };
    }
    
    if (!allowFuture && date > now) {
      errors.push(`${fieldName} cannot be in the future`);
    }
    
    if (!allowPast && date < now) {
      errors.push(`${fieldName} cannot be in the past`);
    }
    
    if (minDate) {
      const minDateObj = new Date(minDate);
      if (date < minDateObj) {
        errors.push(`${fieldName} cannot be before ${minDateObj.toLocaleDateString()}`);
      }
    }
    
    if (maxDate) {
      const maxDateObj = new Date(maxDate);
      if (date > maxDateObj) {
        errors.push(`${fieldName} cannot be after ${maxDateObj.toLocaleDateString()}`);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  };
  
  /**
   * Validates credit card number using Luhn algorithm
   */
  export const validateCardNumber = (cardNumber: string): ValidationResult => {
    const errors: string[] = [];
    
    if (!cardNumber) {
      errors.push('Card number is required');
      return { isValid: false, errors };
    }
    
    const cleaned = cardNumber.replace(/\D/g, '');
    
    if (cleaned.length < 13 || cleaned.length > 19) {
      errors.push('Please enter a valid card number');
      return { isValid: false, errors };
    }
    
    // Luhn algorithm
    let sum = 0;
    let alternate = false;
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned.charAt(i), 10);
      
      if (alternate) {
        digit *= 2;
        if (digit > 9) {
          digit = (digit % 10) + 1;
        }
      }
      
      sum += digit;
      alternate = !alternate;
    }
    
    if (sum % 10 !== 0) {
      errors.push('Please enter a valid card number');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  };
  
  /**
   * Validates CVV code
   */
  export const validateCVV = (cvv: string): ValidationResult => {
    const errors: string[] = [];
    
    if (!cvv) {
      errors.push('CVV is required');
    } else {
      const cleaned = cvv.replace(/\D/g, '');
      if (cleaned.length < 3 || cleaned.length > 4) {
        errors.push('Please enter a valid CVV');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  };
  
  /**
   * Validates expiration date (MM/YY format)
   */
  export const validateExpirationDate = (expDate: string): ValidationResult => {
    const errors: string[] = [];
    
    if (!expDate) {
      errors.push('Expiration date is required');
      return { isValid: false, errors };
    }
    
    const parts = expDate.split('/');
    if (parts.length !== 2) {
      errors.push('Please enter expiration date in MM/YY format');
      return { isValid: false, errors };
    }
    
    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[1], 10);
    
    if (isNaN(month) || isNaN(year)) {
      errors.push('Please enter a valid expiration date');
      return { isValid: false, errors };
    }
    
    if (month < 1 || month > 12) {
      errors.push('Please enter a valid month (01-12)');
    }
    
    // Check if card is expired
    const now = new Date();
    const currentYear = now.getFullYear() % 100; // Get last 2 digits
    const currentMonth = now.getMonth() + 1;
    
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      errors.push('Card has expired');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  };
  
  /**
   * Validates multiple fields and combines results
   */
  export const validateForm = (validations: ValidationResult[]): ValidationResult => {
    const allErrors: string[] = [];
    let isValid = true;
    
    validations.forEach(validation => {
      if (!validation.isValid) {
        isValid = false;
        allErrors.push(...validation.errors);
      }
    });
    
    return {
      isValid,
      errors: allErrors,
    };
  };
  
  /**
   * Validates PIN code
   */
  export const validatePIN = (pin: string, length: number = 4): ValidationResult => {
    const errors: string[] = [];
    
    if (!pin) {
      errors.push('PIN is required');
    } else {
      const cleaned = pin.replace(/\D/g, '');
      if (cleaned.length !== length) {
        errors.push(`PIN must be exactly ${length} digits`);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  };
  
  /**
   * Validates URL format
   */
  export const validateURL = (url: string): ValidationResult => {
    const errors: string[] = [];
    
    if (!url) {
      errors.push('URL is required');
    } else {
      const urlRegex = /^https?:\/\/.+/;
      if (!urlRegex.test(url)) {
        errors.push('Please enter a valid URL');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  };
  
  /**
   * Validates if a string contains only letters
   */
  export const validateAlphabetic = (value: string, fieldName: string): ValidationResult => {
    const errors: string[] = [];
    
    if (value && !/^[a-zA-Z\s]+$/.test(value)) {
      errors.push(`${fieldName} can only contain letters and spaces`);
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  };
  
  /**
   * Validates if a string contains only numbers
   */
  export const validateNumeric = (value: string, fieldName: string): ValidationResult => {
    const errors: string[] = [];
    
    if (value && !/^\d+$/.test(value)) {
      errors.push(`${fieldName} can only contain numbers`);
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  };
  
  /**
   * Validates if a string contains only alphanumeric characters
   */
  export const validateAlphanumeric = (value: string, fieldName: string): ValidationResult => {
    const errors: string[] = [];
    
    if (value && !/^[a-zA-Z0-9\s]+$/.test(value)) {
      errors.push(`${fieldName} can only contain letters, numbers, and spaces`);
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  };