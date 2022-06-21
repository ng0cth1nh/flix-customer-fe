import {
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import React, {useState, useRef, useContext, useEffect} from 'react';
const {height, width} = Dimensions.get('window');
import {Root, SPSheet} from 'react-native-popup-confirm-toast';
import LogoutToast from '../../components/LogoutToast';
import {Context as AuthContext} from '../../context/AuthContext';

const ProfileScreen = ({navigation}) => {
  const {logout} = useContext(AuthContext);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    setProfile({
      name: 'Nguyễn Văn Anh',
      phone: '0962706248',
      birthDate: null,
      sex: null,
      email: null,
      avatar:
        'https://vcdn-giaitri.vnecdn.net/2022/06/02/Johnny-Depp-Heard-Lawsuit-t-4241-1654130941.jpg',
    });
  }, []);

  return (
    <Root>
      <View style={{backgroundColor: '#FEC54B', flex: 1}}>
        <StatusBar barStyle="dark-content" backgroundColor="#FEC54B" />
        <Image
          style={{
            width: 110,
            height: 110,
            borderRadius: width * 0.5,
            borderColor: '#F0F0F0',
            borderWidth: 1,
            alignSelf: 'center',
            marginTop: 50,
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
            paddingTop: 40,
          }}>
          <View style={styles.wrapper}>
            <View style={styles.container}>
              <View style={{flexDirection: 'row', flex: 11, marginLeft: 16}}>
                <Image
                  style={styles.icon}
                  source={require('../../../assets/images/type/user-profile.png')}
                />
                <Text style={styles.title}>Thông tin tài khoản</Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.push('ProfileInfoScreen', {
                    profileData: profile,
                  })
                }
                style={{flex: 1}}>
                <Image
                  style={styles.iconNext}
                  source={require('../../../assets/images/type/right-arrow.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.wrapper}>
            <View style={styles.container}>
              <View style={{flexDirection: 'row', flex: 11, marginLeft: 16}}>
                <Image
                  style={styles.icon}
                  source={require('../../../assets/images/type/padlock.png')}
                />
                <Text style={styles.title}>Thay đổi mật khẩu</Text>
              </View>
              <TouchableOpacity style={{flex: 1}}>
                <Image
                  style={styles.iconNext}
                  source={require('../../../assets/images/type/right-arrow.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.wrapper}>
            <View style={styles.container}>
              <View style={{flexDirection: 'row', flex: 11, marginLeft: 16}}>
                <Image
                  style={styles.icon}
                  source={require('../../../assets/images/type/address.png')}
                />
                <Text style={styles.title}>Sổ địa chỉ</Text>
              </View>
              <TouchableOpacity style={{flex: 1}}>
                <Image
                  style={styles.iconNext}
                  source={require('../../../assets/images/type/right-arrow.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.wrapper}>
            <View style={styles.container}>
              <View style={{flexDirection: 'row', flex: 11, marginLeft: 16}}>
                <Image
                  style={styles.icon}
                  source={require('../../../assets/images/type/help-desk.png')}
                />
                <Text style={styles.title}>Yêu cầu hỗ trợ</Text>
              </View>
              <TouchableOpacity style={{flex: 1}}>
                <Image
                  style={styles.iconNext}
                  source={require('../../../assets/images/type/right-arrow.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.wrapper}>
            <View style={styles.container}>
              <View style={{flexDirection: 'row', flex: 11, marginLeft: 16}}>
                <Image
                  style={styles.icon}
                  source={require('../../../assets/images/type/exit.png')}
                />
                <Text style={styles.title}>Đăng xuất</Text>
              </View>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => {
                  const spSheet = SPSheet;
                  spSheet.show({
                    component: () => (
                      <LogoutToast spSheet={spSheet} handleOnDelete={logout} />
                    ),
                    dragFromTopOnly: true,
                    height: height * 0.44,
                  });
                }}>
                <Image
                  style={styles.iconNext}
                  source={require('../../../assets/images/type/right-arrow.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Root>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
    marginHorizontal: '5%',
    flex: 1,
    height: 42,
    justifyContent: 'space-around',
    marginVertical: 8,
  },
  icon: {width: 24, height: 24, marginRight: 24},
  iconNext: {width: 20, height: 20},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 60,
  },
});
export default ProfileScreen;
