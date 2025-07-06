// src/components/ai/AIRecommendation.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface AIRecommendationProps {
  title: string;
  description: string;
  type: 'tip' | 'warning' | 'opportunity' | 'achievement';
  impact: 'high' | 'medium' | 'low';
  timeframe: string;
  actionItems?: string[];
  onAccept?: () => void;
  onDismiss?: () => void;
  onViewDetails?: () => void;
}

export const AIRecommendation: React.FC<AIRecommendationProps> = ({
  title,
  description,
  type,
  impact,
  timeframe,
  actionItems = [],
  onAccept,
  onDismiss,
  onViewDetails
}) => {
  const getTypeConfig = () => {
    switch (type) {
      case 'tip':
        return {
          icon: '💡',
          color: '#007AFF',
          backgroundColor: '#E3F2FD',
          borderColor: '#007AFF',
        };
      case 'warning':
        return {
          icon: '⚠️',
          color: '#FF9500',
          backgroundColor: '#FFF3E0',
          borderColor: '#FF9500',
        };
      case 'opportunity':
        return {
          icon: '🚀',
          color: '#34C759',
          backgroundColor: '#E8F5E8',
          borderColor: '#34C759',
        };
      case 'achievement':
        return {
          icon: '🏆',
          color: '#AF52DE',
          backgroundColor: '#F3E5F5',
          borderColor: '#AF52DE',
        };
      default:
        return {
          icon: '📊',
          color: '#007AFF',
          backgroundColor: '#E3F2FD',
          borderColor: '#007AFF',
        };
    }
  };

  const getImpactColor = () => {
    switch (impact) {
      case 'high':
        return '#FF3B30';
      case 'medium':
        return '#FF9500';
      case 'low':
        return '#34C759';
      default:
        return '#007AFF';
    }
  };

  const typeConfig = getTypeConfig();

  return (
    <View style={[styles.container, { borderLeftColor: typeConfig.borderColor }]}>
      <View style={styles.header}>
        <View style={styles.typeContainer}>
          <View style={[styles.iconContainer, { backgroundColor: typeConfig.backgroundColor }]}>
            <Text style={styles.icon}>{typeConfig.icon}</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={[styles.typeText, { color: typeConfig.color }]}>
              {type.toUpperCase()}
            </Text>
            <Text style={styles.timeframe}>{timeframe}</Text>
          </View>
        </View>
        <View style={[styles.impactBadge, { backgroundColor: getImpactColor() }]}>
          <Text style={styles.impactText}>{impact.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        
        {actionItems.length > 0 && (
          <View style={styles.actionItemsContainer}>
            <Text style={styles.actionItemsTitle}>Recommended Actions:</Text>
            {actionItems.map((item, index) => (
              <View key={index} style={styles.actionItem}>
                <Text style={styles.actionItemBullet}>•</Text>
                <Text style={styles.actionItemText}>{item}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={onViewDetails}
          activeOpacity={0.7}
        >
          <Text style={styles.detailsButtonText}>View Details</Text>
        </TouchableOpacity>
        
        <View style={styles.actionButtons}>
          {onDismiss && (
            <TouchableOpacity
              style={styles.dismissButton}
              onPress={onDismiss}
              activeOpacity={0.7}
            >
              <Text style={styles.dismissButtonText}>Dismiss</Text>
            </TouchableOpacity>
          )}
          {onAccept && (
            <TouchableOpacity
              style={[styles.acceptButton, { backgroundColor: typeConfig.color }]}
              onPress={onAccept}
              activeOpacity={0.7}
            >
              <Text style={styles.acceptButtonText}>Accept</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 16,
  },
  headerInfo: {
    flex: 1,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  timeframe: {
    fontSize: 11,
    color: '#666666',
    fontWeight: '500',
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  impactText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  content: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
    lineHeight: 22,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 12,
  },
  actionItemsContainer: {
    marginTop: 8,
  },
  actionItemsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  actionItemBullet: {
    fontSize: 14,
    color: '#666666',
    marginRight: 8,
    marginTop: 2,
  },
  actionItemText: {
    fontSize: 13,
    color: '#666666',
    flex: 1,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  detailsButtonText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  dismissButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  dismissButtonText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '600',
  },
  acceptButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  acceptButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default AIRecommendation;