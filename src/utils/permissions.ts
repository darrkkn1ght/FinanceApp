import { Alert, Linking } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

export interface PermissionStatus {
  granted: boolean;
  canAskAgain: boolean;
  status: string;
}

export interface PermissionResult {
  success: boolean;
  status: PermissionStatus;
  message?: string;
}

class PermissionManager {
  
  /**
   * Request notification permissions
   */
  async requestNotificationPermission(): Promise<PermissionResult> {
    try {
      const { status, canAskAgain } = await Notifications.requestPermissionsAsync();
      
      const result: PermissionResult = {
        success: status === 'granted',
        status: {
          granted: status === 'granted',
          canAskAgain,
          status,
        },
      };
      
      if (status !== 'granted') {
        result.message = 'Notification permissions are required for budget alerts and reminders.';
      }
      
      return result;
    } catch (_error) {
      return {
        success: false,
        status: {
          granted: false,
          canAskAgain: false,
          status: 'error',
        },
        message: 'Failed to request notification permissions',
      };
    }
  }

  /**
   * Request location permissions
   */
  async requestLocationPermission(): Promise<PermissionResult> {
    // Location permissions not available - return mock result
    const result: PermissionResult = {
      success: false,
      status: {
        granted: false,
        canAskAgain: false,
        status: 'unavailable',
      },
      message: 'Location permissions are not available in this version.',
    };
    
    return result;
  }

  /**
   * Request camera permissions
   */
  async requestCameraPermission(): Promise<PermissionResult> {
    try {
      const { status, canAskAgain } = await Camera.requestCameraPermissionsAsync();
      
      const result: PermissionResult = {
        success: status === 'granted',
        status: {
          granted: status === 'granted',
          canAskAgain,
          status,
        },
      };
      
      if (status !== 'granted') {
        result.message = 'Camera permissions are needed to scan receipts and capture transaction photos.';
      }
      
      return result;
    } catch (_error) {
      return {
        success: false,
        status: {
          granted: false,
          canAskAgain: false,
          status: 'error',
        },
        message: 'Failed to request camera permissions',
      };
    }
  }

  /**
   * Request photo library permissions
   */
  async requestPhotoLibraryPermission(): Promise<PermissionResult> {
    try {
      const { status, canAskAgain } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      const result: PermissionResult = {
        success: status === 'granted',
        status: {
          granted: status === 'granted',
          canAskAgain,
          status,
        },
      };
      
      if (status !== 'granted') {
        result.message = 'Photo library access is needed to attach receipt images to transactions.';
      }
      
      return result;
    } catch (_error) {
      return {
        success: false,
        status: {
          granted: false,
          canAskAgain: false,
          status: 'error',
        },
        message: 'Failed to request photo library permissions',
      };
    }
  }

  /**
   * Request contacts permissions
   */
  async requestContactsPermission(): Promise<PermissionResult> {
    // Contacts permissions not available - return mock result
    const result: PermissionResult = {
      success: false,
      status: {
        granted: false,
        canAskAgain: false,
        status: 'unavailable',
      },
      message: 'Contacts permissions are not available in this version.',
    };
    
    return result;
  }

  /**
   * Check if notification permissions are granted
   */
  async checkNotificationPermission(): Promise<boolean> {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      return status === 'granted';
    } catch {
      return false;
    }
  }

  /**
   * Check if location permissions are granted
   */
  async checkLocationPermission(): Promise<boolean> {
    // Location permissions not available
    return false;
  }

  /**
   * Check if camera permissions are granted
   */
  async checkCameraPermission(): Promise<boolean> {
    try {
      const { status } = await Camera.getCameraPermissionsAsync();
      return status === 'granted';
    } catch {
      return false;
    }
  }

  /**
   * Check if photo library permissions are granted
   */
  async checkPhotoLibraryPermission(): Promise<boolean> {
    try {
      const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
      return status === 'granted';
    } catch {
      return false;
    }
  }

  /**
   * Check if contacts permissions are granted
   */
  async checkContactsPermission(): Promise<boolean> {
    // Contacts permissions not available
    return false;
  }

  /**
   * Show alert when permission is denied
   */
  showPermissionDeniedAlert(
    title: string = 'Permission Required',
    message: string = 'This permission is required for the app to work properly.',
    showSettings: boolean = true
  ): void {
    const buttons = showSettings
      ? [
          {
            text: 'Cancel',
            style: 'cancel' as const,
          },
          {
            text: 'Open Settings',
            onPress: () => this.openAppSettings(),
          },
        ]
      : [
          {
            text: 'OK',
            style: 'default' as const,
          },
        ];

    Alert.alert(title, message, buttons);
  }

  /**
   * Open app settings
   */
  async openAppSettings(): Promise<void> {
    try {
      await Linking.openSettings();
    } catch (_error) {
      console.error('Failed to open app settings');
    }
  }

  /**
   * Request essential permissions for the app
   */
  async requestEssentialPermissions(): Promise<{
    notifications: PermissionResult;
    camera: PermissionResult;
    photoLibrary: PermissionResult;
  }> {
    const [notifications, camera, photoLibrary] = await Promise.all([
      this.requestNotificationPermission(),
      this.requestCameraPermission(),
      this.requestPhotoLibraryPermission(),
    ]);

    return {
      notifications,
      camera,
      photoLibrary,
    };
  }

  /**
   * Check all permissions status
   */
  async checkAllPermissions(): Promise<{
    notifications: boolean;
    location: boolean;
    camera: boolean;
    photoLibrary: boolean;
    contacts: boolean;
  }> {
    const [notifications, location, camera, photoLibrary, contacts] = await Promise.all([
      this.checkNotificationPermission(),
      this.checkLocationPermission(),
      this.checkCameraPermission(),
      this.checkPhotoLibraryPermission(),
      this.checkContactsPermission(),
    ]);

    return {
      notifications,
      location,
      camera,
      photoLibrary,
      contacts,
    };
  }

  /**
   * Show permission explanation dialog
   */
  showPermissionExplanation(
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
  ): void {
    const buttons = [
      {
        text: 'Cancel',
        style: 'cancel' as const,
        onPress: onCancel,
      },
      {
        text: 'Allow',
        style: 'default' as const,
        onPress: onConfirm,
      },
    ];

    Alert.alert(title, message, buttons);
  }
}

export const permissionManager = new PermissionManager();

export type PermissionType = 
  | 'notifications'
  | 'location'
  | 'camera'
  | 'photoLibrary'
  | 'contacts';

// Export permission messages
export const PERMISSION_MESSAGES = {
  notifications: {
    title: 'Enable Notifications',
    message: 'Get alerts for budget limits, bill reminders, and financial insights.',
  },
  location: {
    title: 'Enable Location',
    message: 'Help us categorize transactions based on merchant locations.',
  },
  camera: {
    title: 'Enable Camera',
    message: 'Scan receipts and capture transaction photos easily.',
  },
  photoLibrary: {
    title: 'Enable Photo Access',
    message: 'Attach receipt images to your transactions.',
  },
  contacts: {
    title: 'Enable Contacts',
    message: 'Identify payments to friends and family automatically.',
  },
};

export default permissionManager;