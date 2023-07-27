import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const data = [
  {
    code: '001',
    name: 'Course A',
  },
  {
    code: '002',
    name: 'Course B',
  },
  // Add more courses to the data array as needed
];

const Purchased = ({userData}) => {
  const courseCodeToNameMap = {};

  data.forEach(course => {
    courseCodeToNameMap[course.code] = course.name;
  });

  return (
    <View style={styles.purchasedContainer}>
      {userData &&
        Object.entries(userData).map(([courseCode, isPurchased]) => {
          if (isPurchased) {
            const courseName = courseCodeToNameMap[courseCode]; // Get the course name from the map
            return (
              <View key={courseCode} style={styles.courseCard}>
                <Text style={styles.courseName}>{courseName}</Text>
              </View>
            );
          }
        })}
    </View>
  );
};

export default Purchased;

const styles = StyleSheet.create({
  purchasedContainer: {
    margin: 20,
  },
  courseCard: {
    backgroundColor: '#d0eff5',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  courseCode: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
  },
  // Add more styles for other course information
});
