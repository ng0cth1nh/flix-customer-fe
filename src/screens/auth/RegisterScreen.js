import React, {useState, useContext, useEffect, useRef} from 'react';
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
  const [cityIdError, setCityIdError] = useState(null);
  const [communeIdError, setCommuneIdError] = useState(null);
  const [districtIdError, setDistrictIdError] = useState(null);
  const [listCity, setListCity] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listCommune, setListCommune] = useState([]);
  const scrollRef = useRef();

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

  useEffect(() => {
    if (state.errorCode !== '') {
      if (
        state.errorCode === 'ACCOUNT_EXISTED' ||
        state.errorCode === 'INVALID_PHONE_NUMBER'
      ) {
        scrollRef.current?.scrollTo({x: 0, y: 0, animated: true});
      }
    }
  }, [state.errorCode]);

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
      setPhoneInputError('Không được bỏ trống');
      return false;
    } else if (!/(03|05|07|08|09|01[2|6|8|9])([0-9]{8})\b/.test(phoneNumber)) {
      setPhoneInputError('Số điện thoại không hợp lệ');
      return false;
    }
    setPhoneInputError(null);
    return true;
  };
  const checkPasswordValid = () => {
    if (password.trim() === '') {
      setPasswordInputError('Không được bỏ trống');
      return false;
    } else if (!/^[a-zA-Z0-9\s]{6,10}$/.test(removeAscent(password.slice()))) {
      setPasswordInputError('Độ dài từ 6 đến 10 ký tự, bao gồm chữ và số');
      return false;
    } else if (password.indexOf(' ') >= 0) {
      setPasswordInputError('Độ dài từ 6 đến 10 ký tự, bao gồm chữ và số');
      return false;
    }
    setPasswordInputError(null);
    return true;
  };
  const checkAddressValid = () => {
    if (!homeAddress || homeAddress === '') {
      setAddressError('Không được bỏ trống');
      return false;
    } else if (homeAddress.length > 150) {
      setAddressError('Không nhập quá dài');
      return false;
    }
    setAddressError(null);
    return true;
  };
  const checkRepasswordValid = () => {
    if (!repassword || repassword === '') {
      setRePasswordInputError('Không được bỏ trống');
      return false;
    }
    if (!checkPasswordValid()) {
      return true;
    }
    if (repassword !== password && password.trim() !== '') {
      setRePasswordInputError('Mật khẩu không khớp');
      return false;
    }
    setRePasswordInputError(null);
    return true;
  };
  const checkUsernameValid = () => {
    if (username.trim() === '') {
      setUsernameInputError('Không được bỏ trống');
      return false;
    } else if (!/^[a-zA-Z\s]{3,150}$/.test(removeAscent(username.slice()))) {
      setUsernameInputError(
        'Họ và tên từ 3-150 ký tự, không bao gồm số hoặc kí tự đặc biệt',
      );
      return false;
    }
    setUsernameInputError(null);
    return true;
  };

  const onchangeCity = async value => {
    setCityIdError(null);
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
    setDistrictIdError(null);
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

    if (!cityId) {
      setCityIdError('Không được bỏ trống');
    }
    if (!districtId) {
      setDistrictIdError('Không được bỏ trống');
    }
    if (!communeId) {
      setCommuneIdError('Không được bỏ trống');
    }

    if (!isUsernameValid || !isPhoneValid) {
      scrollRef.current?.scrollTo({x: 0, y: 0, animated: true});
    } else if (!cityId || !districtId || !communeId || !isAddressValid) {
      scrollRef.current?.scrollTo({x: 0, y: 400, animated: true});
    }

    if (
      isUsernameValid &&
      isAddressValid &&
      isPasswordValid &&
      isPhoneValid &&
      isRepasswordValid &&
      cityId &&
      communeId &&
      districtId
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
      console.log('VALID: ', {
        avatar,
        fullName: username,
        phone: phoneNumber,
        password,
        cityId,
        districtId,
        communeId,
        streetAddress: homeAddress,
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
            style={styles.scrollView}
            ref={scrollRef}>
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
                    phoneInputError ||
                    (state.errorMessage !== '' &&
                      (state.errorCode === 'ACCOUNT_EXISTED' ||
                        state.errorCode === 'INVALID_PHONE_NUMBER'))
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
              {state.errorMessage !== '' &&
                (state.errorCode === 'ACCOUNT_EXISTED' ||
                  state.errorCode === 'INVALID_PHONE_NUMBER') && (
                  <Text style={styles.errorMessage}>{state.errorMessage}</Text>
                )}
            </View>
            <Text style={styles.inputTittle}>Địa chỉ *</Text>
            <View style={styles.addressPicker}>
              <View
                style={[
                  styles.addressSelectItem,
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
                  style={styles.pickerCityStyle}
                  items={listCity}
                  Icon={() => (
                    <Ionicons
                      name="chevron-down-sharp"
                      size={20}
                      style={{marginTop: (0.09 * height) / 4, marginRight: 6}}
                    />
                  )}
                />
              </View>
              {cityIdError && (
                <Text style={styles.errorMessage}>{cityIdError}</Text>
              )}
            </View>
            <View style={styles.addressPicker}>
              <View
                style={[
                  styles.addressSelectItem,
                  {
                    width: '49%',
                    borderColor: districtIdError ? '#FF6442' : '#CACACA',
                  },
                ]}>
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
                      style={{marginTop: (0.09 * height) / 4, marginRight: 6}}
                    />
                  )}
                  style={styles.pickerStyle}
                />
                {districtIdError && (
                  <Text style={styles.errorMessage}>{districtIdError}</Text>
                )}
              </View>
              <View
                style={[
                  styles.addressSelectItem,
                  {
                    width: '49%',
                    borderColor: communeIdError ? '#FF6442' : '#CACACA',
                  },
                ]}>
                <RNPickerSelect
                  value={communeId}
                  fixAndroidTouchableBug={true}
                  onValueChange={value => {
                    setCommuneId(value);
                    setCommuneIdError(null);
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
                      style={{marginTop: (0.09 * height) / 4, marginRight: 6}}
                    />
                  )}
                  style={styles.pickerStyle}
                />
                {communeIdError && (
                  <Text style={styles.errorMessage}>{communeIdError}</Text>
                )}
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
