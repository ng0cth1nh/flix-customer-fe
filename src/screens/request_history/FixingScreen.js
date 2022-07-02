import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  View,
} from 'react-native';
import RequestItem from '../../components/RequestItem';
import ApiConstants from '../../constants/Api';
import NotFound from '../../components/NotFound';
import Empty from '../../components/Empty';
import useFetchData from '../../hooks/useFetchData';
import {RequestStatus} from '../../utils/util';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchRequests,
  selectErrorMessage,
  selectRequests,
  selectIsLoading,
} from '../../features/request/requestSlice';
import useAxios from '../../hooks/useAxios';

const FixingScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const customerAPI = useAxios();
  const errorMessage = useSelector(selectErrorMessage);
  const isLoading = useSelector(selectIsLoading);
  const requests = useSelector(selectRequests);

  const [refreshControl, setRefreshControl] = useState(false);
  useEffect(() => {
    (async () => {
      // await dispatch(setLoading());
      await dispatch(
        fetchRequests({customerAPI, status: RequestStatus.FIXING}),
      );
    })();
  }, []);

  const handelNavigationToListPrice = service => {
    navigation.push('ServicePriceScreen', {
      serviceName: service.serviceName,
      serviceId: 1,
    });
  };

  const handelNavigationToDetailRequest = requestCode => {
    navigation.push('RequestDetailScreen', {
      requestCode,
    });
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      {isLoading ? (
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
      {/* {isError ? <NotFound /> : null} */}
      {requests.fixing ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={requests.fixing}
          style={{marginHorizontal: 20}}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={Empty}
          refreshControl={
            <RefreshControl
              refreshing={refreshControl}
              onRefresh={async () => {
                setRefreshControl(true);
                await dispatch(
                  fetchRequests({customerAPI, status: RequestStatus.FIXING}),
                );
                setRefreshControl(false);
              }}
              colors={['#FEC54B']}
            />
          }
          renderItem={({item}) => (
            <RequestItem
              handelNavigationToListPrice={handelNavigationToListPrice}
              handelNavigationToDetailRequest={handelNavigationToDetailRequest}
              item={item}
            />
          )}
        />
      ) : null}
    </View>
  );
};

export default FixingScreen;
