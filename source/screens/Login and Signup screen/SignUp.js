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
} from 'react-native';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import NetInfo from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';

// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import NoInternet from '../No Internet/NoInternet';
import {useRef} from 'react';
import {LogBox} from 'react-native';
import {emailSuccessalert} from '../../components/Error and Success Modal/ErrorAndSuccessModal';

// GoogleSignin.configure({
//   webClientId:
//     '163118202949-c9j9vmams4dm7eir399fg7rgmss9h5qa.apps.googleusercontent.com',
//   offlineAccess: true,
// });

LogBox.ignoreAllLogs();

const Signup = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const hasNavigatedRef = useRef(false);

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

  const emailphonealert = () => {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: 'Alert',
      textBody: 'Invalid Email Address',
      button: 'close',
      // autoClose: 2000,
    });
  };

  const emailAlreadyRegister = () => {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: 'Alert',
      textBody: 'Email already registered',
      button: 'close',
      // autoClose: 2000,
    });
  };

  const emailVerificationSent = () => {
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'Verfication mail sent to your mail',
      button: 'close',
      autoClose: 2000,
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

  // const handleGoogleSignIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  //     // Get the users ID token
  //     const {idToken} = await GoogleSignin.signIn();

  //     // Create a Google credential with the token
  //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  //     // Sign-in the user with the credential
  //     await auth().signInWithCredential(googleCredential);
  //     googleSigninSuccess();

  //     // navigation.replace('BottomTabs');

  //     const currentUser = auth().currentUser;

  //     if (currentUser) {
  //       // Save user data to Firestore
  //       await firestore().collection('GoogleAuth').doc(currentUser.email).set({
  //         uid: currentUser.uid,
  //         name: currentUser.displayName,
  //         email: currentUser.email,
  //         photoURL: currentUser.photoURL,
  //       });

  //       // Navigate to the desired screen
  //     } else {
  //       console.error('No current user found');
  //       GoogleAlert();
  //     }
  //   } catch (error) {
  //     console.error('Google sign-in error:', error);
  //     GoogleAlert();
  //   }
  // };

  useEffect(() => {
    const unsubscribeOnUserChanged = auth().onUserChanged(async user => {
      if (user) {
        await user.reload();
        if (user.emailVerified && !hasNavigatedRef.current) {
          let token = await messaging().getToken();
          hasNavigatedRef.current = true;
          showVerificationSuccessfulDialog();

          await firestore().collection('emailAuth').doc(user.email).set({
            uid: user.uid,
            name: name, // Include the 'name' variable here
            email: user.email,
          });

          await firestore()
            .collection('UserFcmToken')
            .doc(user.email)
            .set({FcmToken: token});

          await AsyncStorage.setItem('SliderShown', 'true');

          console.log('Data Saved');

          unsubscribeOnUserChanged(); // Unsubscribe the event listener after navigating
        }
      }
    });

    return () => unsubscribeOnUserChanged(); // Unsubscribe on component unmount
  }, [name]);

  const emailSignin = async () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({user}) => {
        console.log('User account created & signed in!');

        // Send verification email
        user
          .sendEmailVerification()
          .then(() => {
            console.log('Verification email sent!');
            emailVerificationSent();
            auth().currentUser.reload();
          })
          .catch(error => {
            console.error('Error sending verification email:', error);
            // Handle the error here, e.g., show an error message to the user
          });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          emailAlreadyRegister();
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          emailphonealert();
        }

        console.error(error);
      });
  };

  const showVerificationSuccessfulDialog = () => {
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Email verified',
      textBody: 'Redirecting to Homepage',
      autoClose: 2000,
      onHide: () => navigation.replace('BottomTabs'),
    });
  };

  const NameError = () => {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: 'Failure',
      textBody: 'Please enter the name',
      autoClose: 2000,
      button: 'close',
    });
  };

  // Code for rendering of BottomTabs after the user is verified
  // Store the Data in the firestore for EmailAuth people

  // useEffect(() => {
  //   const unsubscribeOnUserChanged = auth().onUserChanged(async user => {
  //     if (user) {
  //       await user.reload();
  //       if (user.emailVerified && !hasNavigatedRef.current) {
  //         hasNavigatedRef.current = true;
  //         showVerificationSuccessfulDialog();
  //         await firestore().collection('emailAuth').doc(user.email).set({
  //           uid: user.uid,
  //           name: name, // Include the 'name' variable here
  //           email: user.email,
  //         });
  //         console.log('Data Saved');
  //         unsubscribeOnUserChanged(); // Unsubscribe the event listener after navigating
  //       }
  //     }
  //   });

  //   return () => unsubscribeOnUserChanged(); // Unsubscribe on component unmount
  // }, [name]); // Include 'name' as a dependency in the useEffect dependency array

  console.log(name);

  const handleSignup = () => {
    if (isStrongPassword(password) && validateEmail(email) && name !== '') {
      emailSignin();
    } else {
      if (!isStrongPassword(password)) {
        setIsPasswordValid(false);
        passwordalert();
      }
      if (!validateEmail(email)) {
        emailphonealert();
      }
      if (name === '') {
        NameError();
      }
    }
  };

  return (
    <AlertNotificationRoot>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={{top: '5%', alignItems: 'flex-end', right: '8%'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{color: '#60A5FA', fontWeight: '700'}}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={{bottom: '2%'}}>
            <Text style={styles.title}>Create an Account ✌</Text>
            <Text style={styles.header}>
              Create your account to start your JEE Physics
            </Text>
          </View>
          <View style={{marginTop: '20%'}}>
            <View style={[styles.inputContainer]}>
              <Feather
                name="user"
                color={'#000'}
                style={styles.icon}
                size={23}
              />
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#000"
                onChangeText={text => setName(text)}
              />
            </View>
            <View style={[styles.inputContainer, {marginTop: 15}]}>
              <MaterialCommunityIcons
                name="email-outline"
                color={'#000'}
                style={styles.icon}
                size={23}
              />
              <TextInput
                autoCapitalize="none"
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#000"
                // onChangeText={handleInputChange}
                onChangeText={text => setEmail(text)}
                autoCorrect={false}
              />
            </View>

            <View style={[styles.inputContainer, {marginTop: 15}]}>
              <MaterialCommunityIcons
                name="form-textbox-password"
                color={'#000'}
                style={styles.icon}
                size={23}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={handlePasswordChange}
                autoCapitalize="none"
                placeholderTextColor="#000"
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
            <View
              style={{
                alignItems: 'center',
                alignSelf: 'center',
                alignContent: 'center',
                marginTop: '60%',
              }}>
              <TouchableOpacity
                onPress={handleSignup}
                style={styles.buttonLets}>
                <Text style={styles.buttonText}>Create account</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.conditionContainer}>
            <Text style={styles.conditionText}>
              By continuing, you agree to our
            </Text>
            <View style={styles.policyContainer}>
              <TouchableOpacity>
                <Text style={styles.policyText}>Terms &amp; Conditions </Text>
              </TouchableOpacity>
              <Text style={styles.conditionText}>and</Text>
              <TouchableOpacity>
                <Text style={styles.policyText}> Privacy Policy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </AlertNotificationRoot>
  );
};

export default Signup;

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
    paddingHorizontal: 25,
    width: '85%',
    alignSelf: 'center',
    top: 50,
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
    height: 50,
    width: 330,
    justifyContent: 'center',
    fontWeight: '800',
    bottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 16,
  },
  ConditionPolicy: {
    color: '#17A1FA',
  },
  conditionContainer: {
    width: '85%',
    left: '2%',
    marginTop: '2%',
    alignSelf: 'center',
  },
  already: {
    color: '#17A1FA',
    fontWeight: '600',
    fontSize: 15,
  },
  alreadyContainer: {
    alignSelf: 'center',
    marginTop: '15%',
  },
  conditionContainer: {
    marginTop: '2%',
    alignItems: 'center',
    justifyContent: 'center',
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
});
