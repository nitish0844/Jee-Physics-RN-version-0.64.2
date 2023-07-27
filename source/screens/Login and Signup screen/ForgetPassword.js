import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  Share,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import auth from '@react-native-firebase/auth';
// import dynamicLinks from '@react-native-firebase/dynamic-links';
import {emailSuccessalert} from '../../components/Error and Success Modal/ErrorAndSuccessModal';
import {emailFailurealert} from '../../components/Error and Success Modal/ErrorAndSuccessModal';
import {EnterEmailAlert} from '../../components/Error and Success Modal/ErrorAndSuccessModal';

const ForgetPassword = ({navigation}) => {
  const [email, setEmail] = useState('');

  const handleSendVerificationCode = () => {
    if (email !== '') {
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          emailSuccessalert();
          setTimeout(() => {
            navigation.replace('Login');
          }, 2000);
        })
        .catch(error => {
          // setIsEmailSent(false);
          console.log(error.message);
          emailFailurealert();
        });
    } else {
      console.log('Please enter your email address.');
      EnterEmailAlert();
    }
  };

  // const generateLink = async () => {
  //   try {
  //     const link = await dynamicLinks().buildShortLink(
  //       {
  //         link: 'https://jeephysicsapp.page.link/qL6j/verify',
  //         domainUriPrefix: 'https://jeephysicsapp.page.link/',
  //         android: {
  //           packageName: 'com.jeephysicsapp',
  //         },
  //       },
  //       dynamicLinks.ShortLinkType.DEFAULT,
  //     );
  //     console.log('link:', link);
  //     Share.share({
  //       message: link,
  //     });
  //   } catch (error) {
  //     console.log('Generating Link Error:', error);
  //   }
  // };

  // const handleSendVerificationCode = async () => {
  //   try {
  //     const deepLink = await generateLink();
  //     if (deepLink) {
  //       sendEmailWithDeepLink(email, deepLink);
  //       setCodeSent(false);
  //       emailalert();
  //     }
  //   } catch (error) {
  //     console.log('Error sending verification code:', error);
  //   }
  // };

  // const sendEmailWithDeepLink = async (email, deepLink) => {
  //   try {
  //     await auth().sendPasswordResetEmail(email, {
  //       url: deepLink,
  //       handleCodeInApp: true,
  //     });
  //     console.log('Password reset email sent successfully.');
  //   } catch (error) {
  //     console.log('Error sending password reset email:', error);
  //   }
  // };

  const ButtonHandler = () => {
    handleSendVerificationCode();
  };
  return (
    <AlertNotificationRoot>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View>
            <Text style={styles.title}>Reset Password 😶</Text>
            <Text style={styles.header}>
              Reset your password to login JEE Physics
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
              placeholder="Email"
              placeholderTextColor="#000"
              onChangeText={text => setEmail(text)}
            />
          </View>

          {/* <View>
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
                <Text style={styles.buttonText}>Send Verfication code</Text>
              </TouchableOpacity>
            </View>
          </View> */}
          {/* {codeSent ? ( */}
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
                <Text style={styles.buttonText}>Send Verfication Mail</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </AlertNotificationRoot>
  );
};

export default ForgetPassword;

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
    marginTop: 120,
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
