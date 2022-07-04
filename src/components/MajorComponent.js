/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
const {width} = Dimensions.get('window');

const MajorComponent = ({data, onPressHandler}) => {
  return (
    <TouchableOpacity onPress={onPressHandler} style={styles.item}>
      <Image source={{uri: data.image}} style={styles.image} />
      <View style={styles.overlay} />
      <Text style={styles.title}>{data.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    position: 'absolute',
    color: 'white',
    bottom: 20,
    left: width * 0.04,
    fontWeight: '700',
    fontSize: 20,
    width: width * 0.35,
    textAlign: 'center',
  },
  item: {
    height: width * 0.43,
    position: 'relative',
    borderRadius: 18,
    marginVertical: 10,
  },
  image: {
    height: width * 0.43,
    width: width * 0.43,
    borderRadius: 18,
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    bottom: 0,
    width: width * 0.43,
    borderRadius: 18,
    height: width * 0.43,
  },
});

export default MajorComponent;
