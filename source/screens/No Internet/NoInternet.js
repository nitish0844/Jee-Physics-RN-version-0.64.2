import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('window');

const NoInternet = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('./No Internet.json')}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

export default NoInternet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  animation: {
    width: width * 0.8, // Adjust the size of the animation as per your requirements
    height: height * 0.4,
    backgroundColor: 'transparent',
  },
});
