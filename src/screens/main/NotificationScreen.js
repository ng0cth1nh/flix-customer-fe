import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import React, {useState, useEffect} from 'react';
import CustomModal from '../../components/CustomModal';
import TopHeaderComponent from '../../components/TopHeaderComponent';
import {NUMBER_RECORD_PER_PAGE} from '../../constants/Api';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import useAxios from '../../hooks/useAxios';
import {
  selectIsLoading,
  setIsLoading,
  fetchNotifications,
  deleteNotification,
  markReadNotification,
  selectNotifications,
  selectPageNumbers,
  selectTotalPageNotifications,
  setNotifications as setNotis,
  setPageNumbers,
  setTotalPageNotifications,
  setNumberOfUnread,
  selectNumberOfUnread,
} from '../../features/user/userSlice';
import EmptyNoti from '../../components/EmptyNoti';

const NotificationScreen = ({navigation}) => {
  const [notifications, setNotifications] = useState(
    useSelector(selectNotifications),
  );
  const [idDelete, setIdDelete] = useState(-1);
  const [refreshControl, setRefreshControl] = useState(null);
  const [pageNumber, setPageNumber] = useState(useSelector(selectPageNumbers));
  const [totalPage, setTotalPage] = useState(
    useSelector(selectTotalPageNotifications),
  );
  const [modalVisible, setModalVisible] = useState(false);
  const customerAPI = useAxios();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const [stopFetchMore, setStopFetchMore] = useState(false);
  const numberOfUnread = useSelector(selectNumberOfUnread);

  const showModal = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    (async () => {
      if (refreshControl) {
        await loadNotifications();
      }
    })();
  }, [refreshControl]);

  useEffect(() => {
    (async () => {
      let temp = [];
      notifications &&
        notifications.forEach(async item => {
          if (
            (item.type === null ||
              item.type.startsWith('DEPOSIT') ||
              item.type.startsWith('REGISTER_') ||
              item.type.startsWith('RESPONSE_FEEDBACK')) &&
            !item.read
          ) {
            let body = {
              id: item.id,
            };
            await dispatch(
              markReadNotification({
                customerAPI,
                body,
              }),
            ).unwrap();
            temp.push({
              ...item,
              read: true,
            });
          } else {
            temp.push(item);
          }
        });
      dispatch(setNotis([...notifications]));
    })();
  }, [notifications]);

  const loadNotifications = async () => {
    try {
      let temp = 0;
      let res = await dispatch(
        fetchNotifications({
          customerAPI,
          pageNumber: temp,
          pageSize: NUMBER_RECORD_PER_PAGE,
        }),
      ).unwrap();
      dispatch(setNumberOfUnread(res.numberOfUnread ? res.numberOfUnread : 0));
      setNotifications(res.notifications);
      dispatch(setNotis(res.notifications));
      setStopFetchMore(false);
      setPageNumber(0);
      dispatch(setPageNumbers(0));
      setTotalPage(Math.ceil(+res.totalRecord / NUMBER_RECORD_PER_PAGE));
      dispatch(
        setTotalPageNotifications(
          Math.ceil(+res.totalRecord / NUMBER_RECORD_PER_PAGE),
        ),
      );
      console.log('+res.totalRecord:', +res.totalRecord);
    } catch (err) {
      Toast.show({
        type: 'customErrorToast',
        text1: err,
      });
    } finally {
      setRefreshControl(false);
    }
  };

  const handleOnEndReached = async () => {
    try {
      if (!stopFetchMore) {
        if (totalPage <= pageNumber + 1) {
          setStopFetchMore(true);
          return;
        }
        let temp = pageNumber + 1;
        await dispatch(setIsLoading());
        console.log(temp);
        let res = await dispatch(
          fetchNotifications({
            customerAPI,
            pageNumber: temp,
            pageSize: NUMBER_RECORD_PER_PAGE,
          }),
        ).unwrap();

        setNotifications([...notifications, ...res.notifications]);
        dispatch(setNotis([...notifications, ...res.notifications]));
        setPageNumber(pageNumber + 1);
        dispatch(setPageNumbers(pageNumber + 1));
      }
    } catch (err) {
      Toast.show({
        type: 'customErrorToast',
        text1: err,
      });
    }
  };

  const handleDeleteCLick = async () => {
    try {
      setModalVisible(false);
      await dispatch(setIsLoading());
      await dispatch(
        deleteNotification({
          customerAPI,
          id: idDelete,
        }),
      ).unwrap();
      let temp = notifications.filter(item => {
        return item.id !== idDelete;
      });
      setNotifications(temp);
      dispatch(setNotis(temp));
    } catch (err) {
      Toast.show({
        type: 'customErrorToast',
        text1: err,
      });
    }
  };

  const handleNavigate = async (requestCode, type, id, read) => {
    try {
      if (!read) {
        let body = {
          id,
        };
        await dispatch(
          markReadNotification({
            customerAPI,
            body,
          }),
        ).unwrap();
        let temp = [];
        notifications.forEach(element => {
          if (element.id === id) {
            temp.push({
              ...element,
              read: true,
            });
          } else {
            temp.push(element);
          }
        });
        setNotifications(temp);
        dispatch(setNotis(temp));
        dispatch(setNumberOfUnread(numberOfUnread - 1));
      }
      let params = null;
      if (type.startsWith('REQUEST')) {
        if (type === 'REQUEST_APPROVED') {
          params = {
            requestCode,
            isFetchFixedService: false,
            isShowSubmitButton: true,
            submitButtonText: 'H???y y??u c???u',
            typeSubmitButtonClick: 'CANCEL_REQUEST',
            isShowCancelButton: true,
            navigateFromScreen: 'APPROVED',
            isNavigateFromNotiScreen: true,
          };
        }
        if (type === 'REQUEST_CREATE_SUCCESS') {
          params = {
            requestCode,
            isFetchFixedService: false,
            isShowSubmitButton: true,
            submitButtonText: 'H???y y??u c???u',
            typeSubmitButtonClick: 'CANCEL_REQUEST',
            isShowCancelButton: true,
            navigateFromScreen: 'PENDING',
            isNavigateFromNotiScreen: true,
          };
        }
        if (type === 'REQUEST_CONFIRM_FIXING') {
          params = {
            requestCode,
            isFetchFixedService: true,
            isShowSubmitButton: true,
            submitButtonText: 'H???y y??u c???u',
            typeSubmitButtonClick: 'CANCEL_REQUEST',
            isShowCancelButton: true,
            navigateFromScreen: 'FIXING',
            isNavigateFromNotiScreen: true,
          };
        }
        if (type === 'REQUEST_DONE') {
          params = {
            requestCode,
            isFetchFixedService: true,
            isShowSubmitButton: false,
            submitButtonText: 'H???y y??u c???u',
            typeSubmitButtonClick: 'CANCEL_REQUEST',
            isNavigateFromNotiScreen: true,
          };
        }
        if (type === 'REQUEST_CANCELED') {
          params = {
            requestCode,
            isFetchFixedService: false,
            isShowSubmitButton: false,
            submitButtonText: 'H???y y??u c???u',
            typeSubmitButtonClick: 'CANCEL_REQUEST',
            isNavigateFromNotiScreen: true,
          };
        }
        navigation.navigate('RequestHistoryStackScreen', {
          screen: 'RequestDetailScreen',
          params,
        });
      } else {
        navigation.navigate('RequestHistoryStackScreen', {
          screen: 'InvoiceScreen',
          params: {
            requestCode,
            isNavigateFromNotiScreen: true,
            vnp_TxnRef: null,
            vnp_ResponseCode: null,
          },
        });
      }
    } catch (err) {}
  };

  const renderItem = ({item, index}) => {
    return item.type === null ||
      item.type.startsWith('DEPOSIT') ||
      item.type.startsWith('REGISTER_') ||
      item.type.startsWith('RESPONSE_FEEDBACK') ? (
      <View
        style={{
          height: 'auto',
          backgroundColor: item.read ? 'white' : '#F0F0F0',
          borderBottomColor: '#6b6b6b',
          borderBottomWidth: 1,
          paddingBottom: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            setIdDelete(item.id);
            showModal();
          }}
          style={{
            height: 14,
            width: 14,
            alignSelf: 'flex-end',
            marginRight: 10,
            marginTop: 10,
          }}>
          <Image
            source={require('../../../assets/images/type/close.png')}
            style={{
              height: 12,
              width: 12,
            }}
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={
              !item.type || (item.type && item.type.startsWith('REQUEST'))
                ? require('../../../assets/images/type/archive.png')
                : item.type.startsWith('RESPONSE_FEEDBACK')
                ? require('../../../assets/images/type/help-desk.png')
                : item.type.startsWith('DEPOSIT')
                ? require('../../../assets/images/type/deposit.png')
                : item.type.startsWith('REGISTER_FAIL')
                ? require('../../../assets/images/type/unCheck.png')
                : require('../../../assets/images/type/check.png')
            }
            style={{
              height: 24,
              width: 24,
              alignSelf: 'center',
              marginHorizontal: 14,
            }}
          />
          <View style={{paddingRight: 60, alignSelf: 'center'}}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontSize: 14,
                color: '#E67F1E',
                fontWeight: 'bold',
              }}>
              {item.title}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: 'black',
                flexWrap: 'wrap',
                marginVertical: 8,
              }}>
              {item.content}
            </Text>
            <Text
              style={{
                fontSize: 8,
                color: '#7C7C7C',
              }}>
              {moment(item.date).format('HH:mm - DD/MM/YYYY')}
            </Text>
          </View>
        </View>
      </View>
    ) : (
      <TouchableOpacity
        style={{
          height: 'auto',
          backgroundColor: item.read ? 'white' : '#F0F0F0',
          borderBottomColor: '#6b6b6b',
          borderBottomWidth: 1,
          paddingBottom: 10,
        }}
        onPress={() =>
          handleNavigate(item.requestCode, item.type, item.id, item.read)
        }>
        <TouchableOpacity
          onPress={() => {
            setIdDelete(item.id);
            showModal();
          }}
          style={{
            height: 14,
            width: 14,
            alignSelf: 'flex-end',
            marginRight: 10,
            marginTop: 10,
          }}>
          <Image
            source={require('../../../assets/images/type/close.png')}
            style={{
              height: 12,
              width: 12,
            }}
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={
              item.type.startsWith('REQUEST')
                ? require('../../../assets/images/type/archive.png')
                : require('../../../assets/images/type/invoice.png')
            }
            style={{
              height: 24,
              width: 24,
              alignSelf: 'center',
              marginHorizontal: 14,
            }}
          />
          <View style={{paddingRight: 60, alignSelf: 'center'}}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontSize: 14,
                color: '#E67F1E',
                fontWeight: 'bold',
              }}>
              {item.title}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: 'black',
                flexWrap: 'wrap',
                marginVertical: 8,
              }}>
              {item.content}
            </Text>
            <Text
              style={{
                fontSize: 8,
                color: '#7C7C7C',
              }}>
              {moment(item.date).format('HH:mm - DD/MM/YYYY')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        {backgroundColor: 'white', flex: 1},
        modalVisible ? {opacity: 0.9} : {},
      ]}>
      <TopHeaderComponent
        navigation={null}
        title="Th??ng b??o"
        isBackButton={false}
        statusBarColor="white"
      />
      <SafeAreaView style={{flex: 1}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={notifications}
          renderItem={renderItem}
          ListEmptyComponent={EmptyNoti}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshControl}
              onRefresh={() => setRefreshControl(true)}
              colors={['#FEC54B']}
            />
          }
          ListFooterComponent={() =>
            isLoading &&
            !refreshControl && (
              <ActivityIndicator
                size="small"
                color="#FEC54B"
                style={{
                  marginTop: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  padding: 10,
                }}
              />
            )
          }
          onEndReached={handleOnEndReached}
          onScrollBeginDrag={() => {
            setStopFetchMore(false);
          }}
          onEndReachedThreshold={0.5}
        />
      </SafeAreaView>
      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        modalRatio={0.3}>
        <Text style={styles.modalText}>
          B???n c?? ch???c ch???n mu???n x??a th??ng b??o n??y kh??ng?
        </Text>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            style={[styles.button, styles.buttonOpen]}
            onPress={handleDeleteCLick}>
            <Text style={styles.textStyle}>X??A</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>????NG</Text>
          </TouchableOpacity>
        </View>
      </CustomModal>
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
    borderBottomWidth: 0.7,
    borderBottomColor: '#CACACA',
    width: '100%',
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
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 40,
    textAlign: 'center',
  },
});
export default NotificationScreen;
