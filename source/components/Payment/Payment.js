import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import RazorpayCheckout from 'react-native-razorpay';

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
        navigation.replace('PdfViewer');
      },

      onHide: () => {
        navigation.replace('PdfViewer');
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

        const currentUser = auth().currentUser;

        if (currentUser) {
          const userPaidNotesRef = firestore()
            .collection('UserPaidNotes')
            .doc(currentUser.email);

          // Increment the payment count and create/update the subdocument
          if (currentUser) {
            const userPaymentHistoryRef = firestore()
              .collection('PaymentHistory')
              .doc(currentUser.email)
              .collection('Payment'); // Reference to the 'payment' subcollection

            const userPaymentDocRef = firestore()
              .collection('PaymentHistory')
              .doc(currentUser.email);

            // Calculate the amount in paisa (remove the last two digits)
            const amountInPaisa = Math.floor(amount / 100);

            // Check if the user's email doc exists in the 'PaymentHistory' collection
            userPaymentDocRef
              .get()
              .then(doc => {
                if (doc.exists) {
                  // Email doc exists, create the subdocument in the 'payment' subcollection
                  userPaymentHistoryRef
                    .get()
                    .then(querySnapshot => {
                      const paymentCount = querySnapshot.size;
                      const subDocName = `payment${paymentCount + 1}`;

                      userPaymentHistoryRef
                        .doc(subDocName)
                        .set({
                          date: new Date().toISOString().slice(0, 10),
                          time: new Date().toLocaleTimeString(),
                          amount: amountInPaisa,
                          course: courseName,
                          paymentId: razorpayResponse.razorpay_payment_id,
                        })
                        .then(() => {
                          console.log('Payment details stored in Firestore');
                        })
                        .catch(error => {
                          console.log('Error storing payment details:', error);
                        });
                    })
                    .catch(error => {
                      console.log('Error fetching payment history:', error);
                    });
                } else {
                  // Email doc doesn't exist, create it first
                  userPaymentDocRef
                    .set({})
                    .then(() => {
                      console.log(
                        'Email document created in PaymentHistory collection',
                      );
                      // Now create the subdocument in the 'payment' subcollection
                      userPaymentHistoryRef
                        .doc('payment1') // Assuming 'payment1' is the initial subdoc name
                        .set({
                          date: new Date().toISOString().slice(0, 10),
                          time: new Date().toLocaleTimeString(),
                          amount: amountInPaisa,
                          course: courseName,
                          paymentId: razorpayResponse.razorpay_payment_id,
                        })
                        .then(() => {
                          console.log('Payment details stored in Firestore');
                        })
                        .catch(error => {
                          console.log('Error storing payment details:', error);
                        });
                    })
                    .catch(error => {
                      console.log('Error creating email document:', error);
                    });
                }
              })
              .catch(error => {
                console.log('Error checking email document:', error);
              });
          }

          // Check if the user's document exists in the 'UserPaidNotes' collection
          userPaidNotesRef
            .get()
            .then(doc => {
              if (doc.exists) {
                // Update the field for the purchased course within the subcollection
                userPaidNotesRef
                  .collection(CollectionandDoc)
                  .doc(CollectionandDoc)
                  .set({[courseName]: true}, {merge: true}) // Merge to avoid overwriting other fields
                  .then(() => {
                    console.log('Firestore update success');
                  })
                  .catch(error => {
                    console.log('Firestore update error:', error);
                  });
              } else {
                // The user's document doesn't exist, create it and set the course as true
                userPaidNotesRef
                  .set({})
                  .then(() => {
                    userPaidNotesRef
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
    theme: {color: '#92ff33'}, // Theme color
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
