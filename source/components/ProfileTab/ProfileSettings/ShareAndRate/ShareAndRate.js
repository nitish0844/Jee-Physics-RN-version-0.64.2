import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Iconic from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';

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
  const shareApp = async () => {
    try {
      const options = {
        message: 'Jee Physics', // Message to share
        url: 'https://play.google.com/store/apps/details?id=com.instagram.android&pcampaignid=web_share', // URL to your app
        title: 'Share App', // Title for the share dialog
      };

      await Share.open(options);
    } catch (error) {
      console.error('Error sharing app:', error.message);
    }
  };

  return (
    <View style={styles.Container}>
      <Iconic name="share-social-outline" size={28} color="#000" />
      <View style={{marginLeft: 10, flex: 1}}>
        <Text style={styles.text}>Share app</Text>
      </View>
      <TouchableOpacity style={styles.next} onPress={shareApp}>
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
    // gap: 5,
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
    right: 20,
  },
  nextIcon: {
    alignSelf: 'flex-end',
  },
  Title: {
    left: 30,
    color: '#454545',
    fontWeight: '500',
  },
});
