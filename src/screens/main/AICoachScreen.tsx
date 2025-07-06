import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp } from '@react-navigation/native';

import AIInsightCard from '../../components/ai/AIInsightCard';
import AIRecommendation from '../../components/ai/AIRecommendation';
import ChatInterface from '../../components/ai/ChatInterface';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { aiService } from '../../services/api/aiService';
import { AIInsight, AIRecommendation as AIRecommendationType, ChatMessage } from '../../types/ai';
import { TabStackParamList } from '../../types/navigation';

interface AICoachScreenProps {
  navigation: NavigationProp<TabStackParamList, 'AICoach'>;
}

type TabType = 'insights' | 'recommendations' | 'chat';

export const AICoachScreen: React.FC<AICoachScreenProps> = ({ navigation: _navigation }) => {
  const [activeTab, setActiveTab] = useState<TabType>('insights');
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [recommendations, setRecommendations] = useState<AIRecommendationType[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [insightsResponse, recommendationsResponse, chatResponse] = await Promise.all([
        aiService.getInsights(),
        aiService.getRecommendations(),
        aiService.getChatHistory(),
      ]);

      if (insightsResponse.success) {
        setInsights(insightsResponse.data);
      }

      if (recommendationsResponse.success) {
        setRecommendations(recommendationsResponse.data);
      }

      if (chatResponse.success) {
        setChatMessages(chatResponse.data);
      }
    } catch (error) {
      console.error('Error loading AI data:', error);
      Alert.alert('Error', 'Failed to load AI insights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadInitialData();
    setRefreshing(false);
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      content: chatInput.trim(),
      role: 'user',
      timestamp: new Date().toISOString(),
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setSendingMessage(true);

    try {
      const response = await aiService.sendChatMessage(chatInput.trim());
      
      if (response.success) {
        setChatMessages(prev => [...prev, response.data]);
      } else {
        Alert.alert('Error', 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Failed to send message. Please try again.');
    } finally {
      setSendingMessage(false);
    }
  };

  const handleInsightAction = (_insight: AIInsight) => {
    Alert.alert('AI Insight', 'Action will be implemented soon');
  };

  const handleRecommendationAction = (_recommendation: AIRecommendationType) => {
    Alert.alert('AI Recommendation', 'Action will be implemented soon');
  };

  const renderTabButton = (tab: TabType, label: string) => (
    <TouchableOpacity
      style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
      onPress={() => setActiveTab(tab)}
    >
      <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderInsights = () => (
    <FlatList
      data={insights}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <AIInsightCard
          title={item.title}
          description={item.description}
          category={item.type as 'spending' | 'saving' | 'investment' | 'budget' | 'goal'}
          priority={item.priority}
          actionText="View Details"
          onActionPress={() => handleInsightAction(item)}
        />
      )}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    />
  );

  const renderRecommendations = () => (
    <FlatList
      data={recommendations}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <AIRecommendation
          title={item.title}
          description={item.description}
          type={item.type as 'tip' | 'warning' | 'opportunity' | 'achievement'}
          impact={item.priority === 'urgent' ? 'high' : item.priority}
          timeframe={item.estimatedTime || 'Immediate'}
          actionItems={item.actionItems}
          onAccept={() => handleRecommendationAction(item)}
          onViewDetails={() => handleRecommendationAction(item)}
        />
      )}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    />
  );

  const renderChat = () => {
    // Convert AI ChatMessage to ChatInterface ChatMessage format
    const convertedMessages = chatMessages.map(msg => ({
      id: msg.id,
      text: msg.content,
      isUser: msg.role === 'user',
      timestamp: msg.timestamp,
    }));

    return (
      <View style={styles.chatContainer}>
        <ChatInterface
          messages={convertedMessages}
          onSendMessage={handleSendMessage}
          isLoading={sendingMessage}
        />
        <View style={styles.chatInputContainer}>
          <TextInput
            style={styles.chatInput}
            value={chatInput}
            onChangeText={setChatInput}
            placeholder="Ask me about your finances..."
            placeholderTextColor="#666"
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendButton, (!chatInput.trim() || sendingMessage) && styles.sendButtonDisabled]}
            onPress={handleSendMessage}
            disabled={!chatInput.trim() || sendingMessage}
          >
            <Text style={styles.sendButtonText}>
              {sendingMessage ? '...' : 'Send'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <LoadingSpinner size="large" />
          <Text style={styles.loadingText}>Loading AI insights...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Financial Coach</Text>
        <Text style={styles.subtitle}>Personalized insights and recommendations</Text>
      </View>

      <View style={styles.tabContainer}>
        {renderTabButton('insights', 'Insights')}
        {renderTabButton('recommendations', 'Recommendations')}
        {renderTabButton('chat', 'Chat')}
      </View>

      <View style={styles.content}>
        {activeTab === 'insights' && renderInsights()}
        {activeTab === 'recommendations' && renderRecommendations()}
        {activeTab === 'chat' && renderChat()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: '#2E7D32',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  listContainer: {
    padding: 20,
  },
  chatContainer: {
    flex: 1,
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  chatInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    maxHeight: 100,
    fontSize: 16,
    color: '#1A1A1A',
  },
  sendButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#CCC',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});

export default AICoachScreen;