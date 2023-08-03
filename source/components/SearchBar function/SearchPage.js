import React, {useState, useEffect} from 'react';
import {View, TextInput, FlatList, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail('');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userEmail) {
      return;
    }

    console.log('Fetching data for userEmail:', userEmail);

    const unsubscribeFormulas = firestore()
      .collection('UserPaidNotes')
      .doc(userEmail)
      .collection('Formulas')
      .onSnapshot(formulasSnapshot => {
        const formulaResults = [];

        formulasSnapshot.forEach(formulaDoc => {
          const formulaData = formulaDoc.data();
          console.log('Formula data:', formulaData);

          // Extract the formula names and map them to the desired format
          const formulaNames = Object.keys(formulaData).map(formulaName => ({
            id: formulaName,
            name: formulaName,
            type: 'Formula',
          }));

          formulaResults.push(...formulaNames);
        });

        // Handle the case where there are no formulas
        if (formulaResults.length === 0) {
          formulaResults.push({
            id: 'no_formulas',
            name: 'No formulas found',
            type: 'Formula',
          });
        }

        setSearchResults(prevResults => [...prevResults, ...formulaResults]);
      });

    const unsubscribeFreenotes = firestore()
      .collection('UserPaidNotes')
      .doc(userEmail)
      .collection('FreeNotes')
      .onSnapshot(freenotesSnapshot => {
        const freenotesResults = [];

        freenotesSnapshot.forEach(freenoteDoc => {
          const freenoteData = freenoteDoc.data();
          console.log('Freenote data:', freenoteData);

          // Extract the freenote names and map them to the desired format
          const freenoteNames = Object.keys(freenoteData).map(freenoteName => ({
            id: freenoteName,
            name: freenoteName,
            type: 'Freenote',
          }));

          freenotesResults.push(...freenoteNames);
        });

        // Handle the case where there are no freenotes
        if (freenotesResults.length === 0) {
          freenotesResults.push({
            id: 'no_freenotes',
            name: 'No freenotes found',
            type: 'Freenote',
          });
        }

        setSearchResults(prevResults => [...prevResults, ...freenotesResults]);
      });

    const unsubscribeAdvanceUnit = firestore()
      .collection('UserPaidNotes')
      .doc(userEmail)
      .collection('Advance Units')
      .onSnapshot(advanceUnitSnapshot => {
        const advanceUnitResults = [];

        advanceUnitSnapshot.forEach(advanceUnitDoc => {
          const advanceUnitData = advanceUnitDoc.data();
          console.log('AdvanceUnit data:', advanceUnitData);

          // Extract the advance unit names and map them to the desired format
          const advanceUnitNames = Object.keys(advanceUnitData).map(
            advanceUnitName => ({
              id: advanceUnitName,
              name: advanceUnitName,
              type: 'AdvanceUnit',
            }),
          );

          advanceUnitResults.push(...advanceUnitNames);
        });

        // Handle the case where there are no advance units
        if (advanceUnitResults.length === 0) {
          advanceUnitResults.push({
            id: 'no_advance_units',
            name: 'No advance units found',
            type: 'AdvanceUnit',
          });
        }

        setSearchResults(prevResults => [
          ...prevResults,
          ...advanceUnitResults,
        ]);
      });

    return () => {
      console.log('Unsubscribing from Firestore snapshot listeners');
      unsubscribeFormulas();
      unsubscribeFreenotes();
      unsubscribeAdvanceUnit();
    };
  }, [userEmail]);

  useEffect(() => {
    // Function to filter the search results based on the search query
    const filterResults = () => {
      if (searchQuery.trim() === '') {
        // If the search query is empty, show all results
        setFilteredResults(searchResults);
      } else {
        // If the search query is not empty, filter the results based on the query
        const filteredResults = searchResults.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        setFilteredResults(filteredResults);
      }
    };

    // Call the filterResults function when searchQuery or results change
    filterResults();
  }, [searchQuery, searchResults]);

  const renderItem = ({item}) => {
    const key = `${item.type}_${item.id}`;
    return (
      <View key={key}>
        <Text>{item.name}</Text>
        {/* <Text>{item.type}</Text> */}
        {/* Display other relevant data */}
      </View>
    );
  };

  return (
    <View>
      <TextInput
        placeholder="Search users by email..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <FlatList
        // data={searchResults}
        data={filteredResults}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text>No search results found.</Text>}
      />
    </View>
  );
};

export default SearchComponent;
