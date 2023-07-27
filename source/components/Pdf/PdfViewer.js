import {View, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import Pdf from 'react-native-pdf';

const PdfViewer = () => {
  const source = {
    uri: 'https://firebasestorage.googleapis.com/v0/b/platform2learn-54f87.appspot.com/o/thereactnativebook-sample.pdf?alt=media&token=692c7ea8-6300-4db7-8350-2da545cffadd',
    cache: true,
  };
  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        trustAllCerts={false}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

export default PdfViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
