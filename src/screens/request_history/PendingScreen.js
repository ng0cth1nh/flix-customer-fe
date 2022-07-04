import React, {useEffect, useState} from 'react';
import {RefreshControl, FlatList, ActivityIndicator, View} from 'react-native';
import RequestItem from '../../components/RequestItem';
import Empty from '../../components/Empty';
import {RequestStatus} from '../../utils/util';
import {useSelector, useDispatch} from 'react-redux';
import useAxios from '../../hooks/useAxios';
import {
  fetchRequests,
  setIsLoading,
  selectRequests,
  selectIsLoading,
} from '../../features/request/requestSlice';

const PendingScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const customerAPI = useAxios();
  const [refreshControl, setRefreshControl] = useState(false);
  const isLoading = useSelector(selectIsLoading);
  const requests = useSelector(selectRequests);

  useEffect(() => {
    (async () => {
      await dispatch(setIsLoading());
      await dispatch(
        fetchRequests({customerAPI, status: RequestStatus.PENDING}),
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
      {requests.pending ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={requests.pending}
          style={{marginHorizontal: '4%'}}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={Empty}
          refreshControl={
            <RefreshControl
              refreshing={refreshControl}
              onRefresh={async () => {
                setRefreshControl(true);
                await dispatch(
                  fetchRequests({customerAPI, status: RequestStatus.PENDING}),
                );
                setRefreshControl(false);
              }}
              colors={['#FEC54B']}
            />
          }
          renderItem={({item, index}) => (
            <RequestItem
              handelNavigationToListPrice={handelNavigationToListPrice}
              handelNavigationToDetailRequest={handelNavigationToDetailRequest}
              item={item}
              index={index}
            />
          )}
        />
      ) : null}
    </View>
  );
};

export default PendingScreen;
