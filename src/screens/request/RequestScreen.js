import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, Text, StyleSheet} from 'react-native';
import moment from 'moment';
import CustomModal from '../../components/CustomModal';
import SubmitButton from '../../components/SubmitButton';
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
  const [modalVisible, setModalVisible] = useState(false);
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

  const handleClickGetSubServices = () => {
    navigation.push('ServicePriceScreen', {
      serviceId: service.id ? service.id : service.serviceId,
      serviceName: service.serviceName,
    });
  };

  useEffect(() => {
    setAddress(getMainAddress(addresses));
  }, [addresses]);

  const handleSubmitButtonClick = async () => {
    const body = {
      serviceId: service.id ? service.id : service.serviceId,
      addressId: address.addressId,
      expectFixingDay: date.format('yyyy-MM-DD HH:mm:ss'),
      description,
      voucherId: voucher,
      paymentMethodId: paymentMethod.id,
    };
    try {
      console.log(body);
      await dispatch(setIsLoading());
      await dispatch(createRequest({customerAPI, body})).unwrap();
      Toast.show({
        type: 'customToast',
        text1: 'Đặt lịch thành công',
      });
      await dispatch(
        fetchRequests({customerAPI, status: RequestStatus.PENDING}),
      ).unwrap();
      navigation.navigate('RequestHistoryStackScreen', {
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
          handleClickGetSubServices={handleClickGetSubServices}
          isFetchFixedService={false}
          setModalVisible={setModalVisible}
        />
        <CustomModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          modalRatio={0.28}>
          <Text style={styles.modalText}>Thông báo</Text>
          <View style={{marginVertical: 10}}>
            <Text>Tính năng voucher sẽ sớm ra mắt trong thời gian tới</Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <SubmitButton
              style={{
                marginVertical: 8,
                width: '100%',
                alignSelf: 'center',
              }}
              onPress={() => setModalVisible(false)}
              buttonText="ĐỒNG Ý"
            />
          </View>
        </CustomModal>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 5,
  },
});

export default RequestScreen;
