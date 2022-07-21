import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  FlatList,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
const {height} = Dimensions.get('window');
import Loading from '../../components/Loading';
import {RadioButton} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import ApiConstants from '../../constants/Api';
import NotFound from '../../components/NotFound';
import useFetchData from '../../hooks/useFetchData';
import SubmitButton from '../../components/SubmitButton';
import TopHeaderComponent from '../../components/TopHeaderComponent';
import BackButton from '../../components/BackButton';

const AddressListScreen = ({navigation}) => {
  const [checked, setChecked] = useState('first');

  const {loading, data, isError} = useFetchData(
    ApiConstants.GET_ADDRESS_LIST_API,
  );

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <TopHeaderComponent
        navigation={navigation}
        title="Địa chỉ của bạn"
        isBackButton={true}
        statusBarColor="white"
      />
      <SafeAreaView style={{flex: 1}}>
        {isError ? <NotFound /> : null}
        {data !== null ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data.addresses}
            style={{
              marginHorizontal: '4%',
              height: 0.78 * height,
              borderBottomWidth: 1,
              borderBottomColor: '#CACACA',
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
                  onPress={() => {
                    setChecked('first');
                    // showToast();
                  }}
                />
                <View
                  style={{flex: 1, marginHorizontal: 6, marginVertical: 10}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.tittleText}>{item.customerName}</Text>
                    <TouchableOpacity
                      style={styles.editTouch}
                      onPress={() => navigation.push('EditAddressScreen')}>
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
        {loading ? (
          <Loading />
        ) : (
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
            buttonText="THÊM ĐỊA CHỈ"
          />
        )}
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
