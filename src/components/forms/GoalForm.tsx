import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Card } from '../common/Card';

interface GoalFormProps {
  onSubmit: (goal: GoalFormData) => void;
  onCancel: () => void;
  initialData?: Partial<GoalFormData>;
  isEditing?: boolean;
}

export interface GoalFormData {
  id?: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  category: string;
  priority: 'low' | 'medium' | 'high';
  targetDate: string;
  description?: string;
  isActive: boolean;
}

const goalCategories = [
  { id: 'emergency', name: 'Emergency Fund', icon: '🚨' },
  { id: 'vacation', name: 'Vacation', icon: '🏖️' },
  { id: 'home', name: 'Home Purchase', icon: '🏠' },
  { id: 'car', name: 'Car Purchase', icon: '🚗' },
  { id: 'education', name: 'Education', icon: '🎓' },
  { id: 'retirement', name: 'Retirement', icon: '👴' },
  { id: 'investment', name: 'Investment', icon: '📈' },
  { id: 'debt', name: 'Debt Payoff', icon: '💳' },
  { id: 'wedding', name: 'Wedding', icon: '💒' },
  { id: 'other', name: 'Other', icon: '🎯' },
];

const priorityLevels = [
  { value: 'low', label: 'Low', color: '#4CAF50' },
  { value: 'medium', label: 'Medium', color: '#FF9800' },
  { value: 'high', label: 'High', color: '#F44336' },
];

