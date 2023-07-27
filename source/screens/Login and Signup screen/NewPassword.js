import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

const NewPassword = ({navigation}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  //   const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handlePasswordMatch = () => {
    if (newPassword === confirmPassword) {
      // Passwords match, perform your desired logic or actions here
      console.log('Passwords match');
      //   matchAlert();
    } else {
      // Passwords do not match, display an error message
      matchAlert();
    }
  };

  const passwordValid = () => {
    if (!isStrongPassword()) {
      setIsPasswordValid(!isPasswordValid);
      passwordalert();
      return;
    }
  };

  const passwordalert = () => {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: 'Alert',
      textBody: 'Your Password is not upto requirement',
      button: 'close',
      // autoClose: 2000,
    });
  };

  const matchAlert = () => {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: '😥',
      textBody: 'Password doesnt match',
      button: 'close',
      // autoClose: 2000,
    });
  };

  const setSuccess = () => {
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: '😊',
      textBody: 'Password updated successfully',
      button: 'close',
      // autoClose: 2000,
    });
  };

  const isStrongPassword = () => {
    // Define your password strength rules here
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasLowercase = /[a-z]/.test(newPassword);
    const hasDigit = /[0-9]/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    return (
      newPassword.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasDigit &&
      hasSpecialChar
    );
  };

  const ButtonHandler = () => {
    handlePasswordMatch();
    passwordValid();
    // setTimeout(() => {
    //   navigation.navigate('MainPage');
    // }, 2000);
  };

  return (
    <AlertNotificationRoot>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View>
            <Text style={styles.title}>Enter New Passoword 😶</Text>
            <Text style={styles.header}>
              You must enter password to login JEE Physics
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Image
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/platform2learn-54f87.appspot.com/o/email.png?alt=media&token=001c9b60-d5a2-4317-a113-32de56a5b5d5',
              }}
              style={styles.icon}
            />
            <TextInput
              autoCapitalize="none"
              style={styles.input}
              placeholder="Enter the new password"
              placeholderTextColor="#000"
              secureTextEntry
              onChangeText={text => setNewPassword(text)}
            />
          </View>

          <View style={styles.inputVerification}>
            <Image
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/platform2learn-54f87.appspot.com/o/email.png?alt=media&token=001c9b60-d5a2-4317-a113-32de56a5b5d5',
              }}
              style={styles.icon}
            />
            <TextInput
              autoCapitalize="none"
              style={styles.input}
              placeholder="Confirm new password"
              placeholderTextColor="#000"
              secureTextEntry
              onChangeText={text => setConfirmPassword(text)}
            />
          </View>

          <View>
            <View
              style={{
                alignItems: 'center',
                alignSelf: 'center',
                alignContent: 'center',
                marginTop: 25,
              }}>
              <TouchableOpacity
                onPress={ButtonHandler}
                style={styles.buttonLets}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* )} */}
        </ScrollView>
      </SafeAreaView>
    </AlertNotificationRoot>
  );
};

export default NewPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    fontSize: 20,
    top: 80,
    left: 24,
    letterSpacing: 2,
    lineHeight: 30,
  },
  header: {
    top: 95,
    left: 24,
    color: '#888888',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.7,
  },

  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonLets: {
    borderRadius: 10,
    backgroundColor: '#17A1FA',
    height: 50,
    width: 330,
    justifyContent: 'center',
    fontWeight: '800',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 25,
    width: '85%',
    alignSelf: 'center',
    marginTop: 150,
  },
  icon: {
    zIndex: 99,
    width: 25,
    height: 25,
    right: 10,
  },
  input: {
    flex: 1,
    color: '#000',
  },
  inputVerification: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 25,
    width: '85%',
    alignSelf: 'center',
    marginTop: 20,
  },
});
