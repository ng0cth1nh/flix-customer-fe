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
  buttonText,
  handlerSubmitButtonClick,
  date,
  setDate,
  description,
  setDescription,
  editable,
  service,
  address,
  handelClickVoucher,
  handelClickService,
  paymentMethod,
  handelClickChoosePaymentMethod,
  isRequestIdVisible = false,
}) {
  const [dateVisible, setDateVisible] = useState(false);
  //const [shouldPay, setShouldPay] = useState(service.price);
  const handlerDateConfirm = selectedDate => {
    setDate(moment(selectedDate));
    setDateVisible(false);
  };
  const hideDatePicker = () => {
    setDateVisible(false);
  };

  const copyToClipboard = () => {
    Clipboard.setString(service.requestCode);
    Toast.show({
      type: 'customToast',
      text1: 'Đã sao chép vào khay nhớ tạm',
    });
  };

  return (
    <ScrollView
      style={{marginHorizontal: '4%'}}
      showsVerticalScrollIndicator={false}>
      <View
        style={[
          styles.box,
          {height: 0.25 * height, flexDirection: 'column', marginTop: 12},
        ]}>
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
              onPress={handelClickService}>
              <Text style={styles.editText}>Thay đổi</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.boxBody}>
          <Image
            source={{
              uri: service.imageUrl ? service.imageUrl : service.serviceImage,
            }}
            style={{
              height: height * 0.14,
              width: height * 0.111,
              borderRadius: 10,
              marginLeft: 10,
            }}
          />
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View style={styles.boxBodyContent}>
              <Text style={[styles.textBold, {fontSize: 24}]}>
                {service.serviceName}
              </Text>
              <Text style={{fontSize: 16, color: 'black', marginVertical: 6}}>
                Phí dịch vụ kiểm tra
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  paddingRight: 20,
                  alignItems: 'center',
                }}>
                <Text style={styles.textBold}>
                  {`${numberWithCommas(service.price)} vnđ`}
                </Text>
                <TouchableOpacity style={styles.viewServiceButton}>
                  <Text style={styles.textBold}>Xem giá dịch vụ</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={[styles.box, {height: 0.2 * height, flexDirection: 'column'}]}>
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
            <TouchableOpacity style={styles.editTouch}>
              <Text style={styles.editText}>Thay đổi</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{flex: 5, marginLeft: 30}}>
          <Text style={[styles.textBold, {fontSize: 14, marginVertical: 10}]}>
            {address !== null
              ? `${address.customerName} - ${address.phone}`
              : `${service.customerName} - ${service.customerPhone}`}
          </Text>
          <Text style={{color: 'black'}}>
            {address !== null ? address.addressName : service.customerAddress}
          </Text>
        </View>
      </View>
      <View
        style={[styles.box, {height: 0.15 * height, flexDirection: 'column'}]}>
        <View style={styles.boxHeader}>
          <Image
            source={require('../../assets/images/type/calendar.png')}
            style={{
              height: 18,
              width: 18,
            }}
          />
          <Text style={styles.tittleText}>
            {editable ? 'Chọn ngày muốn sửa' : 'Ngày muốn sửa'}
          </Text>
        </View>
        <View style={{flex: 4, marginLeft: 40}}>
          <TouchableOpacity
            style={styles.datePicker}
            onPress={() => setDateVisible(true)}>
            <Text style={styles.textBold}>
              {date !== null
                ? date.format('HH:mm - DD/MM/YYYY')
                : moment(service.expectFixingDay).format('HH:mm - DD/MM/YYYY')}
            </Text>

            {editable ? (
              <>
                <Ionicons
                  name="chevron-down-sharp"
                  size={20}
                  style={{marginBottom: 3, color: 'black', marginLeft: 'auto'}}
                />
                <CustomDatePicker
                  isVisible={dateVisible}
                  mode="datetime"
                  minimumDate={true}
                  handleConfirm={handlerDateConfirm}
                  hideDatePicker={hideDatePicker}
                />
              </>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[styles.box, {height: 0.2 * height, flexDirection: 'column'}]}>
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
        <View style={{flex: 4, marginLeft: 40, marginTop: 10}}>
          <TextInput
            multiline
            numberOfLines={2}
            onChangeText={text => setDescription(text)}
            value={description ? description : service.requestDescription}
            style={{
              padding: 5,
              backgroundColor: 'white',
              borderRadius: 10,
              height: '80%',
              color: 'black',
            }}
            editable={editable}
            placeholder="Nhập tình trạng của thiết bị"
          />
        </View>
      </View>
      <View style={[styles.box, {height: 50}]}>
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
              onPress={handelClickVoucher}>
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
      <View
        style={[styles.box, {height: 0.15 * height, flexDirection: 'column'}]}>
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
              onPress={handelClickChoosePaymentMethod}>
              <Text style={styles.editText}>Thay đổi</Text>
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            flex: 3,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <RadioButton value="Tiền mặt" status="checked" color="#FFBC00" />
          <Text style={{color: 'black', fontSize: 16}}>
            {paymentMethod
              ? paymentMethod.name
              : service.paymentMethod === 'CASH'
              ? 'Tiền mặt'
              : service.paymentMethod}
          </Text>
        </View>
      </View>
      {isRequestIdVisible && (
        <View
          style={[
            styles.box,
            {
              height: 0.12 * height,
              flexDirection: 'column',
              marginTop: 10,
              paddingTop: 10,
            },
          ]}>
          <View style={styles.boxHeader}>
            <Image
              source={require('../../assets/images/type/info.png')}
              style={{
                height: 22,
                width: 22,
              }}
            />
            <Text style={styles.tittleText}>Mã yêu cầu</Text>
            <TouchableOpacity
              style={{marginLeft: 'auto', marginBottom: 3}}
              onPress={copyToClipboard}>
              <Text
                style={{color: '#FEC54B', fontSize: 16, fontWeight: 'bold'}}>
                {service.requestCode}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 3,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black', fontSize: 16, marginLeft: 40}}>
              Thời gian
            </Text>
            <Text style={{marginLeft: 'auto'}}>
              {moment(service.date).format('HH:mm - DD/MM/YYYY')}
            </Text>
          </View>
        </View>
      )}
      <View
        style={{
          paddingHorizontal: 10,
          paddingBottom: 40,
          borderBottomWidth: 1,
          borderBottomColor: '#CACACA',
        }}>
        <View style={styles.serviceRow}>
          <Text style={styles.serviceName}>Phí dịch vụ kiểm tra</Text>
          <Text style={styles.servicePrice}>{`${numberWithCommas(
            service.price,
          )} vnđ`}</Text>
        </View>

        <View style={styles.serviceRow}>
          <Text style={styles.serviceName}>Thuế VAT(5%)</Text>
          <Text style={styles.servicePrice}>
            {isNaN(service.vatPrice)
              ? `${numberWithCommas(service.price * 0.05)} vnđ`
              : `${numberWithCommas(service.vatPrice)} vnđ`}
          </Text>
        </View>

        {/* {service.actualPrice !== null ? (
          <View style={styles.serviceRow}>
            <Text style={styles.serviceName}>TỔNG THANH TOÁN(dự kiến)</Text>
            <Text style={styles.servicePrice}>{`${numberWithCommas(
              service.actualPrice,
            )} vnđ`}</Text>
          </View>
        ) : null} */}
        <View style={styles.serviceRow}>
          <Text style={styles.textBold}>TỔNG THANH TOÁN(dự kiến)</Text>
          <Text style={styles.servicePrice}>
            {isNaN(service.actualPrice)
              ? `${numberWithCommas(service.price * 1.05)} vnđ`
              : `${numberWithCommas(service.actualPrice)} vnđ`}
          </Text>
        </View>
      </View>
      <Button
        style={{marginVertical: 20}}
        onPress={handlerSubmitButtonClick}
        buttonText={buttonText}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  box: {
    backgroundColor: '#F0F0F0',
    borderRadius: 18,
    paddingHorizontal: '5%',
    marginVertical: 6,
  },
  boxHeader: {
    flexDirection: 'row',
    flex: 2,
    alignItems: 'center',
    paddingTop: 10,
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
    marginVertical: 6,
    paddingBottom: 16,
  },
  boxBodyContent: {
    marginLeft: 20,
    height: '70%',
    width: '100%',
    paddingBottom: 5,
    justifyContent: 'space-between',
  },
  viewServiceButton: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#FEC54B',
    marginLeft: 'auto',
  },
  textBold: {
    fontWeight: 'bold',
    color: 'black',
  },
  datePicker: {
    flexDirection: 'row',
    width: '80%',
    height: 40,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  serviceRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  serviceName: {
    color: 'black',
  },
  servicePrice: {
    marginLeft: 'auto',
    color: '#E67F1E',
    fontWeight: '600',
  },
});

export default RequestForm;
