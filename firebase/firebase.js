import {initializeApp} from 'firebase/app';
//ref = reference to a "collection"
import {
  getDatabase,
  ref as firebaseDatabaseRef,
  set as firebaseSet,
  child,
  get,
  onValue,
  push,
} from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAxbApHPOF0Vfuzs8EsbCNYcrPz8Z4ao1M',
  authDomain: 'flix-cb844.firebaseapp.com',
  databaseURL:
    'https://flix-cb844-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'flix-cb844',
  storageBucket: 'flix-cb844.appspot.com',
  appId: '1:1004338245468:android:cc0d265fc54c72b1671b99',
  messagingSenderId: '1004338245468',
};
const app = initializeApp(firebaseConfig);
const firebaseDatabase = getDatabase(app);
export {
  firebaseDatabase,
  firebaseSet,
  firebaseDatabaseRef,
  child,
  get,
  onValue,
  push,
};
