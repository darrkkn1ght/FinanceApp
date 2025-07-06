import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Card } from '../common/Card';

interface BudgetFormProps {
  onSubmit: (budget: BudgetFormData) => void;
  onCancel: () => void;
  initialData?: Partial<BudgetFormData>;
  isEditing?: boolean;
}

export interface BudgetFormData {
  id?: string;
  name: string;
  amount: number;
  category: string;
  period: 'weekly' | 'monthly' | 'yearly';
  startDate: string;
  endDate: string;
  description?: string;
}

const budgetCategories = [
  { id: 'food', name: 'Food & Dining', icon: '🍽️' },
  { id: 'transport', name: 'Transportation', icon: '🚗' },
  { id: 'shopping', name: 'Shopping', icon: '🛒' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
  { id: 'utilities', name: 'Utilities', icon: '💡' },
  { id: 'healthcare', name: 'Healthcare', icon: '🏥' },
  { id: 'education', name: 'Education', icon: '📚' },
  { id: 'savings', name: 'Savings', icon: '💰' },
  { id: 'other', name: 'Other', icon: '📝' },
];

const budgetPeriods = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
];

export const BudgetForm: React.FC<BudgetFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<BudgetFormData>({
    name: initialData?.name || '',
    amount: initialData?.amount || 0,
    category: initialData?.category || 'food',
    period: initialData?.period || 'monthly',
    startDate: initialData?.startDate || new Date().toISOString().split('T')[0],
    endDate: initialData?.endDate || new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
    description: initialData?.description || '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BudgetFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BudgetFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Budget name is required';
    }

    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }

    if (formData.startDate && formData.endDate && new Date(formData.startDate) >= new Date(formData.endDate)) {
      newErrors.endDate = 'End date must be after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fix the errors and try again');
      return;
    }

    const budgetData: BudgetFormData = {
      ...formData,
      id: initialData?.id || `budget_${Date.now()}`,
    };

    onSubmit(budgetData);
  };

  const updateFormData = (field: keyof BudgetFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const renderCategorySelector = () => (
    <View style={styles.selectorContainer}>
      <Text style={styles.selectorLabel}>Category</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {budgetCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              formData.category === category.id && styles.categoryButtonActive,
            ]}
            onPress={() => updateFormData('category', category.id)}
          >
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text style={[
              styles.categoryText,
              formData.category === category.id && styles.categoryTextActive,
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
    </View>
  );

  const renderPeriodSelector = () => (
    <View style={styles.selectorContainer}>
      <Text style={styles.selectorLabel}>Budget Period</Text>
      <View style={styles.periodContainer}>
        {budgetPeriods.map((period) => (
          <TouchableOpacity
            key={period.value}
            style={[
              styles.periodButton,
              formData.period === period.value && styles.periodButtonActive,
            ]}
            onPress={() => updateFormData('period', period.value)}
          >
            <Text style={[
              styles.periodText,
              formData.period === period.value && styles.periodTextActive,
            ]}>
              {period.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Card style={styles.formCard}>
        <Text style={styles.title}>
          {isEditing ? 'Edit Budget' : 'Create New Budget'}
        </Text>

        <Input
          label="Budget Name"
          value={formData.name}
          onChangeText={(text) => updateFormData('name', text)}
          placeholder="Enter budget name"
          error={errors.name}
        />

        <Input
          label="Amount"
          value={formData.amount.toString()}
          onChangeText={(text) => updateFormData('amount', parseFloat(text) || 0)}
          placeholder="$0.00"
          keyboardType="numeric"
          error={errors.amount}
        />

        {renderCategorySelector()}

        {renderPeriodSelector()}

        <View style={styles.dateContainer}>
          <View style={styles.dateField}>
            <Input
              label="Start Date"
              value={formData.startDate}
              onChangeText={(text) => updateFormData('startDate', text)}
              placeholder="YYYY-MM-DD"
              error={errors.startDate}
            />
          </View>
          <View style={styles.dateField}>
            <Input
              label="End Date"
              value={formData.endDate}
              onChangeText={(text) => updateFormData('endDate', text)}
              placeholder="YYYY-MM-DD"
              error={errors.endDate}
            />
          </View>
        </View>

        <Input
          label="Description (Optional)"
          value={formData.description || ''}
          onChangeText={(text) => updateFormData('description', text)}
          placeholder="Add notes about this budget..."
          multiline
          numberOfLines={3}
          style={styles.descriptionInput}
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Cancel"
            onPress={onCancel}
            variant="outline"
            style={styles.cancelButton}
          />
          <Button
            title={isEditing ? 'Update Budget' : 'Create Budget'}
            onPress={handleSubmit}
            style={styles.submitButton}
          />
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  formCard: {
    margin: 16,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 24,
    textAlign: 'center',
  },
  selectorContainer: {
    marginBottom: 20,
  },
  selectorLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  categoryScroll: {
    flexDirection: 'row',
  },
  categoryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minWidth: 100,
  },
  categoryButtonActive: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666666',
    textAlign: 'center',
  },
  categoryTextActive: {
    color: '#2196F3',
    fontWeight: '600',
  },
  periodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  periodButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginHorizontal: 4,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  periodButtonActive: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  periodTextActive: {
    color: '#2196F3',
    fontWeight: '600',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateField: {
    flex: 1,
    marginHorizontal: 4,
  },
  descriptionInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  submitButton: {
    flex: 1,
    marginLeft: 8,
  },
  errorText: {
    fontSize: 12,
    color: '#F44336',
    marginTop: 4,
  },
});

export default BudgetForm;