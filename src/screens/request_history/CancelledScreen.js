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
  setIsLoading,
} from '../../features/request/requestSlice';

import useAxios from '../../hooks/useAxios';

const CancelledScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const customerAPI = useAxios();
  const errorMessage = useSelector(selectErrorMessage);
  const isLoading = useSelector(selectIsLoading);
  const requests = useSelector(selectRequests);
  const [refreshControl, setRefreshControl] = useState(false);
  // useEffect(() => {
  //   (async () => {
  //     // await dispatch(setLoading());
  //     await dispatch(
  //       fetchRequests({customerAPI, status: RequestStatus.CANCELLED}),
  //     );
  //   })();
  // }, []);

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
                try {
                  setRefreshControl(true);
                  await dispatch(
                    fetchRequests({
                      customerAPI,
                      status: RequestStatus.CANCELLED,
                    }),
                  );
                  await setIsLoading(true);
                  dispatch(
                    fetchRequests({
                      customerAPI,
                      status: RequestStatus.FIXING,
                    }),
                  );
                  dispatch(
                    fetchRequests({
                      customerAPI,
                      status: RequestStatus.APPROVED,
                    }),
                  );
                  dispatch(
                    fetchRequests({
                      customerAPI,
                      status: RequestStatus.PENDING,
                    }),
                  );

                  dispatch(
                    fetchRequests({
                      customerAPI,
                      status: RequestStatus.PAYMENT_WAITING,
                    }),
                  );
                  dispatch(
                    fetchRequests({customerAPI, status: RequestStatus.DONE}),
                  );
                } catch (err) {
                  console.log(err);
                } finally {
                  setRefreshControl(false);
                }
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
              isFixed={false}
            />
          )}
        />
      ) : null}
    </View>
  );
};

export default CancelledScreen;
