import React from 'react';
import {ScrollView, View} from 'react-native';
import RequestItem from '../../components/RequestItem';
const ScreenA = () => {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <ScrollView style={{marginHorizontal: 20, paddingTop: 10}}>
        <RequestItem />
      </ScrollView>
    </View>
  );
};

export default ScreenA;
