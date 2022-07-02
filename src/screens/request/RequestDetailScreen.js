import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import moment from 'moment';
import ApiConstants from '../../constants/Api';
import NotFound from '../../components/NotFound';
import useFetchData from '../../hooks/useFetchData';
import {numberWithCommas, RequestStatus} from '../../utils/util';
import BackButton from '../../components/BackButton';
import RequestForm from '../../components/RequestForm';
import useAxios from '../../hooks/useAxios';
import CustomModal from '../../components/CustomModal';
import {RadioButton} from 'react-native-paper';
import CancelReasons from '../../constants/CancelReasons';
import Toast from 'react-native-toast-message';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchRequests,
  cancelRequest,
  setIsLoading,
  selectIsLoading,
} from '../../features/request/requestSlice';
import ProgressLoader from 'rn-progress-loader';

const RequestDetailScreen = ({route, navigation}) => {
  const {requestCode} = route.params;
  const [date, setDate] = useState(moment());
  //const [data, setData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const isLoading = useSelector(selectIsLoading);
  //  const errorMessage = useSelector(selectErrorMessage);

  const [reason, setReason] = useState({index: 0, reason: CancelReasons[0]});
  const [contentOtherReason, setContentOtherReason] = useState('');
  // const buttonClicked = () => {
  //   setPaymentMethod(checked);
  //   navigation.goBack();
  // };
  const [description, setDiscription] = useState('');
  function handlerButtonClick() {
    console.log(date);
  }

  // const {errorMessage, isLoading} = useSelector(state => state.requestInfo);

  const customerAPI = useAxios();
  const dispatch = useDispatch();

  const showModal = () => {
    setModalVisible(true);
  };

  const {loading, data, isError} = useFetchData(
    ApiConstants.GET_REQUEST_DETAIL_API,
    {
      params: {requestCode},
    },
  );

  const handlerCancelButtonClick = async () => {
    try {
      await dispatch(setIsLoading());
      await dispatch(
        cancelRequest({
          customerAPI,
          body: {requestCode, reason: reason.reason},
        }),
      ).unwrap();
      setModalVisible(false);
      Toast.show({
        type: 'customToast',
        text1: 'Hủy yêu cầu thành công',
      });
      dispatch(
        fetchRequests({customerAPI, status: RequestStatus.PENDING}),
      ).unwrap();
      navigation.goBack();
      dispatch(
        fetchRequests({customerAPI, status: RequestStatus.CANCELLED}),
      ).unwrap();
    } catch (err) {
      Toast.show({
        type: 'customErrorToast',
        text1: err,
      });
    }
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <BackButton onPressHandler={navigation.goBack} color="black" />
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            borderBottomWidth: 1,
            borderBottomColor: '#CACACA',
            marginBottom: 10,
            paddingRight: 20,
          }}>
          <View style={{flex: 1, marginLeft: 20}}>
            <Text style={styles.headerText}>Yêu cầu sửa chữa</Text>
          </View>
        </View>
        {isError ? <NotFound /> : null}
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
            buttonText="Hủy yêu cầu"
            address={null}
            date={null}
            service={data}
            editable={false}
            paymentMethod={null}
            isRequestIdVisible={true}
            handlerSubmitButtonClick={showModal}
          />
        ) : null}
        <CustomModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          modalRatio={0.8}>
          <Text style={styles.modalText}>Chọn lý do hủy</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              flex: 1,
            }}>
            {CancelReasons.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setReason({index, reason: CancelReasons[index]});
                  }}
                  style={styles.box}
                  key={index}>
                  <RadioButton
                    value={item}
                    status={index === reason.index ? 'checked' : 'unchecked'}
                    color="#FFBC00"
                  />
                  <Text style={styles.text}>{item}</Text>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              onPress={() => {
                setReason({index: -1, reason: contentOtherReason});
              }}
              style={styles.box}>
              <RadioButton
                status={reason.index === -1 ? 'checked' : 'unchecked'}
                color="#FFBC00"
              />
              <Text style={styles.text}>Khác</Text>
            </TouchableOpacity>
            <TextInput
              style={{
                backgroundColor: '#F0F0F0',
                borderRadius: 10,
                marginLeft: 34,
                paddingLeft: 10,
              }}
              numberOfLines={3}
              editable={reason.index === -1}
              onChangeText={text => setContentOtherReason(text)}
              value={contentOtherReason}
              placeholder="Nhập lý do khác"
              placeholderTextColor="#DFDFDF"
            />
          </ScrollView>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginVertical: 20,
            }}>
            <TouchableOpacity
              style={[styles.button, styles.buttonOpen]}
              onPress={handlerCancelButtonClick}>
              <Text style={styles.textStyle}>ĐỒNG Ý</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>THOÁT</Text>
            </TouchableOpacity>
          </View>
        </CustomModal>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  headerText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
    marginTop: getStatusBarHeight(),
    paddingBottom: 15,
    alignSelf: 'center',
  },
  button: {
    width: '40%',
    borderRadius: 20,
    paddingVertical: 10,
  },
  buttonOpen: {
    backgroundColor: '#FEC54B',
  },
  buttonClose: {
    backgroundColor: '#F0F0F0',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  box: {
    height: 'auto',
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default RequestDetailScreen;
