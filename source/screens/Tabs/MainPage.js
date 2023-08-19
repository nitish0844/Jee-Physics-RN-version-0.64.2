import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  LogBox,
} from 'react-native';
import FloatingButton from '../../components/FloatingButton/FloatingButton';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import SearchBar from 'react-native-dynamic-search-bar';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {Pagination} from 'react-native-snap-carousel';
import messaging from '@react-native-firebase/messaging';

import AdvancedUnit from '../../components/HomeTab/AdvancedUnit';
import PopularNotes from '../../components/HomeTab/PopularNotes';
import PhysicsFormula from '../../components/HomeTab/PhysicsFormula';
import CombinedUnitandFormula from '../../components/HomeTab/CombinedUnitandFormula';
// import NotificationButton from '../../components/NotifyShower/NotificationButton';

import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';

// getWindow().clearFlags(WindowManager.LayoutParams.FLAG_SECURE);

LogBox.ignoreAllLogs();

const MainPage = ({hasNotification}) => {
  let carouselRef = useRef(null);
  // const [Name, setName] = useState('');
  const [userData, setUserData] = useState('');
  const scrollViewRef = useRef(null);

  const {width: screenWidth} = Dimensions.get('window');

  useFocusEffect(() => {
    // Scroll to the top of the ScrollView when the screen is loaded
    scrollViewRef.current.scrollTo({x: 0, y: 0, animated: false});
  });

  const data = [
    {
      title: 'Get top 1% universities you are in right place!',
      imgUrl:
        'https://firebasestorage.googleapis.com/v0/b/platform2learn-54f87.appspot.com/o/slide1.png?alt=media&token=05c6a304-7b31-439b-8fc0-77acbec7e9f0',
      color: '#BEE5FE',
    },
    {
      title: 'Get our material and score above you have aimed!',
      imgUrl:
        'https://firebasestorage.googleapis.com/v0/b/platform2learn-54f87.appspot.com/o/slide2.png?alt=media&token=961efaa0-e0b1-4fe3-8f0e-518e5e5f63e6',
      color: '#F1BEFE',
    },
    {
      title: 'Our material is more valuable than top institute in India.',
      imgUrl:
        'https://firebasestorage.googleapis.com/v0/b/platform2learn-54f87.appspot.com/o/slide3.png?alt=media&token=151c3867-346e-46af-8e6b-3ca8f5fd6bb0',
      color: '#FED9BE',
    },
    {
      title: 'Now study smart your app makes you to be topper in JEE.',
      imgUrl:
        'https://firebasestorage.googleapis.com/v0/b/platform2learn-54f87.appspot.com/o/slide4.png?alt=media&token=5ba4c555-13d5-429c-8ba8-b73963108e2e',
      color: '#DAFEBE',
    },
  ];

  const CarouselCardItem = ({item, index}, parallaxProps) => {
    return (
      <View
        style={[styles.ImageContainer, {backgroundColor: item.color}]}
        key={index}>
        {/* <Image source={{uri: item.imgUrl}} style={styles.image} /> */}
        <ParallaxImage
          source={{uri: item.imgUrl}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.1}
          {...parallaxProps}
        />
        <Text style={styles.header}>{item.title}</Text>
      </View>
    );
  };

  const fetchName = async () => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        // User is not logged in
        return;
      }
      const userDoc = await firestore()
        .collection('emailAuth')
        .doc(currentUser.email)
        .get();
      const userData = userDoc.data();
      setUserData(userData);
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  };

  useEffect(() => {
    fetchName();
  }, []);

  const Navigation = useNavigation();
  return (
    <AlertNotificationRoot>
      <SafeAreaView style={styles.container}>
        <ScrollView style={{flex: 1}} ref={scrollViewRef}>
          <View style={styles.contentContainer}>
            <View style={styles.topContainer}>
              {/* <NotificationButton /> */}
              <View style={styles.headContainer}>
                <Text style={styles.Name}>
                  Hi, {userData && userData.name ? userData.name : ''} 😊
                </Text>
                <Text style={styles.title}>
                  Aim higher than you ever imagine
                </Text>
              </View>
              <SearchBar
                style={styles.SearchBar}
                placeholder="Search here"
                onPress={() => Navigation.navigate('Screen')}
                onChangeText={text => console.log(text)}
                editable={false}
                clearIconComponent
                textInputStyle={{opacity: 0.3}}
              />
            </View>
            <View>
              {/* <Carousel
                ref={carouselRef}
                // layoutCardOffset={true}
                // sliderWidth={screenWidth}
                sliderWidth={screenWidth + 50}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 10}
                data={data}
                renderItem={CarouselCardItem}
                hasParallaxImages={true}
                autoplay={true}
                loop={true}
                autoplayDelay={3000}
              /> */}
            </View>
            <View id="Popular Notes">
              <PopularNotes />
            </View>
            <AdvancedUnit />
            <PhysicsFormula />
            <CombinedUnitandFormula />
          </View>
        </ScrollView>
        <FloatingButton />
      </SafeAreaView>
    </AlertNotificationRoot>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topContainer: {
    height: 200,
    width: '100%',
    backgroundColor: '#d0eff5',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  contentContainer: {
    paddingBottom: 50, // Adjust the padding as needed
  },
  Name: {
    color: '#000',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 2,
  },
  title: {
    color: '#5C5959',
    fontFamily: 'Poppins-Regular',
    letterSpacing: 1,
    top: 5,
  },
  headContainer: {
    top: 35,
    left: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 25,
    width: '90%',
    alignSelf: 'center',
    marginTop: 70,
    backgroundColor: '#fff',
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
  SearchBar: {
    backgroundColor: '#fff',
    top: 70,
    height: 45,
  },
  ImageContainer: {
    backgroundColor: '#FBE6D6',
    width: 340,
    height: 170,
    shadowColor: '#000',
    marginTop: 30,
    borderRadius: 10,
    justifyContent: 'center',
    right: 5,
  },
  image: {
    width: 150,
    height: 50,
    resizeMode: 'cover',
  },
  header: {
    color: '#222',
    fontSize: 10,
    letterSpacing: 0.7,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    top: 10,
  },
  imageContainer: {
    height: 100,
    width: 80,
    alignSelf: 'flex-end',
  },
  popularText: {
    color: '#000',
    marginTop: 25,
    left: '7%',
    fontWeight: '700',
    fontSize: 18,
  },
  ViewAll: {
    color: '#A0A0A0',
    alignSelf: 'flex-end',
    right: 20,
    bottom: 20,
  },
});
