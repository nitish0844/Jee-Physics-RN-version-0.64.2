import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Iconic from 'react-native-vector-icons/Ionicons';

const RatetheApp = () => {
  return (
    <View style={styles.Container}>
      <AntDesign name="staro" size={28} color="#000" />
      <View style={{marginLeft: 10, flex: 1}}>
        <Text style={styles.text}>Rate the app</Text>
      </View>
      <TouchableOpacity style={styles.next}>
        <Entypo
          name="chevron-small-right"
          size={30}
          color="#000"
          style={styles.nextIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const ShareApp = () => {
  return (
    <View style={styles.Container}>
      <Iconic name="share-social-outline" size={28} color="#000" />
      <View style={{marginLeft: 10, flex: 1}}>
        <Text style={styles.text}>Share app</Text>
      </View>
      <TouchableOpacity style={styles.next}>
        <Entypo
          name="chevron-small-right"
          size={30}
          color="#000"
          style={styles.nextIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const ShareAndRate = () => {
  return (
    <View style={{marginTop: 20}}>
      <Text style={styles.Title}>SHARE & RATE</Text>
      <View style={{marginTop: '2%', flex: 1, left: 15}}>
        <RatetheApp />
        <ShareApp />
      </View>
    </View>
  );
};

export default ShareAndRate;

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, // Add some spacing between the containers
    left: 10,
  },
  text: {
    color: '#000',
    fontWeight: '500',
  },
  next: {
    marginLeft: 'auto',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    paddingRight: 20,
  },
  nextIcon: {
    alignSelf: 'flex-end',
    right: 20,
  },
  Title: {
    left: 30,
    color: '#454545',
    fontWeight: '500',
  },
});
