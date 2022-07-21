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
} from '../../features/request/requestSlice';
import useAxios from '../../hooks/useAxios';
import Loading from '../../components/Loading';

const ApprovedScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const customerAPI = useAxios();
  const isLoading = useSelector(selectIsLoading);
  const requests = useSelector(selectRequests);
  const [refreshControl, setRefreshControl] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(
        fetchRequests({customerAPI, status: RequestStatus.APPROVED}),
      );
    })();
  }, []);

  const handleNavigationToListPrice = async service => {
    navigation.push('ServicePriceScreen', {
      serviceName: service.serviceName,
      serviceId: service.serviceId,
    });
  };

  const handleNavigationToDetailRequest = requestCode => {
    navigation.push('RequestDetailScreen', {
      requestCode,
      isFetchFixedService: false,
      isShowSubmitButton: true,
      submitButtonText: 'Hủy yêu cầu',
      typeSubmitButtonClick: 'CANCEL_REQUEST',
      isShowCancelButton: true,
    });
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      {isLoading ? <Loading /> : null}
      {/* {isError ? <NotFound /> : null} */}
      {requests.approved ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={requests.approved}
          style={{marginHorizontal: 20}}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={Empty}
          refreshControl={
            <RefreshControl
              refreshing={refreshControl}
              onRefresh={async () => {
                setRefreshControl(true);
                await dispatch(
                  fetchRequests({customerAPI, status: RequestStatus.APPROVED}),
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

export default ApprovedScreen;
