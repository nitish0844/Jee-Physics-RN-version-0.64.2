import {View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import VersionCheck from 'react-native-version-check';
import Modal from 'react-native-modal';

const Version = () => {
  const [version, getVersion] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const fetchVersion = async () => {
    try {
      const currentVersion = await VersionCheck.getCurrentVersion();
      getVersion(currentVersion);
    } catch (error) {
      console.error('Error fetching version:', error);
    }
  };

  fetchVersion();

  const WrapperComponent = () => {
    return (
      <View style={styles.modalContainer}>
        <Modal
          isVisible={true}
          style={styles.modal}
          onBackdropPress={toggleModal}>
          <View style={styles.modalContent}>
            <Text>Version: {version}</Text>
            {/* <Button title="Hide modal" onPress={toggleModal} /> */}
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <View style={{marginTop: 20}}>
      <Text style={styles.Title}>VERSIONS</Text>
      <View style={{marginTop: '2%', flex: 1, left: 15}}>
        <View style={styles.Container}>
          <MaterialIcons name="send-to-mobile" size={28} color="#000" />
          <View style={{marginLeft: 10, flex: 1}}>
            <Text style={styles.text}>App version</Text>
          </View>
          <TouchableOpacity style={styles.next} onPress={toggleModal}>
            <Entypo
              name="chevron-small-right"
              size={30}
              color="#000"
              style={styles.nextIcon}
            />
          </TouchableOpacity>
        </View>
        {isModalVisible && <WrapperComponent />}
      </View>
    </View>
  );
};

export default Version;

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, // Add some spacing between the containers
    // gap: 5,
    left: 10,
  },
  text: {
    color: '#000',
    fontWeight: '500',
  },
  next: {
    marginLeft: 'auto',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    paddingRight: 20,
    right: 20,
  },
  nextIcon: {
    alignSelf: 'flex-end',
  },
  Title: {
    left: 30,
    color: '#454545',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '50%', // Set the width to 100% to match the modal width
    height: '20%',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
