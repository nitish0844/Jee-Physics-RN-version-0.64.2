import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import auth from '@react-native-firebase/auth';
import {useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';

const {width, height} = Dimensions.get('window');
const responsiveWidth = width * 0.85; // 85% of the screen width

const Login = () => {
  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [email, setEmail] = useState('');
  const [loginCheckInProgress, setLoginCheckInProgress] = useState(true);

  const handlePasswordChange = text => {
    setPassword(text);
    if (text === '') {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(isStrongPassword(text));
    }
  };

  const isStrongPassword = () => {
    // Define your password strength rules here
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasDigit &&
      hasSpecialChar
    );
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

  const nodataAlert = () => {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: 'Alert',
      textBody: 'Please enter the email and password',
      button: 'close',
      // autoClose: 2000,
    });
  };

  const validateEmail = text => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  // const validatePhoneNumber = text => {
  //   // Basic phone number validation regex
  //   const phoneRegex = /^\d{10}$/;
  //   return phoneRegex.test(text);
  // };

  const HandleLoginMain = () => {
    if (isStrongPassword(password) && validateEmail(email)) {
      handleLogin();
    } else {
      if (!isStrongPassword(password)) {
        setIsPasswordValid(false);
        passwordalert();
      }
      if (!validateEmail(email)) {
        nodataAlert();
      }
    }
  };

  const EmailLoginError = () => {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: 'Failure',
      textBody: 'Invalid email or password',
      button: 'close',
      autoClose: 2000,
    });
  };

  // const handleLogin = async () => {
  //   try {
  //     const userCredential = await auth().signInWithEmailAndPassword(
  //       email,
  //       password,
  //     );
  //     console.log('User logged in successfully:', userCredential.user);
  //     // navigation.replace('BottomTabs');
  //     showVerificationSuccessfulDialog();
  //     // You can navigate to another screen or perform any other actions after login
  //   } catch (error) {
  //     EmailLoginError();
  //     console.error('Error logging in:', error);
  //   }
  // };

  // const hasNavigatedRef = useRef(false);

  // useEffect(() => {
  //   const checkAuthState = () => {
  //     auth().onAuthStateChanged(user => {
  //       if (user && user.emailVerified) {
  //         hasNavigatedRef.current = true;
  //         // User is authenticated and email is verified,
  //         // navigate to the main page (BottomTabs)
  //         // showVerificationSuccessfulDialog();
  //         navigation.replace('BottomTabs');
  //       }
  //     });
  //   };

  //   checkAuthState();
  // }, []);

  const handleLogin = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      console.log('User logged in successfully:', userCredential.user);
      // showVerificationSuccessfulDialog();
    } catch (error) {
      EmailLoginError();
      console.error('Error logging in:', error);
    }
  };

  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async user => {
      if (user && user.emailVerified && !hasNavigatedRef.current) {
        hasNavigatedRef.current = true;
        let token = await messaging().getToken();
        // User is authenticated and email is verified,
        // navigate to the main page (BottomTabs)
        navigation.replace('BottomTabs');
        await firestore()
          .collection('UserFcmToken')
          .doc(user.email)
          .set({FcmToken: token});
      } else {
        setLoginCheckInProgress(false);
      }
    });

    return () => {
      unsubscribe(); // Cleanup the listener when the component unmounts
    };
  }, []);

  const showVerificationSuccessfulDialog = () => {
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Login Successful',
      textBody: 'Redirecting to Homepage',
      autoClose: 1000,
      onHide: () => {
        if (!hasNavigatedRef.current) {
          hasNavigatedRef.current = true;
          navigation.replace('BottomTabs');
        }
      },
    });
  };

  return (
    <AlertNotificationRoot>
      {loginCheckInProgress ? ( // Show activity indicator while login check is in progress
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={{top: '5%', alignItems: 'flex-end', right: '8%'}}>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={{color: '#60A5FA', fontWeight: '700'}}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{bottom: '2%'}}>
              <Text style={styles.title}>Hi, Welcome Back👋</Text>
              <Text style={styles.header}>
                Login your account to start you JEE Physics
              </Text>
            </View>

            <View style={{marginTop: '20%'}}>
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
                  placeholder="Email"
                  placeholderTextColor="#000"
                  onChangeText={text => setEmail(text)}
                  autoCorrect={false}
                  editable={true}
                />
              </View>

              <View style={[styles.inputContainer, {marginTop: 15}]}>
                <Image
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/platform2learn-54f87.appspot.com/o/password%20(1).png?alt=media&token=96105cab-e1eb-4979-a08f-672fa95280e2',
                  }}
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry
                  value={password}
                  onChangeText={handlePasswordChange}
                  autoCapitalize="none"
                  placeholderTextColor="#000"
                  editable={true}
                />
              </View>
              <View style={styles.ruleText}>
                {!isPasswordValid && (
                  <Text style={styles.errorText}>
                    Password must have at least 8 characters, one uppercase
                    letter, one lowercase letter, and one digit.
                  </Text>
                )}
              </View>
              <View style={styles.ForgetPasswordContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgetPassword')}>
                  <Text
                    style={{
                      fontWeight: '500',
                      color: '#17A1FA',
                      textDecorationLine: 'underline',
                      textDecorationStyle: 'dotted',
                    }}>
                    Forget Password ?
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  alignSelf: 'center',
                  alignContent: 'center',
                  marginTop: '68%',
                }}>
                <TouchableOpacity
                  onPress={HandleLoginMain}
                  style={styles.buttonLets}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.conditionContainer}>
                <Text style={styles.conditionText}>
                  By continuing, you agree to our
                </Text>
                <View style={styles.policyContainer}>
                  <TouchableOpacity>
                    <Text style={styles.policyText}>
                      Terms &amp; Conditions{' '}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.conditionText}>and</Text>
                  <TouchableOpacity>
                    <Text style={styles.policyText}> Privacy Policy</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </AlertNotificationRoot>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    fontSize: 20,
    top: height * 0.12,
    // top: 80,
    left: 24,
    letterSpacing: 2,
    lineHeight: 30,
  },
  header: {
    // top: 95,
    top: height * 0.14,
    left: 24,
    color: '#888888',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.7,
  },
  text: {
    justifyContent: 'center',
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    // paddingHorizontal: 25,
    // width: '85%',
    paddingHorizontal: 0.09 * responsiveWidth,
    width: responsiveWidth * 1.05,
    alignSelf: 'center',
    // top: 50,
    top: height * 0.05,
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
  ruleText: {
    marginTop: 55,
    fontSize: 12,
    alignSelf: 'center',
    width: '85%',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'center',
    justifyContent: 'center',
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
    height: height / 15,
    // width: 330,
    justifyContent: 'center',
    fontWeight: '800',
    // bottom: 10,
    width: 1 * responsiveWidth,
    bottom: height * 0.01,
  },
  already: {
    color: '#17A1FA',
    fontWeight: '600',
    fontSize: 15,
    textAlign: 'center',
  },
  alreadyContainer: {
    alignSelf: 'center',
    marginTop: '10%',
  },
  ConditionPolicy: {
    color: '#17A1FA',
  },
  conditionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth,
    left: '2%', // Adjust the left position as per your preference
    marginTop: height * 0.01, // Adjust the top position as per your preference
    alignSelf: 'center',
  },
  conditionText: {
    fontWeight: '500',
    color: '#888888',
    textAlign: 'center',
  },
  policyContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  policyText: {
    fontWeight: '500',
    color: '#17A1FA',
  },
  ForgetPasswordContainer: {
    left: '8%',
    top: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
