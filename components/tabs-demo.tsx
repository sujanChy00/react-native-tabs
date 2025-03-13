import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSearchParams } from 'expo-router/build/hooks';
import { TabsContentWrapper } from './tabs/tabs-content-wapper';

export default function TabsDemo() {
  const params = useLocalSearchParams<{ tab?: string }>();
  const router = useRouter();
  const [tab, setTab] = React.useState(params?.tab || 'account');
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [autoUpdate, setAutoUpdate] = React.useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Swipeable Tabs</Text>
      <Text style={styles.subheader}>Swipe left or right to change {JSON.stringify(params)}</Text>

      <View style={styles.tabsContainer}>
        <Tabs
          defaultValue={tab}
          onValueChange={(value) => {
            setTab(value);
            router.setParams({
              tab: value,
            });
          }}>
          <TabsList>
            <TabsTrigger value="account">
              <View style={styles.tabContent}>
                <Ionicons name="person" size={18} color="#64748b" />
                <Text>Account</Text>
              </View>
            </TabsTrigger>
            <TabsTrigger value="password">
              <View style={styles.tabContent}>
                <Ionicons name="key" size={18} color="#64748b" />
                <Text style={styles.tabText}>Password</Text>
              </View>
            </TabsTrigger>
            <TabsTrigger value="settings">
              <View style={styles.tabContent}>
                <Ionicons name="settings" size={18} color="#64748b" />
                <Text style={styles.tabText}>Settings</Text>
              </View>
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <View style={styles.tabContent}>
                <Ionicons name="notifications" size={18} color="#64748b" />
                <Text style={styles.tabText}>Notifications</Text>
              </View>
            </TabsTrigger>
          </TabsList>

          <TabsContentWrapper>
            {/* Account Tab */}
            <TabsContent value="account">
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Account</Text>
                <Text style={styles.description}>
                  Make changes to your account here. You can update your profile information, change
                  your email address, and manage your account settings.
                </Text>

                <View style={styles.profileSection}>
                  <View style={styles.avatarContainer}>
                    <Image
                      source={{
                        uri: 'https://randomuser.me/api/portraits/men/32.jpg',
                      }}
                      style={styles.avatar}
                    />
                    <TouchableOpacity style={styles.changeAvatarButton}>
                      <Text style={styles.changeAvatarText}>Change</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>John Doe</Text>
                    <Text style={styles.profileEmail}>john.doe@example.com</Text>
                    <Text style={styles.memberSince}>Member since Jan 2023</Text>
                  </View>
                </View>

                <View style={styles.formSection}>
                  <Text style={styles.sectionTitle}>Personal Information</Text>

                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Full Name</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="John Doe"
                      defaultValue="John Doe"
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="john.doe@example.com"
                      defaultValue="john.doe@example.com"
                      keyboardType="email-address"
                      inputMode="email"
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Phone Number</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="+1 (555) 123-4567"
                      defaultValue="+1 (555) 123-4567"
                      keyboardType="phone-pad"
                      inputMode="tel"
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Location</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="New York, USA"
                      defaultValue="New York, USA"
                    />
                  </View>

                  <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.dangerZone}>
                  <Text style={styles.dangerZoneTitle}>Danger Zone</Text>
                  <TouchableOpacity style={styles.deleteAccountButton}>
                    <Text style={styles.deleteAccountText}>Delete Account</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </TabsContent>

            {/* Password Tab */}
            <TabsContent value="password">
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Password</Text>
                <Text style={styles.description}>
                  Change your password here. We recommend using a strong password that you don't use
                  on any other website. For security reasons, you'll need to enter your current
                  password first.
                </Text>

                <View style={styles.formSection}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Current Password</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter current password"
                      secureTextEntry
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>New Password</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter new password"
                      secureTextEntry
                    />
                    <Text style={styles.passwordHint}>
                      Password must be at least 8 characters and include a number and special
                      character.
                    </Text>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Confirm New Password</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Confirm new password"
                      secureTextEntry
                    />
                  </View>

                  <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Update Password</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.securityTips}>
                  <Text style={styles.securityTipsTitle}>Password Security Tips</Text>
                  <View style={styles.tipItem}>
                    <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                    <Text style={styles.tipText}>Use a mix of letters, numbers, and symbols</Text>
                  </View>
                  <View style={styles.tipItem}>
                    <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                    <Text style={styles.tipText}>Don't reuse passwords from other sites</Text>
                  </View>
                  <View style={styles.tipItem}>
                    <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                    <Text style={styles.tipText}>Consider using a password manager</Text>
                  </View>
                  <View style={styles.tipItem}>
                    <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                    <Text style={styles.tipText}>Change your password regularly</Text>
                  </View>
                </View>
              </ScrollView>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Settings</Text>
                <Text style={styles.description}>
                  Manage your application settings here. You can customize the app appearance, set
                  your preferences, and configure other options.
                </Text>

                <View style={styles.settingsSection}>
                  <Text style={styles.sectionTitle}>Appearance</Text>

                  <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                      <Ionicons name="moon" size={22} color="#64748b" />
                      <Text style={styles.settingText}>Dark Mode</Text>
                    </View>
                    <Switch
                      value={darkMode}
                      onValueChange={setDarkMode}
                      trackColor={{
                        false: '#cbd5e1',
                        true: '#2563eb',
                      }}
                      thumbColor="#ffffff"
                    />
                  </View>

                  <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                      <Ionicons name="text" size={22} color="#64748b" />
                      <Text style={styles.settingText}>Large Text</Text>
                    </View>
                    <Switch
                      value={false}
                      trackColor={{
                        false: '#cbd5e1',
                        true: '#2563eb',
                      }}
                      thumbColor="#ffffff"
                    />
                  </View>
                </View>

                <View style={styles.settingsSection}>
                  <Text style={styles.sectionTitle}>General</Text>

                  <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                      <Ionicons name="refresh" size={22} color="#64748b" />
                      <Text style={styles.settingText}>Auto-update App</Text>
                    </View>
                    <Switch
                      value={autoUpdate}
                      onValueChange={setAutoUpdate}
                      trackColor={{
                        false: '#cbd5e1',
                        true: '#2563eb',
                      }}
                      thumbColor="#ffffff"
                    />
                  </View>

                  <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                      <Ionicons name="language" size={22} color="#64748b" />
                      <Text style={styles.settingText}>Language</Text>
                    </View>
                    <View style={styles.settingValue}>
                      <Text style={styles.settingValueText}>English</Text>
                      <MaterialIcons name="keyboard-arrow-right" size={22} color="#64748b" />
                    </View>
                  </View>

                  <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                      <Ionicons name="time" size={22} color="#64748b" />
                      <Text style={styles.settingText}>Time Zone</Text>
                    </View>
                    <View style={styles.settingValue}>
                      <Text style={styles.settingValueText}>UTC-05:00</Text>
                      <MaterialIcons name="keyboard-arrow-right" size={22} color="#64748b" />
                    </View>
                  </View>
                </View>

                <View style={styles.settingsSection}>
                  <Text style={styles.sectionTitle}>Privacy</Text>

                  <View style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                      <Ionicons name="analytics" size={22} color="#64748b" />
                      <Text style={styles.settingText}>Usage Data</Text>
                    </View>
                    <Switch
                      value={true}
                      trackColor={{
                        false: '#cbd5e1',
                        true: '#2563eb',
                      }}
                      thumbColor="#ffffff"
                    />
                  </View>

                  <TouchableOpacity style={styles.settingItem}>
                    <View style={styles.settingInfo}>
                      <Ionicons name="document-text" size={22} color="#64748b" />
                      <Text style={styles.settingText}>Privacy Policy</Text>
                    </View>
                    <MaterialIcons name="keyboard-arrow-right" size={22} color="#64748b" />
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Notifications</Text>
                <Text style={styles.description}>
                  Configure your notification preferences here. You can choose which notifications
                  you want to receive and how you want to receive them.
                </Text>

                <View style={styles.notificationSection}>
                  <View style={styles.notificationHeader}>
                    <Text style={styles.sectionTitle}>Push Notifications</Text>
                    <Switch
                      value={notificationsEnabled}
                      onValueChange={setNotificationsEnabled}
                      trackColor={{
                        false: '#cbd5e1',
                        true: '#2563eb',
                      }}
                      thumbColor="#ffffff"
                    />
                  </View>

                  <View
                    style={[styles.notificationOptions, !notificationsEnabled && styles.disabled]}>
                    <View style={styles.notificationItem}>
                      <View style={styles.notificationInfo}>
                        <FontAwesome
                          name="bell"
                          size={18}
                          color={notificationsEnabled ? '#64748b' : '#cbd5e1'}
                        />
                        <Text
                          style={[
                            styles.notificationText,
                            !notificationsEnabled && styles.disabledText,
                          ]}>
                          New Messages
                        </Text>
                      </View>
                      <Switch
                        value={true}
                        disabled={!notificationsEnabled}
                        trackColor={{
                          false: '#cbd5e1',
                          true: '#2563eb',
                        }}
                        thumbColor="#ffffff"
                      />
                    </View>

                    <View style={styles.notificationItem}>
                      <View style={styles.notificationInfo}>
                        <FontAwesome
                          name="bell"
                          size={18}
                          color={notificationsEnabled ? '#64748b' : '#cbd5e1'}
                        />
                        <Text
                          style={[
                            styles.notificationText,
                            !notificationsEnabled && styles.disabledText,
                          ]}>
                          Account Updates
                        </Text>
                      </View>
                      <Switch
                        value={true}
                        disabled={!notificationsEnabled}
                        trackColor={{
                          false: '#cbd5e1',
                          true: '#2563eb',
                        }}
                        thumbColor="#ffffff"
                      />
                    </View>

                    <View style={styles.notificationItem}>
                      <View style={styles.notificationInfo}>
                        <FontAwesome
                          name="bell"
                          size={18}
                          color={notificationsEnabled ? '#64748b' : '#cbd5e1'}
                        />
                        <Text
                          style={[
                            styles.notificationText,
                            !notificationsEnabled && styles.disabledText,
                          ]}>
                          New Features
                        </Text>
                      </View>
                      <Switch
                        value={false}
                        disabled={!notificationsEnabled}
                        trackColor={{
                          false: '#cbd5e1',
                          true: '#2563eb',
                        }}
                        thumbColor="#ffffff"
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.notificationSection}>
                  <Text style={styles.sectionTitle}>Email Notifications</Text>

                  <View style={styles.notificationItem}>
                    <View style={styles.notificationInfo}>
                      <Ionicons name="mail" size={20} color="#64748b" />
                      <Text style={styles.notificationText}>Weekly Newsletter</Text>
                    </View>
                    <Switch
                      value={true}
                      trackColor={{
                        false: '#cbd5e1',
                        true: '#2563eb',
                      }}
                      thumbColor="#ffffff"
                    />
                  </View>

                  <View style={styles.notificationItem}>
                    <View style={styles.notificationInfo}>
                      <Ionicons name="mail" size={20} color="#64748b" />
                      <Text style={styles.notificationText}>Account Summary</Text>
                    </View>
                    <Switch
                      value={false}
                      trackColor={{
                        false: '#cbd5e1',
                        true: '#2563eb',
                      }}
                      thumbColor="#ffffff"
                    />
                  </View>

                  <View style={styles.notificationItem}>
                    <View style={styles.notificationInfo}>
                      <Ionicons name="mail" size={20} color="#64748b" />
                      <Text style={styles.notificationText}>Promotional Emails</Text>
                    </View>
                    <Switch
                      value={false}
                      trackColor={{
                        false: '#cbd5e1',
                        true: '#2563eb',
                      }}
                      thumbColor="#ffffff"
                    />
                  </View>
                </View>

                <View style={styles.notificationSection}>
                  <Text style={styles.sectionTitle}>Notification Schedule</Text>

                  <TouchableOpacity style={styles.scheduleItem}>
                    <View style={styles.scheduleInfo}>
                      <Ionicons name="time" size={20} color="#64748b" />
                      <Text style={styles.scheduleText}>Quiet Hours</Text>
                    </View>
                    <View style={styles.scheduleValue}>
                      <Text style={styles.scheduleValueText}>10:00 PM - 7:00 AM</Text>
                      <MaterialIcons name="keyboard-arrow-right" size={22} color="#64748b" />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.scheduleItem}>
                    <View style={styles.scheduleInfo}>
                      <Ionicons name="calendar" size={20} color="#64748b" />
                      <Text style={styles.scheduleText}>Do Not Disturb Days</Text>
                    </View>
                    <View style={styles.scheduleValue}>
                      <Text style={styles.scheduleValueText}>Weekends</Text>
                      <MaterialIcons name="keyboard-arrow-right" size={22} color="#64748b" />
                    </View>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </TabsContent>
          </TabsContentWrapper>
        </Tabs>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginHorizontal: 16,
  },
  subheader: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  tabsContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1e293b',
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 24,
    lineHeight: 20,
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tabText: {
    fontSize: 14,
    color: '#64748b',
  },

  // Profile Section Styles
  profileSection: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  changeAvatarButton: {
    backgroundColor: '#e2e8f0',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  changeAvatarText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  profileInfo: {
    marginLeft: 16,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 12,
    color: '#94a3b8',
  },

  // Form Section Styles
  formSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1e293b',
  },
  passwordHint: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
  },
  saveButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },

  // Danger Zone Styles
  dangerZone: {
    backgroundColor: '#fee2e2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  dangerZoneTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#b91c1c',
    marginBottom: 16,
  },
  deleteAccountButton: {
    borderWidth: 1,
    borderColor: '#ef4444',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  deleteAccountText: {
    color: '#ef4444',
    fontWeight: '600',
    fontSize: 14,
  },

  // Security Tips Styles
  securityTips: {
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  securityTipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#166534',
    marginBottom: 16,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#1e293b',
    marginLeft: 8,
  },

  // Settings Styles
  settingsSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 14,
    color: '#1e293b',
    marginLeft: 12,
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValueText: {
    fontSize: 14,
    color: '#64748b',
    marginRight: 4,
  },

  // Notification Styles
  notificationSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  notificationOptions: {
    opacity: 1,
  },
  disabled: {
    opacity: 0.6,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  notificationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 14,
    color: '#1e293b',
    marginLeft: 12,
  },
  disabledText: {
    color: '#cbd5e1',
  },

  // Schedule Styles
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  scheduleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleText: {
    fontSize: 14,
    color: '#1e293b',
    marginLeft: 12,
  },
  scheduleValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleValueText: {
    fontSize: 14,
    color: '#64748b',
    marginRight: 4,
  },
});
