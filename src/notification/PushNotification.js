import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}
async function getFcmToken() {
  let fcmToken = await AsyncStorage.getItem('fcmtoken');
  if (!fcmToken) {
    try {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmtoken', fcmToken);
      } else {
        console.log('get Token fail');
      }
    } catch (error) {
      console.log(error, 'error in fcmtoken');
    }
  }
}
export const notificationListener = (
  setIsNotiReceived,
  setNotificationType,
) => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open
  PushNotification.createChannel(
    {
      channelId: 'flix-cb844-customer',
      channelName: 'flix-customer-notification',
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    },
    created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });
  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
  messaging().onMessage(async remoteMessage => {
    console.log('notification on foreround', remoteMessage);
    console.log(
      'notification on foreround',
      remoteMessage.data.notificationType,
    );
    setNotificationType(remoteMessage.data.notificationType);
    setIsNotiReceived(true);
    PushNotification.localNotification({
      channelId: 'flix-cb844-customer',
      message: remoteMessage.notification.body,
      title: remoteMessage.notification.title,
      largeIconUrl: remoteMessage.notification.android.imageUrl,
    });
  });
};
