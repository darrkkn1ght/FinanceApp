// src/navigation/TabNavigator.tsx
import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { TabStackParamList } from '../types/navigation';
import { 
  DashboardScreen, 
  TransactionsScreen, 
  AnalyticsScreen, 
  InvestmentsScreen, 
  AICoachScreen 
} from '../screens/main';

const Tab = createBottomTabNavigator<TabStackParamList>();

export const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: '#757575',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          height: Platform.OS === 'ios' ? 90 : 65,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          paddingTop: 10,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Icon name="dashboard" size={size} color={color} />
          ),
        }}
      />
      
      <Tab.Screen 
        name="Transactions" 
        component={TransactionsScreen}
        options={{
          tabBarLabel: 'Transactions',
          tabBarIcon: ({ color, size }) => (
            <Icon name="receipt-long" size={size} color={color} />
          ),
          tabBarBadge: undefined, // Can be used to show unread count
        }}
      />
      
      <Tab.Screen 
        name="Analytics" 
        component={AnalyticsScreen}
        options={{
          tabBarLabel: 'Analytics',
          tabBarIcon: ({ color, size }) => (
            <Icon name="analytics" size={size} color={color} />
          ),
        }}
      />
      
      <Tab.Screen 
        name="Investments" 
        component={InvestmentsScreen}
        options={{
          tabBarLabel: 'Investments',
          tabBarIcon: ({ color, size }) => (
            <Icon name="trending-up" size={size} color={color} />
          ),
        }}
      />
      
      <Tab.Screen 
        name="AICoach" 
        component={AICoachScreen}
        options={{
          tabBarLabel: 'AI Coach',
          tabBarIcon: ({ color, size }) => (
            <Icon name="psychology" size={size} color={color} />
          ),
          tabBarBadge: undefined, // Can be used to show new insights
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;