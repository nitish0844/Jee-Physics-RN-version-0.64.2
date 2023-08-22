import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useRef} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

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
  {
    title: 'C++',
    img: 'https://firebasestorage.googleapis.com/v0/b/platform2learn-54f87.appspot.com/o/slide4.png?alt=media&token=5ba4c555-13d5-429c-8ba8-b73963108e2e',
  },
  {
    title: 'Thermodynamics',
    img: 'https://firebasestorage.googleapis.com/v0/b/platform2learn-54f87.appspot.com/o/slide1.png?alt=media&token=05c6a304-7b31-439b-8fc0-77acbec7e9f0',
  },
];

const Free = () => {
  const scrollViewRef = useRef(null);

  useFocusEffect(() => {
    // Scroll to the top of the ScrollView when the screen is loaded
    scrollViewRef.current.scrollTo({x: 0, y: 0, animated: false});
  });

  return (
    <View style={{paddingBottom: 220}}>
      <ScrollView ref={scrollViewRef}>
        <View style={styles.PopularContainer}>
          {data?.map((z, index) =>
            index % 1 === 0 ? (
              <View style={styles.PopularWrapper} key={Math.random()}>
                <Image
                  source={{uri: z.img, cache: 'only-if-cached'}}
                  style={styles.img}
                />
                <Text style={styles.text}>Learn</Text>
                <Text style={styles.text}>{z.title}</Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Study</Text>
                </TouchableOpacity>
              </View>
            ) : (
              data[index + 1] && (
                <View style={styles.PopularWrapper} key={index + 1}>
                  <Image
                    source={{
                      uri: data[index + 1].img,
                      cache: 'only-if-cached',
                    }}
                    style={styles.img}
                  />
                  <Text style={styles.text}>Learn</Text>
                  <Text style={styles.text}>{data[index + 1].title}</Text>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Study</Text>
                  </TouchableOpacity>
                </View>
              )
            ),
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Free;

const styles = StyleSheet.create({
  img: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  PopularContainer: {
    flexDirection: 'row', // Updated to row
    flexWrap: 'wrap', // Added flexWrap
    justifyContent: 'space-between', // Updated to space-between
    alignItems: 'center',
    marginTop: 5,
    paddingHorizontal: 20,
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
    elevation: 5, // for Android
    marginBottom: 25, // Added marginBottom
    height: 230,
    width: '40%', // Updated to a percentage value
    flexBasis: '48%',
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
