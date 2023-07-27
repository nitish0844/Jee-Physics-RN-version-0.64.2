import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import RazorpayCheckout from 'react-native-razorpay';
import CombinedUnitandFormula from '../HomeTab/CombinedUnitandFormula';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

const Payment = ({route, navigation}) => {
  const {courseName, amount, BackScreen, CollectionandDoc} = route.params;
  const [showProcessingText, setShowProcessingText] = useState(true);

  const PaymentError = () => {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: 'Failure',
      textBody: 'Payment Failure',
      button: 'close',
      onPress: () => {
        // Navigate back to CombinedUnitandFormula.js
        if (BackScreen === 'BottomTabs') {
          navigation.navigate('BottomTabs');
        }
      },

      onHide: () => {
        // Navigate back to CombinedUnitandFormula.js
        if (BackScreen === 'BottomTabs') {
          navigation.navigate('BottomTabs');
        }
      },
    });
  };

  const PaymentSuccessful = () => {
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Successful',
      textBody: 'All the best',
      button: 'close',
      onPress: () => {
        // Navigate back to CombinedUnitandFormula.js
        // if (sourceScreen === 'BottomTabs') {
        navigation.replace('PdfViewer');
        // }
      },

      onHide: () => {
        // Navigate back to CombinedUnitandFormula.js
        // if (sourceScreen === 'BottomTabs') {
        // navigation.navigate('BottomTabs');
        navigation.replace('PdfViewer');
        // }
      },
    });
  };

  useEffect(() => {
    const handleRazorpayResponse = razorpayResponse => {
      // Handle the Razorpay response for successful payment
      console.log('Payment response:', razorpayResponse);

      if (
        razorpayResponse &&
        razorpayResponse.error &&
        razorpayResponse.error.code === RazorpayCheckout.ERR_PAYMENT_CANCELLED
      ) {
        // Payment cancelled by the user
        console.log('Payment cancelled');
        PaymentError();
      } else if (razorpayResponse && razorpayResponse.razorpay_payment_id) {
        // Payment successful
        console.log('Payment success:', razorpayResponse);

        // Update Firestore Boolean as true for the purchased course
        const currentUser = auth().currentUser;
        if (currentUser) {
          // const courseName = '11th all units + formulas'; // Replace with the actual course name

          // Check if the user's document exists in the 'UserPaidNotes' collection
          firestore()
            .collection('UserPaidNotes')
            .doc(currentUser.email)
            .get()
            .then(doc => {
              if (doc.exists) {
                // The user's document exists, update the field for the purchased course
                firestore()
                  .collection('UserPaidNotes')
                  .doc(currentUser.email)
                  .collection(CollectionandDoc)
                  .doc(CollectionandDoc)
                  .update({[courseName]: true})
                  .then(() => {
                    console.log('Firestore update success');
                  })
                  .catch(error => {
                    console.log('Firestore update error:', error);
                  });
              } else {
                // The user's document doesn't exist, create it and set the field for the purchased course
                firestore()
                  .collection('UserPaidNotes')
                  .doc(currentUser.email)
                  .set({})
                  .then(() => {
                    firestore()
                      .collection('UserPaidNotes')
                      .doc(currentUser.email)
                      .collection(CollectionandDoc)
                      .doc(CollectionandDoc)
                      .set({[courseName]: true})
                      .then(() => {
                        console.log('Firestore update success');
                      })
                      .catch(error => {
                        console.log('Firestore update error:', error);
                      });
                  })
                  .catch(error => {
                    console.log('Firestore update error:', error);
                  });
              }
            })
            .catch(error => {
              console.log('Firestore update error:', error);
            });
        }

        // Handle success (e.g., navigate to PDF viewer)
        // navigation.navigate('PdfViewer');
        PaymentSuccessful();
      } else {
        // Payment error
        console.log('Payment error:', razorpayResponse);
        PaymentError();
      }

      setShowProcessingText(false);
    };

    // Call the function to handle the Razorpay response (success or failure)
    RazorpayCheckout.open(options)
      .then(handleRazorpayResponse)
      .catch(error => {
        // Payment failure callback
        console.log('Payment error:', error);
        PaymentError();

        setShowProcessingText(false);
      });
  }, []);

  const options = {
    description: 'Purchase Course', // Payment description
    image:
      'https://c4.wallpaperflare.com/wallpaper/409/952/920/dragon-ball-z-son-goku-portrait-display-wallpaper-preview.jpg', // Your logo URL
    currency: 'INR', // Currency code (INR for Indian Rupee)
    key: 'rzp_test_3f764oiZfFJhaA', // Your Razorpay API key
    amount: amount, // Payment amount in paisa (e.g., for Rs. 100, amount should be 10000)
    name: courseName, // Course name or any other description
    prefill: {
      email: 'user@example.com', // User's email
      contact: '1234567890', // User's phone number
    },
    theme: {color: '#F37254'}, // Theme color
  };

  return (
    <AlertNotificationRoot>
      <View>
        {/* You can add a loading indicator or other UI elements here */}
        {/* <Text>Processing Payment...</Text> */}
        {showProcessingText && <Text>Processing Payment...</Text>}
      </View>
    </AlertNotificationRoot>
  );
};

export default Payment;
