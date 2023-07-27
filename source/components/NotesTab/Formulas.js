import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useRef} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const data = [
  {
    Image1:
      'https://free4kwallpapers.com/uploads/originals/2015/07/23/tron-lamborghini.jpg',
    Title: 'Kinetics',
  },
  {
    Image1:
      'https://free4kwallpapers.com/uploads/originals/2015/07/23/tron-lamborghini.jpg',
    Title: 'Kinetics',
  },
];

const Formulas = () => {
  return (
    <View style={{paddingBottom: '60%', top: 10}}>
      <ScrollView>
        <Text style={styles.title}>Physics formulas + combined</Text>
        {data.map((z, index) => {
          if (index % 2 === 0) {
            return (
              <View
                style={{
                  paddingBottom: 40,
                  flexDirection: 'row',
                  alignSelf: 'center',
                }}
                key={Math.random()}>
                <View style={[styles.card1, {marginRight: '7%'}]}>
                  <Image source={{uri: z?.Image1}} style={styles.image} />
                  <Text style={styles.CardTitle}>{z?.Title}</Text>
                  <Text style={styles.CardDescription}>all units formula</Text>
                  <TouchableOpacity>
                    <AntDesign
                      name="rightcircle"
                      size={30}
                      color={'#000'}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
                {data[index + 1] && (
                  <View style={[styles.card1]}>
                    <Image
                      source={{uri: data[index + 1].Image1}}
                      style={styles.image}
                    />
                    <Text style={styles.CardTitle}>
                      {data[index + 1].Title}
                    </Text>
                    <Text style={styles.CardDescription}>12 Chapters</Text>
                    <TouchableOpacity>
                      <AntDesign
                        name="rightcircle"
                        size={30}
                        color={'#000'}
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          }
        })}
        <View style={{bottom: 20}}>
          {data.map(z => (
            <View
              style={[styles.Container, {marginTop: 10}]}
              key={Math.random()}>
              <Image source={{uri: z?.Image1}} style={styles.Image2} />
              <View style={{flexDirection: 'column', top: 8}}>
                <Text style={styles.text1}>12th all units + formulas</Text>
                <Text style={styles.text2}>10 units + Formulas</Text>
                <Text style={styles.text3}>Handwritten notes</Text>
                <TouchableOpacity>
                  <AntDesign
                    name="rightcircle"
                    size={30}
                    color={'#000'}
                    style={styles.icon1}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Formulas;

const styles = StyleSheet.create({
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
  title: {
    color: '#000',
    // marginTop: 20,
    left: '7%',
    fontWeight: '700',
    fontSize: 17,
    paddingBottom: 20,
  },
  Container: {
    height: 100,
    width: '85%',
    backgroundColor: '#d0eff5',
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
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
  icon1: {
    alignSelf: 'flex-end',
    left: 30,
    paddingBottom: 50,
    bottom: 10,
  },
  Image2: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
});
