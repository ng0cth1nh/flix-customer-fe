import React, {useEffect, useState} from 'react';
import {FlatList, ActivityIndicator, RefreshControl, View} from 'react-native';
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

const PaymentWaitingScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const customerAPI = useAxios();
  const [refreshControl, setRefreshControl] = useState(false);
  const isLoading = useSelector(selectIsLoading);
  const requests = useSelector(selectRequests);

  const handleGetInvoiceButton = async service => {
    navigation.push('InvoiceScreen', {
      requestCode: service.requestCode,
      isShowConfirm: true,
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
      isEnableChatButton: true,
    });
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      {isLoading ? <Loading /> : null}
      {/* {isError ? <NotFound /> : null} */}
      {requests.paymentWaiting ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={requests.paymentWaiting}
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
                      status: RequestStatus.PAYMENT_WAITING,
                    }),
                  );
                  await setIsLoading(true);
                  dispatch(
                    fetchRequests({customerAPI, status: RequestStatus.DONE}),
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

export default PaymentWaitingScreen;
