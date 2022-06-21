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
import React, {useState, useRef, useContext, useEffect} from 'react';
const {height, width} = Dimensions.get('window');
import BackButton from '../../../components/BackButton';
import {Root, SPSheet} from 'react-native-popup-confirm-toast';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const ProfileInfoScreen = ({route, navigation}) => {
  const {profileData} = route.params;
  const [profile, setProfile] = useState(profileData);

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
          onPress={() =>
            navigation.push('EditProfileInfoScreen', {
              profileData: profile,
            })
          }
          style={{
            position: 'absolute',
            zIndex: 1,
            top: getStatusBarHeight() + 8,
            right: 20,
          }}>
          <Image
            style={{width: 24, height: 24}}
            source={require('../../../../assets/images/type/edit.png')}
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
          source={{uri: profile.avatar}}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            alignSelf: 'center',
            color: 'black',
            marginBottom: 50,
          }}>
          {profile.name}
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
                source={require('../../../../assets/images/type/user.png')}
              />
              <Text style={styles.tittleText}>Thông tin tài khoản</Text>
            </View>
            <View style={styles.inputField}>
              <Text style={styles.inputLabel}>Họ và tên</Text>
              <View style={styles.valueSpace}>
                <TextInput
                  style={styles.valueText}
                  editable={false}
                  value={profile.name}
                />
              </View>
            </View>
            <View style={styles.inputField}>
              <Text style={styles.inputLabel}>Số điện thoại liên lạc</Text>
              <View style={styles.valueSpace}>
                <TextInput
                  style={styles.valueText}
                  editable={false}
                  value={profile.phone}
                />
              </View>
            </View>
            <View style={styles.inputField}>
              <Text style={styles.inputLabel}>Ngày sinh</Text>
              <View style={styles.valueSpace}>
                <TextInput
                  style={
                    profile.birthDate ? styles.valueText : styles.valueTextBlur
                  }
                  editable={false}
                  value={
                    profile.birthDate ? profile.birthDate : 'Chưa cập nhật'
                  }
                />
              </View>
            </View>
            <View style={styles.inputField}>
              <Text style={styles.inputLabel}>Giới tính</Text>
              <View style={styles.valueSpace}>
                <TextInput
                  style={profile.sex ? styles.valueText : styles.valueTextBlur}
                  editable={false}
                  value={profile.sex ? profile.sex : 'Chưa cập nhật'}
                />
              </View>
            </View>
            <View style={styles.inputField}>
              <Text style={styles.inputLabel}>Email</Text>
              <View style={styles.valueSpace}>
                <TextInput
                  style={
                    profile.email ? styles.valueText : styles.valueTextBlur
                  }
                  editable={false}
                  value={profile.email ? profile.email : 'Chưa cập nhật'}
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
