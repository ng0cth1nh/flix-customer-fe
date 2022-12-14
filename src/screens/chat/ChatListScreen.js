import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
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
import {getDiffTimeBetweenTwoDate} from '../../utils/util';
import EmptyMessage from '../../components/EmptyMessage';
import {useIsFocused} from '@react-navigation/native';

const ChatListScreen = ({navigation}) => {
  const {state} = useContext(AuthContext);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [listMemberOne, setListMemberOne] = useState([]);
  const [listMemberTwo, setListMemberTwo] = useState([]);
  const [listOnline, setListOnline] = useState(null);
  const [firebaseLoading, setFireBaseLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const customerAPI = useAxios();
  const isFocused = useIsFocused();

  const reset = () => {
    setListMemberOne([]);
    setListMemberTwo([]);
    setListOnline(null);
    setFireBaseLoading(true);
    setErrorMessage(null);
  };

  useEffect(() => {
    console.log('IS FOCus: ', isFocused);
    if (isFocused) {
      reset();
      const firstOneSubscriber = firestore()
        .collection('conversations')
        .where('memberOne', '==', state.userId)
        .where('enabled', '==', true)
        .onSnapshot(onResult(1), onError);
      const secondOneSubscriber = firestore()
        .collection('conversations')
        .where('memberTwo', '==', state.userId)
        .where('enabled', '==', true)
        .onSnapshot(onResult(2), onError);
      const onlineRef = firebase
        .app()
        .database(
          'https://flix-cb844-default-rtdb.asia-southeast1.firebasedatabase.app/',
        )
        .ref('/online')
        .on('value', onGetStatus);
      const watchTime = setInterval(() => {
        setCurrentDateTime(new Date());
      }, 1000);

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
    }
  }, [isFocused]);

  const onGetStatus = snapshot => {
    setListOnline(snapshot.val());
  };
  const onResult = index => async querySnapshot => {
    if (querySnapshot.size > 0) {
      const conversationsMap = await Promise.all(
        querySnapshot.docs.map(async doc => {
          try {
            const renderId =
              doc.data().memberOne === state.userId
                ? doc.data().memberTwo
                : doc.data().memberOne;
            const res = await customerAPI.get(
              ApiConstants.GET_USER_INFORMATION + '?id=' + renderId,
            );
            const userProfile = res.data;
            return {
              ...userProfile,
              ...doc.data(),
              conversationId: doc.id,
            };
          } catch (error) {
            setErrorMessage(getErrorMessage(error));
            console.log(error);
          }
        }),
      );
      if (index === 1) {
        setListMemberOne(conversationsMap);
        console.log('conversationsMap 1:', conversationsMap);
      } else {
        setListMemberTwo(conversationsMap);
        console.log('conversationsMap 2:', conversationsMap);
      }
      console.log('setListMemberOne 1:', listMemberOne);
      console.log('setListMemberTwo 1:', listMemberTwo);
    }
    if (index === 2) {
      console.log('setFireBaseLoading(false)');
      setFireBaseLoading(false);
    }
  };

  function onError(error) {
    setFireBaseLoading(false);
    console.error('Loading conversations fail:', error);
  }

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.push('ChatScreen', {
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
          {listOnline && listOnline[item.id + ''] && (
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
              ? 'B???n ???? g???i m???t h??nh ???nh'
              : item.fullName + ' ???? g???i m???t h??nh ???nh'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <TopHeaderComponent
        navigation={navigation}
        title="Tin nh???n"
        isBackButton={false}
        statusBarColor="white"
      />
      <SafeAreaView style={{flex: 1}}>
        {firebaseLoading ? (
          <Loading />
        ) : errorMessage ? (
          <NotFound />
        ) : listMemberOne.length === 0 && listMemberTwo.length === 0 ? (
          <EmptyMessage />
        ) : (
          <FlatList
            keyExtractor={item => item.conversationId}
            data={listMemberOne
              .concat(listMemberTwo)
              .sort((a, b) => b.latestTimestamp - a.latestTimestamp)}
            scrollEnabled={true}
            renderItem={renderItem}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

export default ChatListScreen;
