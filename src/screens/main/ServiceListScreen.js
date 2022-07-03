import React from 'react';
import {FlatList, StyleSheet, ActivityIndicator, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import ServiceComponent from '../../components/ServiceComponent';
import ApiConstants from '../../constants/Api';
import NotFound from '../../components/NotFound';
import TopHeaderComponent from '../../components/TopHeaderComponent';
import useFetchData from '../../hooks/useFetchData';

const ServiceListScreen = ({route, navigation}) => {
  const {categoryName, categoryId} = route.params;

  const {loading, data, isError} = useFetchData(
    ApiConstants.GET_SERVICES_BY_CATEGORY_API,
    {
      params: {categoryId: categoryId},
    },
  );

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <TopHeaderComponent
        navigation={navigation}
        title={categoryName}
        isBackButton={true}
        statusBarColor="white"
      />
      <View
        style={{
          flex: 1,
        }}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color="#FEC54B"
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        ) : null}
        {isError ? <NotFound /> : null}
        {data !== null ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data.services}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <ServiceComponent
                key={item.serviceId}
                data={item}
                index={index}
                onPressPriceHandler={() =>
                  navigation.push('ServicePriceScreen', {
                    serviceId: item.serviceId,
                    serviceName: item.serviceName,
                  })
                }
                onPressRequestHandler={() =>
                  navigation.push('RequestScreen', {
                    service: item,
                  })
                }
              />
            )}
          />
        ) : null}
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
