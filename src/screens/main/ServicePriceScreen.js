import React, {useEffect, useState} from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import BackButton from '../../components/BackButton';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const SERVICE_PRICE = [
  {
    id: 1,
    price: 60000,
    name: 'Kiểm tra cơ bản ',
  },
  {
    id: 2,
    price: 30000,
    name: 'Nạp ga điều hòa',
  },
  {
    id: 3,
    price: 25000,
    name: 'Hỏng chức năng làm lạnh',
  },
  {
    id: 4,
    price: 2000000,
    name: 'Băng tuyết bám thành mảng trên dàn nhiệt độ',
  },
  {
    id: 5,
    price: 1300000,
    name: 'Điều hòa có tiếng ồn lớn, bất thường',
  },
  {
    id: 6,
    price: 200000,
    name: 'Thiết bị tự động ngừng trong khi sử dụng',
  },
  {
    id: 6,
    price: 200000,
    name: 'Thiết bị tự động ngừng trong khi sử dụng',
  },
  {
    id: 6,
    price: 200000,
    name: 'Thiết bị tự động ngừng trong khi sử dụng',
  },
  {
    id: 6,
    price: 200000,
    name: 'Thiết bị tự động ngừng trong khi sử dụng',
  },
  {
    id: 6,
    price: 200000,
    name: 'Thiết bị tự động ngừng trong khi sử dụng',
  },
  {
    id: 6,
    price: 200000,
    name: 'Thiết bị tự động ngừng trong khi sử dụng',
  },
  {
    id: 6,
    price: 200000,
    name: 'Thiết bị tự động ngừng trong khi sử dụng',
  },
  {
    id: 6,
    price: 200000,
    name: 'Thiết bị tự động ngừng trong khi sử dụng',
  },
];

function numberWithCommas(inputNumber) {
  let formattedNumber = Number(inputNumber)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  let splitArray = formattedNumber.split('.');
  if (splitArray.length > 1) {
    formattedNumber = splitArray[0];
  }
  return formattedNumber;
}

const ServicePriceScreen = ({route, navigation}) => {
  const {serviceName, serviceId} = route.params;
  const [servicePrice, setServicePrice] = useState([]);

  useEffect(() => {
    setServicePrice(SERVICE_PRICE);
  }, []);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <BackButton onPressHandler={navigation.goBack} color="black" />
      <View style={{flex: 1}}>
        <Text style={styles.headerText}>{serviceName}</Text>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#F0F0F0',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            marginHorizontal: 20,
            height: 40,
          }}>
          <Text
            style={{
              flex: 5,
              color: 'black',
              alignSelf: 'center',
              fontSize: 16,
              fontWeight: 'bold',
              paddingLeft: 10,
            }}>
            Các vấn đề thường gặp
          </Text>
          <Text
            style={{
              flex: 2,
              color: 'black',
              alignSelf: 'center',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Giá dịch vụ
          </Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginHorizontal: 20}}>
          {servicePrice.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#CACACA',
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  paddingLeft: 15,
                  height: 50,
                }}>
                <Text
                  style={{
                    flex: 3,
                    color: 'black',
                    fontSize: 14,
                    alignSelf: 'center',
                    paddingRight: 10,
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    color: 'black',
                    fontSize: 14,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  }}>
                  {numberWithCommas(item.price)}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    color: 'black',
    marginTop: getStatusBarHeight(),
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CACACA',
    width: '100%',
    marginBottom: 10,
  },
});

export default ServicePriceScreen;