export const GoalForm: React.FC<GoalFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<GoalFormData>({
    name: initialData?.name || '',
    targetAmount: initialData?.targetAmount || 0,
    currentAmount: initialData?.currentAmount || 0,
    category: initialData?.category || 'emergency',
    priority: initialData?.priority || 'medium',
    targetDate: initialData?.targetDate || new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    description: initialData?.description || '',
    isActive: initialData?.isActive ?? true,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof GoalFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof GoalFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Goal name is required';
    }

    if (!formData.targetAmount || formData.targetAmount <= 0) {
      newErrors.targetAmount = 'Target amount must be greater than 0';
    }

    if (formData.currentAmount < 0) {
      newErrors.currentAmount = 'Current amount cannot be negative';
    }

    if (formData.currentAmount > formData.targetAmount) {
      newErrors.currentAmount = 'Current amount cannot exceed target amount';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.targetDate) {
      newErrors.targetDate = 'Target date is required';
    }

    if (formData.targetDate && new Date(formData.targetDate) <= new Date()) {
      newErrors.targetDate = 'Target date must be in the future';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fix the errors and try again');
      return;
    }

    const goalData: GoalFormData = {
      ...formData,
      id: initialData?.id || `goal_${Date.now()}`,
    };

    onSubmit(goalData);
  };

  const updateFormData = (field: keyof GoalFormData, value: string | number | boolean) => {
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

  const calculateProgress = (): number => {
    if (formData.targetAmount === 0) return 0;
    return Math.min((formData.currentAmount / formData.targetAmount) * 100, 100);
  };

  const calculateTimeRemaining = (): string => {
    if (!formData.targetDate) return '';
    
    const targetDate = new Date(formData.targetDate);
    const currentDate = new Date();
    const timeDiff = targetDate.getTime() - currentDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    if (daysDiff <= 0) return 'Past due';
    if (daysDiff === 1) return '1 day remaining';
    if (daysDiff <= 30) return `${daysDiff} days remaining`;
    if (daysDiff <= 365) return `${Math.round(daysDiff / 30)} months remaining`;
    return `${Math.round(daysDiff / 365)} years remaining`;
  };

  const renderCategorySelector = () => (
    <View style={styles.selectorContainer}>
      <Text style={styles.selectorLabel}>Category</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {goalCategories.map((category) => (
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

  const renderPrioritySelector = () => (
    <View style={styles.selectorContainer}>
      <Text style={styles.selectorLabel}>Priority</Text>
      <View style={styles.priorityContainer}>
        {priorityLevels.map((priority) => (
          <TouchableOpacity
            key={priority.value}
            style={[
              styles.priorityButton,
              formData.priority === priority.value && styles.priorityButtonActive,
              { borderColor: priority.color },
            ]}
            onPress={() => updateFormData('priority', priority.value)}
          >
            <View style={[
              styles.priorityIndicator,
              { backgroundColor: priority.color },
            ]} />
            <Text style={[
              styles.priorityText,
              formData.priority === priority.value && styles.priorityTextActive,
            ]}>
              {priority.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderProgressPreview = () => {
    const progress = calculateProgress();
    const timeRemaining = calculateTimeRemaining();
    
    return (
      <Card style={styles.progressCard}>
        <Text style={styles.progressTitle}>Goal Progress Preview</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{progress.toFixed(1)}% Complete</Text>
        </View>
        <View style={styles.progressDetails}>
          <View style={styles.progressDetail}>
            <Text style={styles.progressDetailLabel}>Current</Text>
            <Text style={styles.progressDetailValue}>${formData.currentAmount.toFixed(2)}</Text>
          </View>
          <View style={styles.progressDetail}>
            <Text style={styles.progressDetailLabel}>Target</Text>
            <Text style={styles.progressDetailValue}>${formData.targetAmount.toFixed(2)}</Text>
          </View>
          <View style={styles.progressDetail}>
            <Text style={styles.progressDetailLabel}>Remaining</Text>
            <Text style={styles.progressDetailValue}>${(formData.targetAmount - formData.currentAmount).toFixed(2)}</Text>
          </View>
        </View>
        {timeRemaining && (
          <Text style={styles.timeRemaining}>{timeRemaining}</Text>
        )}
      </Card>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Card style={styles.formCard}>
        <Text style={styles.title}>
          {isEditing ? 'Edit Goal' : 'Create New Goal'}
        </Text>

        <Input
          label="Goal Name"
          value={formData.name}
          onChangeText={(text) => updateFormData('name', text)}
          placeholder="Enter goal name"
          error={errors.name}
        />

        <Input
          label="Target Amount"
          value={formData.targetAmount.toString()}
          onChangeText={(text) => updateFormData('targetAmount', parseFloat(text) || 0)}
          placeholder="$0.00"
          keyboardType="numeric"
          error={errors.targetAmount}
        />

        <Input
          label="Current Amount"
          value={formData.currentAmount.toString()}
          onChangeText={(text) => updateFormData('currentAmount', parseFloat(text) || 0)}
          placeholder="$0.00"
          keyboardType="numeric"
          error={errors.currentAmount}
        />

        {renderCategorySelector()}

        {renderPrioritySelector()}

        <Input
          label="Target Date"
          value={formData.targetDate}
          onChangeText={(text) => updateFormData('targetDate', text)}
          placeholder="YYYY-MM-DD"
          error={errors.targetDate}
        />

        <Input
          label="Description (Optional)"
          value={formData.description || ''}
          onChangeText={(text) => updateFormData('description', text)}
          placeholder="Add notes about this goal..."
          multiline
          numberOfLines={3}
          style={styles.descriptionInput}
        />

        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Goal Status</Text>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              formData.isActive && styles.toggleButtonActive,
            ]}
            onPress={() => updateFormData('isActive', !formData.isActive)}
          >
            <Text style={[
              styles.toggleText,
              formData.isActive && styles.toggleTextActive,
            ]}>
              {formData.isActive ? 'Active' : 'Inactive'}
            </Text>
          </TouchableOpacity>
        </View>

        {renderProgressPreview()}

        <View style={styles.buttonContainer}>
          <Button
            title="Cancel"
            onPress={onCancel}
            variant="outline"
            style={styles.cancelButton}
          />
          <Button
            title={isEditing ? 'Update Goal' : 'Create Goal'}
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
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  priorityButtonActive: {
    backgroundColor: '#FFF',
  },
  priorityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  priorityTextActive: {
    color: '#1A1A1A',
    fontWeight: '600',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  toggleButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  toggleButtonActive: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  toggleTextActive: {
    color: '#2196F3',
    fontWeight: '600',
  },
  progressCard: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#F8F9FA',
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
    textAlign: 'center',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
    textAlign: 'center',
  },
  progressDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressDetail: {
    alignItems: 'center',
  },
  progressDetailLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  progressDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  timeRemaining: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FF9800',
    textAlign: 'center',
    marginTop: 8,
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

export default GoalForm;