// import React, {useState, useEffect} from 'react';
// import {TouchableOpacity, View, StyleSheet} from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const NotificationButton = ({newNotification}) => {
//   const [notifyData, setNotifyData] = useState(false);
//   const [openedNotification, SetopenedNotification] = useState(false);

//   useEffect(() => {
//     const loadNotifyData = async () => {
//       try {
//         const flag = await AsyncStorage.getItem('newNotificationFlag');
//         setNotifyData(flag === 'true');
//       } catch (error) {
//         console.error('Error loading notification flag:', error);
//       }
//     };
//     loadNotifyData();
//   }, []);

//   const buttonPress = async () => {
//     await AsyncStorage.setItem('newNotificationFlag', 'false');
//     setNotifyData(false);
//   };

//   return (
//     <TouchableOpacity onPress={buttonPress} style={styles.container}>
//       <Feather name="bell" size={25} color="#000" />
//       {/* {hasNotification && <View style={styles.notificationDot} />} */}
//       {notifyData && <View style={styles.notificationDot} />}
//       {newNotification && <View style={styles.notificationDot} />}
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 10,
//     alignSelf: 'flex-end',
//     position: 'absolute',
//     top: 20,
//     right: 10,
//   },
//   notificationDot: {
//     width: 10,
//     height: 10,
//     backgroundColor: 'red',
//     borderRadius: 5,
//     position: 'absolute',
//     top: -5,
//     right: -5,
//   },
// });

// export default NotificationButton;
