import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
const {height} = Dimensions.get('window');
import Button from './SubmitButton';
import BackButton from './BackButton';
import TopHeaderComponent from './TopHeaderComponent';

const CreateAddressForm = ({
  navigation,
  cityId,
  setCityId,
  isAddAddress,
  saveButtonClicked,
  showModal,
}) => {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <TopHeaderComponent
        navigation={navigation}
        title={isAddAddress ? 'Thêm địa chỉ' : 'Sửa địa chỉ'}
        isBackButton={true}
        statusBarColor="white"
      />
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            paddingHorizontal: '4%',
          }}>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#CACACA',
              paddingBottom: 10,
            }}>
            <View
              style={[
                styles.box,
                {height: 'auto', flexDirection: 'column', marginTop: 10},
              ]}>
              <View style={styles.boxHeader}>
                <Icon name="user-o" size={25} />
                <Text style={styles.tittleText}>Thông tin khách hàng</Text>
              </View>
              <View style={styles.inputField}>
                <Text style={styles.inputLabel}>Họ và tên</Text>
                <View style={styles.valueSpace}>
                  <TextInput
                    style={styles.valueText}
                    placeholder="Nhập họ và tên"
                  />
                </View>
              </View>
              <View style={styles.inputField}>
                <Text style={styles.inputLabel}>Số điện thoại liên lạc</Text>
                <View style={styles.valueSpace}>
                  <TextInput
                    style={styles.valueText}
                    placeholder="Nhập số điện thoại"
                  />
                </View>
              </View>
            </View>
            <View
              style={[
                styles.box,
                {height: 'auto', flexDirection: 'column', marginTop: 10},
              ]}>
              <View style={styles.boxHeader}>
                <Ionicons name="location-outline" size={25} />
                <Text style={styles.tittleText}>Địa chỉ</Text>
              </View>
              <View style={styles.inputField}>
                <Text style={styles.inputLabel}>Tỉnh/Thành Phố</Text>
                <View style={styles.valueSpace}>
                  <RNPickerSelect
                    value={cityId}
                    fixAndroidTouchableBug={true}
                    onValueChange={value => setCityId(value)}
                    placeholder={{
                      label: 'Tỉnh/Thành Phố',
                      value: null,
                    }}
                    useNativeAndroidPickerStyle={false}
                    style={styles.pickerStyle}
                    items={[{label: 'Phú Thọ', value: 'thang'}]}
                    Icon={() => (
                      <Icon
                        name="caret-down"
                        size={20}
                        style={{marginTop: 10}}
                      />
                    )}
                  />
                </View>
              </View>
              <View style={styles.inputField}>
                <Text style={styles.inputLabel}>Quận/Huyện</Text>
                <View style={styles.valueSpace}>
                  <RNPickerSelect
                    value={cityId}
                    fixAndroidTouchableBug={true}
                    onValueChange={value => setCityId(value)}
                    placeholder={{
                      label: 'Quận/Huyện',
                      value: null,
                    }}
                    useNativeAndroidPickerStyle={false}
                    style={styles.pickerStyle}
                    items={[{label: 'Phú Thọ', value: 'thang'}]}
                    Icon={() => (
                      <Icon
                        name="caret-down"
                        size={20}
                        style={{marginTop: 10}}
                      />
                    )}
                  />
                </View>
              </View>
              <View style={styles.inputField}>
                <Text style={styles.inputLabel}>Phường/Xã</Text>
                <View style={styles.valueSpace}>
                  <RNPickerSelect
                    value={cityId}
                    fixAndroidTouchableBug={true}
                    onValueChange={value => setCityId(value)}
                    placeholder={{
                      label: 'Phường/Xã',
                      value: null,
                    }}
                    useNativeAndroidPickerStyle={false}
                    style={styles.pickerStyle}
                    items={[{label: 'Phú Thọ', value: 'thang'}]}
                    Icon={() => (
                      <Icon
                        name="caret-down"
                        size={20}
                        style={{marginTop: 10}}
                      />
                    )}
                  />
                </View>
              </View>

              <View style={styles.inputField}>
                <Text style={styles.inputLabel}>Địa chỉ chi tiết</Text>
                <View style={styles.valueSpace}>
                  <TextInput style={styles.valueText} />
                </View>
              </View>
            </View>
            {!isAddAddress && (
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
            width: '90%',
            alignSelf: 'center',
          }}
          onPress={saveButtonClicked}
          buttonText={isAddAddress ? 'THÊM ĐỊA CHỈ' : 'LƯU LẠI'}
        />
      </SafeAreaView>
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
