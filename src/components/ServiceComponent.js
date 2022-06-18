import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
const {width, height} = Dimensions.get('window');

const ServiceComponent = ({data, onPressPriceHandler, onPressRequestHandler}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        marginBottom: 12,
        height: height * 0.152,
      }}>
      <Image source={{uri: data.imageUrl}} style={styles.image} />
      <View style={{alignSelf: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
          {data.serviceName}
        </Text>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TouchableOpacity style={styles.button} onPress={onPressPriceHandler}>
            <Text style={styles.textBold}>Xem giá dịch vụ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onPressRequestHandler}>
            <Text style={styles.textBold}>Đặt lịch</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#FEC54B',
    marginTop: 20,
    marginRight: 20,
  },
  textBold: {
    fontWeight: 'bold',
    color: 'black',
  },
  image: {
    height: height * 0.12,
    width: height * 0.111,
    borderRadius: 10,
    alignSelf: 'center',
    marginHorizontal: 20,
  },
});

export default ServiceComponent;
