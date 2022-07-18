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

const DoneScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const customerAPI = useAxios();
  const isLoading = useSelector(selectIsLoading);
  const requests = useSelector(selectRequests);
  const [refreshControl, setRefreshControl] = useState(false);
  // useEffect(() => {
  //   (async () => {
  //     await dispatch(fetchRequests({customerAPI, status: RequestStatus.DONE}));
  //   })();
  // }, []);

  const handleGetInvoiceButton = async service => {
    navigation.push('InvoiceScreen', {
      requestCode: service.requestCode,
      isShowConfirm: false,
      vnp_TxnRef: null,
      vnp_ResponseCode: null,
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
      {requests.done ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={requests.done}
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
                    fetchRequests({customerAPI, status: RequestStatus.DONE}),
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
                    fetchRequests({
                      customerAPI,
                      status: RequestStatus.FIXING,
                    }),
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
              handleButtonPress={handleGetInvoiceButton}
              handleNavigationToDetailRequest={handleNavigationToDetailRequest}
              item={item}
              index={index}
              textButton="Xem hóa đơn"
              text="Phí dịch vụ kiểm tra"
              isFixed={true}
            />
          )}
        />
      ) : null}
    </View>
  );
};

export default DoneScreen;
