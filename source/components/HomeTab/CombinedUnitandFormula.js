import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

import {useFocusEffect} from '@react-navigation/native';

import Payment from '../Payment/Payment';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const uri =
  'https://free4kwallpapers.com/uploads/originals/2015/07/23/tron-lamborghini.jpg';

const CombinedUnitandFormula = () => {
  const [userData, setUserData] = useState(null);

  const navigation = useNavigation();

  const handleViewAll = () => {
    navigation.navigate('NotesMain', {selectedTag: 'Formulas'});
  };

  const BoughtCourse = async () => {
    try {
      const currentUser = auth().currentUser;

      const userDoc = await firestore()
        .collection('UserPaidNotes')
        .doc(currentUser.email)
        .collection('Formulas')
        .doc('Formulas')
        .get();

      const userData = userDoc.data();
      setUserData(userData);
    } catch (error) {
      console.log(error);
    }
  };

  const OneButtonFunction = () => {
    if (userData && userData['11th all units + formulas']) {
      navigation.navigate('PdfViewer');
    } else {
      // navigation.navigate('Payment');
      const courseName = '11th all units + formulas'; // Replace with the actual course name
      const amount = 100000; // Replace with the actual payment amount for this course
      const BackScreen = 'BottomTabs';
      const CollectionandDoc = 'Formulas';
      navigation.navigate('Payment', {
        courseName,
        amount,
        BackScreen,
        CollectionandDoc,
      });
    }
  };

  const TwoButtonFunction = () => {
    if (userData && userData['12th all units + formulas']) {
      navigation.navigate('PdfViewer');
    } else {
      // navigation.navigate('Payment');
      const courseName = '12th all units + formulas'; // Replace with the actual course name
      const amount = 100000; // Replace with the actual payment amount for this course
      const BackScreen = 'BottomTabs';
      const CollectionandDoc = 'Formulas';
      navigation.navigate('Payment', {
        courseName,
        amount,
        BackScreen,
        CollectionandDoc,
      });
    }
  };

  useEffect(() => {
    BoughtCourse();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      BoughtCourse();
    }, []),
  );

  console.log(userData);

  return (
    <View style={{bottom: 50}}>
      <Text style={styles.title}>Combined unit and formula</Text>
      <TouchableOpacity
        onPress={() => handleViewAll()}
        style={styles.viewAllButton}>
        <Text style={styles.ViewAll}>View all</Text>
      </TouchableOpacity>
      <View style={styles.Container}>
        <Image source={{uri: uri}} style={styles.Image} />
        <View style={{flexDirection: 'column', top: 8}}>
          <Text style={styles.text1}>11th all units + formulas</Text>
          <Text style={styles.text2}>10 units + Formulas</Text>
          <Text style={styles.text3}>Handwritten notes</Text>
          <TouchableOpacity onPress={OneButtonFunction}>
            <View style={styles.iconContainer}>
              <AntDesign
                name="rightcircle"
                size={30}
                color={'#000'}
                style={styles.icon}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.Container, {top: 20}]}>
        <Image source={{uri: uri}} style={styles.Image} />
        <View style={{flexDirection: 'column', top: 8}}>
          <Text style={styles.text1}>12th all units + formulas</Text>
          <Text style={styles.text2}>10 units + Formulas</Text>
          <Text style={styles.text3}>Handwritten notes</Text>
          <TouchableOpacity onPress={TwoButtonFunction}>
            <AntDesign
              name="rightcircle"
              size={30}
              color={'#000'}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CombinedUnitandFormula;

const styles = StyleSheet.create({
  title: {
    color: '#000',
    // marginTop: 20,
    left: '7%',
    fontWeight: '700',
    fontSize: 17,
  },
  ViewAll: {
    color: '#A0A0A0',
    alignSelf: 'flex-end',
    // right: 20,
    // bottom: 20,
  },
  Image: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  Container: {
    height: 100,
    width: '85%',
    backgroundColor: '#d0eff5',
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  text1: {
    left: 3,
    top: 5,
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
  },
  text2: {
    left: 4,
    top: 5,
    color: '#FFA500',
    fontSize: 14,
    fontWeight: '600',
  },
  text3: {
    color: '#7C7C7C',
    top: 18,
    left: 5,
  },
  icon: {
    alignSelf: 'flex-end',
    left: 30,
    paddingBottom: 50,
    bottom: 10,
  },
  viewAllButton: {
    position: 'absolute',
    right: 20,
  },
  iconContainer: {
    // flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
    paddingBottom: 20,
    paddingRight: 10,
    // marginRight: 250,
  },
});
