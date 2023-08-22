import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useRef} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

import ProfileImage from '../../components/ProfileTab/ProfileImage';

import ProfileSection1 from '../../components/ProfileTab/ProfileSettings/ProfileSection1/ProfileSection1';
import PaymentHistory from '../../components/ProfileTab/ProfileSettings/Billing Settings/PaymentHistory';
import ShareAndRate from '../../components/ProfileTab/ProfileSettings/ShareAndRate/ShareAndRate';
import Support from '../../components/ProfileTab/ProfileSettings/Support/Support';
import Version from '../../components/ProfileTab/ProfileSettings/Version/Version';
import SignOut from '../../components/ProfileTab/ProfileSettings/SignOut/SignOut';

const ProfileMain = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);

  useFocusEffect(() => {
    // Scroll to the top of the ScrollView when the screen is loaded
    scrollViewRef.current.scrollTo({x: 0, y: 0, animated: false});
  });

  return (
    <SafeAreaView style={styles.Container}>
      <View style={{marginBottom: 10}}>
        <View style={styles.headContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('MainPage')}>
            <Feather
              name="arrow-left"
              size={30}
              color="#000"
              style={styles.logo}
            />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center', right: 20}}>
            <Text style={styles.title}>Profile</Text>
          </View>
        </View>
      </View>
      <ScrollView style={{flex: 1}} ref={scrollViewRef}>
        <ProfileImage />
        <ProfileSection1 />
        <PaymentHistory />
        <ShareAndRate />
        <Support />
        <Version />
        <SignOut />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileMain;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    top: 25,
    height: 50,
  },
  title: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
  },
  logo: {
    marginLeft: 10,
  },
});
