import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Context as AuthContext} from '../context/AuthContext';
import {useContext} from 'react';

const instance = axios.create({
  baseURL: 'https://flix-lj7prqscta-as.a.run.app/api/v1',
});

instance.interceptors.request.use(async req => {
  let token = await AsyncStorage.getItem('token');
  if (token) {
    const user = jwt_decode(token);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    console.log('isExpired: ' + isExpired);
    if (!isExpired) {
      return req;
    }
    const {refreshToken} = useContext(AuthContext);
    console.log(refreshToken);
    await refreshToken();
  }

  return req;
});

//1800000

instance.interceptors.request.use(
  async config => {
    let token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);
export default instance;
