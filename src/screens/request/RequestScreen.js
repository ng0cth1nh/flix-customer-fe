import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import moment from 'moment';
import ApiConstants from '../../constants/Api';
import useFetchData from '../../hooks/useFetchData';
import BackButton from '../../components/BackButton';
import RequestForm from '../../components/RequestForm';
import useAxios from '../../hooks/useAxios';
import getErrorMessage from '../../utils/getErrorMessage';
import Toast from 'react-native-toast-message';
import {useSelector, useDispatch} from 'react-redux';
import {
  createRequest,
  fetchRequest,
  setLoading,
} from '../../redux/actions/requestAction';
import ProgressLoader from 'rn-progress-loader';
import {RequestStatus} from '../../utils/util';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const RequestScreen = ({navigation, route}) => {
  const {service} = route.params;
  const [date, setDate] = useState(moment().add(1, 'hours'));
  const [description, setDescription] = useState('');
  const [voucher, setVoucher] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState({
    id: 'C',
    name: 'Tiền mặt',
  });

  //const test = handlerSubmitButtonClick.bind(RequestForm);

  const {errorMessage, isLoading} = useSelector(state => state.requestInfo);

  const customerAPI = useAxios();
  const dispatch = useDispatch();

  const handelClickVoucher = () => {
    navigation.push('PickVoucherCodeScreen');
  };

  const handelClickService = () => {
    navigation.goBack();
  };

  const handelClickChoosePaymentMethod = () => {
    navigation.push('ChoosePaymentMethodScreen', {
      paymentMethod,
      setPaymentMethod,
    });
  };

  const handlerSubmitButtonClick = async () => {
    try {
      const body = {
        serviceId: service.serviceId,
        addressId: data.addressId,
        expectFixingDay: date.format('yyyy-MM-DD HH:mm:ss'),
        description,
        voucherId: voucher,
        paymentMethodId: paymentMethod.id,
      };
      await dispatch(setLoading());
      await dispatch(createRequest(customerAPI, body));
      console.log('errorMessage: ' + errorMessage);
      if (errorMessage === '') {
        await dispatch(fetchRequest(customerAPI, RequestStatus.PENDING));
        navigation.navigate('RequestHistoryStackScreen', {
          screen: 'RequestHistoryScreen',
        });
        Toast.show({
          type: 'customToast',
          text1: 'Đặt lịch thành công',
        });
      } else {
        Toast.show({
          type: 'customErrorToast',
          text1: errorMessage,
        });
      }
    } catch (err) {
      console.log(getErrorMessage(err));
    }
  };

  const {loading, data} = useFetchData(ApiConstants.GET_MAIN_ADDRESS_API);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <BackButton onPressHandler={navigation.goBack} color="black" />
      <Text style={styles.headerText}>Đặt lịch</Text>
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
            buttonText="ĐẶT LỊCH"
            date={date}
            setDate={setDate}
            description={description}
            setDescription={setDescription}
            service={service}
            address={data}
            paymentMethod={paymentMethod}
            handelClickVoucher={handelClickVoucher}
            handelClickService={handelClickService}
            handelClickChoosePaymentMethod={handelClickChoosePaymentMethod}
            handlerSubmitButtonClick={handlerSubmitButtonClick}
            editable={true}
          />
        ) : null}
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  headerText: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    color: 'black',
    marginTop: getStatusBarHeight(),
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CACACA',
    width: '100%',
    marginBottom: 10,
  },
});

export default RequestScreen;
