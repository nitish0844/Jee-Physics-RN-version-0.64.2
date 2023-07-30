import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import auth from '@react-native-firebase/auth';

const SplashScreen = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        margin: 0,
        backgroundColor: '#fff',
      }}>
      <LottieView
        source={require('./BubbleLoader.json')}
        autoPlay
        loop={true}
        resizeMode="contain"
        // onAnimationFinish={}
      />
    </View>
  );
};

export default SplashScreen;
