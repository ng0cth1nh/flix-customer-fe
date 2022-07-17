import {
  StyleSheet,
  StatusBar,
  Text,
  Image,
  View,
  SafeAreaView,
  Dimensions,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  firebaseDatabase,
  firebaseSet,
  firebaseDatabaseRef,
  child,
  get,
  onValue,
  push,
} from '../../../firebase/firebase';
import React, {useEffect, useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
const {height, width} = Dimensions.get('window');
import {getStatusBarHeight} from 'react-native-status-bar-height';
import moment from 'moment';
import {getFileNameFromPath} from '../../utils/util';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import BackButton from '../../components/BackButton';
let data = [
  {
    id: 1,
    senderId: 1,
    receiverId: 2,
    senderUrl:
      'https://znews-photo.zingcdn.me/w660/Uploaded/qfssu/2022_07_02/hinh_843.jpg',
    receiverUrl:
      'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/7/8/1065932/Hong-Dang-Khong-Len-.jpg',
    content: 'Tây Ban Nha thế nào em?',
    type: 'text',
    timestamp: new Date('October 13, 2014 11:13:00'),
    isRead: true,
  },
  {
    id: 2,
    senderId: 2,
    receiverId: 1,
    receiverUrl:
      'https://znews-photo.zingcdn.me/w660/Uploaded/qfssu/2022_07_02/hinh_843.jpg',
    senderUrl:
      'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/7/8/1065932/Hong-Dang-Khong-Len-.jpg',
    content: 'Hải sản đây tươi lắm anh.',
    type: 'text',
    timestamp: new Date('October 14, 2014 11:13:00'),
    isRead: true,
  },
  {
    id: 3,
    senderId: 2,
    receiverId: 1,
    receiverUrl:
      'https://znews-photo.zingcdn.me/w660/Uploaded/qfssu/2022_07_02/hinh_843.jpg',
    senderUrl:
      'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/7/8/1065932/Hong-Dang-Khong-Len-.jpg',
    content:
      'https://image.thanhnien.vn/w2048/Uploaded/2022/mftum/2022_07_01/graduation-celebration-2-5821.png',
    type: 'image',
    timestamp: new Date('October 14, 2014 11:20:00'),
    isRead: false,
  },
];
const ChatScreen = ({navigation}) => {
  const [textMessage, setTextMessage] = useState('');
  const [fileSelect, setFileSelect] = useState(null);
  let thisUser = 2;
  const selectFile = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(file => {
        setFileSelect(file);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const renderDate = (thisDate, messTime) => {
    if (thisDate !== storeDate) {
      storeDate = thisDate;
      return (
        <Text
          style={{
            textAlign: 'center',
            marginTop: 10,
            marginBottom: 20,
            fontSize: 12,
          }}>
          {messTime.format('DD/MM/YYYY')}
        </Text>
      );
    }
  };
  const renderOtherMessage = (item, messTime) => {
    return (
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <Image
          source={{
            uri: item.senderUrl,
          }}
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            resizeMode: 'cover',
          }}
        />
        <View style={{marginLeft: 10}}>
          {item.type === 'text' ? (
            <Text
              style={{
                maxWidth: 0.7 * width,
                color: 'black',
                paddingHorizontal: 10,
                paddingVertical: 5,
                backgroundColor: '#F0F0F0',
                borderRadius: 10,
                fontWeight: '500',
              }}>
              {item.content}
            </Text>
          ) : (
            <Image
              source={{uri: item.content}}
              style={{width: 0.4 * width, aspectRatio: 1}}
            />
          )}
          <Text
            style={{
              fontSize: 12,
              color: '#8D8D8D',
              marginTop: 3,
            }}>
            {messTime.format('h:mm')}
          </Text>
        </View>
      </View>
    );
  };
  const renderMyMessage = (item, messTime) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 10,
        }}>
        <View style={{alignItems: 'flex-end', marginRight: 10}}>
          {item.type === 'text' ? (
            <Text
              style={{
                maxWidth: 0.7 * width,
                color: 'black',
                paddingHorizontal: 10,
                paddingVertical: 5,
                backgroundColor: '#FEC54B',
                borderRadius: 10,
                fontWeight: '500',
              }}>
              {item.content}
            </Text>
          ) : (
            <Image
              source={{uri: item.content}}
              style={{width: 0.4 * width, aspectRatio: 1}}
            />
          )}
          <Text style={{fontSize: 12, color: '#8D8D8D', marginTop: 3}}>
            {messTime.format('h:mm')}
          </Text>
        </View>
        <Image
          source={{
            uri: item.senderUrl,
          }}
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            resizeMode: 'cover',
          }}
        />
      </View>
    );
  };
  let storeDate = null;
  useEffect(() => {
    data = data.sort((a, b) => a.timestamp - b.timestamp);
    // console.log('firebase database', firebaseDatabase);
    // firebaseSet(firebaseDatabaseRef(firebaseDatabase, 'members/' + 'one'), {
    //   [data[0].senderId]: false,
    //   [data[0].receiverId]: true,
    // });
    const postListRef = firebaseDatabaseRef(firebaseDatabase, 'members');
    const newPostRef = push(postListRef);
    firebaseSet(newPostRef, {
      one: 'one',
      two: 'two',
    });
    console.log(newPostRef.key);
  }, []);
  const renderItem = ({item}) => {
    let messTime = moment(item.timestamp);
    return (
      <View>
        {renderDate(item.timestamp.getDate(), messTime)}
        <View>
          {item.senderId === thisUser
            ? renderMyMessage(item, messTime)
            : renderOtherMessage(item, messTime)}
        </View>
      </View>
    );
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View
        style={{
          height: height * 0.1,
          borderBottomWidth: 1,
          borderBottomColor: '#CACACA',
          justifyContent: 'center',
        }}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        <BackButton onPressHandler={navigation.goBack} color="black" />

        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginVertical: 'auto',
          }}>
          <Image
            source={{
              uri: 'https://znews-photo.zingcdn.me/w660/Uploaded/qfssu/2022_07_02/hinh_843.jpg',
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              resizeMode: 'cover',
            }}
          />
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-around',
              marginLeft: 15,
            }}>
            <Text style={{fontWeight: 'bold', color: 'black'}}>
              Hồ Hoài Anh
            </Text>
            <Text style={{fontSize: 12, color: '#8D8D8D'}}>Đang hoạt động</Text>
          </View>
        </View>
      </View>
      <SafeAreaView style={{flex: 1, paddingHorizontal: 10}}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          scrollEnabled={true}
        />
        <View
          style={{
            marginBottom: 10,
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          <View
            style={{
              paddingHorizontal: 10,
              width: '80%',
              backgroundColor: '#F0F0F0',
              justifyContent: 'space-between',
              borderRadius: 10,
            }}>
            {fileSelect != null && (
              <View
                style={{
                  width: 60,
                  height: 60,
                  marginVertical: 20,
                  flexDirection: 'row',
                }}>
                <Image
                  source={{uri: fileSelect.path}}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 15,
                    resizeMode: 'cover',
                  }}
                />
                <TouchableOpacity
                  style={styles.closeIcon}
                  onPress={() => {
                    console.log('set file');
                    setFileSelect(null);
                  }}>
                  <Ionicons name="close" size={16} />
                </TouchableOpacity>
              </View>
            )}

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                onChangeText={setTextMessage}
                value={textMessage}
                placeholder="Nhập tin nhắn"
                style={{width: '80%'}}
              />
              <View style={{width: '20%'}}>
                <TouchableOpacity
                  style={{
                    width: '70%',
                    marginLeft: 'auto',
                  }}
                  disabled={fileSelect}
                  onPress={selectFile}>
                  <Icon
                    name="file-image-o"
                    size={24}
                    style={{marginLeft: 'auto', color: 'black'}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{
              height: 45,
              width: 50,
              borderRadius: 10,
              backgroundColor: '#FEC54B',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 10,
            }}>
            <Icon name="send-o" size={24} style={{color: 'black'}} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  headerText: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    color: 'black',
    marginTop: getStatusBarHeight(),
    width: '100%',
  },
  selectedService: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#CACACA',
    marginTop: 15,
    marginRight: 15,
  },
  closeIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#FEC54B',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -10,
    right: -10,
  },
});
