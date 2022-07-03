import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
  TextInput,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
const {height, width} = Dimensions.get('window');
import Ionicons from 'react-native-vector-icons/Ionicons';
import TopHeaderComponent from '../../components/TopHeaderComponent';
import RNPickerSelect from 'react-native-picker-select';

import Toast from 'react-native-toast-message';
import ImagePicker from 'react-native-image-crop-picker';
import SubmitButton from '../../components/SubmitButton';
import BackButton from '../../components/BackButton';

const FeedbackScreen = ({navigation}) => {
  const [checked, setChecked] = useState('first');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState(null);
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState([]);

  const [sex, setSex] = useState(null);

  const showToast = () => {
    console.log('show toast');
    Toast.show({
      type: 'success',
      text1: 'Flix',
      text2: 'Thay đổi địa chỉ mặc định thành công!',
    });
  };

  const selectFile = () => {
    ImagePicker.openPicker({
      cropping: true,
      multiple: true,
    })
      .then(images => {
        setFile([...file, ...images]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <TopHeaderComponent
        navigation={navigation}
        title="Gửi yêu cầu hỗ trợ"
        isBackButton={true}
        statusBarColor="white"
      />
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginLeft: 20,
            marginRight: 20,
            height: 0.78 * height,
            borderBottomWidth: 1,
            borderBottomColor: '#CACACA',
            flexDirection: 'column',
            marginVertical: '5%',
          }}>
          <View style={styles.inputField}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.inputLabel}>Loại yêu cầu </Text>
              <Text style={[styles.inputLabel, {color: 'red'}]}>*</Text>
            </View>
            <View style={styles.valueSpace}>
              <RNPickerSelect
                value={type ? type : 'Chọn loại yêu cầu'}
                fixAndroidTouchableBug={true}
                onValueChange={value => setType(value)}
                placeholder={{
                  label: 'Chọn loại yêu cầu',
                  value: null,
                }}
                useNativeAndroidPickerStyle={false}
                style={[styles.pickerStyle]}
                items={[
                  {label: 'Vấn đề về yêu cầu sửa chữa', value: 'nam'},
                  {label: 'Vấn đề về hệ thống', value: 'nu'},
                ]}
              />
              <Ionicons
                name="chevron-down-sharp"
                size={20}
                style={{
                  color: 'black',
                  alignSelf: 'center',
                  marginLeft: 10,
                }}
              />
            </View>
          </View>

          <View style={styles.inputField}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.inputLabel}>Số điện thoại liên lạc </Text>
              <Text style={[styles.inputLabel, {color: 'red'}]}>*</Text>
            </View>
            <View style={styles.valueSpace}>
              <TextInput
                style={styles.valueText}
                value={phone}
                onChangeText={text => setPhone(text)}
                placeholder="Nhập số điện thoại"
                placeholderTextColor="#DFDFDF"
              />
            </View>
          </View>
          {type === 'nam' ? (
            <View style={styles.inputField}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.inputLabel}>Mã yêu cầu sửa chữa </Text>
                <Text style={[styles.inputLabel, {color: 'red'}]}>*</Text>
              </View>
              <View style={styles.valueSpace}>
                <TextInput
                  style={styles.valueText}
                  value={phone}
                  onChangeText={text => setPhone(text)}
                  placeholder="Nhập mã yêu cầu"
                  placeholderTextColor="#DFDFDF"
                />
              </View>
            </View>
          ) : null}
          <View style={styles.inputField}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.inputLabel}>Tiêu đề </Text>
              <Text style={[styles.inputLabel, {color: 'red'}]}>*</Text>
            </View>
            <View style={styles.valueSpace}>
              <TextInput
                style={styles.valueText}
                value={phone}
                onChangeText={text => setPhone(text)}
                placeholder="Nhập tiêu đề"
                placeholderTextColor="#DFDFDF"
              />
            </View>
          </View>
          <View style={styles.inputField}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.inputLabel}>Nội dung </Text>
              <Text style={[styles.inputLabel, {color: 'red'}]}>*</Text>
            </View>
            <View
              style={[
                styles.valueSpace,
                {
                  height: 100,
                },
              ]}>
              <TextInput
                style={styles.valueText}
                value={phone}
                onChangeText={text => setPhone(text)}
                placeholder="Mô tả chi tiết vấn đề của bạn"
                placeholderTextColor="#DFDFDF"
                multiline
                numberOfLines={5}
              />
            </View>
          </View>
          <View style={styles.inputField}>
            <Text style={styles.inputLabel}>Tệp ảnh đính kèm (nếu có)</Text>
            <View
              style={{width: '100%', flexDirection: 'row', flexWrap: 'wrap'}}>
              {file.length !== 0
                ? file.map((item, index) => {
                    return (
                      <ImageBackground
                        source={{uri: item.path}}
                        key={index}
                        style={styles.avatar}
                        resizeMode="cover">
                        <TouchableOpacity
                          style={styles.cameraButton}
                          onPress={() => setFile(file.splice(index + 1, 1))}>
                          <Image
                            style={{
                              width: 12,
                              height: 12,
                            }}
                            source={require('../../../assets/images/type/close.png')}
                          />
                        </TouchableOpacity>
                      </ImageBackground>
                    );
                  })
                : null}
              <TouchableOpacity onPress={selectFile}>
                <Image
                  style={{
                    width: 80,
                    height: 80,
                  }}
                  source={require('../../../assets/images/type/add-image.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <SubmitButton
          style={{
            marginBottom: 15,
            width: '90%',
            alignSelf: 'center',
          }}
          onPress={() => {
            navigation.push('AddAddressScreen');
          }}
          buttonText="GỬI YÊU CẦU"
        />
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  avatar: {
    width: width * 0.2,
    aspectRatio: 1,
    borderRadius: width * 0.15,
    alignSelf: 'center',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginRight: 20,
  },
  cameraButton: {
    width: width * 0.3 * 0.2,
    top: -6,
    right: -6,
    position: 'absolute',
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
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  boxHeader: {
    flexDirection: 'row',
    height: 35,
    alignItems: 'flex-end',
    marginBottom: 5,
  },
  tittleText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    marginLeft: 40,
  },
  editTouch: {
    marginLeft: 'auto',
  },
  editText: {
    color: '#FEC54B',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  addressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    marginBottom: 10,
  },
  textBold: {
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  inputField: {marginBottom: 12},
  inputLabel: {
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    fontSize: 18,
  },
  valueSpace: {
    height: 50,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#E8E8E8',
    borderWidth: 2,
  },
  valueText: {
    fontSize: 20,
    color: 'black',
    flex: 15,
  },
  valueTextBlur: {
    fontSize: 16,
    color: '#DFDFDF',
  },
  pickerStyle: {
    inputIOS: {
      fontSize: 18,
      color: 'black',
    },
    inputAndroid: {
      fontSize: 18,
      color: 'black',
    },
  },
});

export default FeedbackScreen;
