import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

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
