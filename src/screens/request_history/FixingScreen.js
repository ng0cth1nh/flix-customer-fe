import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, ActivityIndicator, View} from 'react-native';
import RequestItem from '../../components/RequestItem';
import Empty from '../../components/Empty';
import {RequestStatus} from '../../utils/util';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchRequests,
  selectRequests,
  selectIsLoading,
  setIsLoading,
} from '../../features/request/requestSlice';
import useAxios from '../../hooks/useAxios';
import Loading from '../../components/Loading';

const FixingScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const customerAPI = useAxios();
  const isLoading = useSelector(selectIsLoading);
  const requests = useSelector(selectRequests);

  const [refreshControl, setRefreshControl] = useState(false);
 
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
      isShowSubmitButton: true,
      submitButtonText: 'Hủy yêu cầu',
      typeSubmitButtonClick: 'CANCEL_REQUEST',
      isShowCancelButton: true,
      navigateFromScreen: 'FIXING',
    });
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      {isLoading ? <Loading /> : null}
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
                try {
                  setRefreshControl(true);
                  await dispatch(
                    fetchRequests({
                      customerAPI,
                      status: RequestStatus.FIXING,
                    }),
                  );
                  await setIsLoading(true);
                  dispatch(
                    fetchRequests({
                      customerAPI,
                      status: RequestStatus.PAYMENT_WAITING,
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
                    fetchRequests({customerAPI, status: RequestStatus.DONE}),
                  );
                  dispatch(
                    fetchRequests({
                      customerAPI,
                      status: RequestStatus.CANCELLED,
                    }),
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

export default FixingScreen;
