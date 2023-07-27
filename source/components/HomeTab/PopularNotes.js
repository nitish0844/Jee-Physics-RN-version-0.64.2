import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const data = [
  {
    title: 'Thermodynamics',
    img: 'https://firebasestorage.googleapis.com/v0/b/platform2learn-54f87.appspot.com/o/slide1.png?alt=media&token=05c6a304-7b31-439b-8fc0-77acbec7e9f0',
  },
  {
    title: 'Python',
    img: 'https://firebasestorage.googleapis.com/v0/b/platform2learn-54f87.appspot.com/o/slide1.png?alt=media&token=05c6a304-7b31-439b-8fc0-77acbec7e9f0',
  },
  {
    title: 'Java',
    img: 'https://firebasestorage.googleapis.com/v0/b/platform2learn-54f87.appspot.com/o/slide4.png?alt=media&token=5ba4c555-13d5-429c-8ba8-b73963108e2e',
  },
  {
    title: 'SAP',
    img: 'https://firebasestorage.googleapis.com/v0/b/platform2learn-54f87.appspot.com/o/slide4.png?alt=media&token=5ba4c555-13d5-429c-8ba8-b73963108e2e',
  },
  {
    title: 'C++',
    img: 'https://firebasestorage.googleapis.com/v0/b/platform2learn-54f87.appspot.com/o/slide4.png?alt=media&token=5ba4c555-13d5-429c-8ba8-b73963108e2e',
  },
  {
    title: 'Flutter',
    img: 'https://firebasestorage.googleapis.com/v0/b/platform2learn-54f87.appspot.com/o/slide4.png?alt=media&token=5ba4c555-13d5-429c-8ba8-b73963108e2e',
  },
];

const PopularNotes = () => {
  const navigation = useNavigation();
  const handleViewAll = () => {
    navigation.navigate('NotesMain', {selectedTag: 'Free'});
  };

  const handleStudy = () => {
    navigation.navigate('PdfViewer'); // Navigate to the PdfViewer screen
  };

  return (
    <View>
      <Text style={styles.title}>Popular Notes</Text>
      <TouchableOpacity onPress={handleViewAll}>
        <Text style={styles.ViewAll}>View all</Text>
      </TouchableOpacity>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.PopularContainer}>
          {data?.map(z => (
            <View style={styles.PopularWrapper} key={Math.random()}>
              <Image
                source={{uri: z.img, cache: 'only-if-cached'}}
                style={styles.img}
              />
              <Text style={styles.text}>Learn</Text>
              <Text style={styles.text}>{z.title}</Text>
              <TouchableOpacity style={styles.button} onPress={handleStudy}>
                <Text style={styles.buttonText}>Study</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default PopularNotes;

const styles = StyleSheet.create({
  img: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  PopularContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    left: 10,
    paddingBottom: 25,
    paddingRight: 20,
  },
  text: {
    color: '#000',
    textAlign: 'center',
    top: 20,
    fontWeight: '600',
    fontSize: 15,
  },
  button: {
    alignItems: 'center',
    paddingBottom: 2,
    justifyContent: 'center',
    top: 50,
  },
  buttonText: {
    color: '#fff',
    backgroundColor: '#17A1FA',
    textAlign: 'center',
    width: 80,
    borderRadius: 5,
    paddingBottom: 2,
    fontWeight: '500',
  },
  PopularWrapper: {
    backgroundColor: '#d0eff5',
    borderRadius: 10,
    elevation: 4, // for Android
    marginHorizontal: 10,
    height: 230,
    width: 150,
  },
  title: {
    color: '#000',
    top: 20,
    left: '7%',
    fontWeight: '700',
    fontSize: 17,
  },
  ViewAll: {
    color: '#A0A0A0',
    alignSelf: 'flex-end',
    right: 20,
    // bottom: 20,
  },
});
