import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, {useState, useRef, useEffect} from 'react';

const NOTIFICATIONS = [
  {
    id: 1,
    time: '20:59 - 13/05/2022',
    title: 'DV68GH - Đặt lịch thành công',
    content:
      'Đơn của bạn sẽ được xử lý muộn nhất trong 6 tiếng. Bấm để xem chi tiết.',
    icon: 'https://i.postimg.cc/s21gHhHD/archive.png',
    isRead: false,
  },
  {
    id: 2,
    time: '20:59 - 13/05/2022',
    title: 'EVN78FH - Đã tìm được thợ ',
    content:
      'Đơn của bạn sẽ được xử lý muộn nhất trong 6 tiếng. Bấm để xem chi tiết.',
    icon: 'https://i.postimg.cc/s21gHhHD/archive.png',
    isRead: true,
  },
  {
    id: 3,
    time: '20:59 - 13/05/2022',
    title: 'Bạn có 1 mã giảm giá mới',
    content: 'Mã giảm giá áp dụng cho tất cả các shop ở Hồ Chí Minh.',
    icon: 'https://i.postimg.cc/t4Bgz55M/coupon.png',
    isRead: true,
  },
  {
    id: 3,
    time: '20:59 - 13/05/2022',
    title: 'Bạn có 1 mã giảm giá mới',
    content: 'Mã giảm giá áp dụng cho tất cả các shop ở Hồ Chí Minh.',
    icon: 'https://i.postimg.cc/t4Bgz55M/coupon.png',
    isRead: true,
  },
  {
    id: 3,
    time: '20:59 - 13/05/2022',
    title: 'Bạn có 1 mã giảm giá mới',
    content: 'Mã giảm giá áp dụng cho tất cả các shop ở Hồ Chí Minh.',
    icon: 'https://i.postimg.cc/t4Bgz55M/coupon.png',
    isRead: true,
  },
  {
    id: 3,
    time: '20:59 - 13/05/2022',
    title: 'Bạn có 1 mã giảm giá mới',
    content: 'Mã giảm giá áp dụng cho tất cả các shop ở Hồ Chí Minh.',
    icon: 'https://i.postimg.cc/t4Bgz55M/coupon.png',
    isRead: true,
  },
  {
    id: 3,
    time: '20:59 - 13/05/2022',
    title: 'Bạn có 1 mã giảm giá mới',
    content: 'Mã giảm giá áp dụng cho tất cả các shop ở Hồ Chí Minh.',
    icon: 'https://i.postimg.cc/t4Bgz55M/coupon.png',
    isRead: true,
  },
  {
    id: 3,
    time: '20:59 - 13/05/2022',
    title: 'Bạn có 1 mã giảm giá mới',
    content: 'Mã giảm giá áp dụng cho tất cả các shop ở Hồ Chí Minh.',
    icon: 'https://i.postimg.cc/t4Bgz55M/coupon.png',
    isRead: true,
  },
  {
    id: 3,
    time: '20:59 - 13/05/2022',
    title: 'Bạn có 1 mã giảm giá mới',
    content: 'Mã giảm giá áp dụng cho tất cả các shop ở Hồ Chí Minh.',
    icon: 'https://i.postimg.cc/t4Bgz55M/coupon.png',
    isRead: true,
  },
];

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);

  const handleOnDelete = () => {};

  useEffect(() => {
    setNotifications(NOTIFICATIONS);
  }, []);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={{flex: 1}}>
        <Text style={styles.headerText}>Thông báo</Text>
        <ScrollView style={{}}>
          {notifications.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  height: 96,
                  backgroundColor: item.isRead ? 'white' : '#F0F0F0',
                  borderBottomColor: '#7C7C7C',
                  borderBottomWidth: 1,
                }}>
                <Image
                  source={{uri: item.icon}}
                  style={{
                    height: 24,
                    width: 24,
                    alignSelf: 'center',
                    marginHorizontal: 14,
                  }}
                />
                <View style={{paddingRight: 60, alignSelf: 'center'}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#E67F1E',
                      fontWeight: 'bold',
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: 'black',
                      flexWrap: 'wrap',
                      marginVertical: 8,
                    }}>
                    {item.content}
                  </Text>
                  <Text
                    style={{
                      fontSize: 8,
                      color: '#7C7C7C',
                    }}>
                    {item.time}
                  </Text>
                  <TouchableOpacity
                    onPress={handleOnDelete}
                    style={{
                      height: 12,
                      width: 12,
                      position: 'absolute',
                      top: 6,
                      right: 56,
                    }}>
                    <Image
                      source={require('../../../assets/images/type/cancel.png')}
                      style={{
                        height: 12,
                        width: 12,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
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
});
export default NotificationScreen;
