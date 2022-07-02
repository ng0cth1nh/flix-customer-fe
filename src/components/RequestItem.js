import moment from 'moment';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
const {height} = Dimensions.get('window');
import {numberWithCommas} from '../utils/util';
export default function RequestItem({
  item,
  handelNavigationToDetailRequest,
  handelNavigationToListPrice,
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        handelNavigationToDetailRequest(item.requestCode);
      }}
      style={[styles.box, {height: 0.28 * height, flexDirection: 'column'}]}>
      <View style={styles.boxHeader}>
        <Image
          source={require('../../assets/images/type/support.png')}
          style={{
            height: 18,
            width: 18,
          }}
        />
        <Text style={styles.tittleText}>{item.requestCode}</Text>
        <Text style={styles.editText}>
          {moment(item.date).format('HH:mm - DD/MM/YYYY')}
        </Text>
      </View>
      <View style={styles.boxBody}>
        <Image
          source={{uri: item.image}}
          style={{
            height: '70%',
            width: '25%',
            alignSelf: 'center',
            borderRadius: 10,
            marginLeft: 15,
          }}
        />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={styles.boxBodyContent}>
            <Text style={[styles.textBold, {fontSize: 24}]}>
              {item.serviceName}
            </Text>
            <Text style={{fontSize: 16, color: 'black'}}>
              Phí dịch vụ kiểm tra
            </Text>
            <View
              style={{
                flexDirection: 'row',
                paddingRight: 20,
                alignItems: 'center',
              }}>
              <Text style={styles.textBold}>{`${numberWithCommas(
                item.price,
              )} vnđ`}</Text>
              <TouchableOpacity
                style={styles.viewServiceButton}
                onPress={() =>
                  handelNavigationToListPrice({
                    serviceName: item.serviceName,
                    serviceId: 1,
                  })
                }>
                <Text style={styles.textBold}>Xem giá dịch vụ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.serviceRow}>
        <Text style={styles.textBold}>TỔNG THANH TOÁN(dự kiến)</Text>
        <Text style={styles.servicePrice}>{`${numberWithCommas(
          item.actualPrice,
        )} vnđ`}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginVertical: 10,
  },
  boxHeader: {flexDirection: 'row', flex: 2, alignItems: 'flex-end'},
  tittleText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
    marginLeft: 15,
  },
  editText: {
    marginLeft: 'auto',
  },

  boxBody: {
    flex: 8,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#CACACA',
  },
  boxBodyContent: {
    marginLeft: 20,
    height: '70%',
    width: '100%',
    paddingBottom: 5,
    justifyContent: 'space-between',
  },
  viewServiceButton: {
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
    backgroundColor: '#FEC54B',
    marginLeft: 'auto',
  },
  textBold: {
    fontWeight: 'bold',
    color: 'black',
  },
  serviceRow: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 5,
  },
  servicePrice: {
    marginLeft: 'auto',
    color: '#E67F1E',
  },
});
