import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { transactionService } from '../../services/api/transactionService';
import { MainStackParamList } from '../../types/navigation';

interface AddTransactionScreenProps {
  navigation: NavigationProp<MainStackParamList, 'AddTransaction'>;
}

interface TransactionForm {
  amount: string;
  description: string;
  category: string;
  merchantName: string;
  merchantCategory: string;
  date: string;
  isIncome: boolean;
  notes: string;
}

export const AddTransactionScreen: React.FC<AddTransactionScreenProps> = ({
  navigation,
}) => {
  const [form, setForm] = useState<TransactionForm>({
    amount: '',
    description: '',
    category: '',
    merchantName: '',
    merchantCategory: '',
    date: new Date().toISOString().split('T')[0],
    isIncome: false,
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<TransactionForm>>({});

  const categories = [
    { value: 'dining', label: 'Dining & Food' },
    { value: 'transport', label: 'Transportation' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'health', label: 'Health & Fitness' },
    { value: 'education', label: 'Education' },
    { value: 'income', label: 'Income' },
    { value: 'other', label: 'Other' },
  ];

  const merchantCategories = [
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'gas_station', label: 'Gas Station' },
    { value: 'grocery_store', label: 'Grocery Store' },
    { value: 'retail', label: 'Retail Store' },
    { value: 'online', label: 'Online Purchase' },
    { value: 'service', label: 'Service Provider' },
    { value: 'other', label: 'Other' },
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<TransactionForm> = {};

    if (!form.amount || isNaN(parseFloat(form.amount))) {
      newErrors.amount = 'Valid amount is required';
    } else if (parseFloat(form.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!form.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!form.category) {
      newErrors.category = 'Category is required';
    }

    if (!form.merchantName.trim()) {
      newErrors.merchantName = 'Merchant name is required';
    }

    if (!form.merchantCategory) {
      newErrors.merchantCategory = 'Merchant category is required';
    }

    if (!form.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please correct the errors and try again');
      return;
    }

    try {
      setLoading(true);

      const transactionData = {
        amount: form.isIncome ? parseFloat(form.amount) : -parseFloat(form.amount),
        description: form.description.trim(),
        category: form.category,
        merchant: {
          id: `merchant_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name: form.merchantName.trim(),
          category: form.merchantCategory,
        },
        date: form.date,
        notes: form.notes.trim(),
      };

      const response = await transactionService.createTransaction(transactionData);

      if (response.success) {
        Alert.alert(
          'Success',
          'Transaction added successfully!',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      } else {
        Alert.alert('Error', response.error || 'Failed to add transaction');
      }
    } catch (_error) {
      Alert.alert('Error', 'Failed to add transaction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateForm = (field: keyof TransactionForm, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const renderCategorySelector = () => (
    <Card style={styles.selectorCard}>
      <Text style={styles.selectorLabel}>Category *</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.value}
            style={[
              styles.categoryOption,
              form.category === category.value && styles.selectedCategoryOption,
            ]}
            onPress={() => updateForm('category', category.value)}
          >
            <Text
              style={[
                styles.categoryOptionText,
                form.category === category.value && styles.selectedCategoryOptionText,
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
    </Card>
  );

  const renderMerchantCategorySelector = () => (
    <Card style={styles.selectorCard}>
      <Text style={styles.selectorLabel}>Merchant Category *</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {merchantCategories.map((category) => (
          <TouchableOpacity
            key={category.value}
            style={[
              styles.categoryOption,
              form.merchantCategory === category.value && styles.selectedCategoryOption,
            ]}
            onPress={() => updateForm('merchantCategory', category.value)}
          >
            <Text
              style={[
                styles.categoryOptionText,
                form.merchantCategory === category.value && styles.selectedCategoryOptionText,
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {errors.merchantCategory && <Text style={styles.errorText}>{errors.merchantCategory}</Text>}
    </Card>
  );

  const renderIncomeToggle = () => (
    <Card style={styles.toggleCard}>
      <View style={styles.toggleContainer}>
        <View style={styles.toggleInfo}>
          <Text style={styles.toggleLabel}>Transaction Type</Text>
          <Text style={styles.toggleDescription}>
            {form.isIncome ? 'Income (money received)' : 'Expense (money spent)'}
          </Text>
        </View>
        <Switch
          value={form.isIncome}
          onValueChange={(value) => updateForm('isIncome', value)}
          trackColor={{ false: '#D32F2F', true: '#2E7D32' }}
          thumbColor={form.isIncome ? '#FFFFFF' : '#FFFFFF'}
        />
      </View>
    </Card>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Add Transaction</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderIncomeToggle()}

        <Card style={styles.formCard}>
          <Input
            label="Amount *"
            value={form.amount}
            onChangeText={(value) => updateForm('amount', value)}
            keyboardType="decimal-pad"
            placeholder="0.00"
            error={errors.amount}
            style={styles.amountInput}
          />

          <Input
            label="Description *"
            value={form.description}
            onChangeText={(value) => updateForm('description', value)}
            placeholder="e.g., Lunch at Pizza Place"
            error={errors.description}
            style={styles.input}
          />

          <Input
            label="Merchant Name *"
            value={form.merchantName}
            onChangeText={(value) => updateForm('merchantName', value)}
            placeholder="e.g., Starbucks"
            error={errors.merchantName}
            style={styles.input}
          />

          <Input
            label="Date *"
            value={form.date}
            onChangeText={(value) => updateForm('date', value)}
            placeholder="YYYY-MM-DD"
            error={errors.date}
            style={styles.input}
          />

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Notes (Optional)</Text>
            <TextInput
              style={styles.notesInput}
              value={form.notes}
              onChangeText={(value) => updateForm('notes', value)}
              placeholder="Add any additional notes..."
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>
        </Card>

        {renderCategorySelector()}
        {renderMerchantCategorySelector()}

        <View style={styles.buttonContainer}>
          <Button
            title="Cancel"
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}
            textStyle={styles.cancelButtonText}
          />
          <Button
            title={loading ? 'Adding...' : 'Add Transaction'}
            onPress={handleSubmit}
            disabled={loading}
            style={styles.submitButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    paddingVertical: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '500',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  headerSpacer: {
    width: 50,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  formCard: {
    marginBottom: 16,
  },
  toggleCard: {
    marginBottom: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleInfo: {
    flex: 1,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  toggleDescription: {
    fontSize: 14,
    color: '#666666',
  },
  selectorCard: {
    marginBottom: 16,
  },
  selectorLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  categoryOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedCategoryOption: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  categoryOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  selectedCategoryOptionText: {
    color: '#FFFFFF',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  input: {
    marginBottom: 16,
  },
  amountInput: {
    marginBottom: 16,
  },
  notesInput: {
    height: 80,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  errorText: {
    fontSize: 12,
    color: '#D32F2F',
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginBottom: 32,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cancelButtonText: {
    color: '#666666',
  },
  submitButton: {
    flex: 1,
  },
});

export default AddTransactionScreen;