import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import Loader1 from '../../../Loader1.json';
import Loader2 from '../../../Loader2.json';

const Loader = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={Loader2} // Replace with the source of your Lottie JSON file
        autoPlay
        loop
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 200,
    alignSelf: 'center',
  },
});
