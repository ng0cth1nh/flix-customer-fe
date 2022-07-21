import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Context as AuthContext} from '../../context/AuthContext';
import {firebase} from '@react-native-firebase/database';

import ApiConstants from '../../constants/Api';
import NotFound from '../../components/NotFound';
import useAxios from '../../hooks/useAxios';
import Loading from '../../components/Loading';
import firestore from '@react-native-firebase/firestore';
import getErrorMessage from '../../utils/getErrorMessage';
import TopHeaderComponent from '../../components/TopHeaderComponent';
import {getUserOnlineStatus} from '../../utils/firebaseUtil';
import {getDiffTimeBetweenTwoDate} from '../../utils/util';

const ChatListScreen = ({navigation}) => {
  const {state} = useContext(AuthContext);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [listChat, setListChat] = useState([]);
  const [firebaseLoading, setFireBaseLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const customerAPI = useAxios();

  useEffect(() => {
    const firstOneSubscriber = firestore()
      .collection('conversations')
      .where('memberOne', '==', state.userId)
      .onSnapshot(onResult, onError);
    const secondOneSubscriber = firestore()
      .collection('conversations')
      .where('memberTwo', '==', state.userId)
      .onSnapshot(onResult, onError);
    const watchTime = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    const onlineRef = firebase
      .app()
      .database(
        'https://flix-cb844-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
      .ref('/online')
      .on('value', snapshot => {
        const val = snapshot.val();
        setListChat(
          listChat.map(chat => {
            return {
              ...chat,
              onlineStatus: val[chat.id + ''],
            };
          }),
        );
      });
    return () => {
      setFireBaseLoading(true);
      firstOneSubscriber();
      secondOneSubscriber();
      clearInterval(watchTime);
      firebase
        .app()
        .database(
          'https://flix-cb844-default-rtdb.asia-southeast1.firebasedatabase.app/',
        )
        .ref('/online')
        .off('value', onlineRef);
    };
  }, []);

  async function onResult(querySnapshot) {
    if (querySnapshot.size > 0) {
      const memberFilter =
        querySnapshot.docs[0].data().memberOne === state.userId
          ? 'memberOne'
          : 'memberTwo';
      let filterList = listChat.filter(
        chat => chat[memberFilter] !== state.userId,
      );
      const conversationsMap = await Promise.all(
        querySnapshot.docs.map(async doc => {
          // get active , get profile here
          //fullName,phone,avatar,id
          try {
            const renderId =
              doc.data().memberOne === state.userId
                ? doc.data().memberTwo
                : doc.data().memberOne;
            const res = await customerAPI.get(
              ApiConstants.GET_USER_INFORMATION + '?id=' + renderId,
            );
            const userProfile = res.data;
            const onlineStatus = await getUserOnlineStatus(renderId);
            return {
              ...userProfile,
              ...doc.data(),
              conversationId: doc.id,
              onlineStatus,
            };
          } catch (error) {
            setErrorMessage(getErrorMessage(error));
            console.log(error);
            return {...doc.data(), conversationId: doc.id};
          }
        }),
      );
      setListChat(
        filterList.concat(conversationsMap).sort((a, b) => {
          b.latestTimestamp - a.latestTimestamp;
        }),
      );
    }
    setFireBaseLoading(false);
  }

  function onError(error) {
    setFireBaseLoading(false);
    console.error('Loading conversations fail:', error);
  }

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ChatScreen', {
            conversationId: item.conversationId,
            targetUserId: item.id,
            targetUserAvatar: item.avatar,
            targetUsername: item.fullName,
          })
        }
        style={{
          flexDirection: 'row',
          marginTop: 20,
          paddingHorizontal: 15,
        }}>
        <View
          style={{
            width: 40,
            height: 40,
          }}>
          <Image
            source={{uri: item.avatar}}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              resizeMode: 'cover',
            }}
          />
          {item.onlineStatus && (
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                position: 'absolute',
                right: -3,
                bottom: 3,
                backgroundColor: '#5AD539',
              }}
            />
          )}
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-around',
            marginLeft: 15,
            flex: 1,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontWeight: 'bold', color: 'black', fontSize: 16}}>
              {item.fullName}
            </Text>
            <Text>
              {getDiffTimeBetweenTwoDate(
                new Date(item.latestTimestamp),
                currentDateTime,
              )}
            </Text>
          </View>
          <Text
            numberOfLines={1}
            style={
              item.isRead || item.senderId === state.userId
                ? {color: '#8D8D8D'}
                : {color: 'black'}
            }>
            {item.messType === 'text'
              ? item.latestMessage
              : item.senderId === state.userId
              ? 'Bạn đã gửi một hình ảnh'
              : item.fullName + ' đã gửi một hình ảnh'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <TopHeaderComponent
        navigation={navigation}
        title="Tin nhắn"
        isBackButton={false}
        statusBarColor="white"
      />
      <SafeAreaView style={{flex: 1}}>
        {errorMessage ? <NotFound /> : null}
        {firebaseLoading ? (
          <Loading />
        ) : errorMessage ? null : (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={listChat}
            scrollEnabled={true}
            renderItem={renderItem}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({});
