import {View, Text, FlatList, StyleSheet, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const PaymentHistoryData = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    // Fetch updated data here
    const currentUser = auth().currentUser;

    if (currentUser) {
      const userPaymentHistoryRef = firestore()
        .collection('PaymentHistory')
        .doc(currentUser.email)
        .collection('Payment');

      userPaymentHistoryRef
        .get()
        .then(querySnapshot => {
          const data = [];
          querySnapshot.forEach(doc => {
            data.push({id: doc.id, ...doc.data()});
          });
          setPaymentData(data);
        })
        .catch(error => {
          console.log('Error fetching payment history:', error);
        })
        .finally(() => {
          setRefreshing(false);
        });
    }
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment History</Text>
      <FlatList
        data={paymentData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.courseText}>Course: {item.course}</Text>
            <Text style={{color: '#fff'}}>Date: {item.date}</Text>
            <Text style={{color: '#fff'}}>Payment ID: {item.paymentId}</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#17A1FA',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 4,
  },
  courseText: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#fff',
  },
});

export default PaymentHistoryData;
