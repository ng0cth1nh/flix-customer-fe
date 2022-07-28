import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
const {height} = Dimensions.get('window');
import {RadioButton} from 'react-native-paper';
import NotFound from '../../components/NotFound';
import SubmitButton from '../../components/SubmitButton';
import TopHeaderComponent from '../../components/TopHeaderComponent';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectIsLoading,
  selectAddresses,
  selectErrorMessage,
  updateMainAddress,
  fetchAddresses,
} from '../../features/user/userSlice';
import useAxios from '../../hooks/useAxios';
import Toast from 'react-native-toast-message';

const AddressListScreen = ({navigation}) => {
  const [checked, setChecked] = useState('first');
  const customerAPI = useAxios();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const addresses = useSelector(selectAddresses);
  const errorMessage = useSelector(selectErrorMessage);

  const handleUpdateMainAddressButtonClick = async addressId => {
    try {
      // await dispatch(setIsLoading());
      await dispatch(
        updateMainAddress({
          customerAPI,
          body: {addressId},
        }),
      ).unwrap();
      await dispatch(fetchAddresses(customerAPI));
      Toast.show({
        type: 'customToast',
        text1: 'Đặt địa chỉ mặc thành công',
      });
      // navigation.goBack();
    } catch (err) {
      Toast.show({
        type: 'customErrorToast',
        text1: err,
      });
    }
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <TopHeaderComponent
        navigation={navigation}
        title="Địa chỉ của bạn"
        isBackButton={true}
        statusBarColor="white"
      />
      <SafeAreaView style={{flex: 1, marginHorizontal: '4%'}}>
        {errorMessage ? <NotFound /> : null}
        {addresses ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={addresses}
            style={{
              height: 0.78 * height,
            }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <View
                style={[
                  styles.box,
                  {
                    height: 'auto',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 12,
                    marginTop: index === 0 ? 12 : 0,
                  },
                ]}>
                <RadioButton
                  value="first"
                  status={item.mainAddress ? 'checked' : 'unchecked'}
                  color="#FFBC00"
                  onPress={() =>
                    handleUpdateMainAddressButtonClick(item.addressId)
                  }
                />
                <View
                  style={{flex: 1, marginHorizontal: 6, marginVertical: 10}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.tittleText}>{item.customerName}</Text>
                    <TouchableOpacity
                      style={styles.editTouch}
                      onPress={() =>
                        navigation.push('EditAddressScreen', {
                          data: item,
                        })
                      }>
                      <Text style={styles.editText}>Thay đổi</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.textBold}>{item.phone}</Text>
                  <Text style={{flexWrap: 'wrap', color: 'black'}}>
                    {item.addressName}
                  </Text>
                </View>
              </View>
            )}
          />
        ) : null}
        <SubmitButton
          style={{
            marginVertical: 8,
            width: '100%',
            alignSelf: 'center',
          }}
          onPress={() => {
            navigation.push('AddAddressScreen');
          }}
          buttonText="THÊM ĐỊA CHỈ"
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
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  boxHeader: {
    height: 35,
    alignItems: 'flex-end',
    marginBottom: 5,
  },
  tittleText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
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
  },
  textBold: {
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 4,
  },
});

export default AddressListScreen;
