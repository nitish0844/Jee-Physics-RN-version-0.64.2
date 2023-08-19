// // import notifee from '@notifee/react-native';
// // import {AndroidColor} from '@notifee/react-native';
// // import {View, Button} from 'react-native';
// // import React from 'react';
// // import messaging from '@react-native-firebase/messaging';

// // // async function onAppBootstrap() {
// // //   // Register the device with FCM
// // //   await messaging().registerDeviceForRemoteMessages();

// // //   // Get the token
// // //   const token = await messaging().getToken();

// // //   console.log(token);
// // // }

// // // function onMessageReceived(message) {
// // //   notifee.displayNotification(JSON.parse(message.data.notifee));
// // // }

// // function onMessageReceived(message) {
// //   //   notifee.displayNotification(JSON.parse(message.data.notifee));
// //   const {type, imageUrl, title} = message.data;

// //   if (type === 'NewCourse') {
// //     notifee.displayNotification({
// //       title: title,
// //       body: `Your order was shipped at ${imageUrl}`,
// //       android: {
// //         channelId: '812019205023-9994365901',
// //       },
// //     });
// //   }
// // }

// // messaging().onMessage(onMessageReceived);

// // function Screen() {
// //   async function onDisplayNotification() {
// //     const channelId = await notifee.createChannel({
// //       id: '812019205023-9994365901',
// //       name: 'com.sampleapp.app',
// //     });
// //     // Required for iOS
// //     // See https://notifee.app/react-native/docs/ios/permissions
// //     await notifee.requestPermission();
// //     // const notificationId = await notifee.displayNotification({
// //     //   id: '123',
// //     //   title: 'Notification Title',
// //     //   body: 'Main body content of the notification',
// //     //   android: {
// //     //     channelId,
// //     //   },
// //     // });
// //     // Sometime later...
// //     await notifee.displayNotification({
// //       id: '123',
// //       title: 'Updated Notification Title',
// //       body: 'Updated main body content of the notification',
// //       android: {
// //         channelId,
// //       },
// //     });
// //   }
// //   return (
// //     <View>
// //       <Button
// //         title="Display Notification"
// //         onPress={() => onDisplayNotification()}
// //       />
// //     </View>
// //   );
// // }

// // // messaging().onMessage(onDisplayNotification);

// // export default Screen;

// // import React, {useEffect} from 'react';
// // import {View, Button} from 'react-native';
// // import notifee, {AndroidImportance} from '@notifee/react-native';
// // import messaging from '@react-native-firebase/messaging';

// // function Screen() {
// //   const createNotificationChannel = async () => {
// //     const channelId = await notifee.createChannel({
// //       id: '812019205023-9994365901',
// //       name: 'com.sampleapp.app',
// //       importance: AndroidImportance.HIGH,
// //     });
// //     return channelId;
// //   };

// //   const requestNotificationPermission = async () => {
// //     await notifee.requestPermission();
// //   };

// //   const displayNotification = async (title, body) => {
// //     const channelId = await createNotificationChannel();
// //     await notifee.displayNotification({
// //       //   id: '123',
// //       title: title,
// //       body: body,
// //       android: {
// //         channelId,
// //       },
// //     });
// //   };

// //   const handleNewCourseNotification = async message => {
// //     const {type, imageUrl, title} = message.data;

// //     if (type === 'NewCourse') {
// //       await displayNotification(title, `Your order was shipped at ${imageUrl}`);
// //     }
// //   };

// //   const handleIncomingMessage = async message => {
// //     await createNotificationChannel();
// //     // notifee.displayNotification(JSON.parse(message.data.notifee));
// //     await handleNewCourseNotification(message);
// //   };

// //   //   useEffect(() => {
// //   //     messaging().onMessage(handleIncomingMessage);
// //   //   }, []);

// //   useEffect(() => {
// //     messaging().onMessage(handleIncomingMessage);

// //     notifee.onBackgroundEvent(async ({type, detail}) => {
// //       if (type === notifee.BEHAVIOR_BACKGROUND_ACTION_PRESS) {
// //         // Handle the background action press event here
// //         const {notification} = detail;
// //         console.log(notification);
// //         // You can extract information from the notification and perform actions
// //       }
// //     });
// //   }, []);

