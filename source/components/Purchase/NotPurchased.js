import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const uri =
  'https://firebasestorage.googleapis.com/v0/b/platform2learn-54f87.appspot.com/o/image%201890.png?alt=media&token=2737ae6a-8ec8-465c-81f1-8a20479c158b';

const NotPurchased = () => {
  const navigation = useNavigation();
  const handleViewAll = () => {
    navigation.navigate('NotesMain', {selectedTag: 'All'});
  };

  return (
    <View style={styles.ImageContainer}>
      <Image source={{uri: uri}} style={styles.Image} />
      <Text style={styles.title}>No notes available</Text>
      <Text style={styles.description}>
        Get notes and study smartly to get into the top 1% of universities and
        accomplish your goals.
      </Text>
      <TouchableOpacity
        style={{
          top: 20,
          justifyContent: 'center',
          height: 50,
          width: 120,
          alignSelf: 'center',
        }}
        onPress={() => handleViewAll()}>
        <Text style={styles.button}>Buy notes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotPurchased;

const styles = StyleSheet.create({
  Image: {
    height: 250,
    width: 200,
    alignSelf: 'center',
  },
  ImageContainer: {
    top: '20%',
  },
  title: {
    color: '#000',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
  },
  description: {
    top: 8,
    color: '#888888',
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 2,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#22C55E',
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    borderRadius: 5,
    height: 40,
    width: 140,
    justifyContent: 'center',
  },
});
