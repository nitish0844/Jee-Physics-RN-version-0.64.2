import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const uri =
  'https://free4kwallpapers.com/uploads/originals/2015/07/23/tron-lamborghini.jpg';

const PhysicsFormula = () => {
  const navigation = useNavigation();
  const handleViewAll = () => {
    navigation.navigate('NotesMain', {selectedTag: 'Formulas'});
  };

  return (
    <View style={{bottom: 40}}>
      <Text style={styles.title}>Physics formulas</Text>
      <TouchableOpacity
        style={styles.viewAllButton}
        onPress={() => handleViewAll()}>
        <Text style={styles.ViewAll}>View all</Text>
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
          <Text style={styles.CardTitle}>11th all formulas</Text>
          <Text style={styles.CardDescription}>all units formula</Text>
          <TouchableOpacity style={styles.icon}>
            <AntDesign
              name="rightcircle"
              size={30}
              color={'#000'}
              // style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.card1]}>
          <Image source={{uri: uri}} style={styles.image} />
          <Text style={styles.CardTitle}>12th all formulas</Text>
          <Text style={styles.CardDescription}>all units formula</Text>
          <TouchableOpacity style={styles.icon}>
            <AntDesign
              name="rightcircle"
              size={30}
              color={'#000'}
              // style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PhysicsFormula;

const styles = StyleSheet.create({
  title: {
    color: '#000',
    // marginTop: 20,
    left: '7%',
    fontWeight: '700',
    fontSize: 17,
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
    right: 20,
  },
  ViewAll: {
    color: '#A0A0A0',
    alignSelf: 'flex-end',
    right: 20,
  },
});
