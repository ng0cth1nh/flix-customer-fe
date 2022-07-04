import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import React from 'react';
import BackButton from '../../components/BackButton';
import NotFound from '../../components/NotFound';

const PickVoucherCodeScreen = ({navigation}) => {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <BackButton onPressHandler={navigation.goBack} color="black" />
      <Text style={styles.headerText}>Voucher</Text>
      <View
        style={{
          flex: 1,
        }}>
        <NotFound />
      </View>
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
});

export default PickVoucherCodeScreen;
