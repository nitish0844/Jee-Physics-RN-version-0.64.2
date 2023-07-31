import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  LogBox,
  ActivityIndicator,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';

import Carousel, {Pagination} from 'react-native-snap-carousel';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import Loader from '../Loader/Loader';
import firestore from '@react-native-firebase/firestore';
// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SLIDER_WIDTH = Dimensions.get('window').width + 85;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
LogBox.ignoreAllLogs();

const data = [
  {
    title: 'Get top 1% universities you are in right place!',
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/platform2learn-54f87.appspot.com/o/slide1.png?alt=media&token=05c6a304-7b31-439b-8fc0-77acbec7e9f0',
    color: '#5bebf0',
  },
  {
    title: 'Get our material and score above you have aimed!',
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/platform2learn-54f87.appspot.com/o/slide2.png?alt=media&token=961efaa0-e0b1-4fe3-8f0e-518e5e5f63e6',
    color: '#e35bf5',
  },
  {
    title: 'Our material is more valuable than top institute in India.',
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/platform2learn-54f87.appspot.com/o/slide3.png?alt=media&token=151c3867-346e-46af-8e6b-3ca8f5fd6bb0',
    color: '#ff9124',
  },
  {
    title: 'Now study smart your app makes you to be topper in JEE.',
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/platform2learn-54f87.appspot.com/o/slide4.png?alt=media&token=5ba4c555-13d5-429c-8ba8-b73963108e2e',
    color: '#83f74d',
  },
];

const CarouselCardItem = ({item, index, blurHeight}) => {
  return (
    <View style={[styles.cardContainer, {shadowColor: item.color}]}>
      <View style={[styles.container, {height: blurHeight}]} key={index}>
        <Image source={{uri: item.imgUrl}} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.textBackground}>
          {/* Wrap text in a View with white background */}
          <Text style={styles.header}>{item.title}</Text>
        </View>
      </View>
    </View>
  );
};

const Slide = ({navigation}) => {
  const [value, setValue] = useState(0);
  const [loginCheckInProgress, setLoginCheckInProgress] = useState(true);

  let carouselRef = useRef(null);

  const handleNext = () => {
    if (value < data.length - 1) {
      carouselRef.snapToNext();
    } else {
      navigation.replace('Login');
    }
  };

  const handlevsible = () => {
    if (value === 2) {
      setShowComponent(!showComponent);
    }
  };

  const buttonfuntion = () => {
    handleNext();
    handlevsible();
  };

  const [showComponent, setShowComponent] = useState(true);

  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    const checkUserStatus = async () => {
      const user = auth().currentUser;
      if (user && user.emailVerified && !hasNavigatedRef.current) {
        hasNavigatedRef.current = true;
        let token = await messaging().getToken();
        await firestore()
          .collection('UserFcmToken')
          .doc(user.email)
          .set({FcmToken: token});

        // Store a flag indicating that the slider has been shown after successful login
        await AsyncStorage.setItem('SliderShown', 'true');
        navigation.replace('BottomTabs');
      } else {
        // Check if the slider has been shown before (from AsyncStorage)
        const sliderShownBefore = await AsyncStorage.getItem('SliderShown');
        if (sliderShownBefore === 'true') {
          // Slider has been shown before, navigate to the main page (BottomTabs)
          navigation.replace('Login');
        } else {
          // Slider has not been shown before, continue showing the slide
          setLoginCheckInProgress(false);
        }
      }
    };

    setTimeout(() => {
      checkUserStatus();
    }, 500);

    // checkUserStatus();
  }, []);

  return (
    <>
      {loginCheckInProgress ? ( // Show activity indicator while login check is in progress
        <View style={styles.loadingContainer}>
          {/* <ActivityIndicator size="large" color="red" /> */}
          <Loader />
        </View>
      ) : (
        <SafeAreaView style={[styles.container2]}>
          <View style={{}}>
            <View style={[styles.textContainer, {marginTop: 1}]}>
              <Text style={styles.title}>JEE Physics</Text>
            </View>
            <Carousel
              layout="default"
              layoutCardOffset={9}
              ref={c => {
                carouselRef = c;
              }}
              data={data}
              renderItem={CarouselCardItem}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              onSnapToItem={index => setValue(index)}
              useScrollView={false}
              scrollEnabled={false}
            />
          </View>

          <View style={styles.Dotstyle}>
            <View>
              {showComponent && (
                <Pagination
                  dotsLength={data.length}
                  activeDotIndex={value}
                  carouselRef={carouselRef} // Use carouselRef.current instead of carouselRef
                  dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 10,
                    marginHorizontal: -5,
                    backgroundColor: '#17A1FA',
                  }}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                  tappableDots={true}
                />
              )}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            {/* Fixed height for the button container */}
            <View style={{height: 50}}>
              {value === data.length - 1 ? (
                <TouchableOpacity
                  onPress={buttonfuntion}
                  style={styles.buttonLets}>
                  <Text style={styles.buttonText}>Let's Crack JEE</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={buttonfuntion} style={styles.button}>
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default Slide;

const styles = StyleSheet.create({
  cardContainer: {
    shadowOffset: {
      width: 1,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 120.49,
    elevation: 50,
    borderRadius: 600,
    top: '5%',
  },
  container: {
    width: ITEM_WIDTH,
    paddingTop: 80,
    height: '80%',
  },
  image: {
    width: ITEM_WIDTH,
    height: 360,
    bottom: 50,
  },
  header: {
    color: '#222',
    fontSize: 25,
    paddingTop: 70,
    letterSpacing: 0.7,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  body: {
    color: '#222',
    fontSize: 18,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  Dotstyle: {
    alignSelf: 'flex-start',
    right: 30,
    bottom: '4%',
  },
  button: {
    borderRadius: 50,
    backgroundColor: '#17A1FA',
    height: 42,
    width: 81,
    justifyContent: 'center',
    left: '175%',
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    color: '#1a1b1f',
    alignSelf: 'center',
    fontFamily: 'RobotoMono-SemiBold',
  },
  buttonLets: {
    borderRadius: 50,
    backgroundColor: '#17A1FA',
    height: 42,
    width: 160,
    justifyContent: 'center',
    fontWeight: '800',
    right: 20,
  },
  textContainer: {
    position: 'absolute',
    marginTop: '110%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  textBackground: {
    padding: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 55,
    left: '50%',
    alignSelf: 'flex-end',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
