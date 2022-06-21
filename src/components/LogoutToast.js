import {View, TouchableOpacity, Text} from 'react-native';
import React from 'react';

const LogoutToast = ({spSheet, handleOnDelete}) => {
  return (
    <View
      style={{
        width: '100%',
        height: 212,
        backgroundColor: 'white',
      }}>
      <Text
        style={{
          color: 'black',
          fontSize: 18,
          fontWeight: '700',
          marginHorizontal: 30,
          marginTop: 10,
          textAlign: 'center',
        }}>
        Bạn có chắc chắn muốn đăng xuất tài khoản này không?
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 50,
          marginBottom: 20,
        }}>
        <TouchableOpacity
          onPress={handleOnDelete}
          style={{
            height: 38,
            width: 152,
            backgroundColor: '#FEC54B',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 32,
          }}>
          <Text style={{fontSize: 14, color: 'black', fontWeight: '700'}}>
            ĐĂNG XUẤT
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            spSheet.hide();
          }}
          style={{
            height: 38,
            width: 152,
            backgroundColor: '#F0F0F0',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 32,
          }}>
          <Text style={{fontSize: 14, color: 'black', fontWeight: '700'}}>
            THOÁT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogoutToast;
