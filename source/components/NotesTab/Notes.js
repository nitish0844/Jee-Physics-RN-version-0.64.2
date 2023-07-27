import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
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
  {
    Image1:
      'https://free4kwallpapers.com/uploads/originals/2015/07/23/tron-lamborghini.jpg',
    Title: 'Kinetics',
  },
  {
    Image1:
      'https://free4kwallpapers.com/uploads/originals/2015/07/23/tron-lamborghini.jpg',
    Title: 'Thermodynamics',
  },
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

const Notes = () => {
  return (
    // <View style={{bottom: 30}}>
    //   <Text style={styles.title}>Advance units</Text>
    //   <TouchableOpacity>
    //     <Text style={styles.ViewAll}>View all</Text>
    //   </TouchableOpacity>
    //   <View
    //     style={{
    //       paddingBottom: 40,
    //       flexDirection: 'row',
    //       gap: 30,
    //       alignSelf: 'center',
    //     }}>
    //     <View style={styles.card1}>
    //       <Image source={{uri: uri}} style={styles.image} />
    //       <Text style={styles.CardTitle}>Kinetics</Text>
    //       <Text style={styles.CardDescription}>12 Chapters</Text>
    //       <TouchableOpacity>
    //         <AntDesign
    //           name="rightcircle"
    //           size={30}
    //           color={'#000'}
    //           style={styles.icon}
    //         />
    //       </TouchableOpacity>
    //     </View>
    //     <View style={styles.card1}>
    //       <Image source={{uri: uri}} style={styles.image} />
    //       <Text style={styles.CardTitle}>Laws of motion</Text>
    //       <Text style={styles.CardDescription}>12 Chapters</Text>
    //       <TouchableOpacity>
    //         <AntDesign
    //           name="rightcircle"
    //           size={30}
    //           color={'#000'}
    //           style={styles.icon}
    //         />
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // </View>

    <View style={{bottom: 30, paddingBottom: '60%'}}>
      <ScrollView>
        {data.map((z, index) => {
          if (index % 2 === 0) {
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
                  <View style={styles.card1}>
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
