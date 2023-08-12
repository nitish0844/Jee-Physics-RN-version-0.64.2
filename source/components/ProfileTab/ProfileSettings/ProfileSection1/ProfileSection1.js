import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Account = () => {
  return (
    <View style={styles.Container}>
      <MaterialCommunityIcons
        name="account-box-outline"
        size={28}
        color="#000"
      />
      <View style={{marginLeft: 10, flex: 1}}>
        <Text style={styles.text}>Account</Text>
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

const SellNotes = () => {
  return (
    <View style={styles.Container}>
      <FontAwesome name="rupee" size={28} color="#000" style={{left: 8}} />
      <View style={{marginLeft: 25, flex: 1}}>
        <Text style={styles.text}>Sell Notes</Text>
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

const PrivacyandSecurity = () => {
  return (
    <View style={styles.Container}>
      <MaterialCommunityIcons
        name="security"
        size={28}
        color="#000"
        style={{left: 4}}
      />
      <View style={{marginLeft: 15, flex: 1}}>
        <Text style={styles.text}>Privacy & Safety</Text>
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

const ProfileSection1 = () => {
  return (
    <View style={{marginTop: '2%', flex: 1, left: 10}}>
      <Account />
      <SellNotes />
      <PrivacyandSecurity />
    </View>
  );
};

export default ProfileSection1;

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
