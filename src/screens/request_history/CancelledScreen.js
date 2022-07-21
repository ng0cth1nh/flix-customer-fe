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
import Loading from '../../components/Loading';

const CancelledScreen = ({navigation}) => {
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
        fetchRequests({customerAPI, status: RequestStatus.CANCELLED}),
      );
    })();
  }, []);

  const handleNavigationToListPrice = service => {
    navigation.push('ServicePriceScreen', {
      serviceName: service.serviceName,
      serviceId: 1,
    });
  };

  const handleNavigationToDetailRequest = requestCode => {
    navigation.push('RequestDetailScreen', {
      requestCode,
      isFetchFixedService: true,
      isShowSubmitButton: false,
      submitButtonText: 'Hủy yêu cầu',
      typeSubmitButtonClick: 'CANCEL_REQUEST',
    });
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      {isLoading ? <Loading /> : null}
      {/* {isError ? <NotFound /> : null} */}
      {requests.cancelled ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={requests.cancelled}
          style={{marginHorizontal: 20}}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={Empty}
          refreshControl={
            <RefreshControl
              refreshing={refreshControl}
              onRefresh={async () => {
                setRefreshControl(true);
                await dispatch(
                  fetchRequests({
                    customerAPI,
                    status: RequestStatus.CANCELLED,
                  }),
                );
                setRefreshControl(false);
              }}
              colors={['#FEC54B']}
            />
          }
          renderItem={({item, index}) => (
            <RequestItem
              handleButtonPress={handleNavigationToListPrice}
              handleNavigationToDetailRequest={handleNavigationToDetailRequest}
              item={item}
              index={index}
              textButton="Xem giá dịch vụ"
              text="Phí dịch vụ kiểm tra"
            />
          )}
        />
      ) : null}
    </View>
  );
};

export default CancelledScreen;
