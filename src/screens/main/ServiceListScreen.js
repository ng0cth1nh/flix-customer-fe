import React, {useEffect, useState} from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import BackButton from '../../components/BackButton';
import ServiceComponent from '../../components/ServiceComponent';

const SERVICES = [
  {
    imageUrl:
      'https://i.postimg.cc/L85TSmzM/engin-akyurt-y-CYVV8-k-QNM-unsplash.jpg',
    price: 200000,
    serviceId: 10,
    serviceName: 'Lò nướng',
  },
  {
    imageUrl:
      'https://i.postimg.cc/L85TSmzM/engin-akyurt-y-CYVV8-k-QNM-unsplash.jpg',
    price: 200000,
    serviceId: 11,
    serviceName: 'Lò vi sóng',
  },
  {
    imageUrl:
      'https://i.postimg.cc/L85TSmzM/engin-akyurt-y-CYVV8-k-QNM-unsplash.jpg',
    price: 200000,
    serviceId: 12,
    serviceName: 'Lò vi ba',
  },
  {
    imageUrl:
      'https://i.postimg.cc/L85TSmzM/engin-akyurt-y-CYVV8-k-QNM-unsplash.jpg',
    price: 200000,
    serviceId: 13,
    serviceName: 'Bếp từ',
  },
  {
    imageUrl:
      'https://i.postimg.cc/L85TSmzM/engin-akyurt-y-CYVV8-k-QNM-unsplash.jpg',
    price: 200000,
    serviceId: 14,
    serviceName: 'Bếp hồng ngoại',
  },
  {
    imageUrl:
      'https://i.postimg.cc/L85TSmzM/engin-akyurt-y-CYVV8-k-QNM-unsplash.jpg',
    price: 200000,
    serviceId: 14,
    serviceName: 'Bếp hồng ngoại',
  },
  {
    imageUrl:
      'https://i.postimg.cc/L85TSmzM/engin-akyurt-y-CYVV8-k-QNM-unsplash.jpg',
    price: 200000,
    serviceId: 14,
    serviceName: 'Bếp hồng ngoại',
  },
  {
    imageUrl:
      'https://i.postimg.cc/L85TSmzM/engin-akyurt-y-CYVV8-k-QNM-unsplash.jpg',
    price: 200000,
    serviceId: 14,
    serviceName: 'Bếp hồng ngoại',
  },
];

const ServiceListScreen = ({route, navigation}) => {
  const {majorName, majorId} = route.params;
  const [services, setServices] = useState([]);

  useEffect(() => {
    setServices(SERVICES);
  }, []);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <BackButton onPressHandler={navigation.goBack} color="black" />
      <View style={{flex: 1}}>
        <Text style={styles.headerText}>{majorName}</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{marginHorizontal: 20}}>
          {services.map((item, index) => {
            return (
              <ServiceComponent
                key={index}
                data={item}
                onPressPriceHandler={() =>
                  navigation.push('ServicePriceScreen', {
                    serviceId: item.serviceId,
                    serviceName: item.serviceName,
                  })
                }
                onPressRequestHandler={() =>
                  navigation.push('RequestScreen', {
                    serviceId: item.serviceId,
                  })
                }
              />
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

export default ServiceListScreen;
