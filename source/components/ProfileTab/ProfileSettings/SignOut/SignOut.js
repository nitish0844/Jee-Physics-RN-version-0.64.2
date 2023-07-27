import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';

import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

const SignOut = () => {
  const navigation = useNavigation();
  // const handleSignOut = async () => {
  //   try {
  //     await auth().signOut();
  //     console.log('User signed out successfully');
  //     navigation.replace('MainStack');
  //     // You can navigate to another screen or perform any other actions after sign-out
  //   } catch (error) {
  //     console.error('Error signing out:', error);
  //   }
  // };

  // const handleLogout = async () => {
  //   try {
  //     // Logout from Google
  //     await auth().signOut();
  //     // await GoogleSignin.signOut();
  //     // await GoogleSignin.revokeAccess();

  //     // Logout from Facebook
  //     // await LoginManager.logOut();
  //     navigation.replace('MainStack');
  //   } catch (error) {
  //     console.log('Error logging out:', error);
  //   }
  // };

  const emailFailurealert = () => {
    Dialog.show({
      type: ALERT_TYPE.WARNING,
      title: 'Logout',
      textBody: 'Do you want to logout?',
      button: 'sure',
      onPressButton: () => handleLogout(),
    });
  };

  const handleLogout = async () => {
    try {
      // Sign out from Firebase
      await auth().signOut();
      navigation.replace('MainStack');

      console.log('LogOut Successful');
    } catch (error) {
      console.error('Google sign-out error:', error);
    }
  };

  return (
    <AlertNotificationRoot>
      <View style={{marginTop: 20}}>
        <Text style={styles.Title}>SIGN OFF</Text>
        <View style={{marginTop: '2%', flex: 1, left: 18}}>
          <View style={styles.Container}>
            <TouchableOpacity onPress={emailFailurealert}>
              <MaterialIcons name="logout" size={28} color="red" />
            </TouchableOpacity>
            <View style={{marginLeft: 10, flex: 1}}>
              <TouchableOpacity onPress={emailFailurealert}>
                <Text style={styles.text}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </AlertNotificationRoot>
  );
};

export default SignOut;

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, // Add some spacing between the containers
    // gap: 5,
    left: 10,
  },
  text: {
    color: 'red',
    fontWeight: '500',
  },
  next: {
    marginLeft: 'auto',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    paddingRight: 20,
  },
  nextIcon: {
    alignSelf: 'flex-end',
    right: 20,
  },
  Title: {
    left: 30,
    color: '#454545',
    fontWeight: '500',
  },
});
