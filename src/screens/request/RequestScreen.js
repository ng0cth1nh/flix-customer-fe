import React, {useState} from 'react';
import {View, SafeAreaView, ActivityIndicator} from 'react-native';
import moment from 'moment';
import ApiConstants from '../../constants/Api';
import useFetchData from '../../hooks/useFetchData';
import RequestForm from '../../components/RequestForm';
import useAxios from '../../hooks/useAxios';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {
  createRequest,
  setIsLoading,
  fetchRequests,
  selectIsLoading,
} from '../../features/request/requestSlice';
import {RequestStatus} from '../../utils/util';
import ProgressLoader from 'rn-progress-loader';
import TopHeaderComponent from '../../components/TopHeaderComponent';

const RequestScreen = ({navigation, route}) => {
  const {service} = route.params;
  const [date, setDate] = useState(moment().add(1, 'hours'));
  const [description, setDescription] = useState('');
  const [voucher, setVoucher] = useState(null);
  const isLoading = useSelector(selectIsLoading);
  const [paymentMethod, setPaymentMethod] = useState({
    id: 'C',
    name: 'Tiền mặt',
  });
  const customerAPI = useAxios();
  const dispatch = useDispatch();

  const handleClickVoucher = () => {
    navigation.push('PickVoucherCodeScreen');
  };

  const handleClickService = () => {
    navigation.goBack();
  };

  const handleClickChoosePaymentMethod = () => {
    navigation.push('ChoosePaymentMethodScreen', {
      paymentMethod,
      setPaymentMethod,
    });
  };

  const handleSubmitButtonClick = async () => {
    const body = {
      serviceId: service.id,
      addressId: data.addressId,
      expectFixingDay: date.format('yyyy-MM-DD HH:mm:ss'),
      description,
      voucherId: voucher,
      paymentMethodId: paymentMethod.id,
    };
    try {
      await dispatch(setIsLoading());
      await dispatch(createRequest({customerAPI, body})).unwrap();
      Toast.show({
        type: 'customToast',
        text1: 'Đặt lịch thành công',
      });
      dispatch(
        fetchRequests({customerAPI, status: RequestStatus.PENDING}),
      ).unwrap();
      navigation.navigate('RequestHistoryScreen', {
        screen: 'PendingScreen',
      });
    } catch (err) {
      Toast.show({
        type: 'customErrorToast',
        text1: err,
      });
    }
  };

  const {loading, data} = useFetchData(ApiConstants.GET_MAIN_ADDRESS_API);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <TopHeaderComponent
        navigation={navigation}
        title="Đặt lịch"
        isBackButton={true}
        statusBarColor="white"
      />
      <SafeAreaView style={{flex: 1}}>
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
        <ProgressLoader
          visible={isLoading}
          isModal={true}
          isHUD={true}
          hudColor={'#FEC54B'}
          color={'#000000'}
        />
        {data !== null ? (
          <RequestForm
            date={date}
            setDate={setDate}
            description={description}
            setDescription={setDescription}
            data={service}
            address={data}
            paymentMethod={paymentMethod}
            handleClickVoucher={handleClickVoucher}
            handleClickService={handleClickService}
            handleClickChoosePaymentMethod={handleClickChoosePaymentMethod}
            handleSubmitButtonClick={handleSubmitButtonClick}
            isShowSubmitButton={true}
            submitButtonText="ĐẶT LỊCH"
            editable={true}
            isFetchFixedService={false}
          />
        ) : null}
      </SafeAreaView>
    </View>
  );
};

export default RequestScreen;
