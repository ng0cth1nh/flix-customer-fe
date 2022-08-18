import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
const {height} = Dimensions.get('window');

const ServiceComponent = ({
  data,
  index,
  onPressPriceHandler,
  onPressRequestHandler,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        marginVertical: 12,
        marginTop: index === 0 ? 12 : 0,
        marginHorizontal: '4%',
        height: 'auto',
        paddingVertical: 10,
        paddingHorizontal: 10,
      }}>
      <Image source={{uri: data.image}} style={styles.image} />
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              color: 'black',
              flexWrap: 'wrap',
              flex: 5,
            }}>
            {data.serviceName}
          </Text>
          <TouchableOpacity
            style={styles.editTouch}
            onPress={onPressPriceHandler}>
            <Text style={styles.editText}>Xem thêm</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginTop: 'auto',
          }}>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{marginVertical: 4}}>
            {data.description
              ? data.description
              : 'Tất cả các dịch vụ sửa ' + data.serviceName}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={onPressRequestHandler}>
            <Text style={styles.textBold}>Đặt lịch</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 6,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#FEC54B',
    width: '46%',
  },
  textBold: {
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  image: {
    height: height * 0.12,
    width: height * 0.111,
    borderRadius: 10,
    alignSelf: 'center',
    marginRight: 10,
  },
  editTouch: {
    marginLeft: 'auto',
  },
  editText: {
    color: '#FEC54B',
    textDecorationLine: 'underline',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default ServiceComponent;
