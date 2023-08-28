import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useRef} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

const data = [
  {
    Image1:
      'https://free4kwallpapers.com/uploads/originals/2015/07/23/tron-lamborghini.jpg',
    Title: 'Kinetics',
  },
  {
    Image1:
      'https://free4kwallpapers.com/uploads/originals/2015/07/23/tron-lamborghini.jpg',
    Title: 'Dynamics',
  },
  {
    Image1:
      'https://free4kwallpapers.com/uploads/originals/2015/07/23/tron-lamborghini.jpg',
    Title: 'law of force',
  },
  {
    Image1:
      'https://free4kwallpapers.com/uploads/originals/2015/07/23/tron-lamborghini.jpg',
    Title: 'Gravity',
  },
  {
    Image1:
      'https://free4kwallpapers.com/uploads/originals/2015/07/23/tron-lamborghini.jpg',
    Title: 'Law of motion',
  },
  {
    Image1:
      'https://free4kwallpapers.com/uploads/originals/2015/07/23/tron-lamborghini.jpg',
    Title: 'Fluids',
  },
  {
    Image1:
      'https://free4kwallpapers.com/uploads/originals/2015/07/23/tron-lamborghini.jpg',
    Title: 'Atoms',
  },
  {
    Image1:
      'https://free4kwallpapers.com/uploads/originals/2015/07/23/tron-lamborghini.jpg',
    Title: 'Force',
  },
];

const Notes = ({}) => {
  const scrollViewRef = useRef(null);
  const Navigation = useNavigation();

  useFocusEffect(() => {
    // Scroll to the top of the ScrollView when the screen is loaded
    scrollViewRef.current.scrollTo({x: 0, y: 0, animated: false});
  });

  const handleButton = courseName => {
    Navigation.navigate('NameFillNotes', {courseName});
  };

  return (
    <View style={{bottom: 30, paddingBottom: '60%'}}>
      <ScrollView ref={scrollViewRef}>
        {data.map((z, index) => {
          if (index % 2 === 0) {
            const rightIndex = index + 1;
            if (rightIndex >= data.length) {
              return null;
            }

            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 50,
                  alignSelf: 'center',
                  top: 50,
                }}>
                <View style={[styles.card1, {marginRight: '7%'}]}>
                  <Image source={{uri: z.Image1}} style={styles.image} />
                  <Text style={styles.CardTitle}>{z.Title}</Text>
                  <Text style={styles.CardDescription}>12 Chapters</Text>
                  <TouchableOpacity onPress={() => handleButton(z.Title)}>
                    <AntDesign
                      name="rightcircle"
                      size={30}
                      color={'#000'}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.card1}>
                  <Image
                    source={{uri: data[rightIndex].Image1}}
                    style={styles.image}
                  />
                  <Text style={styles.CardTitle}>{data[rightIndex].Title}</Text>
                  <Text style={styles.CardDescription}>12 Chapters</Text>
                  <TouchableOpacity
                    onPress={() => handleButton(data[rightIndex].Title)}>
                    <AntDesign
                      name="rightcircle"
                      size={30}
                      color={'#000'}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }
        })}
      </ScrollView>
    </View>
  );
};

export default Notes;

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
});
