import {View, Text, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import React, {useState} from 'react';
import Free from '../NotesTab/Free';

const Purchased = ({userData, handleRefresh, selectedTag, searchText}) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true); // Start refreshing
    await handleRefresh(); // Call the handleRefresh function passed from parent
    setTimeout(() => {
      setRefreshing(false); // Stop the refresh animation
    }, 1000);
  };

  const filteredUserData = userData
    ? Object.keys(userData).reduce((filteredData, category) => {
        const filteredCourses = Object.keys(userData[category]).filter(
          courseName =>
            (searchText === '0' ||
              !searchText ||
              courseName.includes(searchText)) &&
            (selectedTag === 'All' || selectedTag === category),
        );

        filteredData[category] = {}; // Initialize an empty object for the category

        if (filteredCourses.length > 0) {
          filteredCourses.forEach(courseName => {
            filteredData[category][courseName] = userData[category][courseName];
          });
        }

        return filteredData;
      }, {})
    : {};

  // console.log('Search Text:', searchText); // Check if searchText is being cleared
  // console.log('Filtered UserData:', filteredUserData); // Check the filtered data

  return (
    <View style={styles.container}>
      {selectedTag === 'FreeNotes' ? ( // Check if selectedTag is "Free"
        <ScrollView // Wrap the Free component with ScrollView
          contentContainerStyle={[styles.scrollViewContainer]}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Free />
        </ScrollView>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.purchasedContainer}>
            {Object.keys(filteredUserData).map(category => {
              const categoryData = filteredUserData[category];

              const hasTrueCourse = Object.values(categoryData).some(
                value => value === true,
              );

              if (hasTrueCourse) {
                return (
                  <View key={category} style={styles.categoryContainer}>
                    <Text style={styles.categoryTitle}>{category}</Text>
                    {Object.keys(categoryData).map(
                      courseName =>
                        categoryData[courseName] === true && (
                          <View key={courseName} style={styles.courseCard}>
                            <Text style={styles.courseName}>{courseName}</Text>
                          </View>
                        ),
                    )}
                  </View>
                );
              }

              return null;
            })}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Purchased;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '25%',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  purchasedContainer: {
    margin: 20,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  courseCard: {
    backgroundColor: '#d0eff5',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '700',
  },
  // Add more styles for other course information
});
