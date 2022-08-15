import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loading from '../components/Loading';
const {height} = Dimensions.get('window');
import Button from './SubmitButton';
import TopHeaderComponent from './TopHeaderComponent';
import axios from 'axios';
import constants from '../constants/Api';

const CreateAddressForm = ({
  navigation,
  cityId,
  setCityId,
  isAddAddress,
  saveButtonClicked,
  showModal,
  setCommuneId,
  communeId,
  fullName,
  phone,
  streetAddress,
  setFullName,
  setPhone,
  setStreetAddress,
  setDistrictId,
  districtId,
  phoneInputError,
  addressInputError,
  fullNameInputError,
  setFullNameInputError,
  setPhoneInputError,
  setAddressInputError,
  data,
  cityIdError,
  communeIdError,
  districtIdError,
  setCityIdError,
  setCommuneIdError,
  setDistrictIdError,
  scrollRef,
}) => {
  const [listCity, setListCity] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listCommune, setListCommune] = useState([]);
  const [addressError, setAddressError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await setLoading(true);
        let response = await axios.get(constants.GET_ALL_CITY_API);
        setListCity(response.data.cities);
        if (!isAddAddress) {
          response = await axios.get(constants.GET_DISTRICT_BY_CITY_API, {
            params: {cityId},
          });
          setListDistrict(response.data.districts);
          response = await axios.get(constants.GET_COMMUNE_BY_DISTRICT_API, {
            params: {districtId},
          });
          setListCommune(response.data.communes);
        }
      } catch (err) {
        setAddressError(err.message);
      } finally {
        await setLoading(false);
      }
    })();
  }, []);

  const onchangeCity = async value => {
    setCityIdError(null);
    setCityId(value);
    setDistrictId(null);
    setCommuneId(null);
    if (!value) {
      setListDistrict([]);
      setListCommune([]);
      return;
    }
    try {
      let response = await axios.get(constants.GET_DISTRICT_BY_CITY_API, {
        params: {cityId: value},
      });
      setListDistrict(response.data.districts);
    } catch (err) {
      setAddressError(err.message);
    }
  };

  const onchangeDistrict = async value => {
    setDistrictId(value);
    setDistrictIdError(null);
    setCommuneId(null);
    if (!value) {
      setListCommune([]);
      return;
    }
    try {
      let response = await axios.get(constants.GET_COMMUNE_BY_DISTRICT_API, {
        params: {districtId: value},
      });
      setListCommune(response.data.communes);
    } catch (err) {
      setAddressError(err.message);
    }
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <TopHeaderComponent
        navigation={navigation}
        title={isAddAddress ? 'Thêm địa chỉ' : 'Sửa địa chỉ'}
        isBackButton={true}
        statusBarColor="white"
      />
      {loading && !isAddAddress ? (
        <Loading />
      ) : (
        <SafeAreaView style={{flex: 1}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              paddingHorizontal: '4%',
            }}
            ref={scrollRef}>
            <View
              style={{
                paddingBottom: 10,
              }}>
              <View
                style={[
                  styles.box,
                  {height: 'auto', flexDirection: 'column', marginTop: 10},
                ]}>
                <View style={styles.boxHeader}>
                  <Icon name="user-o" size={20} />
                  <Text style={styles.tittleText}>Thông tin khách hàng</Text>
                </View>
                <View style={styles.inputField}>
                  <Text style={styles.inputLabel}>Họ và tên *</Text>
                  <View
                    style={[
                      styles.valueSpace,
                      {borderColor: fullNameInputError ? '#FF6442' : '#CACACA'},
                    ]}>
                    <TextInput
                      style={styles.valueText}
                      placeholder="Nhập họ và tên"
                      value={fullName}
                      onFocus={() => setFullNameInputError(null)}
                      onChangeText={text => setFullName(text)}
                    />
                    {fullNameInputError && (
                      <Text style={styles.errorMessage}>
                        {fullNameInputError}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={styles.inputField}>
                  <Text style={styles.inputLabel}>
                    Số điện thoại liên lạc *
                  </Text>
                  <View
                    style={[
                      styles.valueSpace,
                      {borderColor: phoneInputError ? '#FF6442' : '#CACACA'},
                    ]}>
                    <TextInput
                      style={styles.valueText}
                      placeholder="Nhập số điện thoại"
                      onFocus={() => setPhoneInputError(null)}
                      value={phone}
                      onChangeText={text => setPhone(text)}
                    />
                    {phoneInputError && (
                      <Text style={styles.errorMessage}>{phoneInputError}</Text>
                    )}
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.box,
                  {height: 'auto', flexDirection: 'column', marginTop: 10},
                ]}>
                <View style={styles.boxHeader}>
                  <Image
                    source={require('../../assets/images/type/address.png')}
                    style={{
                      height: 22,
                      width: 22,
                    }}
                  />
                  <Text style={styles.tittleText}>Địa chỉ</Text>
                </View>
                <View style={styles.inputField}>
                  <Text style={styles.inputLabel}>Tỉnh/Thành Phố *</Text>
                  <View
                    style={[
                      styles.valueSpace,
                      {borderColor: cityIdError ? '#FF6442' : '#CACACA'},
                    ]}>
                    <RNPickerSelect
                      value={cityId}
                      fixAndroidTouchableBug={true}
                      onValueChange={onchangeCity}
                      placeholder={{
                        label: 'Tỉnh/Thành Phố',
                        value: null,
                      }}
                      useNativeAndroidPickerStyle={false}
                      style={styles.pickerStyle}
                      items={listCity}
                      Icon={() => (
                        <Ionicons
                          name="chevron-down-sharp"
                          size={20}
                          style={{marginTop: (0.075 * height) / 4}}
                        />
                      )}
                    />
                  </View>
                  {cityIdError && (
                    <Text style={styles.errorMessage}>{cityIdError}</Text>
                  )}
                </View>
                <View style={styles.inputField}>
                  <Text style={styles.inputLabel}>Quận/Huyện *</Text>
                  <View
                    style={[
                      styles.valueSpace,
                      {borderColor: districtIdError ? '#FF6442' : '#CACACA'},
                    ]}>
                    <RNPickerSelect
                      value={districtId}
                      fixAndroidTouchableBug={true}
                      onValueChange={onchangeDistrict}
                      placeholder={{
                        label: 'Quận/Huyện',
                        value: null,
                      }}
                      useNativeAndroidPickerStyle={false}
                      style={styles.pickerStyle}
                      items={listDistrict}
                      Icon={() => (
                        <Ionicons
                          name="chevron-down-sharp"
                          size={20}
                          style={{marginTop: (0.075 * height) / 4}}
                        />
                      )}
                    />
                  </View>
                  {districtIdError && (
                    <Text style={styles.errorMessage}>{districtIdError}</Text>
                  )}
                </View>
                <View style={styles.inputField}>
                  <Text style={styles.inputLabel}>Phường/Xã *</Text>
                  <View
                    style={[
                      styles.valueSpace,
                      {borderColor: communeIdError ? '#FF6442' : '#CACACA'},
                    ]}>
                    <RNPickerSelect
                      value={communeId}
                      fixAndroidTouchableBug={true}
                      onValueChange={value => {
                        setCommuneId(value);
                        setCommuneIdError(null);
                      }}
                      placeholder={{
                        label: 'Phường/Xã',
                        value: null,
                      }}
                      useNativeAndroidPickerStyle={false}
                      style={styles.pickerStyle}
                      items={listCommune}
                      Icon={() => (
                        <Ionicons
                          name="chevron-down-sharp"
                          size={20}
                          style={{marginTop: (0.075 * height) / 4}}
                        />
                      )}
                    />
                  </View>
                  {communeIdError && (
                    <Text style={styles.errorMessage}>{communeIdError}</Text>
                  )}
                </View>
                <View style={[styles.inputField, {marginBottom: 30}]}>
                  <Text style={styles.inputLabel}>Địa chỉ chi tiết *</Text>
                  <View
                    style={[
                      styles.valueSpace,
                      {borderColor: addressInputError ? '#FF6442' : '#CACACA'},
                    ]}>
                    <TextInput
                      style={styles.valueText}
                      placeholder="Nhập số nhà, tên đường..."
                      value={streetAddress}
                      onFocus={() => setAddressInputError(null)}
                      onChangeText={text => setStreetAddress(text)}
                    />
                    {addressInputError && (
                      <Text style={styles.errorMessage}>
                        {addressInputError}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
              {!isAddAddress && !data.mainAddress && (
                <Button
                  style={{marginVertical: 10, height: height * 0.05}}
                  onPress={showModal}
                  buttonText="Xóa địa chỉ"
                />
              )}
            </View>
          </ScrollView>
          <Button
            style={{
              marginTop: 15,
              marginBottom: 15,
              width: '92%',
              alignSelf: 'center',
            }}
            onPress={saveButtonClicked}
            buttonText={isAddAddress ? 'THÊM ĐỊA CHỈ' : 'LƯU LẠI'}
          />
        </SafeAreaView>
      )}
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
    width: '100%',
    marginBottom: 10,
  },
  box: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  boxHeader: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  tittleText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
    marginLeft: 15,
  },
  inputField: {marginBottom: 18},
  inputLabel: {
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  valueSpace: {
    height: 'auto',
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    width: '100%',
  },
  valueText: {
    fontSize: 16,
    color: 'black',
  },
  errorMessage: {
    position: 'absolute',
    bottom: -14,
    left: 5,
    fontSize: 10,
    color: '#FF6442',
  },
  pickerStyle: {
    inputIOS: {
      fontSize: 16,
      color: 'black',
    },
    inputAndroid: {
      fontSize: 16,
      color: 'black',
    },
  },
});

export default CreateAddressForm;
