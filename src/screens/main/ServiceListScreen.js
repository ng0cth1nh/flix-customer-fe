import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import BackButton from '../../components/BackButton';
import ServiceComponent from '../../components/ServiceComponent';
import customerAPI from '../../api/customer';
import ApiConstants from '../../constants/Api';
import NotFound from '../../components/NotFound';

const ServiceListScreen = ({route, navigation}) => {
  const {categoryName, categoryId} = route.params;
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        let response = await customerAPI.get(
          ApiConstants.GET_SERVICES_BY_CATEGORY_API,
          {
            params: {categoryId: categoryId},
          },
        );
        setServices(response.data.services);
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
        <Text style={styles.headerText}>{categoryName}</Text>
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
        {isError ? <NotFound /> : null}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={services}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <ServiceComponent
              key={item.serviceId}
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
          )}
        />
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
