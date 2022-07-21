import React, {useState, useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Linking,
} from 'react-native';
import moment from 'moment';
import {RadioButton} from 'react-native-paper';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Clipboard from '@react-native-community/clipboard';
import Button from '../../components/SubmitButton';
const {height} = Dimensions.get('window');
import {
  fetchRequests,
  setIsLoading,
  selectIsLoading,
  fetchFixedService,
  confirmInvoice,
  fetchInvoice,
} from '../../features/request/requestSlice';
import useAxios from '../../hooks/useAxios';
import Toast from 'react-native-toast-message';
import NotFound from '../../components/NotFound';
import ProgressLoader from 'rn-progress-loader';
import {useSelector, useDispatch} from 'react-redux';
import TopHeaderComponent from '../../components/TopHeaderComponent';
import {numberWithCommas} from '../../utils/util';
import {VnPayCode} from '../../constants/Error';
import {RequestStatus} from '../../utils/util';
const InvoiceScreen = ({route, navigation}) => {
  const {vnp_ResponseCode, requestCode, vnp_TxnRef} = route.params;

  const isLoading = useSelector(selectIsLoading);
  const [isLoad, setIsLoad] = useState(false);
  const customerAPI = useAxios();
  const [fixedService, setFixedService] = useState(null);
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const renderServiceItem = ({item, index}) => {
    return (
      <View
        key={index.toString()}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '96%',
          alignSelf: 'center',
          marginVertical: 6,
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            flex: 12,
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            flex: 5,
            textAlign: 'right',
          }}>{`${numberWithCommas(item.price)} vnđ`}</Text>
      </View>
    );
  };
  const copyToClipboard = () => {
    Clipboard.setString(data.requestCode);
    Toast.show({
      type: 'customToast',
      text1: 'Đã sao chép vào khay nhớ tạm',
    });
  };

  useFocusEffect(
    useCallback(() => {
      (async () => {
        if (vnp_ResponseCode && vnp_TxnRef) {
          console.log(
            'FOCUS - vnp_ResponseCode - vnp_TxnRef: ',
            vnp_ResponseCode,
            vnp_TxnRef,
          );
          if (vnp_ResponseCode && vnp_ResponseCode === '00') {
            //await loadData();
            Toast.show({
              type: 'customToast',
              text1: VnPayCode.get(vnp_ResponseCode),
            });
            dispatch(
              fetchRequests({
                customerAPI,
                status: RequestStatus.PAYMENT_WAITING,
              }),
            );
            dispatch(fetchRequests({customerAPI, status: RequestStatus.DONE}));
          } else if (vnp_ResponseCode && vnp_ResponseCode !== '00') {
            Toast.show({
              type: 'customErrorToast',
              text1: VnPayCode.get(vnp_ResponseCode),
            });
          }
        }
      })();
    }, [vnp_ResponseCode, vnp_TxnRef]),
  );

  const handleConfirmPayment = async () => {
    try {
      await dispatch(setIsLoading());
      let response = await dispatch(
        confirmInvoice({
          customerAPI,
          body: {
            requestCode: data.requestCode,
            orderInfo: `${data.customerName} - ${data.customerPhone} thanh toan ${data.actualPrice} cho ${data.requestCode}`,
            bankCode: 'NCB',
          },
        }),
      ).unwrap();
      console.log('response.data: ' + response.data);
      await Linking.openURL(response.data);
    } catch (err) {
      Toast.show({
        type: 'customErrorToast',
        text1: err,
      });
    }
  };

  const handleRatingRepairer = async () => {
    navigation.push('CommentScreen', {
      data,
    });
  };

  const loadData = async () => {
    try {
      await setLoading(true);
      let fixedService = await dispatch(
        fetchFixedService({
          customerAPI,
          requestCode: requestCode ? requestCode : vnp_TxnRef,
        }),
      ).unwrap();
      setFixedService(fixedService);
      let data = await dispatch(
        fetchInvoice({
          customerAPI,
          requestCode: requestCode ? requestCode : vnp_TxnRef,
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

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TopHeaderComponent
        navigation={navigation}
        title="Xem hóa đơn"
        isBackButton={true}
        statusBarColor="white"
      />
      {isError ? <NotFound /> : null}
      {loading || isLoad ? (
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
        <SafeAreaView style={{flex: 1, marginHorizontal: '4%'}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[styles.box, {marginTop: 12}]}>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#CACACA',
                  paddingBottom: 10,
                }}>
                <View style={styles.boxHeader}>
                  <Image
                    source={require('../../../assets/images/type/info.png')}
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                  <Text style={styles.tittleText}>Mã yêu cầu</Text>
                  <TouchableOpacity
                    style={[
                      {marginLeft: 'auto', marginBottom: 3},
                      styles.viewServiceButton,
                    ]}
                    onPress={copyToClipboard}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}>
                      {data.requestCode}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}>
                  <Text style={{color: 'black', fontSize: 14, marginLeft: 20}}>
                    Thời gian tạo
                  </Text>
                  <Text style={{marginLeft: 'auto', fontSize: 12}}>
                    {moment(data.createdAt).format('HH:mm - DD/MM/YYYY')}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'black', fontSize: 14, marginLeft: 20}}>
                    Thời gian xác nhận
                  </Text>
                  <Text style={{marginLeft: 'auto', fontSize: 12}}>
                    {moment(data.approvedTime).format('HH:mm - DD/MM/YYYY')}
                  </Text>
                </View>
                <View style={styles.boxHeader}>
                  <Image
                    source={require('../../../assets/images/type/user.png')}
                    style={{
                      height: 18,
                      width: 18,
                    }}
                  />
                  <Text style={styles.tittleText}>Khách hàng</Text>
                </View>
                <View style={styles.boxBody}>
                  <Image
                    source={{uri: data.customerAvatar}}
                    style={{
                      width: '15%',
                      aspectRatio: 0.85,
                      borderRadius: 10,
                      marginLeft: 10,
                    }}
                  />
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <View style={styles.boxBodyContent}>
                      <Text style={styles.textBold}>
                        {`${data.customerName} - ${data.customerPhone}`}
                      </Text>
                      <Text style={{color: 'black', marginBottom: 5}}>
                        {data.customerAddress}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.boxHeader}>
                  <Image
                    source={require('../../../assets/images/type/repairman.png')}
                    style={{
                      height: 24,
                      width: 24,
                    }}
                  />
                  <Text style={[styles.tittleText, {marginLeft: 12}]}>
                    Thợ sửa chữa
                  </Text>
                </View>
                <View style={styles.boxBody}>
                  <Image
                    source={{uri: data.repairerAvatar}}
                    style={{
                      width: '15%',
                      aspectRatio: 0.85,
                      borderRadius: 10,
                      marginLeft: 10,
                    }}
                  />
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <View style={styles.boxBodyContent}>
                      <Text style={styles.textBold}>
                        {`${data.repairerName} - ${data.repairerPhone}`}
                      </Text>
                      <Text style={{color: 'black', marginBottom: 5}}>
                        {data.repairerAddress}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.boxHeader}>
                  <Image
                    source={require('../../../assets/images/type/support.png')}
                    style={{
                      height: 18,
                      width: 18,
                    }}
                  />
                  <Text style={styles.tittleText}>Dịch vụ sửa chữa</Text>
                </View>
                <View style={styles.boxBody}>
                  <Image
                    source={{uri: data.serviceImage}}
                    style={{
                      height: height * 0.12,
                      width: height * 0.111,
                      borderRadius: 10,
                      alignSelf: 'center',
                      marginHorizontal: '2%',
                    }}
                  />
                  <View style={styles.boxBodyContent}>
                    <Text style={[styles.textBold, {fontSize: 24}]}>
                      {data.serviceName}
                    </Text>
                    <Text
                      style={{fontSize: 16, color: 'black', marginVertical: 6}}>
                      Phí dịch vụ kiểm tra
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.textBold}>{`${numberWithCommas(
                        data.inspectionPrice,
                      )} vnđ`}</Text>
                      <TouchableOpacity style={styles.viewServiceButton}>
                        <Text style={styles.textBold}>Xem giá dịch vụ</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              {fixedService ? (
                <>
                  {fixedService.subServices !== null &&
                  fixedService.subServices.length !== 0 ? (
                    <View
                      style={{
                        marginTop: 16,
                      }}>
                      <Text style={[styles.textBold, {fontSize: 18}]}>
                        Dịch vụ đã sửa chi tiết
                      </Text>
                      <FlatList
                        data={fixedService.subServices}
                        renderItem={renderServiceItem}
                        keyExtractor={item => item.id}
                      />
                      <View
                        style={[
                          styles.serviceRow,
                          {
                            width: '96%',
                            alignSelf: 'center',
                            justifyContent: 'space-around',
                          },
                        ]}>
                        <Text style={styles.textBold}>Tổng</Text>
                        <Text style={styles.servicePrice}>{`${numberWithCommas(
                          data.totalSubServicePrice,
                        )} vnđ`}</Text>
                      </View>
                    </View>
                  ) : null}
                  {fixedService.accessories !== null &&
                  fixedService.accessories.length !== 0 ? (
                    <View style={{marginTop: 16}}>
                      <Text style={[styles.textBold, {fontSize: 18}]}>
                        Linh kiện đã thay
                      </Text>
                      <FlatList
                        data={fixedService.accessories}
                        renderItem={renderServiceItem}
                        keyExtractor={item => item.id}
                      />
                      <View
                        style={[
                          styles.serviceRow,
                          {
                            width: '96%',
                            alignSelf: 'center',
                            justifyContent: 'space-around',
                          },
                        ]}>
                        <Text style={styles.textBold}>Tổng</Text>
                        <Text style={styles.servicePrice}>{`${numberWithCommas(
                          data.totalAccessoryPrice,
                        )} vnđ`}</Text>
                      </View>
                    </View>
                  ) : null}
                  {fixedService.extraServices !== null &&
                  fixedService.extraServices.length !== 0 ? (
                    <View style={{marginTop: 16}}>
                      <Text style={[styles.textBold, {fontSize: 18}]}>
                        Dịch vụ bên ngoài
                      </Text>
                      <FlatList
                        data={fixedService.extraServices}
                        renderItem={renderServiceItem}
                        keyExtractor={item => item.id}
                      />
                      <View
                        style={[
                          styles.serviceRow,
                          {
                            width: '96%',
                            alignSelf: 'center',
                            justifyContent: 'space-around',
                          },
                        ]}>
                        <Text style={styles.textBold}>Tổng</Text>
                        <Text style={styles.servicePrice}>{`${numberWithCommas(
                          data.totalExtraServicePrice,
                        )} vnđ`}</Text>
                      </View>
                    </View>
                  ) : null}
                </>
              ) : null}
              <View style={[styles.boxHeader, {marginTop: 18}]}>
                <Image
                  source={require('../../../assets/images/type/calendar.png')}
                  style={{
                    height: 18,
                    width: 18,
                  }}
                />
                <Text style={styles.tittleText}>Ngày bắt đầu sửa</Text>
              </View>
              <View style={{flex: 4, marginLeft: 40}}>
                <View style={styles.datePicker}>
                  <Text style={styles.textBold}>
                    {moment(data.expectFixingTime).format('HH:mm - DD/MM/YYYY')}
                  </Text>
                </View>
              </View>
              {data.voucherDiscount ? (
                <>
                  <View style={styles.boxHeader}>
                    <Image
                      source={require('../../../assets/images/type/coupon.png')}
                      style={{
                        height: 20,
                        width: 20,
                      }}
                    />
                    <Text style={styles.tittleText}>Flix voucher</Text>
                  </View>
                  {/* <Text style={{marginLeft: 40, color: '#12B76A', fontWeight: 'bold'}}>
          Giảm 10%
        </Text>
        <View
          style={{
            flex: 3,
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginVertical: 5,
          }}>
          <RadioButton value="Tiền mặt" status="checked" color="#FFBC00" />
          <Text style={{color: 'black', fontSize: 16, width: '80%'}}>
            Mã giảm giá áp dụng cho tất cả các shop ở Hà Nội
          </Text>
        </View> */}
                </>
              ) : null}

              <View style={styles.boxHeader}>
                <Image
                  source={require('../../../assets/images/type/wallet.png')}
                  style={{
                    height: 22,
                    width: 22,
                  }}
                />
                <Text style={styles.tittleText}>Phương thức thanh toán</Text>
              </View>
              <View
                style={{
                  flex: 3,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 30,
                }}>
                <RadioButton
                  value={
                    data.paymentMethod === 'CASH'
                      ? 'Tiền mặt'
                      : data.paymentMethod
                  }
                  status="checked"
                  color="#FFBC00"
                />
                <Text style={{color: 'black', fontSize: 16}}>
                  {data.paymentMethod === 'CASH'
                    ? 'Tiền mặt'
                    : data.paymentMethod}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginHorizontal: 10,
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#CACACA',
              }}>
              <View style={styles.serviceRow}>
                <Text style={styles.serviceName}>Phí dịch vụ kiểm tra</Text>
                <Text style={styles.servicePrice}>{`${numberWithCommas(
                  data.inspectionPrice,
                )} vnđ`}</Text>
              </View>
              <View style={styles.serviceRow}>
                <Text style={styles.serviceName}>Tổng dịch vụ chi tiết</Text>
                <Text style={styles.servicePrice}>{`${numberWithCommas(
                  data.totalSubServicePrice,
                )} vnđ`}</Text>
              </View>
              {data.totalAccessoryPrice && data.totalAccessoryPrice !== 0 ? (
                <View style={styles.serviceRow}>
                  <Text style={styles.serviceName}>Tổng linh kiện đã thay</Text>
                  <Text style={styles.servicePrice}>{`${numberWithCommas(
                    data.totalAccessoryPrice,
                  )} vnđ`}</Text>
                </View>
              ) : null}
              {data.totalExtraServicePrice &&
              data.totalExtraServicePrice !== 0 ? (
                <View style={styles.serviceRow}>
                  <Text style={styles.serviceName}>Tổng dịch vụ bên ngoài</Text>
                  <Text style={styles.servicePrice}>{`${numberWithCommas(
                    data.totalExtraServicePrice,
                  )} vnđ`}</Text>
                </View>
              ) : null}
            </View>
            <View style={{paddingHorizontal: 10}}>
              <View style={styles.serviceRow}>
                <Text style={styles.textBold}>Tổng</Text>
                <Text style={styles.servicePrice}>{`${numberWithCommas(
                  data.totalPrice,
                )} vnđ`}</Text>
              </View>
              <View style={styles.serviceRow}>
                <Text style={styles.serviceName}>Thuế VAT(5%)</Text>
                <Text style={styles.servicePrice}>{`${numberWithCommas(
                  data.vatPrice,
                )} vnđ`}</Text>
              </View>
              {data.voucherDiscount ? (
                <View style={styles.serviceRow}>
                  <Text style={styles.serviceName}>Voucher</Text>
                  <Text style={styles.servicePrice}>{`-${numberWithCommas(
                    data.totalDiscount,
                  )} vnđ`}</Text>
                </View>
              ) : null}
              <View style={[styles.serviceRow, {marginBottom: 16}]}>
                <Text style={styles.textBold}>TỔNG THANH TOÁN</Text>
                <Text style={styles.servicePrice}>{`${numberWithCommas(
                  data.actualPrice,
                )} vnđ`}</Text>
              </View>
            </View>
          </ScrollView>
          {(data.paymentMethod !== 'CASH' && data.status !== 'DONE') ||
          (!data.isCustomerCommented && data.status === 'DONE') ||
          vnp_ResponseCode ? (
            <Button
              style={{
                marginVertical: 8,
                width: '100%',
                alignSelf: 'center',
              }}
              onPress={
                (vnp_ResponseCode && vnp_ResponseCode === '00') ||
                (!data.isCustomerCommented && data.status === 'DONE')
                  ? handleRatingRepairer
                  : (vnp_ResponseCode && vnp_ResponseCode !== '00') ||
                    (data.paymentMethod !== 'CASH' && data.status !== 'DONE')
                  ? handleConfirmPayment
                  : null
              }
              buttonText={
                (vnp_ResponseCode && vnp_ResponseCode === '00') ||
                (!data.isCustomerCommented && data.status === 'DONE')
                  ? 'Đánh giá thợ'
                  : (vnp_ResponseCode && vnp_ResponseCode !== '00') ||
                    (data.paymentMethod !== 'CASH' && data.status !== 'DONE')
                  ? 'Xác nhận và thanh toán'
                  : null
              }
            />
          ) : null}
        </SafeAreaView>
      ) : null}
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
  box: {
    height: 'auto',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingHorizontal: '6%',
    paddingBottom: 16,
    paddingTop: 10,
    marginVertical: 6,
  },
  boxHeader: {
    flexDirection: 'row',
    flex: 2,
    alignItems: 'center',
    marginVertical: 8,
  },
  tittleText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
    marginLeft: 10,
    marginBottom: 3,
  },
  editTouch: {
    marginLeft: 'auto',
  },
  editText: {
    color: '#FEC54B',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 12,
  },
  boxBody: {
    flex: 8,
    flexDirection: 'row',
    marginVertical: 1,
  },
  boxBodyContent: {
    flex: 1,
    marginLeft: 10,
    height: '70%',
    width: '100%',
    paddingBottom: 5,
    justifyContent: 'space-between',
  },
  viewServiceButton: {
    paddingVertical: 4,
    width: 'auto',
    borderRadius: 10,
    backgroundColor: '#FEC54B',
    paddingHorizontal: 6,
  },
  textBold: {
    fontWeight: '600',
    color: 'black',
    fontSize: 14,
  },
  datePicker: {
    flexDirection: 'row',
    width: '60%',
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  serviceName: {
    color: 'black',
  },
  servicePrice: {
    marginLeft: 'auto',
    color: 'black',
    fontWeight: '600',
  },
});

export default InvoiceScreen;
