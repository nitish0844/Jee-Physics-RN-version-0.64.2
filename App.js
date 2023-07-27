import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons.js';
import Feather from 'react-native-vector-icons/Feather.js';
import NetInfo from '@react-native-community/netinfo';
// import dynamicLinks from '@react-native-firebase/dynamic-links';
import NoInternet from './source/screens/NoInternet.js';
import {ActivityIndicator, View} from 'react-native';

// import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';

import Slide from './source/screens/Slider/Slide.js';
import Signup from './source/screens/Login and Signup screen/SignUp.js';
import LoginScreen from './source/screens/Login and Signup screen/LoginScreen.js';
import ForgetPassword from './source/screens/Login and Signup screen/ForgetPassword.js';
// import NewPassword from './source/screens/Login and Signup screen/NewPassword.js';

import MainPage from './source/screens/Tabs/MainPage.js';
import PdfViewer from './source/components/Pdf/PdfViewer.js';

import NotesMain from './source/screens/Tabs/NotesMain.js';
import ProfileMain from './source/screens/Tabs/ProfileMain.js';
import PurchaseMain from './source/screens/Tabs/PurchaseMain.js';
import {useNavigation} from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';

import Payment from './source/components/Payment/Payment.js';
import Loader from './source/components/Loader/Loader.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// const RootNavigator = () => {
//   const HomeStack = () => {
//     return (
//       <Stack.Navigator
//         initialRouteName="Sliding"
//         screenOptions={{headerShown: false}}>
//         <Stack.Screen
//           name="Sliding"
//           component={Slider}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="Signup"
//           component={Signup}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="NewPassword"
//           component={NewPassword}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="ForgetPassword"
//           component={ForgetPassword}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="Login"
//           component={LoginScreen}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="SearchPage"
//           component={SearchPage}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="MainPage"
//           component={MainPage}
//           options={{headerShown: false}}
//         />
//       </Stack.Navigator>
//     );
//   };

//   const BottomTabs = () => {
//     return (
//       // <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({route}) => ({
//           // tabBarStyle: { backgroundColor: "red" },
//           tabBarActiveTintColor: 'tomato',
//           tabBarInactiveTintColor: 'gray',
//           tabBarIcon: ({focused, size, colour}) => {
//             let iconName;
//             if (route.name === 'MainPage') {
//               iconName = focused ? 'home-variant' : 'home-variant-outline';
//             } else if (route.name === 'SearchPage') {
//               iconName = focused ? 'earth' : 'google-earth';
//             } else if (route.name === 'Isslocation') {
//               iconName = focused ? 'satellite-uplink' : 'satellite-variant';
//             } else if (route.name === 'DataSol') {
//               iconName = focused ? 'robot' : 'robot-outline';
//             }

//             // let iconName;
//             // if (route.name === "Home") {
//             //   iconName = focused ? "home-variant" : "home-variant-outline";
//             // } else if (route.name === "Planetsapi") {
//             //   iconName = focused ? "earth" : "google-earth";
//             // } else if (route.name === "DataSol") {
//             //   iconName = focused ? "robot" : "robot-outline";
//             // }
//             return (
//               // <View style={{ backgroundColor: focused ? "red" : "blue" }}>
//               <MaterialCommunityIcons
//                 name={iconName}
//                 size={size}
//                 // colour={focused ? "red" : "blue"}
//               />
//               // </View>
//             );
//           },
//         })}>
//         <Tab.Screen
//           options={{
//             header: () => null,
//             tabBarLabel: () => {
//               return null;
//             },
//           }}
//           name="MainPage"
//           // component={HomeScreen}
//           component={MainPage}
//         />
//         <Tab.Screen
//           options={{
//             header: () => null,
//             tabBarLabel: () => {
//               return null;
//             },
//           }}
//           name="SearchPage"
//           component={SearchPage}
//         />
//         {/* <Tab.Screen
//           options={{
//             header: () => null,
//             tabBarLabel: () => {
//               return null;
//             },
//           }}
//           name="Isslocation"
//           component={IssLocation}
//         /> */}
//         {/* <Tab.Screen
//           options={{
//             header: () => null,
//             tabBarLabel: () => {
//               return null;
//             },
//           }}
//           name="DataSol"
//           component={DataSol}
//         /> */}
//       </Tab.Navigator>
//     );
//   };

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="HomeStack"
//           component={HomeStack}
//           options={{headerShown: false}}
//         />
//         {/* <Stack.Screen
//           name="MainPage"
//           component={MainPage}
//           options={{headerShown: false}}
//         /> */}
//         <Stack.Screen
//           name="BottomTabs"
//           component={BottomTabs}
//           options={{headerShown: false}}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

