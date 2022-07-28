import React, {useState, useEffect} from 'react';
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
import {selectAddresses} from '../../features/user/userSlice';

const getMainAddress = addresses => {
  return addresses.filter(val => val.mainAddress)[0];
};

const RequestScreen = ({navigation, route}) => {
  const {service} = route.params;
  const [date, setDate] = useState(moment().add(2, 'hours'));
  const [description, setDescription] = useState('');
  const [voucher, setVoucher] = useState(null);
  const isLoading = useSelector(selectIsLoading);
  const [paymentMethod, setPaymentMethod] = useState({
    id: 'C',
    name: 'Tiền mặt',
  });
  const customerAPI = useAxios();
  const dispatch = useDispatch();
  const addresses = useSelector(selectAddresses);
  const [address, setAddress] = useState(getMainAddress(addresses));
  //const {loading, data} = useFetchData(ApiConstants.GET_MAIN_ADDRESS_API);

  const handleClickVoucher = () => {
    navigation.push('PickVoucherCodeScreen');
  };

  const handleChangeAddress = () => {
    navigation.push('AddressListScreen');
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

  useEffect(() => {
    setAddress(getMainAddress(addresses));
  }, [addresses]);

  const handleSubmitButtonClick = async () => {
    const body = {
      serviceId: service.id,
      addressId: address.addressId,
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

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <TopHeaderComponent
        navigation={navigation}
        title="Đặt lịch"
        isBackButton={true}
        statusBarColor="white"
      />
      <SafeAreaView style={{flex: 1}}>
        {/* {loading ? <Loading /> : null} */}
        <ProgressLoader
          visible={isLoading}
          isModal={true}
          isHUD={true}
          hudColor={'#FEC54B'}
          color={'#000000'}
        />

        <RequestForm
          date={date}
          setDate={setDate}
          description={description}
          setDescription={setDescription}
          data={service}
          address={address}
          paymentMethod={paymentMethod}
          handleClickVoucher={handleClickVoucher}
          handleClickService={handleClickService}
          handleClickChoosePaymentMethod={handleClickChoosePaymentMethod}
          handleSubmitButtonClick={handleSubmitButtonClick}
          isShowSubmitButton={true}
          handleChangeAddress={handleChangeAddress}
          submitButtonText="ĐẶT LỊCH"
          editable={true}
          isFetchFixedService={false}
        />
      </SafeAreaView>
    </View>
  );
};

export default RequestScreen;
