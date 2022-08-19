import React from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import TopHeaderComponent from '../../components/TopHeaderComponent';
import {numberWithCommas} from '../../utils/util';

const AccessoriesDetailScreen = ({route, navigation}) => {
  const {item} = route.params;
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <TopHeaderComponent
        navigation={navigation}
        title="Chi tiết linh kiện"
        isBackButton={true}
        statusBarColor="white"
      />
      <ScrollView
        style={{flex: 1, marginHorizontal: '4%'}}
        showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.container,
            {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              marginTop: 10,
            },
          ]}>
          <Text style={styles.title}>Tên linh kiện</Text>
          <Text style={styles.content}>{item.name}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Dịch vụ</Text>
          <Text style={styles.content}>{item.serviceName}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Mô tả</Text>
          <Text
            style={
              item.description && item.description !== ''
                ? styles.content
                : {opacity: 0.5}
            }>
            {item.description && item.description !== ''
              ? item.description
              : 'không có'}
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Giá</Text>
          <Text style={styles.content}>
            {`${numberWithCommas(item.price)} vnđ`}
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Bảo hành</Text>
          <Text
            style={
              item.insuranceTime && item.insuranceTime !== ''
                ? styles.content
                : {opacity: 0.5}
            }>
            {item.insuranceTime && item.insuranceTime !== ''
              ? `${item.insuranceTime} tháng`
              : 'không có'}
          </Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Nhà máy</Text>
          <Text
            style={
              item.manufacture && item.manufacture !== ''
                ? styles.content
                : {opacity: 0.5}
            }>
            {item.manufacture && item.manufacture !== ''
              ? item.manufacture
              : 'không có'}
          </Text>
        </View>
        <View
          style={[
            styles.container,
            {
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              borderBottomWidth: 0,
            },
          ]}>
          <Text style={styles.title}>Xuất xứ</Text>
          <Text
            style={
              item.country && item.country !== ''
                ? styles.content
                : {opacity: 0.5}
            }>
            {item.country && item.country !== '' ? item.country : 'không có'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    flex: 2,
    color: 'black',
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    flex: 5,
    color: 'black',
    alignSelf: 'center',
    fontSize: 14,
    textAlign: 'right',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    height: 'auto',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.8,
    borderBottomColor: '#383838',
  },
});
export default AccessoriesDetailScreen;
