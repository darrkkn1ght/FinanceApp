import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Transaction, TransactionType, TransactionStatus, AccountType } from '../../types/transaction';

interface TransactionFormProps {
  initialData?: Partial<Transaction>;
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const categories = [
  { id: 'dining', name: 'Dining & Food', icon: '🍽️' },
  { id: 'shopping', name: 'Shopping', icon: '🛍️' },
  { id: 'transportation', name: 'Transportation', icon: '🚗' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
  { id: 'bills', name: 'Bills & Utilities', icon: '💡' },
  { id: 'healthcare', name: 'Healthcare', icon: '🏥' },
  { id: 'education', name: 'Education', icon: '📚' },
  { id: 'travel', name: 'Travel', icon: '✈️' },
  { id: 'income', name: 'Income', icon: '💰' },
  { id: 'savings', name: 'Savings', icon: '🏦' },
  { id: 'other', name: 'Other', icon: '📝' },
];

const transactionTypes = [
  { id: 'expense', name: 'Expense', color: '#E53E3E' },
  { id: 'income', name: 'Income', color: '#38A169' },
];

export const TransactionForm: React.FC<TransactionFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState({
    amount: initialData?.amount?.toString() || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    merchant: {
      name: initialData?.merchant?.name || '',
      category: initialData?.merchant?.category || '',
    },
    date: initialData?.date || new Date().toISOString(),
    type: initialData?.amount && initialData.amount > 0 ? 'income' : 'expense',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.amount || isNaN(parseFloat(formData.amount))) {
      newErrors.amount = 'Please enter a valid amount';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please enter a description';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.merchant.name.trim()) {
      newErrors.merchant = 'Please enter a merchant name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fix the errors before submitting');
      return;
    }

    const amount = parseFloat(formData.amount);
    const finalAmount = formData.type === 'expense' ? -Math.abs(amount) : Math.abs(amount);

    const transaction: Omit<Transaction, 'id'> = {
      amount: finalAmount,
      description: formData.description.trim(),
      category: formData.category,
      merchant: {
        id: `merchant_${Date.now()}`,
        name: formData.merchant.name.trim(),
        category: formData.merchant.category || formData.category,
      },
      date: formData.date,
      account: {
        id: 'default_account',
        name: 'Default Account',
        type: AccountType.CHECKING,
        bank: {
          id: 'default_bank',
          name: 'Default Bank',
          supportedFeatures: []
        },
        balance: 0,
        currency: 'USD',
        isActive: true,
        accountNumber: '****1234',
        lastSync: new Date().toISOString()
      },
      type: formData.type === 'expense' ? TransactionType.EXPENSE : TransactionType.INCOME,
      status: TransactionStatus.COMPLETED,
      tags: [],
      metadata: {
        source: 'manual',
        userModified: false
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSubmit(transaction);
  };

  const handleAmountChange = (value: string) => {
    // Remove any non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');
    
    // Ensure only one decimal point
    const parts = numericValue.split('.');
    if (parts.length > 2) {
      return;
    }
    
    // Limit to 2 decimal places
    if (parts[1] && parts[1].length > 2) {
      return;
    }

    setFormData(prev => ({ ...prev, amount: numericValue }));
  };

  const selectCategory = (categoryId: string) => {
    setFormData(prev => ({ ...prev, category: categoryId }));
  };

  const selectType = (type: string) => {
    setFormData(prev => ({ ...prev, type }));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.form}>
        {/* Transaction Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transaction Type</Text>
          <View style={styles.typeContainer}>
            {transactionTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeButton,
                  formData.type === type.id && styles.typeButtonActive,
                  { borderColor: type.color },
                ]}
                onPress={() => selectType(type.id)}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    formData.type === type.id && { color: type.color },
                  ]}
                >
                  {type.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Amount Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Amount</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <Input
              style={styles.amountInput}
              value={formData.amount}
              onChangeText={handleAmountChange}
              placeholder="0.00"
              keyboardType="decimal-pad"
              error={errors.amount}
            />
          </View>
        </View>

        {/* Description Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Input
            value={formData.description}
            onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
            placeholder="Enter transaction description"
            error={errors.description}
          />
        </View>

        {/* Merchant Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Merchant</Text>
          <Input
            value={formData.merchant.name}
            onChangeText={(text) => setFormData(prev => ({ 
              ...prev, 
              merchant: { ...prev.merchant, name: text } 
            }))}
            placeholder="Enter merchant name"
            error={errors.merchant}
          />
        </View>

        {/* Category Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category</Text>
          <View style={styles.categoryContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  formData.category === category.id && styles.categoryButtonActive,
                ]}
                onPress={() => selectCategory(category.id)}
              >
                <Text style={styles.categoryEmoji}>{category.icon}</Text>
                <Text style={[
                  styles.categoryText,
                  formData.category === category.id && styles.categoryTextActive,
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.category && (
            <Text style={styles.errorText}>{errors.category}</Text>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            title="Cancel"
            onPress={onCancel}
            variant="outline"
            style={styles.cancelButton}
          />
          <Button
            title={isEditing ? 'Update Transaction' : 'Add Transaction'}
            onPress={handleSubmit}
            style={styles.submitButton}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  form: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: '#F7FAFC',
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#EBF8FF',
    borderColor: '#3182CE',
  },
  categoryEmoji: {
    fontSize: 16,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    color: '#64748B',
  },
  categoryTextActive: {
    color: '#3182CE',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 32,
  },
  cancelButton: {
    flex: 1,
  },
  submitButton: {
    flex: 1,
  },
  errorText: {
    fontSize: 12,
    color: '#E53E3E',
    marginTop: 4,
  },
});

export default TransactionForm;