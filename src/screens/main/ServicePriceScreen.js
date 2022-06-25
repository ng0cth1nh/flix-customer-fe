import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
  View,
} from 'react-native';
import BackButton from '../../components/BackButton';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import ApiConstants from '../../constants/Api';
import NotFound from '../../components/NotFound';
import customerAPI from '../../api/customer';

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
  const [servicePrice, setServicePrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        let response = await customerAPI.get(
          ApiConstants.GET_SERVICE_DETAIL_API,
          {
            params: {serviceId: serviceId},
          },
        );
        setServicePrice(response.data.services);
      } catch (err) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <BackButton onPressHandler={navigation.goBack} color="black" />
      <View style={{flex: 1}}>
        <Text style={styles.headerText}>{serviceName}</Text>
        <View style={{flex: 1, marginHorizontal: '5%'}}>
          {isError ? <NotFound /> : null}
          {servicePrice ? (
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#F0F0F0',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
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
          ) : null}
          {loading ? (
            <ActivityIndicator
              size="small"
              color="#FEC54B"
              style={{
                alignSelf: 'center',
                flex: 1,
              }}
            />
          ) : null}

          <FlatList
            showsVerticalScrollIndicator={false}
            data={servicePrice}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <View
                key={index}
                style={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#DDDDDD',
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
            )}
          />
        </View>
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
