import {
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
const {height, width} = Dimensions.get('window');
import ImagePicker from 'react-native-image-crop-picker';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import CustomDatePicker from '../../components/CustomDatePicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../components/SubmitButton';
import RNPickerSelect from 'react-native-picker-select';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import {useSelector, useDispatch} from 'react-redux';
import useAxios from '../../hooks/useAxios';
import {
  fetchProfile,
  selectUser,
  updateAvatar,
  updateProfile,
} from '../../features/user/userSlice';
import {removeAscent} from '../../utils/util';
import TopHeaderComponent from '../../components/TopHeaderComponent';

const EditProfileInfoScreen = ({navigation}) => {
  const customerAPI = useAxios();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [avatar, setAvatar] = useState(null);
  const [fullNames, setFullNames] = useState(user.fullName);
  const [phones, setPhones] = useState(user.phone);
  const [genders, setGenders] = useState(user.gender);
  const [emails, setEmails] = useState(user.email);
  const [dateOfBirths, setDateOfBirths] = useState(user.dateOfBirth);
  const [dateVisible, setDateVisible] = useState(false);
  const [fullNameInputError, setFullNameInputError] = useState(null);
  const [emailInputError, setEmailInputError] = useState(null);
  const [dateOfBirthInputError, setDateOfBirthInputError] = useState(null);
  const [genderInputError, setGenderInputError] = useState(null);

  const handlerDateConfirm = selectedDate => {
    setDateOfBirths(moment(selectedDate).format('DD/MM/YYYY'));
    setDateVisible(false);
  };
  const hideDatePicker = () => {
    setDateVisible(false);
    setDateOfBirths(null);
  };

  const checkFullNameValid = async () => {
    if (!fullNames || fullNames.trim() === '') {
      setFullNameInputError('Kh??ng ???????c b??? tr???ng');
      return false;
    } else if (!/^[a-zA-Z\s]{3,150}$/.test(removeAscent(fullNames.slice()))) {
      setFullNameInputError(
        'H??? v?? t??n t??? 3-150 k?? t???, kh??ng bao g???m s??? ho???c k?? t??? ?????c bi???t',
      );
      return false;
    }
    setFullNameInputError(null);
    return true;
  };

  const checkEmailValid = async () => {
    if (
      emails &&
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emails.trim())
    ) {
      setEmailInputError('Email kh??ng ????ng ?????nh d???ng');
      return false;
    }
    setEmailInputError(null);
    return true;
  };
  const checkGenderValid = async () => {
    if (genders && typeof genders !== 'boolean') {
      setGenderInputError('Vui l??ng ch???n gi???i t??nh c???a b???n');
      return false;
    }
    setGenderInputError(null);
    return true;
  };
  const checkDateOfBirthValid = async () => {
    if (
      dateOfBirths &&
      !/^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$/.test(
        dateOfBirths.trim(),
      )
    ) {
      setDateOfBirthInputError('Vui l??ng ch???n ng??y sinh c???a b???n');
      return false;
    }
    setDateOfBirthInputError(null);
    return true;
  };

  const handleUpdateProfile = async () => {
    try {
      let isFullNameValid = await checkFullNameValid();
      let isEmailValid = await checkEmailValid();
      let isGenderValid = await checkGenderValid();
      let isDateValid = await checkDateOfBirthValid();
      if (isFullNameValid && isEmailValid && isGenderValid && isDateValid) {
        const body = {
          fullName: fullNames,
          dateOfBirth: dateOfBirths && dateOfBirths.replace(/\//g, '-'),
          gender: genders,
          email: emails === '' ? null : emails,
        };
        await dispatch(updateProfile({customerAPI, body})).unwrap();
        Toast.show({
          type: 'customToast',
          text1: 'C???p nh???t th??ng tin c?? nh??n th??nh c??ng',
        });
        await dispatch(fetchProfile(customerAPI));
        navigation.goBack();
      }
    } catch (error) {
      Toast.show({
        type: 'customErrorToast',
        text1: error,
      });
    }
  };

  const handleUpdateAvatar = async avatar => {
    try {
      await dispatch(updateAvatar({customerAPI, avatar})).unwrap();
      Toast.show({
        type: 'customToast',
        text1: 'C???p nh???t ???nh ?????i di???n th??nh c??ng',
      });
      await dispatch(fetchProfile(customerAPI));
    } catch (error) {
      Toast.show({
        type: 'customErrorToast',
        text1: error,
      });
    }
  };

  const selectAvatar = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
      });
      setAvatar(image);
      handleUpdateAvatar(image);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{backgroundColor: '#FEC54B', flex: 1}}>
      <TopHeaderComponent
        navigation={navigation}
        title="C???p nh???t th??ng tin t??i kho???n"
        isBackButton={true}
        statusBarColor="#FEC54B"
        style={{borderBottomColor: '#FEC54B'}}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={avatar === null ? {uri: user.avatarUrl} : {uri: avatar.path}}
          style={styles.avatar}
          imageStyle={{borderRadius: width * 0.5}}
          resizeMode="cover">
          <TouchableOpacity style={styles.cameraButton} onPress={selectAvatar}>
            <Image
              style={{
                width: 20,
                height: 20,
              }}
              source={require('../../../assets/images/login_register_bg/camera_icon.png')}
            />
          </TouchableOpacity>
        </ImageBackground>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            alignSelf: 'center',
            color: 'black',
            marginBottom: 50,
            marginTop: 16,
          }}>
          {user.fullName}
        </Text>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            paddingHorizontal: '5%',
          }}>
          <View
            style={[
              styles.box,
              {
                height: 'auto',
                flexDirection: 'column',
                marginVertical: '5%',
              },
            ]}>
            <View style={styles.boxHeader}>
              <Image
                style={{width: 24, height: 24}}
                source={require('../../../assets/images/type/user.png')}
              />
              <Text style={styles.tittleText}>Th??ng tin t??i kho???n</Text>
            </View>
            <View style={styles.inputField}>
              <Text style={styles.inputLabel}>H??? v?? t??n *</Text>
              <View
                style={[
                  styles.valueSpace,
                  fullNameInputError
                    ? {borderColor: '#FF6442', borderWidth: 1}
                    : null,
                ]}>
                <TextInput
                  style={styles.valueText}
                  value={fullNames}
                  onFocus={() => setFullNameInputError(null)}
                  onChangeText={text => setFullNames(text)}
                />
              </View>
              {fullNameInputError && (
                <Text style={styles.errorMessage}>{fullNameInputError}</Text>
              )}
            </View>
            <View style={styles.inputField}>
              <Text style={styles.inputLabel}>S??? ??i???n tho???i li??n l???c</Text>
              <View style={styles.valueSpace}>
                <TextInput
                  style={styles.valueText}
                  value={phones}
                  editable={false}
                  onChangeText={text => setPhones(text)}
                />
              </View>
            </View>
            <View style={styles.inputField}>
              <Text style={styles.inputLabel}>Ng??y sinh</Text>
              <View
                style={[
                  styles.valueSpace,
                  dateOfBirthInputError
                    ? {borderColor: '#FF6442', borderWidth: 1}
                    : null,
                ]}>
                <TouchableOpacity
                  style={styles.datePicker}
                  onPress={() => setDateVisible(true)}>
                  <Text
                    style={[
                      dateOfBirths ? styles.valueText : styles.valueTextBlur,
                    ]}>
                    {dateOfBirths ? dateOfBirths : 'Ch???n ng??y sinh'}
                  </Text>
                  <Ionicons
                    name="chevron-down-sharp"
                    size={20}
                    style={{
                      color: 'black',
                      marginLeft: 'auto',
                    }}
                  />
                  <CustomDatePicker
                    isVisible={dateVisible}
                    mode="date"
                    minimumDate={false}
                    handleConfirm={handlerDateConfirm}
                    hideDatePicker={hideDatePicker}
                  />
                </TouchableOpacity>
              </View>
              {dateOfBirthInputError && (
                <Text style={styles.errorMessage}>{dateOfBirthInputError}</Text>
              )}
            </View>
            <View style={styles.inputField}>
              <Text style={styles.inputLabel}>Gi???i t??nh</Text>
              <View
                style={[
                  styles.valueSpace,
                  genderInputError
                    ? {borderColor: '#FF6442', borderWidth: 1}
                    : null,
                ]}>
                <RNPickerSelect
                  value={genders !== null ? genders : 'Ch???n gi???i t??nh'}
                  fixAndroidTouchableBug={true}
                  onValueChange={value => setGenders(value)}
                  placeholder={{
                    label: 'Ch???n gi???i t??nh',
                    value: null,
                  }}
                  useNativeAndroidPickerStyle={false}
                  style={styles.pickerStyle}
                  items={[
                    {label: 'Nam', value: true},
                    {label: 'N???', value: false},
                  ]}
                  Icon={() => (
                    <Ionicons
                      name="chevron-down-sharp"
                      size={20}
                      style={{
                        color: 'black',
                        marginLeft: 'auto',
                        marginTop: 10,
                      }}
                    />
                  )}
                />
              </View>
              {genderInputError && (
                <Text style={styles.errorMessage}>{genderInputError}</Text>
              )}
            </View>
            <View style={styles.inputField}>
              <Text style={styles.inputLabel}>Email</Text>
              <View
                style={[
                  styles.valueSpace,
                  emailInputError
                    ? {borderColor: '#FF6442', borderWidth: 1}
                    : null,
                ]}>
                <TextInput
                  style={emails ? styles.valueText : styles.valueTextBlur}
                  onChangeText={text => setEmails(text)}
                  value={emails}
                  onFocus={() => setEmailInputError(null)}
                  placeholder="Nh???p email"
                  placeholderTextColor="#DFDFDF"
                />
              </View>
              {emailInputError && (
                <Text style={styles.errorMessage}>{emailInputError}</Text>
              )}
            </View>
          </View>
          <Button
            style={{marginBottom: 20, height: height * 0.062}}
            onPress={handleUpdateProfile}
            buttonText="L??u l???i"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: width * 0.28,
    aspectRatio: 1,
    borderRadius: width * 0.15,
    alignSelf: 'center',
    alignItems: 'flex-end',
    marginTop: 40,
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
  inputField: {marginBottom: 16},
  inputLabel: {
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  valueSpace: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  valueText: {
    fontSize: 16,
    color: 'black',
  },
  valueTextBlur: {
    fontSize: 16,
    color: '#DFDFDF',
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
  datePicker: {
    flexDirection: 'row',
    width: '100%',
    height: '80%',
    borderRadius: 10,
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
  },
  textBold: {
    color: 'black',
  },
  errorMessage: {
    position: 'absolute',
    bottom: -14,
    left: 5,
    fontSize: 10,
    color: '#FF6442',
  },
});

export default EditProfileInfoScreen;
