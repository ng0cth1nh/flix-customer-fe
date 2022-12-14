/* eslint-disable prettier/prettier */
import {Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const BannerSlider = ({data, handleOnPress}) => {
  return (
    <TouchableOpacity style={styles.item} onPress={handleOnPress}>
      <Image source={{uri: data.image}} style={styles.image} />
      <Text style={styles.title} numberOfLines={2}>
        {data.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    position: 'absolute',
    color: 'white',
    bottom: 20,
    left: 20,
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
  },
  item: {
    height: 162,
    position: 'relative',
    borderRadius: 18,
    marginVertical: 21,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 18,
  },
});

export default BannerSlider;
