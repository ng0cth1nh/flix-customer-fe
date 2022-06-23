import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
const {height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import SubmitButton from '../../components/SubmitButton';
import BackButton from '../../components/BackButton';

const ChangePasswordScreen = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');
  const [coverPassword, setCoverPassword] = useState(true);
  const [coverNewPassword, setCoverNewPassword] = useState(true);
  const [coverReNewPassword, setCoverReNewPassword] = useState(true);

  const showToast = () => {
    console.log('show toast');
    Toast.show({
      type: 'success',
      text1: 'Flix',
      text2: 'Thay đổi địa chỉ mặc định thành công!',
    });
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <BackButton onPressHandler={navigation.goBack} color="black" />
        <Text style={styles.headerText}>Đổi mật khẩu</Text>
      </View>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={[
            styles.box,
            {
              height: 'auto',
              flexDirection: 'column',
              marginVertical: '5%',
            },
          ]}>
          <View style={styles.inputField}>
            <Text style={styles.inputLabel}>Nhập mật khẩu hiện tại</Text>
            <View style={styles.valueSpace}>
              <TextInput
                style={[
                  styles.valueText,
                  {
                    fontSize:
                      coverPassword === true && password.trim() !== ''
                        ? 20
                        : 14,
                  },
                ]}
                secureTextEntry={coverPassword}
                onChangeText={text => setPassword(text)}
                defaultValue={password}
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
            </View>
          </View>
          <View style={styles.inputField}>
            <Text style={styles.inputLabel}>Nhập mật khẩu mới</Text>
            <View style={styles.valueSpace}>
              <TextInput
                style={[
                  styles.valueText,
                  {
                    fontSize:
                      coverNewPassword === true && newPassword.trim() !== ''
                        ? 20
                        : 14,
                  },
                ]}
                secureTextEntry={coverNewPassword}
                onChangeText={text => setNewPassword(text)}
                defaultValue={newPassword}
              />
              <TouchableOpacity
                style={styles.iconView}
                onPress={() => setCoverNewPassword(!coverNewPassword)}>
                {coverNewPassword ? (
                  <Icon name="eye" size={18} />
                ) : (
                  <Icon name="eye-slash" size={18} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputField}>
            <Text style={styles.inputLabel}>Nhập lại mật khẩu mới</Text>
            <View style={styles.valueSpace}>
              <TextInput
                style={[
                  styles.valueText,
                  {
                    fontSize:
                      coverReNewPassword === true && reNewPassword.trim() !== ''
                        ? 20
                        : 14,
                  },
                ]}
                secureTextEntry={coverReNewPassword}
                onChangeText={text => setReNewPassword(text)}
                defaultValue={reNewPassword}
              />
              <TouchableOpacity
                style={styles.iconView}
                onPress={() => setCoverReNewPassword(!coverReNewPassword)}>
                {coverReNewPassword ? (
                  <Icon name="eye" size={18} />
                ) : (
                  <Icon name="eye-slash" size={18} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <SubmitButton
          style={{
            marginTop: 15,
            marginBottom: 15,
            width: '90%',
            alignSelf: 'center',
          }}
          onPress={() => {
            navigation.push('AddAddressScreen');
          }}
          buttonText="ĐỔI MẬT KHẨU"
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
  iconView: {
    flex: 1,
  },
});

export default ChangePasswordScreen;
