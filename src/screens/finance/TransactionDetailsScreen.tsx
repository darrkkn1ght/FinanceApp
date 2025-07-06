import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
} from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';

import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { transactionService } from '../../services/api/transactionService';
import { Transaction } from '../../types/transaction';
import { MainStackParamList } from '../../types/navigation';

interface TransactionDetailsScreenProps {
  navigation: NavigationProp<MainStackParamList, 'TransactionDetails'>;
  route: RouteProp<MainStackParamList, 'TransactionDetails'>;
}

export const TransactionDetailsScreen: React.FC<TransactionDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const { transactionId } = route.params;
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransaction();
  }, [transactionId]);

  const loadTransaction = async () => {
    try {
      setLoading(true);
      const response = await transactionService.getTransactionById(transactionId);
      
      if (response.success) {
        setTransaction(response.data);
      } else {
        Alert.alert('Error', response.error || 'Failed to load transaction');
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load transaction');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    Alert.alert('Coming Soon', 'Transaction editing will be implemented soon');
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: confirmDelete,
        },
      ]
    );
  };

  const confirmDelete = async () => {
    if (!transaction) return;

    try {
      const response = await transactionService.deleteTransaction(transaction.id);
      
      if (response.success) {
        Alert.alert(
          'Success',
          'Transaction deleted successfully',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      } else {
        Alert.alert('Error', response.error || 'Failed to delete transaction');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to delete transaction');
    }
  };

  const handleShare = async () => {
    if (!transaction) return;

    const shareContent = `Transaction Details
Amount: $${Math.abs(transaction.amount).toFixed(2)} (${transaction.amount > 0 ? 'Income' : 'Expense'})
Description: ${transaction.description}
Merchant: ${transaction.merchant.name}
Category: ${transaction.category}
Date: ${formatDate(transaction.date)}
${transaction.notes ? `Notes: ${transaction.notes}` : ''}`;

    try {
      await Share.share({
        message: shareContent,
        title: 'Transaction Details',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share transaction details');
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatAmount = (amount: number): string => {
    return amount > 0 ? `+$${amount.toFixed(2)}` : `-$${Math.abs(amount).toFixed(2)}`;
  };

  const getAmountColor = (amount: number): string => {
    return amount > 0 ? '#2E7D32' : '#D32F2F';
  };

  const getCategoryLabel = (category: string): string => {
    const categoryMap: { [key: string]: string } = {
      dining: 'Dining & Food',
      transport: 'Transportation',
      shopping: 'Shopping',
      entertainment: 'Entertainment',
      utilities: 'Utilities',
      health: 'Health & Fitness',
      education: 'Education',
      income: 'Income',
      other: 'Other',
    };
    return categoryMap[category] || category;
  };

  const getMerchantCategoryLabel = (category: string): string => {
    const categoryMap: { [key: string]: string } = {
      restaurant: 'Restaurant',
      gas_station: 'Gas Station',
      grocery_store: 'Grocery Store',
      retail: 'Retail Store',
      online: 'Online Purchase',
      service: 'Service Provider',
      other: 'Other',
    };
    return categoryMap[category] || category;
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Transaction Details</Text>
      <TouchableOpacity
        style={styles.shareButton}
        onPress={handleShare}
      >
        <Text style={styles.shareButtonText}>Share</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAmountCard = () => (
    <Card style={styles.amountCard}>
      <View style={styles.amountContainer}>
        <Text style={styles.amountLabel}>
          {transaction!.amount > 0 ? 'Income' : 'Expense'}
        </Text>
        <Text style={[styles.amount, { color: getAmountColor(transaction!.amount) }]}>
          {formatAmount(transaction!.amount)}
        </Text>
      </View>
    </Card>
  );

  const renderTransactionInfo = () => (
    <Card style={styles.infoCard}>
      <Text style={styles.sectionTitle}>Transaction Information</Text>
      
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Description</Text>
        <Text style={styles.infoValue}>{transaction!.description}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Category</Text>
        <Text style={styles.infoValue}>{getCategoryLabel(transaction!.category)}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Date & Time</Text>
        <Text style={styles.infoValue}>{formatDate(transaction!.date)}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Transaction ID</Text>
        <Text style={styles.infoValue}>{transaction!.id}</Text>
      </View>
    </Card>
  );

  const renderMerchantInfo = () => (
    <Card style={styles.infoCard}>
      <Text style={styles.sectionTitle}>Merchant Information</Text>
      
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Merchant Name</Text>
        <Text style={styles.infoValue}>{transaction!.merchant.name}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Merchant Category</Text>
        <Text style={styles.infoValue}>
          {getMerchantCategoryLabel(transaction!.merchant.category)}
        </Text>
      </View>
    </Card>
  );

  const renderNotesCard = () => {
    if (!transaction!.notes) return null;

    return (
      <Card style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Notes</Text>
        <Text style={styles.notesText}>{transaction!.notes}</Text>
      </Card>
    );
  };

  const renderActionButtons = () => (
    <View style={styles.buttonContainer}>
      <Button
        title="Edit"
        onPress={handleEdit}
        style={styles.editButton}
      />
      <Button
        title="Delete"
        onPress={handleDelete}
        style={styles.deleteButton}
        textStyle={styles.deleteButtonText}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner size="large" />
        <Text style={styles.loadingText}>Loading transaction...</Text>
      </View>
    );
  }

  if (!transaction) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Transaction not found</Text>
        <Button
          title="Go Back"
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderAmountCard()}
        {renderTransactionInfo()}
        {renderMerchantInfo()}
        {renderNotesCard()}
        {renderActionButtons()}
      </ScrollView>
    </View>
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
  shareButton: {
    paddingVertical: 8,
  },
  shareButtonText: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  amountCard: {
    marginBottom: 16,
    alignItems: 'center',
    paddingVertical: 24,
  },
  amountContainer: {
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
    marginBottom: 8,
  },
  amount: {
    fontSize: 36,
    fontWeight: '700',
  },
  infoCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1A1A1A',
    flex: 2,
    textAlign: 'right',
  },
  notesText: {
    fontSize: 14,
    color: '#1A1A1A',
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginBottom: 32,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#2196F3',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#D32F2F',
  },
  deleteButtonText: {
    color: '#D32F2F',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
    marginTop: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 32,
  },
  errorText: {
    fontSize: 18,
    color: '#D32F2F',
    marginBottom: 24,
    textAlign: 'center',
  },
  goBackButton: {
    paddingHorizontal: 32,
  },
});

export default TransactionDetailsScreen;
