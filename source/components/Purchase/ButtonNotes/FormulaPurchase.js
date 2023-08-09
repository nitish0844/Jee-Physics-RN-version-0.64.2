import {View, Text} from 'react-native';
import React from 'react';

const FormulaPurchase = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.purchasedContainer}>
        <View key="Formulas" style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Formulas</Text>
          {userData &&
            userData.Formulas &&
            Object.keys(userData.Formulas).map(
              formulaName =>
                userData.Formulas[formulaName] === true && (
                  <View key={formulaName} style={styles.courseCard}>
                    <Text style={styles.courseName}>{formulaName}</Text>
                  </View>
                ),
            )}
        </View>
      </View>
    </ScrollView>
  );
};

export default FormulaPurchase;
