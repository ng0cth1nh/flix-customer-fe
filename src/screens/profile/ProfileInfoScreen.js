import {
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
  StyleSheet,
} from 'react-native';
import React from 'react';
const {height, width} = Dimensions.get('window');
import BackButton from '../../components/BackButton';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useSelector} from 'react-redux';
import {selectUser} from '../../features/user/userSlice';

const ProfileInfoScreen = ({navigation}) => {
  const user = useSelector(selectUser);

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
        <TouchableOpacity
          onPress={() => navigation.push('EditProfileInfoScreen')}
          style={{
            position: 'absolute',
            zIndex: 1,
            top: getStatusBarHeight() + 8,
            right: 20,
          }}>
          <Image
            style={{width: 24, height: 24}}
            source={require('../../../assets/images/type/edit.png')}
          />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          style={{
            width: 110,
            height: 110,
            borderRadius: width * 0.5,
            borderColor: '#F0F0F0',
            borderWidth: 1,
            alignSelf: 'center',
            marginTop: 80,
            marginBottom: 10,
          }}
          source={{uri: user.avatarUrl}}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            alignSelf: 'center',
            color: 'black',
            marginBottom: 50,
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
              <Text style={styles.tittleText}>Thông tin tài khoản</Text>
            </View>
            <View style={styles.inputField}>
              <Text style={styles.inputLabel}>Họ và tên</Text>
              <View style={styles.valueSpace}>
                <TextInput
                  style={styles.valueText}
                  editable={false}
                  value={user.fullName}
                />
              </View>
            </View>
            <View style={styles.inputField}>
              <Text style={styles.inputLabel}>Số điện thoại liên lạc</Text>
              <View style={styles.valueSpace}>
                <TextInput
                  style={styles.valueText}
                  editable={false}
                  value={user.phone}
                />
              </View>
            </View>
            <View style={styles.inputField}>
              <Text style={styles.inputLabel}>Ngày sinh</Text>
              <View style={styles.valueSpace}>
                <TextInput
                  style={
                    user.dateOfBirth ? styles.valueText : styles.valueTextBlur
                  }
                  editable={false}
                  value={user.dateOfBirth ? user.dateOfBirth : 'Chưa cập nhật'}
                />
              </View>
            </View>
            <View style={styles.inputField}>
              <Text style={styles.inputLabel}>Giới tính</Text>
              <View style={styles.valueSpace}>
                <TextInput
                  style={user.gender ? styles.valueText : styles.valueTextBlur}
                  editable={false}
                  value={
                    user.gender !== null
                      ? user.gender
                        ? 'Nam'
                        : 'Nữ'
                      : 'Chưa cập nhật'
                  }
                />
              </View>
            </View>
            <View style={styles.inputField}>
              <Text style={styles.inputLabel}>Email</Text>
              <View style={styles.valueSpace}>
                <TextInput
                  style={user.email ? styles.valueText : styles.valueTextBlur}
                  editable={false}
                  value={user.email ? user.email : 'Chưa cập nhật'}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
  valueTextBlur: {
    fontSize: 16,
    color: 'black',
    opacity: 0.5,
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

export default ProfileInfoScreen;
