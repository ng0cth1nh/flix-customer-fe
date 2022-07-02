import {
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
const {height, width} = Dimensions.get('window');
import {Context as AuthContext} from '../../context/AuthContext';
import {Context as ProfileContext} from '../../context/ProfileContext';
import CustomModal from '../../components/CustomModal';
import {useSelector, useDispatch} from 'react-redux';
// import {fetchUserInfo} from '../../redux/actions/userAction';
import useAxios from '../../hooks/useAxios';
import {
  fetchProfile,
  selectErrorMessage,
  selectUser,
} from '../../features/user/userSlice';
import Toast from 'react-native-toast-message';

const ProfileScreen = ({navigation}) => {
  const {logout} = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const customerAPI = useAxios();

  const showModal = () => {
    setModalVisible(true);
  };

  const errorMessage = useSelector(selectErrorMessage);
  const user = useSelector(selectUser);

  useEffect(() => {
    (async () => {
      await dispatch(fetchProfile(customerAPI));
      if (errorMessage) {
        Toast.show({
          type: 'customErrorToast',
          text1: errorMessage,
        });
      }
    })();
  }, []);

  return (
    <View
      style={[
        {backgroundColor: '#FEC54B', flex: 1},
        modalVisible ? {opacity: 0.3} : {},
      ]}>
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
          paddingTop: 40,
        }}>
        <TouchableOpacity
          onPress={() => navigation.push('ProfileInfoScreen')}
          style={styles.wrapper}>
          <View style={styles.container}>
            <View style={{flexDirection: 'row', flex: 11, marginLeft: 16}}>
              <Image
                style={styles.icon}
                source={require('../../../assets/images/type/user-profile.png')}
              />
              <Text style={styles.title}>Thông tin tài khoản</Text>
            </View>
            <Image
              style={styles.iconNext}
              source={require('../../../assets/images/type/right-arrow.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.push('ChangePasswordScreen')}
          style={styles.wrapper}>
          <View style={styles.container}>
            <View style={{flexDirection: 'row', flex: 11, marginLeft: 16}}>
              <Image
                style={styles.icon}
                source={require('../../../assets/images/type/padlock.png')}
              />
              <Text style={styles.title}>Thay đổi mật khẩu</Text>
            </View>
            <Image
              style={styles.iconNext}
              source={require('../../../assets/images/type/right-arrow.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.push('AddressListScreen')}
          style={styles.wrapper}>
          <View style={styles.container}>
            <View style={{flexDirection: 'row', flex: 11, marginLeft: 16}}>
              <Image
                style={styles.icon}
                source={require('../../../assets/images/type/address.png')}
              />
              <Text style={styles.title}>Sổ địa chỉ</Text>
            </View>
            <Image
              style={styles.iconNext}
              source={require('../../../assets/images/type/right-arrow.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.push('FeedbackScreen')}
          style={styles.wrapper}>
          <View style={styles.container}>
            <View style={{flexDirection: 'row', flex: 11, marginLeft: 16}}>
              <Image
                style={styles.icon}
                source={require('../../../assets/images/type/help-desk.png')}
              />
              <Text style={styles.title}>Yêu cầu hỗ trợ</Text>
            </View>
            <Image
              style={styles.iconNext}
              source={require('../../../assets/images/type/right-arrow.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={showModal} style={styles.wrapper}>
          <View style={styles.container}>
            <View style={{flexDirection: 'row', flex: 11, marginLeft: 16}}>
              <Image
                style={styles.icon}
                source={require('../../../assets/images/type/exit.png')}
              />
              <Text style={styles.title}>Đăng xuất</Text>
            </View>
            <Image
              style={styles.iconNext}
              source={require('../../../assets/images/type/right-arrow.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        modalRatio={0.35}>
        <Text style={styles.modalText}>
          Bạn có chắc chắn muốn đăng xuất tài khoản này không?
        </Text>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            style={[styles.button, styles.buttonOpen]}
            onPress={logout}>
            <Text style={styles.textStyle}>ĐĂNG XUẤT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>THOÁT</Text>
          </TouchableOpacity>
        </View>
      </CustomModal>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  icon: {width: 24, height: 24, marginRight: 24, alignSelf: 'center'},
  iconNext: {width: 20, height: 20, marginRight: 16},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 60,
  },
  button: {
    width: '40%',
    borderRadius: 20,
    paddingVertical: 10,
  },
  buttonOpen: {
    backgroundColor: '#FEC54B',
  },
  buttonClose: {
    backgroundColor: '#F0F0F0',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 40,
    textAlign: 'center',
  },
});
export default ProfileScreen;
