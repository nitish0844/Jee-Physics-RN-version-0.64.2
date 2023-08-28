import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import {useRoute} from '@react-navigation/native';

const data = [
  {
    title: 'The frame of reference',
    description: 'The frame of references',
    mode: 'Free',
  },
  {
    title: 'The frame of reference',
    description: 'The frame of references',
    mode: 'Free',
  },
  {
    title: 'The frame of reference',
    description: 'The frame of references',
    mode: 'Free',
  },
  {
    title: 'The frame of reference',
    description: 'The frame of references',
    mode: 'pay',
  },
  {
    title: 'The frame of reference',
    description: 'The frame of references',
    mode: 'pay',
  },
  {
    title: 'The frame of reference',
    description: 'The frame of references',
    mode: 'pay',
  },
  {
    title: 'The frame of reference',
    description: 'The frame of references',
    mode: 'pay',
  },
  {
    title: 'The frame of reference',
    description: 'The frame of references',
    mode: 'pay',
  },
];

const NameFillNotes = ({navigation}) => {
  const route = useRoute(); // Get the route object

  // Access the course name from the route params
  const courseName = route.params?.courseName || 'Course Name';

  // State to track payment status
  const [isPaid, setIsPaid] = useState(false);

  const handlePayment = async () => {
    // Implement your payment logic here
    // After successful payment, set the isPaid state to true
    setIsPaid(true);

    // You can also store this payment status in AsyncStorage
    // await AsyncStorage.setItem('isPaid', 'true');
  };

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
          <Text style={styles.title}>{courseName}</Text>
        </View>
      </View>
      <ScrollView style={{marginTop: 50}}>
        <View style={styles.cardContainer}>
          {data.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
              <View style={styles.cardFooter}>
                {isPaid || item.mode === 'Free' ? (
                  <TouchableOpacity style={styles.cardIcon}>
                    <Feather name="chevron-right" size={24} color={'#000'} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={handlePayment}>
                    <Feather name="lock" size={24} color={'#000'} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      {isPaid || (
        <TouchableOpacity style={styles.floatingButton} onPress={handlePayment}>
          <Text style={styles.buttonText}>Buy {courseName} ₹5000</Text>
        </TouchableOpacity>
      )}
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
  cardContainer: {
    paddingHorizontal: 20,
    // marginTop: 50,
    top: 10,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#d0eff5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    height: 80,
  },
  cardTitle: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
  cardDescription: {
    color: '#7E7E7E',
    fontSize: 14,
    marginTop: 5,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Aligns the content to the right end
    bottom: 30,
  },
  cardMode: {
    color: '#000',
    fontSize: 14,
    fontWeight: '700',
  },
  cardIcon: {
    // flex: 1,
    // backgroundColor: 'red',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#22C55E',
    paddingVertical: 15,
    borderRadius: 10,
    width: '90%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default NameFillNotes;
