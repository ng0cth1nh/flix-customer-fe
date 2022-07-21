import {firebase} from '@react-native-firebase/database';
export const getUserOnlineStatus = userId => {
  return firebase
    .app()
    .database(
      'https://flix-cb844-default-rtdb.asia-southeast1.firebasedatabase.app/',
    )
    .ref(`/online/${userId}`)
    .once('value')
    .then(snapshot => {
      return snapshot.val();
    });
};
