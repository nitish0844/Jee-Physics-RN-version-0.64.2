import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import SearchBar from 'react-native-dynamic-search-bar';
import NotesTopButton from '../../components/Purchase/NotesTopButton';
import NotPurchased from '../../components/Purchase/NotPurchased';
import Purchased from '../../components/Purchase/Purchased';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const data = [
  {
    code: '001',
  },
  {
    code: '002',
  },
  {
    code: '003',
  },
  {
    code: '004',
  },
  {
    code: '005',
  },
  {
    code: '006',
  },
];

const PurchaseMain = ({route}) => {
  const navigation = useNavigation();
  const [purchased, setPurchased] = useState(false);

  const [userData, setUserData] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state
  const [spinning, setSpinning] = useState(false);

  const selectedTag = route.params && route.params.selectedTag;

  const changeText = text => {
    if (text.length > 0) {
      setSpinning(true);
    } else {
      setSpinning(false);
    }
  };

  console.log(userData);

  useEffect(() => {
    // Add a listener for the keyboard dismiss event
    const keyboardDismissListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        Keyboard.dismiss();
      },
    );

    // Clean up the listener when the component unmounts
    return () => {
      keyboardDismissListener.remove();
    };
  }, []);

  const purchaseData = async () => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        // User is not logged in
        return;
      }

      const docSnapshot = await firestore()
        .collection('UserPaidNotes')
        .doc(currentUser.email)
        .collection('FreeNotes')
        .doc('FreeNotes')
        .get();

      const userData = docSnapshot.data();
      setUserData(userData);

      const hasPurchasedCourses = Object.values(userData).some(
        isPurchased => isPurchased === true,
      );

      setPurchased(hasPurchasedCourses);
      setLoading(false);
    } catch (error) {
      console.error('Error :', error);
      setLoading(false); // Error occurred, set loading to false
    }
  };

  useEffect(() => {
    purchaseData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      await purchaseData(); // Wait for purchaseData to complete
      setLoading(false); // Set loading to false after data is fetched or an error occurs
    };

    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={styles.Container}>
      <View>
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
            <Text style={styles.title}>Purchased</Text>
          </View>
        </View>
        <SearchBar
          style={styles.SearchBar}
          placeholder="Search here"
          onPress={false}
          darkMode={false}
          onChangeText={text => changeText(text)}
          spinnerVisibility={spinning}
          spinnerColor={'#000'}
          spinnerSize={20}
          onClearPress={() => setSpinning(false)}
          textInputStyle={{opacity: 0.3}}
        />
      </View>
      {/* <NotesTopButton /> */}
      <NotesTopButton selectedTag={selectedTag} />

      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#000" />
      ) : purchased ? (
        selectedTag === 'All' && <Purchased userData={userData} data={data} />
      ) : (
        <NotPurchased />
      )}
    </SafeAreaView>
  );
};

export default PurchaseMain;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    top: 25,
  },
  title: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
  },
  logo: {
    marginLeft: 10,
  },
  SearchBar: {
    backgroundColor: '#fff',
    top: 70,
    height: 45,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
