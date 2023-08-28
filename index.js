/**
//  * @format
//  */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';
// // import {register} from '@videosdk.live/react-native-sdk';
// import messaging from '@react-native-firebase/messaging';
// import PushNotification, {Importance} from 'react-native-push-notification';

// // messaging().setBackgroundMessageHandler(async remoteMessage => {
// //   // Your code to handle notifications in killed state. For example
// //   console.log('Killed state notification.', remoteMessage);
// //   PushNotification.localNotification({
// //     title: remoteMessage.data.title,
// //     message: remoteMessage.data.body,
// //     bigPictureUrl: remoteMessage.data.imageUrl,
// //     channelId: '812019205023-9994365901',
// //     importance: Importance.HIGH,
// //     // Add other notification options here
// //   });
// // });

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
// });

// AppRegistry.registerComponent(appName, () => App);

// // messaging().setBackgroundMessageHandler(async remoteMessage => {
// //   // Your code to handle notifications in killed state. For example
// //   console.log('Killed state notification.', remoteMessage.data);

// //   // Schedule a local notification using react-native-push-notification
// //   await PushNotification.localNotification({
// //     title: remoteMessage.data.title,
// //     message: remoteMessage.data.body,
// //     bigPictureUrl: remoteMessage.data.imageUrl,
// //     channelId: '812019205023-9994365901',
// //     importance: Importance.HIGH,
// //     // Add other notification options here
// //   });
// // });

// // // register();
// // AppRegistry.registerComponent(appName, () => App);

// // AppRegistry.registerComponent('app', () => HeadlessCheck);
// // AppRegistry.registerComponent(appName, () => App);

/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

// Background messaging handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  // Process remoteMessage.data and show notifications
  console.log(remoteMessage.data);

  PushNotification.localNotification({
    title: remoteMessage.data.title,
    message: remoteMessage.data.body,
    bigPictureUrl: remoteMessage.data.imageUrl,
    channelId: '812019205023-9994365901',
    // Add other notification options here
  });
});

// const HeadlessCheck = ({isHeadless}) => {
//   if (isHeadless) {
//     return null;
//   }

//   return <Main />;
// };

// const Main = () => {
//   return (
//     <>
//       {/* <PersistGate loading={null} persistor={persistor}> */}
//       <App />
//       {/* </PersistGate> */}
//     </>
//   );
// };

AppRegistry.registerComponent(appName, () => App);
