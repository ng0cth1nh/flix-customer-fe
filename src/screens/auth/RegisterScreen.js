import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
const {height, width} = Dimensions.get('window');
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import BackButton from '../../components/BackButton';
import HeaderComponent from '../../components/HeaderComponent';
import RNPickerSelect from 'react-native-picker-select';
import {Context as AuthContext} from '../../context/AuthContext';
import constants from '../../constants/Api';
import Button from '../../components/SubmitButton';
import axios from 'axios';
import {removeAscent} from '../../utils/util';
import ProgressLoader from 'rn-progress-loader';

export default function RegisterScreen({navigation}) {
  const {register, state, clearErrorMessage, showLoader} =
    useContext(AuthContext);
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [cityId, setCityId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const [communeId, setCommuneId] = useState(null);
  const [password, setPassword] = useState('');
  const [coverPassword, setCoverPassword] = useState(true);
  const [repassword, setRepassword] = useState('');
  const [coverRepassword, setCoverRepassword] = useState(true);
  const [usernameInputError, setUsernameInputError] = useState(null);
  const [phoneInputError, setPhoneInputError] = useState(null);
  const [passwordInputError, setPasswordInputError] = useState(null);
  const [repasswordInputError, setRePasswordInputError] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [listCity, setListCity] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listCommune, setListCommune] = useState([]);
  useEffect(() => {
    console.log(constants.GET_ALL_CITY_API);
    (async () => {
      try {
        let response = await axios.get(constants.GET_ALL_CITY_API);
        setListCity(response.data.cities);
      } catch (err) {
        setAddressError(err.message);
      }
    })();
  }, []);

  const selectAvatar = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setAvatar(image);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const checkPhoneNumberValid = () => {
    if (phoneNumber.trim() === '') {
      setPhoneInputError('Vui lòng nhập số điện thoại');
      return false;
    } else if (!/(03|05|07|08|09|01[2|6|8|9])([0-9]{8})\b/.test(phoneNumber)) {
      setPhoneInputError('Số điện thoại không đúng');
      return false;
    }
    setPhoneInputError(null);
    return true;
  };
  const checkPasswordValid = () => {
    if (password.trim() === '') {
      setPasswordInputError('Vui lòng nhập mật khẩu');
      return false;
    } else if (!/((?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10})\b/.test(password)) {
      setPasswordInputError(
        'Mật khẩu phải từ 6 đến 10 kí tự và bao gồm ít nhất 1 số hoặc 1 kí tự',
      );
      return false;
    } else if (password.indexOf(' ') >= 0) {
      setPasswordInputError('Mật khẩu không bao gồm khoảng trắng');
      return false;
    }
    setPasswordInputError(null);
    return true;
  };
  const checkAddressValid = () => {
    if (cityId && districtId && communeId && homeAddress !== '') {
      setAddressError(null);
      return true;
    }
    setAddressError('Vui lòng chọn và điền đầy đủ thông tin địa chỉ của bạn');
    return false;
  };
  const checkRepasswordValid = () => {
    if (repassword !== password && password.trim() !== '') {
      setRePasswordInputError('Mật khẩu nhập lại không khớp');
      return false;
    }
    setRePasswordInputError(null);
    return true;
  };
  const checkUsernameValid = () => {
    if (username.trim() === '') {
      setUsernameInputError('Vui lòng nhập tên của bạn');
      return false;
    } else if (!/^[a-zA-Z\s]{3,}$/.test(removeAscent(username.slice()))) {
      setUsernameInputError(
        'Họ và Tên từ 3 ký tự trở lên không bao gồm số và kí tự đặc biệt',
      );
      return false;
    }
    setUsernameInputError(null);
    return true;
  };

  const onchangeCity = async value => {
    setCityId(value);
    setDistrictId(null);
    setAddressError(null);
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
    setAddressError(null);
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
  const handleRegisterClick = () => {
    if (state.errorMessage !== '') {
      clearErrorMessage();
    }
    let isUsernameValid = checkUsernameValid();
    let isAddressValid = checkAddressValid();
    let isPhoneValid = checkPhoneNumberValid();
    let isPasswordValid = checkPasswordValid();
    let isRepasswordValid = checkRepasswordValid();
    if (
      (isUsernameValid,
      isAddressValid && isPasswordValid && isPhoneValid && isRepasswordValid)
    ) {
      showLoader();
      register({
        avatar,
        fullName: username,
        phone: phoneNumber,
        password,
        cityId,
        districtId,
        communeId,
        streetAddress: homeAddress,
        type: 'REGISTER',
      });
    }
  };

  return (
    <>
      <HeaderComponent height={0.6 * height} />
      <BackButton onPressHandler={navigation.goBack} color="#FEC54B" />
      <SafeAreaView>
        <View style={styles.registerForm}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}>
            <ImageBackground
              source={
                avatar === null
                  ? require('../../../assets/images/login_register_bg/default_avatar.jpg')
                  : {uri: avatar.path}
              }
              imageStyle={{borderRadius: width * 0.5}}
              style={styles.avatar}
              resizeMode="cover">
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={selectAvatar}>
                <Image
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  source={require('../../../assets/images/login_register_bg/camera_icon.png')}
                />
              </TouchableOpacity>
            </ImageBackground>
            <Text style={styles.headerText}>Đăng Ký Tài Khoản</Text>
            <Text style={styles.inputTittle}>Họ và tên *</Text>
            <View
              style={[
                styles.inputView,
                {borderColor: usernameInputError ? '#FF6442' : '#CACACA'},
              ]}>
              <TextInput
                style={styles.input}
                placeholder="Nhập họ và tên"
                onChangeText={text => setUsername(text)}
                onFocus={() => setUsernameInputError(null)}
                value={username}
              />
              {usernameInputError && (
                <Text style={styles.errorMessage}>{usernameInputError}</Text>
              )}
            </View>
            <Text style={styles.inputTittle}>Số điện thoại *</Text>
            <View
              style={[
                styles.inputView,
                {
                  borderColor:
                    phoneInputError || state.errorMessage
                      ? '#FF6442'
                      : '#CACACA',
                },
              ]}>
              <TextInput
                style={styles.input}
                onChangeText={text => setPhoneNumber(text)}
                value={phoneNumber}
                placeholder="Nhập số điện thoại"
                onFocus={() => {
                  setPhoneInputError(null);
                  clearErrorMessage();
                }}
                keyboardType="number-pad"
              />
              {phoneInputError && (
                <Text style={styles.errorMessage}>{phoneInputError}</Text>
              )}
            </View>
            <Text style={styles.inputTittle}>Địa chỉ *</Text>
            <View style={styles.addressPicker}>
              <View style={styles.addressSelectItem}>
                <RNPickerSelect
                  value={cityId}
                  fixAndroidTouchableBug={true}
                  onValueChange={onchangeCity}
                  placeholder={{
                    label: 'Tỉnh/Thành Phố',
                    value: null,
                  }}
                  useNativeAndroidPickerStyle={false}
                  style={styles.pickerCityStyle}
                  items={listCity}
                  Icon={() => (
                    <Ionicons
                      name="chevron-down-sharp"
                      size={20}
                      style={{marginTop: (0.075 * height) / 4, marginRight: 12}}
                    />
                  )}
                />
              </View>
            </View>
            <View style={styles.addressPicker}>
              <View style={[styles.addressSelectItem, {width: '49%'}]}>
                <RNPickerSelect
                  value={districtId}
                  fixAndroidTouchableBug={true}
                  onValueChange={onchangeDistrict}
                  items={listDistrict}
                  placeholder={{
                    label: 'Quận/Huyện',
                    value: null,
                  }}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => (
                    <Ionicons
                      name="chevron-down-sharp"
                      size={20}
                      style={{marginTop: (0.075 * height) / 4, marginRight: 12}}
                    />
                  )}
                  style={styles.pickerStyle}
                />
              </View>
              <View style={[styles.addressSelectItem, {width: '49%'}]}>
                <RNPickerSelect
                  value={communeId}
                  fixAndroidTouchableBug={true}
                  onValueChange={value => {
                    setCommuneId(value);
                    setAddressError(null);
                  }}
                  items={listCommune}
                  placeholder={{
                    label: 'Phường/Xã',
                    value: null,
                  }}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => (
                    <Ionicons
                      name="chevron-down-sharp"
                      size={20}
                      style={{marginTop: (0.075 * height) / 4, marginRight: 12}}
                    />
                  )}
                  style={styles.pickerStyle}
                />
              </View>
            </View>
            <View
              style={[
                styles.inputView,
                {
                  marginTop: 20,
                  borderColor: addressError ? '#FF6442' : '#CACACA',
                },
              ]}>
              <TextInput
                style={styles.input}
                placeholder="Nhập địa chỉ nhà"
                onChangeText={text => setHomeAddress(text)}
                onFocus={() => setAddressError(null)}
                value={homeAddress}
              />
              {addressError && (
                <Text style={styles.errorMessage}>{addressError}</Text>
              )}
            </View>
            <Text style={styles.inputTittle}>Mật khẩu *</Text>
            <View
              style={[
                styles.inputView,
                {borderColor: passwordInputError ? '#FF6442' : '#CACACA'},
              ]}>
              <TextInput
                style={[
                  styles.input,
                  {
                    fontSize:
                      coverPassword === true && password.trim() !== ''
                        ? 20
                        : 14,
                  },
                ]}
                secureTextEntry={coverPassword}
                onChangeText={text => setPassword(text)}
                onFocus={() => {
                  setPasswordInputError(null);
                  clearErrorMessage();
                }}
                value={password}
                placeholder="Nhập mật khẩu"
              />
              <TouchableOpacity
                style={styles.iconView}
                onPress={() => setCoverPassword(!coverPassword)}>
                {coverPassword ? (
                  <Icon name="eye" size={18} />
                ) : (
                  <Icon name="eye-slash" size={18} />
                )}
              </TouchableOpacity>
              {passwordInputError && (
                <Text style={styles.errorMessage}>{passwordInputError}</Text>
              )}
            </View>

            <Text style={styles.inputTittle}>Nhập lại mật khẩu *</Text>
            <View
              style={[
                styles.inputView,
                {borderColor: repasswordInputError ? '#FF6442' : '#CACACA'},
              ]}>
              <TextInput
                style={[
                  styles.input,
                  {
                    fontSize:
                      coverRepassword === true && password.trim() !== ''
                        ? 20
                        : 14,
                  },
                ]}
                secureTextEntry={coverRepassword}
                onChangeText={text => setRepassword(text)}
                value={repassword}
                onFocus={() => {
                  setRePasswordInputError(null);
                  clearErrorMessage();
                }}
                placeholder="Nhập lại mật khẩu"
              />
              <TouchableOpacity
                style={styles.iconView}
                onPress={() => setCoverRepassword(!coverRepassword)}>
                {coverRepassword ? (
                  <Icon name="eye" size={18} />
                ) : (
                  <Icon name="eye-slash" size={18} />
                )}
              </TouchableOpacity>
              {repasswordInputError && (
                <Text style={styles.errorMessage}>{repasswordInputError}</Text>
              )}
              {state.errorMessage !== '' && (
                <Text style={styles.errorMessage}>{state.errorMessage}</Text>
              )}
            </View>
            <View style={styles.termContainer}>
              <Text>Bằng việc nhấn đăng ký là bạn đã chấp nhận</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.push('TermsOfUseScreen');
                }}>
                <Text style={styles.termLink}>điều khoản sử dụng</Text>
              </TouchableOpacity>
            </View>
            <Button
              style={{marginTop: 20}}
              onPress={handleRegisterClick}
              buttonText="ĐĂNG KÝ"
            />
            <View style={styles.loginView}>
              <Text style={[styles.loginText, {color: 'black'}]}>
                Bạn đã có tài khoản?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.push('LoginScreen')}>
                <Text
                  style={[styles.loginText, {textDecorationLine: 'underline'}]}>
                  Đăng nhập
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
      <ProgressLoader
        visible={state.loading ? state.loading : false}
        isModal={true}
        isHUD={true}
        hudColor={'#FEC54B'}
        color={'#000000'}
      />
    </>
  );
}
const styles = StyleSheet.create({
  registerForm: {
    marginTop: 0.28 * height,
    width: '100%',
    height: 0.8 * height,
    position: 'absolute',
    paddingTop: 15,
    paddingHorizontal: '6%',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    backgroundColor: 'white',
    paddingBottom: 60,
  },
  scrollView: {
    width: '100%',
  },
  avatar: {
    width: width * 0.24,
    aspectRatio: 1,
    borderRadius: width * 0.15,
    alignSelf: 'center',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  cameraButton: {
    width: width * 0.3 * 0.3,
    aspectRatio: 1,
    backgroundColor: '#D9D9D9',
    borderRadius: width * 0.15 * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
  },
  inputTittle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
  },
  inputView: {
    marginTop: 10,
    height: 0.075 * height,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#CACACA',
    paddingLeft: 18,
    paddingRight: 18,
    fontSize: 15,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    alignItems: 'center',
  },
  iconView: {
    height: '100%',
    width: '12%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  addressSelectItem: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: '#CACACA',
    borderRadius: 30,
  },
  addressPicker: {
    marginTop: 20,
    height: 0.075 * height,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerStyle: {
    inputIOS: {
      fontSize: 12,
      color: 'black',
      textAlign: 'center',
      marginRight: 14,
    },
    inputAndroid: {
      fontSize: 12,
      color: 'black',
      textAlign: 'center',
      marginRight: 12,
    },
  },

  pickerCityStyle: {
    inputIOS: {
      fontSize: 14,
      color: 'black',
      textAlign: 'center',
      marginRight: 14,
    },
    inputAndroid: {
      fontSize: 14,
      color: 'black',
      textAlign: 'center',
      marginRight: 0.52 * width,
    },
  },

  termContainer: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center',
  },

  termLink: {
    fontWeight: 'bold',
    color: '#FEC54B',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  loginView: {
    width: '100%',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 40,
  },
  loginText: {
    color: '#E67F1E',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorMessage: {
    position: 'absolute',
    bottom: -14,
    left: 5,
    fontSize: 10,
    color: '#FF6442',
  },
});
