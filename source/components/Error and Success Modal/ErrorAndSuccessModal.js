import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import {useNavigation} from '@react-navigation/native';

export const emailFailurealert = () => {
  Dialog.show({
    type: ALERT_TYPE.DANGER,
    title: 'Failure',
    textBody: 'Email Account Doesnt exist',
    // button: 'close',
    autoClose: 1000,
  });
};

export const emailSuccessalert = () => {
  Dialog.show({
    type: ALERT_TYPE.SUCCESS,
    title: 'Successful',
    textBody: 'Password Reset link have been sent to your mail',
    // button: 'close',
    autoClose: 1000,
  });
};

export const EnterEmailAlert = () => {
  Dialog.show({
    type: ALERT_TYPE.WARNING,
    title: 'Warning',
    textBody: 'Please enter your email address',
    button: 'close',
    autoClose: 1000,
  });
};
