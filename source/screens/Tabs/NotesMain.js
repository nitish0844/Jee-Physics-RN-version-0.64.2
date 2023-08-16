import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  // TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import SearchBar from 'react-native-dynamic-search-bar';
import PopularNotes from '../../components/HomeTab/PopularNotes';
import {useRoute} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import NotesView from '../../components/NotesTab/NotesView';
import PhysicsFormula from '../../components/HomeTab/PhysicsFormula';
import CombinedUnitandFormula from '../../components/HomeTab/CombinedUnitandFormula';
import AdvancedUnit from '../../components/HomeTab/AdvancedUnit';
import Notes from '../../components/NotesTab/Notes';
import Formulas from '../../components/NotesTab/Formulas';
import Free from '../../components/NotesTab/Free';
import {useFocusEffect} from '@react-navigation/native';

const NotesMain = ({navigation}) => {
  const route = useRoute();

  const [spinning, setSpinning] = useState(false);

  const changeText = text => {
    if (text.length > 0) {
      setSpinning(true);
    } else {
      setSpinning(false);
    }
  };

  const allScrollViewRef = useRef(null);
  const notesScrollViewRef = useRef(null);

  const handleAllScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    notesScrollViewRef.current.scrollTo({y: offsetY, animated: false});
  };

  const handleNotesScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    allScrollViewRef.current.scrollTo({y: offsetY, animated: false});
  };

  // Check if route.params and route.params.selectedTag exist
  const selectedTag = route.params?.selectedTag;

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
            <Text style={styles.title}>Notes</Text>
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
      <NotesView />
      <View style={{top: '17%'}}>
        <ScrollView
          ref={allScrollViewRef}
          onScroll={handleAllScroll}
          scrollEventThrottle={16}>
          {selectedTag === 'All' && (
            <>
              <View
                style={{
                  flexDirection: 'column',
                  gap: 15,
                  paddingBottom: 200,
                  bottom: 10,
                }}>
                <PopularNotes />
                <AdvancedUnit />
                <PhysicsFormula />
                <CombinedUnitandFormula />
              </View>
            </>
          )}
        </ScrollView>
        <ScrollView
          ref={notesScrollViewRef}
          onScroll={handleNotesScroll}
          scrollEventThrottle={16}>
          {selectedTag === 'Notes' && (
            <>
              <Notes />
            </>
          )}
          {selectedTag === 'Formulas' && (
            <>
              <Formulas />
            </>
          )}
          {selectedTag === 'Free' && (
            <>
              <Free />
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default NotesMain;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Align children vertically in the center
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
});
