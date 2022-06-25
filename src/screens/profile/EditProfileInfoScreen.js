import {
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import React, {useState, useRef, useContext, useEffect} from 'react';
const {height, width} = Dimensions.get('window');
import ImagePicker from 'react-native-image-crop-picker';
import BackButton from '../../components/BackButton';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import CustomDatePicker from '../../components/CustomDatePicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../components/SubmitButton';
import RNPickerSelect from 'react-native-picker-select';
import moment from 'moment';

const EditProfileInfoScreen = ({route, navigation}) => {
  const {profileData} = route.params;
  //const [profile, setProfile] = useState(profileData);

  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState(profileData.name);
  const [phone, setPhone] = useState(profileData.phone);
  const [sex, setSex] = useState(profileData.sex);
  const [email, setEmail] = useState(profileData.email);
  const [birthDate, setBirthDate] = useState(
    profileData.birthDate ? new Date(profileData.birthDate) : null,
  );
  const [dateVisible, setDateVisible] = useState(false);
  const handlerDateConfirm = selectedDate => {
    setBirthDate(moment(selectedDate));
    setDateVisible(false);
  };
  const hideDatePicker = () => {
    setDateVisible(false);
  };

  const selectAvatar = () => {
    ImagePicker.openPicker({
      width: 300,
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

  return (
    <View style={{backgroundColor: '#FEC54B', flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="#FEC54B" />
      <View
        style={{
          flex: 1,
          height: 60,
          width: '100%',
          zIndex: 1,
          position: 'absolute',
          backgroundColor: '#FEC54B',
        }}>
        <BackButton onPressHandler={navigation.goBack} color="black" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={
            avatar === null ? {uri: profileData.avatar} : {uri: avatar.path}
          }
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
          {name}
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
              <Text style={styles.tittleText}>Thông tin tài khoản</Text>
            </View>
            <View style={styles.inputField}>
              <Text style={styles.inputLabel}>Họ và tên</Text>
              <View style={styles.valueSpace}>
                <TextInput
                  style={styles.valueText}
                  value={name}
                  onChangeText={text => setName(text)}
                />
              </View>
            </View>
            <View style={styles.inputField}>
              <Text style={styles.inputLabel}>Số điện thoại liên lạc</Text>
              <View style={styles.valueSpace}>
                <TextInput
                  style={styles.valueText}
                  value={phone}
                  onChangeText={text => setPhone(text)}
                />
              </View>
            </View>
            <View style={styles.inputField}>
              <Text style={styles.inputLabel}>Ngày sinh</Text>
              <View style={styles.valueSpace}>
                <TouchableOpacity
                  style={styles.datePicker}
                  onPress={() => setDateVisible(true)}>
                  <Text
                    style={[
                      birthDate ? styles.valueText : styles.valueTextBlur,
                    ]}>
                    {birthDate ? birthDate.format('DD/MM/YYYY') : 'Chọn ngày'}
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
                    handleConfirm={handlerDateConfirm}
                    hideDatePicker={hideDatePicker}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputField}>
              <Text style={styles.inputLabel}>Giới tính</Text>
              <View style={styles.valueSpace}>
                <RNPickerSelect
                  value={sex ? sex : 'Chọn giới tính'}
                  fixAndroidTouchableBug={true}
                  onValueChange={value => setSex(value)}
                  placeholder={{
                    label: 'Chọn giới tính',
                    value: null,
                  }}
                  useNativeAndroidPickerStyle={false}
                  style={styles.pickerStyle}
                  items={[
                    {label: 'Nam', value: 'nam'},
                    {label: 'Nữ', value: 'nu'},
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
            </View>
            <View style={styles.inputField}>
              <Text style={styles.inputLabel}>Email</Text>
              <View style={styles.valueSpace}>
                <TextInput
                  style={email ? styles.valueText : styles.valueTextBlur}
                  onChangeText={text => setEmail(text)}
                  value={email}
                  placeholder="Nhập email"
                  placeholderTextColor="#DFDFDF"
                />
              </View>
            </View>
          </View>
          <Button
            style={{marginBottom: 20, height: height * 0.05}}
            onPress={() => console.log('a')}
            buttonText="Lưu lại"
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
    marginTop: 80,
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
  inputField: {marginBottom: 12},
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
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
  },
  textBold: {
    color: 'black',
  },
});

export default EditProfileInfoScreen;
