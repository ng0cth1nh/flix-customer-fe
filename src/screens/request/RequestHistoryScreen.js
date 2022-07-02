import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {getStatusBarHeight} from 'react-native-status-bar-height';
const {width} = Dimensions.get('window');
import PendingScreen from '../request_history/PendingScreen';
import ApprovedScreen from '../request_history/ApprovedScreen';
import CancelledScreen from '../request_history/CancelledScreen';
import DoneScreen from '../request_history/DoneScreen';
import FixingScreen from '../request_history/FixingScreen';
import PaymentWaitingScreen from '../request_history/PaymentWaitingScreen';

const TopTabs = createMaterialTopTabNavigator();
function RequestHistory() {
  return (
    <TopTabs.Navigator
      tabBarOptions={{
        scrollEnabled: true,
        tabStyle: {width: 0.28 * width},
        indicatorStyle: {
          backgroundColor: '#FEC54B',
        },
      }}
      screenOptions={({route}) => ({
        tabBarLabel: ({focused}) => {
          return (
            <Text
              style={[
                styles.label,
                focused
                  ? {color: '#FEC54B', fontWeight: '500'}
                  : {color: 'black'},
              ]}>
              {route.name}
            </Text>
          );
        },
      })}>
      <TopTabs.Screen name="Chờ xác nhận" component={PendingScreen} />
      <TopTabs.Screen name="Đã xác nhận" component={ApprovedScreen} />
      <TopTabs.Screen name="Đang sửa" component={FixingScreen} />
      <TopTabs.Screen name="Chờ thanh toán" component={PaymentWaitingScreen} />
      <TopTabs.Screen name="Đã hoàn thành" component={DoneScreen} />
      <TopTabs.Screen name="Đã hủy" component={CancelledScreen} />
    </TopTabs.Navigator>
  );
}
const RequestHistoryScreen = ({navigation}) => {
  const [reqStatus, setReqStatus] = useState(0);
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={{flex: 1}}>
        <Text style={styles.headerText}>Lịch sử đặt lịch</Text>
        <RequestHistory />
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
    borderBottomWidth: 0.7,
    borderBottomColor: '#CACACA',
    width: '100%',
  },
  label: {
    fontSize: 12,
    textTransform: 'none',
  },
});

export default RequestHistoryScreen;
