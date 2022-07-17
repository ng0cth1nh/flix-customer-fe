import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import TopHeaderComponent from '../../components/TopHeaderComponent';
let listId = [
  {
    id: 1,
    image:
      'https://znews-photo.zingcdn.me/w660/Uploaded/qfssu/2022_07_02/hinh_843.jpg',
    username: 'Johnny Depp',
    lastestMessage: 'Anh đang ở Tây Ban Nha. Lúc nào về a sửa cho...',
    latestTimestamp: '10:05 - 22/05/2022',
    isRead: true,
  },
  {
    id: 2,
    image:
      'https://znews-photo.zingcdn.me/w660/Uploaded/qfssu/2022_07_02/hinh_843.jpg',
    username: 'Johnny Depp',
    lastestMessage: 'Anh đang ở Tây Ban Nha. Lúc nào về a sửa cho...',
    latestTimestamp: '10:05 - 22/05/2022',
    isRead: false,
  },
  {
    id: 3,
    image:
      'https://znews-photo.zingcdn.me/w660/Uploaded/qfssu/2022_07_02/hinh_843.jpg',
    username: 'Johnny Depp',
    lastestMessage: 'Anh đang ở Tây Ban Nha. Lúc nào về a sửa cho...',
    latestTimestamp: '10:05 - 22/05/2022',
    isRead: false,
  },
];
const ChatListScreen = ({navigation}) => {
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => console.log('clicked')}
      style={{
        flexDirection: 'row',
        marginTop: 20,
        paddingHorizontal: 15,
      }}>
      <Image
        source={{uri: item.image}}
        style={{width: 50, height: 50, borderRadius: 25, resizeMode: 'cover'}}
      />
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-around',
          marginLeft: 10,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontWeight: 'bold', color: 'black'}}>
            {item.username}
          </Text>
          <Text>{item.latestTimestamp}</Text>
        </View>
        <Text style={!item.isRead ? {color: 'black'} : {color: '#8D8D8D'}}>
          {item.lastestMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <TopHeaderComponent
        navigation={navigation}
        title="Tin nhắn"
        isBackButton={false}
        statusBarColor="white"
      />
      <SafeAreaView style={{flex: 1}}>
        <FlatList
          keyExtractor={item => item.id}
          data={listId}
          scrollEnabled={true}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </View>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({});
