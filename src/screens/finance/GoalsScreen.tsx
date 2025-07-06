import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { GoalCard } from '../../components/finance/GoalCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { BudgetGoal, Priority, GoalType, GoalStatus } from '../../types/budget';
import { MainStackParamList } from '../../types/navigation';

const { width } = Dimensions.get('window');

interface GoalsScreenProps {
  navigation: NavigationProp<MainStackParamList, 'Goals'>;
}

export const GoalsScreen: React.FC<GoalsScreenProps> = ({ navigation: _navigation }) => {
  const [goals, setGoals] = useState<BudgetGoal[]>([]);
  const [_categories, setCategories] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'completed' | 'paused'>('all');

  useEffect(() => {
    loadGoalData();
  }, []);

  const loadGoalData = async () => {
    try {
      // For now, we'll use mock data since goalService doesn't exist
      // In a real app, you would call goalService.getGoals() and goalService.getGoalCategories()
      const mockGoals: BudgetGoal[] = [
        {
          id: '1',
          title: 'Emergency Fund',
          description: 'Save 6 months of expenses',
          targetAmount: 15000,
          currentAmount: 8000,
          progressPercentage: 53.3,
          targetDate: '2024-12-31',
          priority: Priority.HIGH,
          category: 'savings',
          type: GoalType.SAVINGS,
          status: GoalStatus.IN_PROGRESS,
          milestones: [],
          contributions: [],
          estimatedCompletionDate: '2024-10-15',
          monthlyTarget: 1000,
          isAutomatic: true,
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
        },
        {
          id: '2',
          title: 'Vacation Fund',
          description: 'Save for summer vacation',
          targetAmount: 5000,
          currentAmount: 3200,
          progressPercentage: 64,
          targetDate: '2024-06-30',
          priority: Priority.MEDIUM,
          category: 'savings',
          type: GoalType.SAVINGS,
          status: GoalStatus.ON_TRACK,
          milestones: [],
          contributions: [],
          estimatedCompletionDate: '2024-05-15',
          monthlyTarget: 500,
          isAutomatic: true,
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
        },
      ];

      setGoals(mockGoals);
      setCategories([]);
    } catch (_error) {
      Alert.alert('Error', 'Something went wrong while loading goals');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadGoalData();
  };

  const handleCreateGoal = () => {
    Alert.alert('Coming Soon', 'Goal creation will be implemented soon');
  };

  const _handleEditGoal = (_goal: BudgetGoal) => {
    Alert.alert('Coming Soon', 'Goal editing will be implemented soon');
  };

  const handleGoalDetails = (_goal: BudgetGoal) => {
    Alert.alert('Coming Soon', 'Goal details will be implemented soon');
  };

  const _handleDeleteGoal = (goalId: string) => {
    Alert.alert(
      'Delete Goal',
      'Are you sure you want to delete this goal?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            // For now, just remove from local state
            setGoals(goals.filter(g => g.id !== goalId));
            Alert.alert('Success', 'Goal deleted successfully');
          },
        },
      ]
    );
  };

  const handleAddContribution = (_goalId: string) => {
    Alert.alert('Coming Soon', 'Add contribution will be implemented soon');
  };

  const _handlePauseGoal = async (goalId: string) => {
    // For now, just update local state
    setGoals(goals.map(g => 
      g.id === goalId ? { ...g, status: GoalStatus.PAUSED } : g
    ));
    Alert.alert('Success', 'Goal paused successfully');
  };

  const _handleResumeGoal = async (goalId: string) => {
    // For now, just update local state
    setGoals(goals.map(g => 
      g.id === goalId ? { ...g, status: GoalStatus.IN_PROGRESS } : g
    ));
    Alert.alert('Success', 'Goal resumed successfully');
  };

  const getFilteredGoals = () => {
    if (selectedFilter === 'all') return goals;
    return goals.filter(goal => goal.status === selectedFilter);
  };

  const getGoalStats = () => {
    const total = goals.length;
    const active = goals.filter(g => g.status === 'in_progress' || g.status === 'on_track').length;
    const completed = goals.filter(g => g.status === 'completed').length;
    const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
    const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
    
    return { total, active, completed, totalSaved, totalTarget };
  };

  const renderFilterTabs = () => {
    const filters = [
      { key: 'all', label: 'All', count: goals.length },
      { key: 'active', label: 'Active', count: goals.filter(g => g.status === 'in_progress' || g.status === 'on_track').length },
      { key: 'completed', label: 'Completed', count: goals.filter(g => g.status === 'completed').length },
      { key: 'paused', label: 'Paused', count: goals.filter(g => g.status === 'paused').length },
    ] as const;

    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterTabs}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterTab,
              selectedFilter === filter.key && styles.filterTabActive,
            ]}
            onPress={() => setSelectedFilter(filter.key)}
          >
            <Text
              style={[
                styles.filterTabText,
                selectedFilter === filter.key && styles.filterTabTextActive,
              ]}
            >
              {filter.label}
            </Text>
            <Text
              style={[
                styles.filterTabCount,
                selectedFilter === filter.key && styles.filterTabCountActive,
              ]}
            >
              {filter.count}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderGoalStats = () => {
    const stats = getGoalStats();
    const progressPercentage = stats.totalTarget > 0 ? (stats.totalSaved / stats.totalTarget) * 100 : 0;

    return (
      <Card style={styles.statsCard}>
        <Text style={styles.statsTitle}>Goal Progress</Text>
        <View style={styles.statsContent}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total Goals</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.active}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.completed}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>
        <View style={styles.progressSection}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>
              ${stats.totalSaved.toFixed(2)} of ${stats.totalTarget.toFixed(2)}
            </Text>
            <Text style={styles.progressPercentage}>
              {progressPercentage.toFixed(1)}% Complete
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.min(progressPercentage, 100)}%` },
              ]}
            />
          </View>
        </View>
      </Card>
    );
  };

  const renderGoalItem = (goal: BudgetGoal) => (
    <GoalCard
      key={goal.id}
      id={goal.id}
      title={goal.title}
      targetAmount={goal.targetAmount}
      currentAmount={goal.currentAmount}
      targetDate={goal.targetDate}
      category={goal.category}
      priority={goal.priority === Priority.HIGH ? 'high' : goal.priority === Priority.MEDIUM ? 'medium' : 'low'}
      onPress={() => handleGoalDetails(goal)}
      onAddFunds={() => handleAddContribution(goal.id)}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="flag-outline" size={64} color="#CCCCCC" />
      <Text style={styles.emptyStateTitle}>
        {selectedFilter === 'all' ? 'No Goals Yet' : `No ${selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)} Goals`}
      </Text>
      <Text style={styles.emptyStateDescription}>
        {selectedFilter === 'all' 
          ? 'Create your first savings goal to start building your future'
          : `You don't have any ${selectedFilter} goals at the moment`
        }
      </Text>
      {selectedFilter === 'all' && (
        <Button
          title="Create Goal"
          onPress={handleCreateGoal}
          style={styles.emptyStateButton}
        />
      )}
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.quickActions}>
      <TouchableOpacity style={styles.quickAction} onPress={handleCreateGoal}>
        <Ionicons name="add-circle" size={24} color="#2E7D32" />
        <Text style={styles.quickActionText}>New Goal</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.quickAction} 
        onPress={() => Alert.alert('Coming Soon', 'Goal insights will be implemented soon')}
      >
        <Ionicons name="bar-chart" size={24} color="#2196F3" />
        <Text style={styles.quickActionText}>Insights</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.quickAction} 
        onPress={() => Alert.alert('Coming Soon', 'Goal templates will be implemented soon')}
      >
        <Ionicons name="document-text" size={24} color="#FF9800" />
        <Text style={styles.quickActionText}>Templates</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner />
      </View>
    );
  }

  const filteredGoals = getFilteredGoals();

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {goals.length > 0 && renderGoalStats()}
        {renderFilterTabs()}
        {renderQuickActions()}
        
        {filteredGoals.length > 0 ? (
          <View style={styles.goalsList}>
            {filteredGoals.map(renderGoalItem)}
          </View>
        ) : (
          renderEmptyState()
        )}
      </ScrollView>

      <View style={styles.floatingButton}>
        <TouchableOpacity
          style={styles.fab}
          onPress={handleCreateGoal}
        >
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  statsCard: {
    margin: 16,
    marginBottom: 8,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  statsContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  progressSection: {
    marginTop: 8,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#1A1A1A',
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E7D32',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E8F5E8',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2E7D32',
    borderRadius: 4,
  },
  filterTabs: {
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  filterTabActive: {
    backgroundColor: '#2E7D32',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginRight: 6,
  },
  filterTabTextActive: {
    color: '#FFFFFF',
  },
  filterTabCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 18,
    textAlign: 'center',
  },
  filterTabCountActive: {
    color: '#2E7D32',
    backgroundColor: '#FFFFFF',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  quickAction: {
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    minWidth: (width - 64) / 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 4,
  },
  goalsList: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  goalItem: {
    marginBottom: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
    minHeight: 300,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  emptyStateButton: {
    minWidth: 160,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  fab: {
    backgroundColor: '#2E7D32',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});