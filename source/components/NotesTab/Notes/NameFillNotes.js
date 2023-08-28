import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

const NameFillNotes = ({navigation}) => {
  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.headContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('NotesMain', {selectedTag: 'Notes'})
          }>
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
    </SafeAreaView>
  );
};

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
});

export default NameFillNotes;
