import React, {useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {numberWithCommas} from '../utils/util';
import Ionicons from 'react-native-vector-icons/Ionicons';
const {height} = Dimensions.get('window');
import CustomDatePicker from './CustomDatePicker';
import Button from './SubmitButton';
import moment from 'moment';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-toast-message';

const RequestForm = function ({
  handleSubmitButtonClick,
  date,
  setDate,
  description,
  setDescription,
  editable,
  data,
  address,
  handleClickVoucher,
  handleClickService,
  paymentMethod,
  handleClickChoosePaymentMethod,
  isRequestIdVisible = false,
  fixedService = null,
  isShowSubmitButton,
  submitButtonText,
  chatHandler,
  handleChangeAddress,
  handleClickGetSubServices,
  handleClickRepairerProfile,
  setModalVisible = null,
}) {
  const [dateVisible, setDateVisible] = useState(false);
  const handleDateConfirm = selectedDate => {
    setDate(moment(selectedDate));
    setDateVisible(false);
  };
  const hideDatePicker = () => {
    setDateVisible(false);
  };

  const copyToClipboard = () => {
    Clipboard.setString(data.requestCode);
    Toast.show({
      type: 'customToast',
      text1: 'Đã sao chép vào khay nhớ tạm',
    });
  };

  return (
    <SafeAreaView style={{flex: 1, marginHorizontal: '4%'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.repairerName ? (
          <TouchableOpacity
            style={[styles.box, {marginTop: 12}]}
            onPress={handleClickRepairerProfile}>
            <View style={styles.boxHeader}>
              <Image
                source={require('../../assets/images/type/mechanic.png')}
                style={{
                  height: 18,
                  width: 18,
                }}
              />
              <Text style={styles.tittleText}>Thợ sửa chữa</Text>
            </View>
            <View style={styles.boxBody}>
              <Image
                source={{uri: data.repairerAvatar}}
                style={{
                  height: height * 0.12,
                  width: height * 0.111,
                  borderRadius: 10,
                  alignSelf: 'center',
                  marginHorizontal: '2%',
                }}
              />
              <View style={{flex: 1, justifyContent: 'center'}}>
                <View style={styles.boxBodyContent}>
                  <Text style={[styles.textBold, {fontSize: 16}]}>
                    {data.repairerName}
                  </Text>
                  <Text style={[styles.textBold, {fontSize: 16}]}>
                    {data.repairerPhone}
                  </Text>
                  <Text style={{color: 'black', marginBottom: 5}}>
                    {data.repairerAddress}
                  </Text>
                  <TouchableOpacity
                    onPress={chatHandler}
                    style={[styles.viewServiceButton, {width: '40%'}]}>
                    <Text style={[styles.textBold, {textAlign: 'center'}]}>
                      Nhắn tin
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ) : null}
        <View style={[styles.box, {flexDirection: 'column'}]}>
          <View style={styles.boxHeader}>
            <Image
              source={require('../../assets/images/type/support.png')}
              style={{
                height: 18,
                width: 18,
              }}
            />
            <Text style={styles.tittleText}>Dịch vụ sửa chữa</Text>
            {editable && (
              <TouchableOpacity
                style={styles.editTouch}
                onPress={handleClickService}>
                <Text style={styles.editText}>Thay đổi</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.boxBody}>
            <Image
              source={{
                uri: data.image ? data.image : data.serviceImage,
              }}
              style={{
                height: height * 0.12,
                width: height * 0.111,
                borderRadius: 10,
                alignSelf: 'center',
                marginHorizontal: '2%',
              }}
            />
            <View style={styles.boxBodyContent}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={[styles.textBold, {fontSize: 24}]}>
                {data.serviceName}
              </Text>
              <Text style={{fontSize: 16, color: 'black', marginVertical: 6}}>
                Phí dịch vụ kiểm tra
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.textBold}>
                  {`${numberWithCommas(
                    data.inspectionPrice ? data.inspectionPrice : data.price,
                  )} vnđ`}
                </Text>
                <TouchableOpacity
                  style={styles.viewServiceButton}
                  onPress={handleClickGetSubServices}>
                  <Text style={styles.textBold}>Xem giá dịch vụ</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {fixedService !== null &&
          (fixedService.accessories.length !== 0 ||
            fixedService.subServices.length !== 0 ||
            fixedService.extraServices.length !== 0) ? (
            <View
              style={[
                {
                  borderTopColor: '#DDDDDD',
                  borderTopWidth: 1,
                  marginTop: 16,
                  paddingTop: 16,
                },
              ]}>
              {fixedService.subServices !== null &&
              fixedService.subServices.length !== 0 ? (
                <View style={{width: '100%'}}>
                  <Text style={styles.tittleText}>Dịch vụ đã sửa chi tiết</Text>
                  {fixedService.subServices.map((item, index) => {
                    return (
                      <View
                        key={index.toString()}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          width: '90%',
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
                          style={[
                            styles.servicePrice,
                            {
                              flex: 5,
                              textAlign: 'right',
                            },
                          ]}>{`${numberWithCommas(item.price)} vnđ`}</Text>
                      </View>
                    );
                  })}
                </View>
              ) : null}
              {fixedService.accessories &&
              fixedService.accessories.length !== 0 ? (
                <View style={{width: '100%', marginVertical: 16}}>
                  <Text style={styles.tittleText}>Linh kiện đã thay</Text>
                  {fixedService.accessories.map((item, index) => {
                    return (
                      <View
                        key={index.toString()}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          width: '90%',
                          alignSelf: 'center',
                          marginVertical: 6,
                        }}>
                        <Text style={{color: 'black', flex: 12}}>
                          {item.name}
                        </Text>
                        <Text
                          style={[
                            styles.servicePrice,
                            {
                              flex: 5,
                              textAlign: 'right',
                            },
                          ]}>{`${numberWithCommas(item.price)} vnđ`}</Text>
                      </View>
                    );
                  })}
                </View>
              ) : null}
              {fixedService.extraServices &&
              fixedService.extraServices.length !== 0 ? (
                <View style={{width: '100%', marginVertical: 16}}>
                  <Text style={styles.tittleText}>
                    Dịch vụ đã sửa bên ngoài
                  </Text>
                  {fixedService.extraServices.map((item, index) => {
                    return (
                      <View
                        key={index.toString()}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          width: '90%',
                          alignSelf: 'center',
                          marginVertical: 6,
                        }}>
                        <Text style={{color: 'black', flex: 12}}>
                          {item.name}
                        </Text>
                        <Text
                          style={[
                            styles.servicePrice,
                            {
                              flex: 5,
                              textAlign: 'right',
                            },
                          ]}>{`${numberWithCommas(item.price)} vnđ`}</Text>
                      </View>
                    );
                  })}
                </View>
              ) : null}
            </View>
          ) : null}
        </View>
        <View style={[styles.box, {flexDirection: 'column'}]}>
          <View style={styles.boxHeader}>
            <Image
              source={require('../../assets/images/type/address.png')}
              style={{
                height: 22,
                width: 22,
              }}
            />
            <Text style={styles.tittleText}>Địa chỉ của bạn</Text>
            {editable && (
              <TouchableOpacity
                style={styles.editTouch}
                onPress={handleChangeAddress}>
                <Text style={styles.editText}>Thay đổi</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={{flex: 5, marginLeft: '6%'}}>
            <Text style={[styles.textBold, {fontSize: 14, marginVertical: 10}]}>
              {address !== null
                ? `${address.customerName} - ${address.phone}`
                : `${data.customerName} - ${data.customerPhone}`}
            </Text>
            <Text style={{color: 'black'}}>
              {address !== null ? address.addressName : data.customerAddress}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.box,
            {height: 0.15 * height, flexDirection: 'column'},
          ]}>
          <View style={styles.boxHeader}>
            <Image
              source={require('../../assets/images/type/calendar.png')}
              style={{
                height: 18,
                width: 18,
              }}
            />
            <Text style={styles.tittleText}>
              {editable ? 'Chọn thời gian muốn sửa' : 'Thời gian muốn sửa'}
            </Text>
          </View>
          <View style={{flex: 4, marginLeft: '6%'}}>
            {editable ? (
              <TouchableOpacity
                style={styles.datePicker}
                onPress={() => setDateVisible(true)}>
                <Text style={styles.textBold}>
                  {date !== null
                    ? date.format('HH:mm - DD/MM/YYYY')
                    : moment(data.expectFixingDay).format('HH:mm - DD/MM/YYYY')}
                </Text>
                <Ionicons
                  name="chevron-down-sharp"
                  size={20}
                  style={{
                    marginBottom: 3,
                    color: 'black',
                    marginLeft: 'auto',
                  }}
                />
                <CustomDatePicker
                  isVisible={dateVisible}
                  mode="datetime"
                  minimumDate={true}
                  handleConfirm={handleDateConfirm}
                  hideDatePicker={hideDatePicker}
                />
              </TouchableOpacity>
            ) : (
              <View style={styles.datePicker}>
                <Text style={styles.textBold}>
                  {date !== null
                    ? date.format('HH:mm - DD/MM/YYYY')
                    : moment(data.expectFixingDay).format('HH:mm - DD/MM/YYYY')}
                </Text>
              </View>
            )}
          </View>
        </View>
        {editable || (!editable && data.requestDescription) ? (
          <View
            style={[
              styles.box,
              {height: 0.2 * height, flexDirection: 'column'},
            ]}>
            <View style={styles.boxHeader}>
              <Image
                source={require('../../assets/images/type/writing.png')}
                style={{
                  height: 20,
                  width: 20,
                }}
              />
              <Text style={styles.tittleText}>Tình trạng</Text>
            </View>
            <View style={{flex: 4, marginLeft: '6%', marginTop: 10}}>
              <TextInput
                multiline
                numberOfLines={2}
                onChangeText={text => setDescription(text)}
                value={description ? description : data.requestDescription}
                style={{
                  padding: 5,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  height: '80%',
                  color: 'black',
                  paddingLeft: 16,
                }}
                editable={editable}
                placeholder="Nhập tình trạng của thiết bị"
              />
            </View>
          </View>
        ) : null}
        {!data.voucherDiscount && editable ? (
          <View style={[styles.box]}>
            <View style={styles.boxHeader}>
              <Image
                source={require('../../assets/images/type/coupon.png')}
                style={{
                  height: 20,
                  width: 20,
                }}
              />
              <Text style={styles.tittleText}>Flix voucher</Text>
              {editable && (
                <TouchableOpacity
                  style={styles.editTouch}
                  onPress={() => setModalVisible(true)}>
                  <Text style={styles.editText}>Chọn hoặc nhập mã</Text>
                </TouchableOpacity>
              )}
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
          </View>
        ) : null}
        <View
          style={[
            styles.box,
            {height: 0.15 * height, flexDirection: 'column'},
          ]}>
          <View style={styles.boxHeader}>
            <Image
              source={require('../../assets/images/type/wallet.png')}
              style={{
                height: 22,
                width: 22,
              }}
            />
            <Text style={styles.tittleText}>Phương thức thanh toán</Text>
            {editable && (
              <TouchableOpacity
                style={styles.editTouch}
                onPress={handleClickChoosePaymentMethod}>
                <Text style={styles.editText}>Thay đổi</Text>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              flex: 3,
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: '1%',
            }}>
            <RadioButton value="Tiền mặt" status="checked" color="#FFBC00" />
            <Text style={{color: 'black', fontSize: 16}}>
              {paymentMethod
                ? paymentMethod.name
                : data.paymentMethod === 'CASH'
                ? 'Tiền mặt'
                : data.paymentMethod}
            </Text>
          </View>
        </View>
        {isRequestIdVisible && (
          <View
            style={[
              styles.box,
              {
                flexDirection: 'column',
              },
            ]}>
            <View style={styles.boxHeader}>
              <Image
                source={require('../../assets/images/type/info.png')}
                style={{
                  height: 20,
                  width: 20,
                }}
              />
              <Text style={styles.tittleText}>{data.requestCode}</Text>
              <TouchableOpacity
                style={[
                  {marginLeft: 'auto', marginBottom: 3},
                  styles.viewServiceButton,
                ]}
                onPress={copyToClipboard}>
                <Text
                  style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}>
                  Sao chép
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 3,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{color: 'black', fontSize: 14, marginLeft: 20}}>
                Thời gian tạo
              </Text>
              <Text style={{marginLeft: 'auto', fontSize: 12}}>
                {moment(data.date).format('HH:mm - DD/MM/YYYY')}
              </Text>
            </View>
          </View>
        )}
        <View
          style={{
            paddingHorizontal: 10,
            paddingBottom: 20,
          }}>
          <View style={styles.serviceRow}>
            <Text style={styles.serviceName}>Phí dịch vụ kiểm tra</Text>
            <Text style={styles.servicePrice}>{`${numberWithCommas(
              data.inspectionPrice ? data.inspectionPrice : data.price,
            )} vnđ`}</Text>
          </View>
          {fixedService !== null ? (
            <>
              {fixedService.subServices &&
              fixedService.subServices.length !== 0 ? (
                <>
                  {fixedService.subServices.map((item, index) => {
                    return (
                      <View style={styles.serviceRow} key={index.toString()}>
                        <Text style={styles.serviceName}>{item.name}</Text>
                        <Text style={styles.servicePrice}>{`${numberWithCommas(
                          item.price.toString(),
                        )} vnđ`}</Text>
                      </View>
                    );
                  })}
                </>
              ) : null}
              {fixedService.accessories &&
              fixedService.accessories.length !== 0 ? (
                <>
                  {fixedService.accessories.map((item, index) => {
                    return (
                      <View style={styles.serviceRow} key={index.toString()}>
                        <Text style={styles.serviceName}>{item.name}</Text>
                        <Text style={styles.servicePrice}>{`${numberWithCommas(
                          item.price.toString(),
                        )} vnđ`}</Text>
                      </View>
                    );
                  })}
                </>
              ) : null}
              {fixedService.extraServices &&
              fixedService.extraServices.length !== 0 ? (
                <>
                  {fixedService.extraServices.map((item, index) => {
                    return (
                      <View style={styles.serviceRow} key={index.toString()}>
                        <Text style={styles.serviceName}>{item.name}</Text>
                        <Text style={styles.servicePrice}>{`${numberWithCommas(
                          item.price.toString(),
                        )} vnđ`}</Text>
                      </View>
                    );
                  })}
                </>
              ) : null}
            </>
          ) : null}
          <View style={styles.serviceRow}>
            <Text style={styles.serviceName}>Thuế VAT(5%)</Text>
            <Text style={styles.servicePrice}>
              {isNaN(data.vatPrice)
                ? `${numberWithCommas(data.price * 0.05)} vnđ`
                : `${numberWithCommas(data.vatPrice)} vnđ`}
            </Text>
          </View>
          <View style={styles.serviceRow}>
            <Text style={styles.textBold}>
              TỔNG THANH TOÁN{fixedService ? '' : ' (dự kiến)'}
            </Text>
            <Text style={styles.servicePriceBold}>
              {isNaN(data.actualPrice)
                ? `${numberWithCommas(data.price * 1.05)} vnđ`
                : `${numberWithCommas(data.actualPrice)} vnđ`}
            </Text>
          </View>
        </View>
      </ScrollView>
      {isShowSubmitButton ? (
        <Button
          style={{
            marginVertical: 8,
            width: '100%',
            alignSelf: 'center',
          }}
          onPress={handleSubmitButtonClick}
          buttonText={submitButtonText}
        />
      ) : null}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  box: {
    height: 'auto',
    backgroundColor: '#F0F0F0',
    borderRadius: 18,
    paddingHorizontal: '4%',
    paddingVertical: 14,
    marginVertical: 6,
  },
  boxHeader: {
    flexDirection: 'row',
    flex: 2,
    alignItems: 'center',
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
    width: '68%',
    height: 40,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  serviceRow: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  serviceName: {
    color: 'black',
    flex: 12,
  },
  servicePrice: {
    color: 'black',
    flex: 5,
    textAlign: 'right',
    fontSize: 12,
  },
  servicePriceBold: {
    color: 'black',
    fontWeight: 'bold',
    flex: 5,
    textAlign: 'right',
    fontSize: 14,
  },
});

export default RequestForm;
