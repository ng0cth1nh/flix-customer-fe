import React, {useState, useCallback, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
const {height} = Dimensions.get('window');
import {RadioButton} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import ApiConstants from '../../constants/Api';
import {useSelector, useDispatch} from 'react-redux';
import {
  setIsLoading,
  selectIsLoading,
  confirmInvoice,
} from '../../features/request/requestSlice';
import SubmitButton from '../../components/SubmitButton';
import TopHeaderComponent from '../../components/TopHeaderComponent';
import useAxios from '../../hooks/useAxios';
import ProgressLoader from 'rn-progress-loader';

const banks = [
  {
    name: 'Ngân hàng NCB',
    code: 'VNPAYQR',
    logo: 'https://static.wixstatic.com/media/9d8ed5_aaced60c2f5d436ca4b4dd39ef3767b4~mv2.jpg/v1/fill/w_1182,h_1182,al_c,q_85/9d8ed5_aaced60c2f5d436ca4b4dd39ef3767b4~mv2.jpg',
  },
  {
    name: 'Ngân hàng TPBank',
    code: 'TPB',
    logo: 'https://thebank.vn/uploads/2020/05/02/thebank_logotpbank_1588408748.jpg',
  },
];

const ChooseBankScreen = ({route, navigation}) => {
  const {requestCode, orderInfo} = route.params;
  const [checked, setChecked] = useState('NCB');
  const [url, setUrl] = useState(null);
  const isLoading = useSelector(selectIsLoading);

  const customerAPI = useAxios();
  const dispatch = useDispatch();

  const handleConfirmPayment = async () => {
    try {
      await dispatch(setIsLoading());
      let response = await dispatch(
        confirmInvoice({
          customerAPI,
          body: {requestCode, orderInfo, bankCode: checked},
        }),
      ).unwrap();
      console.log('response.data: ' + response.data);
      await Linking.openURL(response.data);
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
        title="Chọn ngân hàng thanh toán"
        isBackButton={true}
        statusBarColor="white"
      />
      <SafeAreaView style={{flex: 1, marginHorizontal: '4%'}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={banks}
          style={{
            height: 0.78 * height,
            borderBottomWidth: 1,
            borderBottomColor: '#CACACA',
          }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={styles.box}
              onPress={() => {
                setChecked(item.code);
              }}>
              <RadioButton
                value={item.code}
                status={item.code === checked ? 'checked' : 'unchecked'}
                color="#FFBC00"
                onPress={() => {
                  setChecked(item.code);
                }}
              />
              <Image source={{uri: item.logo}} style={styles.image} />
              <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
        <ProgressLoader
          visible={isLoading}
          isModal={true}
          isHUD={true}
          hudColor={'#FEC54B'}
          color={'#000000'}
        />
      </SafeAreaView>
      <SubmitButton
        style={{
          marginTop: 15,
          marginBottom: 15,
          width: '90%',
          alignSelf: 'center',
        }}
        onPress={handleConfirmPayment}
        buttonText="XÁC NHẬN THANH TOÁN"
      />
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
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  box: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    height: 70,
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  image: {
    height: 40,
    width: 40,
    marginLeft: 10,
    marginRight: 20,
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

export default ChooseBankScreen;
