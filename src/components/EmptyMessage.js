import {View, Text, Image} from 'react-native';
import React from 'react';

const EmptyMessage = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        marginTop: 100,
      }}>
      <Image
        source={require('../../assets/images/type/messenger.png')}
        style={{width: 46, height: 46, marginBottom: 10}}
      />
      <Text style={{fontSize: 18, fontWeight: '600', color: 'black'}}>
        Không có tin nhắn nào
      </Text>
    </View>
  );
};

export default EmptyMessage;
