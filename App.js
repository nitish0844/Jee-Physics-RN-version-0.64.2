import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons.js';
import Feather from 'react-native-vector-icons/Feather.js';
import NetInfo from '@react-native-community/netinfo';
// import dynamicLinks from '@react-native-firebase/dynamic-links';
import NoInternet from './source/screens/No Internet/NoInternet.js';
import LottieView from 'lottie-react-native';

import messaging from '@react-native-firebase/messaging';
import {StyleSheet} from 'react-native';

import Slide from './source/screens/Slider/Slide.js';
import Signup from './source/screens/Login and Signup screen/SignUp.js';
import LoginScreen from './source/screens/Login and Signup screen/LoginScreen.js';
import ForgetPassword from './source/screens/Login and Signup screen/ForgetPassword.js';

import MainPage from './source/screens/Tabs/MainPage.js';
import PdfViewer from './source/components/Pdf/PdfViewer.js';

import NotesMain from './source/screens/Tabs/NotesMain.js';
import ProfileMain from './source/screens/Tabs/ProfileMain.js';
import PurchaseMain from './source/screens/Tabs/PurchaseMain.js';
import {useNavigation} from '@react-navigation/native';
import PushNotification, {Importance} from 'react-native-push-notification';

import Payment from './source/components/Payment/Payment.js';
// import Loader from './source/components/Loader/Loader.js';
import SplashScreen from './source/screens/SplashScreen/SplashScreen.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Loader from './source/screens/Loader/Loader.js';
import SearchComponent from './source/components/SearchBar function/SearchPage.js';
import ChatCrips from './source/components/Customer_Service/ChatCrisp.js';
import PaymentHistoryData from './source/components/Payment/PaymentHistoryData.js';
import NotificationButton from './source/components/NotifyShower/NotificationButton.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [newNotification, setNewNotification] = useState(false);

  const RootNavigator = () => {
    // const navigation = useNavigation(); // Add this line to get the navigation object

    // const handleDynamicLinks = async link => {
    //   let productId = link.url.split('=').pop();
    //   console.log('productId:', productId);
    //   navigation.navigate('NewPassword');
    // };

    // useEffect(() => {
    //   const unsubscribe = dynamicLinks().onLink(handleDynamicLinks);
    //   return () => unsubscribe();
    // }, []);

    useEffect(() => {
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        await AsyncStorage.setItem('newNotificationFlag', 'true');
        setNewNotification(true);
        const {title, body} = remoteMessage.notification;
        PushNotification.localNotification({
          title: title,
          message: body,
          channelId: '812019205023-9994365901', // Make sure this matches the channelId you defined in PushNotification.configure()
          category: '812019205023-9994365901',
          vibration: 500,
          vibrate: true,
          playSound: true,
          soundName: 'notification.mp3',
          // largeIconUrl:
          //   'https://w7.pngwing.com/pngs/537/580/png-transparent-bell-notification-communication-information-icon.png',
          // bigLargeIconUrl:
          //   'https://w7.pngwing.com/pngs/537/580/png-transparent-bell-notification-communication-information-icon.png',
        });
      });

      return unsubscribe;
    }, []);

    const requestUserPermission = async () => {
      try {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        // if (enabled) {
        //   console.log('Authorization status:', authStatus);
        // }
      } catch (error) {
        console.error('Error requesting permission:', error);
      }
    };

    useEffect(() => {
      requestUserPermission();
    }, []);

    PushNotification.configure({
      // Called when the token is generated or registered
      // onRegister: function (token) {
      //   console.log('Registered with token:', token.token);
      // },
      // Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('Received notification:', notification);
        // You can handle the received notification here
      },

      // Android-specific configuration
      android: {
        channelId: '812019205023-9994365901', // Replace with your desired channel ID
        channelName: 'com.sampleapp.app', // Replace with your desired channel name
        // importance: 4, // Set the importance level (1: Default, 4: High)
        vibrate: true, // Enable vimport { firestore } from '@react-native-firebase/firestore';
        vibration: 500,
        playSound: true,
        soundName: 'notification.mp3',
        importance: Importance.HIGH,
      },
      // iOS-specific configuration
      ios: {
        // iOS configuration options here
      },
      // Other configuration options...
    });

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
              } else if (route.name === 'LiveStream') {
                iconName = 'play';
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

          {/* <Tab.Screen
          name="LiveStream"
          component={LiveStreamSetting}
          options={{
            headerShown: false,
            tabBarLabel: 'Videos',
            tabBarHideOnKeyboard: true,
          }}
        /> */}

          {/* <Tab.Screen
          name="LiveStream"
          component={LiveStream}
          options={{
            tabBarIcon: ({focused, color, size}) => {
              return (
                <LiveStreamButton
                  focused={focused}
                  color={color}
                  size={size}
                  navigation={navigation}
                />
              );
            },
            headerShown: false,
            tabBarLabel: 'LiveStream',
            tabBarHideOnKeyboard: true,
          }}
        /> */}
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
        <Stack.Screen
          name="SearchPage"
          component={SearchComponent}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChatCrips"
          component={ChatCrips}
          options={{
            headerShown: false,
            ...TransitionPresets.ModalPresentationIOS, // Apply custom animation
          }}
        />
        <Stack.Screen
          name="PaymentHistory"
          component={PaymentHistoryData}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
        name="PurchaseMain"
        component={PurchaseMain}
        options={{headerShown: false}}
      /> */}
      </Stack.Navigator>
      // </NavigationContainer>
    );
  };

  const customTransition = {
    gestureDirection: 'horizontal',
    transitionSpec: {
      open: TransitionSpecs.TransitionIOSSpec,
      close: TransitionSpecs.TransitionIOSSpec,
    },
    cardStyleInterpolator: ({current, layouts}) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  };

  // const LiveStreamButton = ({focused, color, size, navigation}) => {
  //   return (
  //     <TouchableOpacity
  //       style={[
  //         styles.liveStreamButton,
  //         {backgroundColor: focused ? '#17A1FA' : '#fff'},
  //       ]}
  //       onPress={() => navigation.navigate('LiveStream')}>
  //       <Feather
  //         name="play"
  //         size={30} // Adjust the size as needed
  //         color={focused ? '#fff' : color}
  //         style={styles.iconStyle}
  //       />
  //     </TouchableOpacity>
  //   );
  // };

  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Is connected?', state.isConnected);
      setConnected(state.isConnected);
    });

    return () => {
      unsubscribe(); // Cleanup the event listener when the component unmounts
    };
  }, []); // Remove 'loading' from the dependency array to avoid infinite loop

  return (
    <>
      <NavigationContainer>
        {!connected ? (
          <>
            <NoInternet />
          </>
        ) : (
          <RootNavigator notification={newNotification} />
        )}
      </NavigationContainer>
      {/* <NotificationButton openedNotification={openedNotification} /> */}
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  liveStreamButton: {
    width: 60, // Adjust the width as needed
    height: 60, // Adjust the height as needed
    borderRadius: 35, // Makes it round
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 5, // Add shadow for visual depth
    alignSelf: 'center',
    position: 'absolute',
    bottom: 3,
    // zIndex: 99,
  },
  iconStyle: {
    marginLeft: 8, // Adjust this to center the icon
  },
});
