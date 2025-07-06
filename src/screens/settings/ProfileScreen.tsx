import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { MainStackParamList } from '../../types/navigation';

interface ProfileScreenProps {
  navigation: NavigationProp<MainStackParamList>;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation: _navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-01-15',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
  });

  const handleSave = () => {
    Alert.alert(
      'Profile Updated',
      'Your profile has been updated successfully.',
      [
        {
          text: 'OK',
          onPress: () => setIsEditing(false),
        },
      ]
    );
  };

  const _handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values
    setFormData({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      dateOfBirth: '1990-01-15',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
    });
  };

  const handleChangePhoto = () => {
    Alert.alert(
      'Change Photo',
      'Select an option',
      [
        { text: 'Take Photo', onPress: () => {} },
        { text: 'Choose from Library', onPress: () => {} },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const ProfileField: React.FC<{
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    keyboardType?: 'default' | 'email-address' | 'phone-pad';
    multiline?: boolean;
  }> = ({ label, value, onChangeText, keyboardType = 'default', multiline = false }) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {isEditing ? (
        <Input
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          multiline={multiline}
          style={styles.fieldInput}
        />
      ) : (
        <Text style={styles.fieldValue}>{value || 'Not provided'}</Text>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <Card style={styles.card}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
              </Text>
            </View>
            {isEditing && (
              <TouchableOpacity
                style={styles.changePhotoButton}
                onPress={handleChangePhoto}
                activeOpacity={0.7}
              >
                <Text style={styles.changePhotoText}>Change Photo</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {formData.firstName} {formData.lastName}
            </Text>
            <Text style={styles.profileEmail}>{formData.email}</Text>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(!isEditing)}
            activeOpacity={0.7}
          >
            <Text style={styles.editButtonText}>
              {isEditing ? 'Cancel' : 'Edit'}
            </Text>
          </TouchableOpacity>
        </View>
      </Card>

      {/* Personal Information */}
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        
        <ProfileField
          label="First Name"
          value={formData.firstName}
          onChangeText={(text) => setFormData({ ...formData, firstName: text })}
        />
        
        <ProfileField
          label="Last Name"
          value={formData.lastName}
          onChangeText={(text) => setFormData({ ...formData, lastName: text })}
        />
        
        <ProfileField
          label="Email Address"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
        />
        
        <ProfileField
          label="Phone Number"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          keyboardType="phone-pad"
        />
        
        <ProfileField
          label="Date of Birth"
          value={formData.dateOfBirth}
          onChangeText={(text) => setFormData({ ...formData, dateOfBirth: text })}
        />
      </Card>

      {/* Address Information */}
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Address Information</Text>
        
        <ProfileField
          label="Street Address"
          value={formData.address}
          onChangeText={(text) => setFormData({ ...formData, address: text })}
        />
        
        <ProfileField
          label="City"
          value={formData.city}
          onChangeText={(text) => setFormData({ ...formData, city: text })}
        />
        
        <View style={styles.rowContainer}>
          <View style={styles.halfWidth}>
            <ProfileField
              label="State"
              value={formData.state}
              onChangeText={(text) => setFormData({ ...formData, state: text })}
            />
          </View>
          <View style={styles.halfWidth}>
            <ProfileField
              label="ZIP Code"
              value={formData.zipCode}
              onChangeText={(text) => setFormData({ ...formData, zipCode: text })}
            />
          </View>
        </View>
        
        <ProfileField
          label="Country"
          value={formData.country}
          onChangeText={(text) => setFormData({ ...formData, country: text })}
        />
      </Card>

      {/* Account Statistics */}
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Account Statistics</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>127</Text>
            <Text style={styles.statLabel}>Transactions</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Linked Accounts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Goals</Text>
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>2.5 years</Text>
            <Text style={styles.statLabel}>Member Since</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>98%</Text>
            <Text style={styles.statLabel}>Budget Accuracy</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>$12,450</Text>
            <Text style={styles.statLabel}>Total Saved</Text>
          </View>
        </View>
      </Card>

      {/* Account Actions */}
      <Card style={styles.card}>
        <Text style={styles.sectionTitle}>Account Actions</Text>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => Alert.alert('Change Password', 'Password change will be implemented')}
          activeOpacity={0.7}
        >
          <Text style={styles.actionButtonText}>Change Password</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => Alert.alert('Download Data', 'Data download will be implemented')}
          activeOpacity={0.7}
        >
          <Text style={styles.actionButtonText}>Download My Data</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.dangerButton]}
          onPress={() => Alert.alert('Delete Account', 'Are you sure you want to delete your account?')}
          activeOpacity={0.7}
        >
          <Text style={[styles.actionButtonText, styles.dangerButtonText]}>
            Delete Account
          </Text>
        </TouchableOpacity>
      </Card>

      {/* Save Button */}
      {isEditing && (
        <View style={styles.saveButtonContainer}>
          <Button
            title="Save Changes"
            onPress={handleSave}
            style={styles.saveButton}
          />
        </View>
      )}

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  card: {
    margin: 16,
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  avatarContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  changePhotoButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  changePhotoText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666666',
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 6,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  fieldValue: {
    fontSize: 16,
    color: '#333333',
    paddingVertical: 8,
  },
  fieldInput: {
    marginBottom: 0,
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  halfWidth: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4CAF50',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  actionButton: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4CAF50',
  },
  dangerButton: {
    borderBottomWidth: 0,
  },
  dangerButtonText: {
    color: '#FF5252',
  },
  saveButtonContainer: {
    margin: 16,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  bottomSpacing: {
    height: 20,
  },
});

export default ProfileScreen;