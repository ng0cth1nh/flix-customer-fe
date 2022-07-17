import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import {RadioButton} from 'react-native-paper';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import BackButton from '../../components/BackButton';
import Button from '../../components/SubmitButton';
import TopHeaderComponent from '../../components/TopHeaderComponent';

const ChoosePaymentMethodScreen = ({navigation, route}) => {
  const {paymentMethod, setPaymentMethod} = route.params;
  const [checked, setChecked] = useState(paymentMethod);
  const buttonClicked = () => {
    setPaymentMethod(checked);
    navigation.goBack();
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <TopHeaderComponent
        navigation={navigation}
        title="Phương thức thanh toán"
        isBackButton={true}
        statusBarColor="white"
      />
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          style={{
            paddingHorizontal: 20,
            flex: 1,
            paddingBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#CACACA',
          }}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => {
              setChecked({id: 'V', name: 'VNPAY'});
            }}>
            <RadioButton
              value="V"
              status={checked.id === 'V' ? 'checked' : 'unchecked'}
              color="#FFBC00"
              onPress={() => {
                setChecked({id: 'V', name: 'VNPAY'});
              }}
            />
            <Image
              source={require('../../../assets/images/payment_method/VNPay.png')}
              style={styles.image}
            />
            <Text style={styles.text}>VNPAY</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            onPress={() => {
              setChecked({id: 'C', name: 'Tiền mặt'});
            }}>
            <RadioButton
              value="C"
              status={checked.id === 'C' ? 'checked' : 'unchecked'}
              color="#FFBC00"
              onPress={() => {
                setChecked({id: 'C', name: 'Tiền mặt'});
              }}
            />
            <Image
              source={require('../../../assets/images/payment_method/cash.png')}
              style={styles.image}
            />
            <Text style={styles.text}>Tiền mặt</Text>
          </TouchableOpacity>
        </ScrollView>
        <View>
          <Button
            style={{
              marginVertical: 20,
              marginHorizontal: '5%',
            }}
            onPress={buttonClicked}
            buttonText="ĐỒNG Ý"
          />
        </View>
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
    width: '100%',
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
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default ChoosePaymentMethodScreen;
