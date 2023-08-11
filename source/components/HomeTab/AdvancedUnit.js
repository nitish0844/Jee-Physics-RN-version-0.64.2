import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';

import {useNavigation} from '@react-navigation/native';

const uri =
  'https://stimg.cardekho.com/images/carexteriorimages/630x420/BMW/2-Series/8081/1673337858035/front-left-side-47.jpg';

const AdvancedUnit = () => {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  const handleViewAll = () => {
    navigation.navigate('NotesMain', {selectedTag: 'Notes'});
  };

  const BoughtCourse = async () => {
    try {
      const currentUser = auth().currentUser;

      const userDoc = await firestore()
        .collection('UserPaidNotes')
        .doc(currentUser.email)
        .collection('Advance Units')
        .doc('Advance Units')
        .get();

      const userData = userDoc.data();
      setUserData(userData);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(userData);

  // const BoughtCourse = async () => {
  //   try {
  //     const currentUser = auth().currentUser;

  //     const userDocRef = firestore()
  //       .collection('UserPaidNotes')
  //       .doc(currentUser.email)
  //       .collection('Advance Units')
  //       .doc('Advance Units');

  //     const userDocSnapshot = await userDocRef.get();

  //     if (userDocSnapshot.exists) {
  //       const userData = userDocSnapshot.data();
  //       setUserData(userData);
  //     } else {
  //       setUserData(null); // Set user data to null if document doesn't exist
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleButtonPress = course => {
    const amount = 100000; // Replace with the actual payment amount for this course
    const BackScreen = 'BottomTabs';
    const CollectionandDoc = 'Advance Units';
    const courseName = course;

    if (userData && userData[course]) {
      navigation.navigate('PdfViewer');
    } else {
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

  return (
    <View style={{bottom: 30}}>
      <Text style={styles.title}>Advance units</Text>

      <TouchableOpacity
        style={styles.viewAllButton}
        onPress={() => handleViewAll()}>
        <Text style={styles.viewAllButtonText}>View all</Text>
      </TouchableOpacity>
      <View
        style={{
          paddingBottom: 40,
          flexDirection: 'row',
          alignSelf: 'center',
          marginTop: 10,
        }}>
        <View style={[styles.card1, {marginRight: '7%'}]}>
          <Image source={{uri: uri}} style={styles.image} />
          <Text style={styles.CardTitle}>Kinetics</Text>
          <Text style={styles.CardDescription}>12 Chapters</Text>
          <TouchableOpacity
            onPress={() => handleButtonPress('Kirchhoff’s law')}>
            <AntDesign
              name="rightcircle"
              size={30}
              color={'#000'}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.card1}>
          <Image source={{uri: uri}} style={styles.image} />
          <Text style={styles.CardTitle}>Laws of motion</Text>
          <Text style={styles.CardDescription}>12 Chapters</Text>
          <TouchableOpacity onPress={() => handleButtonPress('Law of Motion')}>
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

export default AdvancedUnit;

const styles = StyleSheet.create({
  title: {
    color: '#000',
    marginTop: 25,
    left: '7%',
    fontWeight: '700',
    fontSize: 17,
  },
  ViewAll: {
    color: '#A0A0A0',
    alignSelf: 'flex-end',
    right: 20,
    bottom: 20,
  },
  image: {
    height: 100,
    width: 150,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  CardTitle: {
    color: '#000',
    fontSize: 15,
    fontWeight: '700',
    left: 5,
  },
  card1: {
    backgroundColor: '#d0eff5',
    height: 175,
    width: 150,
    borderRadius: 10,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
  },
  icon: {
    alignSelf: 'flex-end',
    right: 7,
  },
  CardDescription: {
    color: '#7E7E7E',
    left: 5,
  },
  viewAllButton: {
    position: 'absolute',
    top: 25, // Adjust the top value to change the vertical position of the button
    right: 20,
    backgroundColor: 'transparent',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  viewAllButtonText: {
    color: '#A0A0A0',
    left: 10,
  },
});
