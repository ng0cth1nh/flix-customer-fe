import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import NotFound from '../../components/NotFound';
import {RequestStatus} from '../../utils/util';
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
  fetchFixedService,
  fetchRequestDetail,
  selectRequests,
} from '../../features/request/requestSlice';
import ProgressLoader from 'rn-progress-loader';
import TopHeaderComponent from '../../components/TopHeaderComponent';
import Loading from '../../components/Loading';
import {Context as AuthContext} from '../../context/AuthContext';
import disableFirebaseChat from '../../utils/DisableFirebaseChat';

const RequestDetailScreen = ({route, navigation}) => {
  const {
    requestCode,
    isFetchFixedService,
    isShowSubmitButton,
    typeSubmitButtonClick,
    submitButtonText,
    navigateFromScreen = null,
    isNavigateFromNotiScreen = false,
    isEnableChatButton = false,
  } = route.params;
  let {state} = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const isLoading = useSelector(selectIsLoading);
  const [reason, setReason] = useState({index: 0, reason: CancelReasons[0]});
  const [contentOtherReason, setContentOtherReason] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fixedService, setFixedService] = useState(null);
  const [isError, setIsError] = useState(false);
  const requests = useSelector(selectRequests);

  const customerAPI = useAxios();
  const dispatch = useDispatch();
  const showModal = () => {
    setModalVisible(true);
  };

  const checkValidToDeleteConversation = () => {
    let temp =
      requests.approved &&
      requests.approved.findIndex(request => {
        return (
          request.repairerId === data.repairerId &&
          request.requestCode !== data.requestCode
        );
      });
    if (temp !== -1) {
      return false;
    }
    temp =
      requests.fixing &&
      requests.fixing.findIndex(request => {
        return (
          request.repairerId === data.repairerId &&
          request.requestCode !== data.requestCode
        );
      });
    if (temp !== -1) {
      return false;
    }
    temp =
      requests.paymentWaiting &&
      requests.paymentWaiting.findIndex(request => {
        return (
          request.repairerId === data.repairerId &&
          request.requestCode !== data.requestCode
        );
      });
    if (temp !== -1) {
      return false;
    }
    return true;
  };

  const handleClickGetSubServices = () => {
    navigation.push('ServicePriceScreen', {
      serviceId: data.serviceId,
      serviceName: data.serviceName,
    });
  };

  const handleClickRepairerProfile = () => {
    navigation.push('RepairerProfileScreen', {
      repairerId: data.repairerId,
      repairerAvatar: data.repairerAvatar,
    });
  };

  const loadData = async () => {
    try {
      await setLoading(true);
      if (isFetchFixedService) {
        let fixedService = await dispatch(
          fetchFixedService({
            customerAPI,
            requestCode,
          }),
        ).unwrap();
        setFixedService(fixedService);
      }
      let data = await dispatch(
        fetchRequestDetail({
          customerAPI,
          requestCode,
        }),
      ).unwrap();
      setData(data);
    } catch (err) {
      setIsError(true);
    } finally {
      await setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await loadData();
    })();
  }, []);

  const handleCancelButtonClick = async () => {
    try {
      setModalVisible(false);
      await dispatch(setIsLoading());
      await dispatch(
        cancelRequest({
          customerAPI,
          body: {requestCode, reason: contentOtherReason},
        }),
      ).unwrap();
      Toast.show({
        type: 'customToast',
        text1: 'Hủy yêu cầu thành công',
      });
      if (checkValidToDeleteConversation()) {
        disableFirebaseChat(state.userId, data.repairerId, false);
      }
      navigateFromScreen === 'FIXING'
        ? dispatch(
            fetchRequests({customerAPI, status: RequestStatus.FIXING}),
          ).unwrap()
          ? navigateFromScreen === 'APPROVED'
          : dispatch(
              fetchRequests({customerAPI, status: RequestStatus.APPROVED}),
            ).unwrap()
        : dispatch(
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

  const handleApproveInvoiceButtonClick = async () => {
    try {
      setModalVisible(false);
      await dispatch(setIsLoading());
      await dispatch(
        cancelRequest({
          customerAPI,
          body: {requestCode, reason: contentOtherReason},
        }),
      ).unwrap();
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
      <TopHeaderComponent
        navigation={navigation}
        title="Yêu cầu sửa chữa"
        isBackButton={true}
        statusBarColor="white"
        isNavigateFromNotiScreen={isNavigateFromNotiScreen}
      />
      <SafeAreaView style={{flex: 1}}>
        {isError ? <NotFound /> : null}
        {loading ? <Loading /> : null}
        <ProgressLoader
          visible={isLoading}
          isModal={true}
          isHUD={true}
          hudColor={'#FEC54B'}
          color={'#000000'}
        />
        {data !== null ? (
          <RequestForm
            address={null}
            date={null}
            data={data}
            editable={false}
            paymentMethod={null}
            fixedService={fixedService}
            isRequestIdVisible={true}
            isShowSubmitButton={isShowSubmitButton}
            submitButtonText={submitButtonText}
            isEnableChatButton={isEnableChatButton}
            handleClickGetSubServices={handleClickGetSubServices}
            handleClickRepairerProfile={handleClickRepairerProfile}
            handleSubmitButtonClick={
              typeSubmitButtonClick === 'APPROVE_INVOICE'
                ? handleApproveInvoiceButtonClick
                : showModal
            }
            chatHandler={() =>
              navigation.push('ChatScreen', {
                targetUserId: data.repairerId,
                targetUserAvatar: data.repairerAvatar,
                targetUsername: data.repairerName,
              })
            }
            isFetchFixedService={isFetchFixedService}
          />
        ) : null}
        <CustomModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          modalRatio={0.76}>
          <Text style={styles.modalText}>Chọn lý do hủy</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              flex: 1,
              width: '100%',
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
                    onPress={() => {
                      setReason({index, reason: CancelReasons[index]});
                    }}
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
                onPress={() => {
                  setReason({index: -1, reason: contentOtherReason});
                }}
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
              onPress={handleCancelButtonClick}>
              <Text style={styles.textStyle}>ĐỒNG Ý</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>ĐÓNG</Text>
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
    fontSize: 16,
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
