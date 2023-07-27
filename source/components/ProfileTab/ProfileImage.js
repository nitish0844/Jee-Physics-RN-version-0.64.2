import {
  View,
  Text,
  Image,
  StyleSheet,
  LogBox,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import codePush from 'react-native-code-push';

import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import storage from '@react-native-firebase/storage';
import ImageView from 'react-native-image-viewing';

const defaultImage =
  'https://free4kwallpapers.com/uploads/originals/2015/07/23/tron-lamborghini.jpg';

const ProfileImage = () => {
  const [imageURL, setImageURL] = useState(defaultImage);
  const [userData, setUserData] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [imageVisible, setImageIsVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchImage();
  }, []);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const imageObject = {
    uri: imageURL, // Pass the imageURL in the 'uri' field
    width: 250,
    height: 250,
    animationType: 'slide',
  };

  const handleCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropperCircleOverlay: true,
      cropping: true,
    })
      .then(image => {
        setImageURL(image.path);
        uploadImage(image.path);
        setModalVisible(false);
      })
      .catch(error => {
        console.log('Image picker error:', error);
      });
  };

  const handleImagePicker = () => {
    ImagePicker.openPicker({
      cropping: true,
      width: 300,
      height: 300,
      cropperCircleOverlay: true,
      includeBase64: true,
    })
      .then(image => {
        setImageURL(image.path);
        uploadImage(image.path);
        setModalVisible(false);
      })
      .catch(error => {
        console.log('Image picker error:', error);
      });
  };

  const uploadImage = async path => {
    try {
      const response = await fetch(path);
      const blob = await response.blob();

      const storageRef = storage().ref(`/profile/${auth().currentUser.email}`);
      await storageRef.put(blob);

      const downloadUrl = await storageRef.getDownloadURL();

      const currentUser = auth().currentUser;
      const collectionRef = firestore().collection('emailAuth');
      const userDocRef = collectionRef.doc(currentUser.email);

      await userDocRef.update({
        photoURL: downloadUrl,
      });

      console.log('Image uploaded successfully!');
      // setReloadProfile(true);
    } catch (error) {
      console.log('Image upload error:', error);
    }
  };

  // const handleImageUploaded = () => {
  //   setReloadProfile(false);
  // };

  const fetchImage = async () => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        // User is not logged in
        return;
      }

      // const GoogleuserDoc = await firestore()
      //   .collection('googleAuth')
      //   .doc(currentUser.email)
      //   .get();
      // const googleUserData = GoogleuserDoc.data();

      // const EmailuserDoc = await firestore()
      //   .collection('emailAuth')
      //   .doc(currentUser.email)
      //   .get();
      // const EmailuserData = EmailuserDoc.data();

      const userDoc = await firestore()
        .collection('emailAuth')
        .doc(currentUser.email)
        .get();
      const userData = userDoc.data();

      // if (googleUserData && googleUserData.photoURL) {
      //   setImageURL(googleUserData.photoURL);
      // } else if (EmailuserData && EmailuserData.photoURL) {
      //   setImageURL(EmailuserDoc.photoURL);
      // } else {
      //   const randomImageURL = await getRandomImage();
      //   setImageURL(randomImageURL);
      // }
      if (userData && userData.photoURL) {
        setImageURL(userData.photoURL);
        setIsLoading(false);
      } else {
        const randomImageURL = await getRandomImage();
        setImageURL(randomImageURL);
        setIsLoading(false);
      }
      // setUserData(googleUserData || EmailuserData);
      setUserData(userData);
    } catch (error) {
      console.error('Error fetching profile image:', error);
      const randomImageURL = await getRandomImage();
      setImageURL(randomImageURL);
    }
  };

  const getRandomImage = async () => {
    try {
      const response = await fetch(
        'https://api.unsplash.com/photos/random?query=animal&client_id=pFv5vpeIX0qhfcP5HVdJHWTSY04tCliBqhIYRewquEI',
      );
      const data = await response.json();
      return data.urls.regular;
    } catch (error) {
      console.error('Error fetching random image:', error);
      return defaultImage;
    }
  };

  return (
    <View style={{height: 250}}>
      <TouchableOpacity onPress={() => setImageIsVisible(true)}>
        {isLoading ? (
          <View style={styles.imageContainer}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : (
          <Image source={{uri: imageURL}} style={styles.image} />
        )}
      </TouchableOpacity>
      <View style={styles.cameraIconContainer}>
        <TouchableOpacity onPress={handleOpenModal}>
          <Icon name="camera" size={22} color="#fff" />
        </TouchableOpacity>
        <ImageView
          images={[imageObject]}
          imageIndex={0}
          visible={imageVisible}
          onRequestClose={() => setImageIsVisible(false)}
        />
      </View>
      {/* </TouchableOpacity> */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {userData && userData.name ? userData.name : ''}
        </Text>
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={handleCloseModal}
        animationInTiming={500}
        backdropOpacity={0.7}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={handleCamera}
            style={styles.optionContainer}>
            <Text style={styles.optionText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleImagePicker}
            style={styles.optionContainer}>
            <Text style={styles.optionText}>Choose from Gallery</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default codePush(ProfileImage);

const styles = StyleSheet.create({
  image: {
    height: 130,
    width: 130,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 70,
    top: 50,
  },
  textContainer: {
    alignSelf: 'center',
    top: 80,
    width: '100%',
    backgroundColor: '#fff',
  },
  text: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  optionContainer: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: 'black',
  },
  cameraIconContainer: {
    position: 'absolute',
    top: 140,
    right: 130,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 30,
    alignSelf: 'center',
  },
  imageContainer: {
    height: 130,
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 70,
    top: 50,
  },
});