const RootNavigator = () => {
  const navigation = useNavigation(); // Add this line to get the navigation object

  // const handleDynamicLinks = async link => {
  //   let productId = link.url.split('=').pop();
  //   console.log('productId:', productId);
  //   navigation.navigate('NewPassword');
  // };

  // useEffect(() => {
  //   const unsubscribe = dynamicLinks().onLink(handleDynamicLinks);
  //   return () => unsubscribe();
  // }, []);

  // useEffect(() => {
  //   getDeviceToken();
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);

  // const getDeviceToken = async () => {
  //   let token = await messaging().getToken();
  //   console.log(token);
  // };

  // const requestUserPermission = async () => {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //   }
  // };

  // useEffect(() => {
  //   if (requestUserPermission()) {
  //     messaging()
  //       .getToken()
  //       .then(fcmToken => {
  //         console.log('Fcm Token', fcmToken);
  //       });
  //   }
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     // Handle the incoming message here and display the notification
  //     const {title, body} = remoteMessage.notification;
  //     // Use a notification library or custom code to display the notification
  //     // For example, you can use react-native-push-notification or react-native-notifications
  //     // to display the notification.
  //     // Example using react-native-push-notification:
  //     PushNotification.localNotification({
  //       title: title,
  //       message: body,
  //     });
  //   });

  //   return unsubscribe;
  // }, []);

  // PushNotification.configure({
  //   // Other configuration options...

  //   // Create a notification channel for Android
  //   onRegister: function (token) {
  //     if (Platform.OS === 'android') {
  //       PushNotification.createChannel(
  //         {
  //           channelId: '812019205023-9994365901', // Provide a unique channel id
  //           channelName: 'Jee Physics App', // Specify the channel name
  //           channelDescription: 'Hii Students', // Provide a channel description
  //           soundName: 'default', // Specify the default sound for notifications
  //           importance: 4, // Set the importance level (1: Default, 4: High)
  //           vibrate: true, // Enable vibration for notifications
  //         },
  //         created => console.log(`Channel created: ${created}`),
  //       );
  //     }
  //   },

  //   // Other event handlers...
  // });

  // Configure the notification library
  // PushNotification.configure({
  //   // Called when the token is generated or registered
  //   onRegister: function (token) {
  //     console.log('Registered with token:', token.token);
  //   },
  //   // Called when a remote or local notification is opened or received
  //   onNotification: function (notification) {
  //     console.log('Received notification:', notification);
  //     // You can handle the received notification here
  //   },
  //   // Android-specific configuration
  //   android: {
  //     channelId: '812019205023-9994365901', // Replace with your desired channel ID
  //     channelName: 'com.jeephysics.app', // Replace with your desired channel name
  //     importance: 4, // Set the importance level (1: Default, 4: High)
  //     vibrate: true, // Enable vibration for notifications
  //   },
  //   // iOS-specific configuration
  //   ios: {
  //     // iOS configuration options here
  //   },
  //   // Other configuration options...
  // });

  const MainStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="Sliding"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Sliding" component={Slide} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      </Stack.Navigator>
    );
  };

  const BottomTabs = () => {
    return (
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={({route}) => ({
          // headerStyle: {backgroundColor: '#42f44b'},
          headerTintColor: '#fff',
          headerTitleStyle: {fontWeight: 'bold'},
          tabBarActiveTintColor: '#17A1FA',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '800',
          },
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'MainPage') {
              iconName = 'home-outline';
              iconComponent = (
                <MaterialCommunityIcons
                  name={iconName}
                  size={30}
                  color={color}
                />
              );
            } else if (route.name === 'NotesMain') {
              iconName = 'book';
              iconComponent = (
                <Feather name={iconName} size={25} color={color} />
              );
            } else if (route.name === 'ProfileMain') {
              iconName = 'user';
              iconComponent = (
                <Feather name={iconName} size={27} color={color} />
              );
            } else if (route.name === 'PurchaseMain') {
              iconName = 'shopping-bag';
              iconComponent = (
                <Feather name={iconName} size={25} color={color} />
              );
            }
            return iconComponent;
          },
        })}>
        <Tab.Screen
          name="MainPage"
          component={MainPage}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarHideOnKeyboard: true,
          }}
        />
        <Tab.Screen
          name="NotesMain"
          component={NotesMain}
          options={{
            headerShown: false,
            tabBarLabel: 'Notes',
            tabBarHideOnKeyboard: true,
          }}
        />
        <Tab.Screen
          name="PurchaseMain"
          component={PurchaseMain}
          options={{
            headerShown: false,
            tabBarLabel: 'Purchase',
            tabBarHideOnKeyboard: true,
          }}
        />
        <Tab.Screen
          name="ProfileMain"
          component={ProfileMain}
          options={{
            headerShown: false,
            tabBarLabel: 'Profile',
            tabBarHideOnKeyboard: true,
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    // <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="MainStack"
        component={MainStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PdfViewer"
        component={PdfViewer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};

const App = () => {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Is connected?', state.isConnected);
      setConnected(state.isConnected);
    });

    // Simulate fetching data from the internet
    setTimeout(() => {
      setLoading(false); // Once data is fetched, set loading to false
    }, 5000); // Adjust the delay as needed

    return () => {
      unsubscribe(); // Cleanup the event listener when the component unmounts
    };
  }, []);

  if (loading) {
    // Show a loader until the data is fetched
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      {!connected ? (
        <>
          <NoInternet />
        </>
      ) : (
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      )}
    </>
  );
};

export default App;
