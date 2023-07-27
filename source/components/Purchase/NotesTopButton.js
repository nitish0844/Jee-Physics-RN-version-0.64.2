import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const NotesTopButton = ({selectedTag}) => {
  const [pressed, setPressed] = useState('All');
  const navigation = useNavigation();

  const getTextWidth = text => {
    const textLength = text.length;
    const minWidth = 70;
    const dynamicWidth = Math.max(minWidth, textLength * 11);

    return dynamicWidth;
  };

  const handleTagPress = tag => {
    setPressed(tag);
    navigation.navigate('PurchaseMain', {selectedTag: tag});
  };

  useEffect(() => {
    // Set the default option as "All" when the component mounts
    handleTagPress('All');
  }, []);

  useEffect(() => {
    // Update the 'pressed' state when the 'selectedTag' changes
    if (selectedTag) {
      setPressed(selectedTag);
    }
  }, [selectedTag]);

  return (
    <View>
      <View style={styles.View}>
        <TouchableOpacity onPress={() => handleTagPress('All')}>
          <Text
            style={[
              styles.text,
              pressed === 'All' && styles.selectedText,
              {width: getTextWidth('All')},
            ]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTagPress('Notes')}>
          <Text
            style={[
              styles.text,
              pressed === 'Notes' && styles.selectedText,
              {width: getTextWidth('Notes')},
            ]}>
            Notes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTagPress('Formulas')}>
          <Text
            style={[
              styles.text,
              pressed === 'Formulas' && styles.selectedText,
              {width: getTextWidth('Formulas')},
            ]}>
            Formulas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTagPress('Free')}>
          <Text
            style={[
              styles.text,
              pressed === 'Free' && styles.selectedText,
              {width: getTextWidth('Free Notes')},
            ]}>
            Free Notes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NotesTopButton;

const styles = StyleSheet.create({
  View: {
    flexDirection: 'row',
    // gap: 10,
    top: '25%',
    alignSelf: 'center',
  },
  text: {
    color: '#000',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  selectedText: {
    backgroundColor: '#000',
    color: '#fff',
    height: 22,
    borderRadius: 10,
    textAlign: 'center',
  },
});