// //   return (
// //     <View>
// //       <Button
// //         title="Display Notification"
// //         onPress={async () => {
// //           await requestNotificationPermission();
// //           await displayNotification(
// //             'Updated Notification Title',
// //             'Updated main body content of the notification',
// //           );
// //         }}
// //       />
// //     </View>
// //   );
// // }

// // export default Screen;

// import React, {useEffect} from 'react';
// import {View, Button} from 'react-native';
// import notifee, {AndroidImportance, AndroidStyle} from '@notifee/react-native';
// import messaging from '@react-native-firebase/messaging';
// import {AndroidColor} from '@notifee/react-native';

// function Screen() {
//   const createNotificationChannel = async () => {
//     const channelId = await notifee.createChannel({
//       id: '812019205023-9994365901',
//       name: 'com.sampleapp.app',
//       importance: AndroidImportance.HIGH,
//       badge: true, // disable in badges
//       vibration: true,
//       vibrationPattern: [300, 500],
//       lights: true,
//       lightColor: AndroidColor.RED,
//     });
//     return channelId;
//   };

//   const requestNotificationPermission = async () => {
//     await notifee.requestPermission();
//   };

//   const displayNotification = async (title, body, imageUrl) => {
//     console.log(imageUrl);
//     const channelId = await createNotificationChannel();
//     await notifee.displayNotification({
//       title: title,
//       body: body,
//       color: AndroidColor.RED,
//       importance: AndroidImportance.HIGH,
//       android: {
//         channelId,
//         lights: [AndroidColor.RED, 300, 600],
//         style: {
//           type: AndroidStyle.BIGPICTURE,
//           picture: {
//             uri: imageUrl, // Make sure imageUrl is a valid string URL
//           },
//         },
//       },
//     });
//   };

//   const handleNewCourseNotification = async message => {
//     const {type, imageUrl, title} = message.data;

//     if (type === 'order_shipped') {
//       console.log('Received NewCourse notification:', message.data);
//       await displayNotification(
//         title,
//         `Your order was shipped at ${imageUrl}`,
//         imageUrl,
//       );
//     }
//   };

//   //   const displayNotification = async (title, body) => {
//   //     const channelId = await createNotificationChannel();
//   //     await notifee.displayNotification({
//   //       title: title,
//   //       body: body,
//   //       color: AndroidColor.RED,
//   //       importance: AndroidImportance.HIGH,
//   //       android: {
//   //         channelId,
//   //         lights: [AndroidColor.RED, 300, 600],
//   //         // style: {type: AndroidStyle.BIGPICTURE, picture: imageUrl},
//   //         style: {
//   //           type: AndroidStyle.BIGPICTURE,
//   //           picture:
//   //             'https://cdn.pixabay.com/photo/2016/11/25/07/00/diamond-1857736_640.png',
//   //         },
//   //       },
//   //     });
//   //   };

//   //   const handleNewCourseNotification = async message => {
//   //     const {type, imageUrl, title} = message.data;

//   //     // if (type === 'NewCourse') {
//   //     if (type === 'order_shipped') {
//   //       console.log('Received NewCourse notification:', message.data);
//   //       await displayNotification(title, `Your order was shipped at ${imageUrl}`);
//   //     }
//   //   };

//   useEffect(() => {
//     // Set up background message handler
//     messaging().setBackgroundMessageHandler(async remoteMessage => {
//       // Handle background messages here
//       const {data} = remoteMessage;
//       // Call your notification handling logic
//       await handleNewCourseNotification({data});
//     });

//     // Set up background event handler
//     notifee.onBackgroundEvent(async ({type, detail}) => {
//       if (type === notifee.BEHAVIOR_BACKGROUND_ACTION_PRESS) {
//         // Handle the background action press event here
//         const {notification} = detail;
//         console.log(notification);
//         // You can extract information from the notification and perform actions
//       }
//     });

//     // Request notification permission and handle incoming messages
//     requestNotificationPermission();
//     messaging().onMessage(handleNewCourseNotification);
//   }, []);

//   return (
//     <View>
//       <Button
//         title="Display Notification"
//         onPress={async () => {
//           await displayNotification(
//             'Updated Notification Title',
//             'Updated main body content of the notification',
//           );
//         }}
//       />
//     </View>
//   );
// }

// export default Screen;
