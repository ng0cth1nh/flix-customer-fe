import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from '../RootNavigation';
import {useCallback} from 'react';
import constants from '../constants/Api';
import axios from 'axios';
import qs from 'qs';
import getErrorMessage from '../utils/getErrorMessage';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {
        ...state,
        errorMessage: action.payload.message,
        errorCode: action.payload.code,
        loading: false,
      };
    case 'login':
      return {
        errorMessage: '',
        token: action.payload.token,
        userId: action.payload.userId,
        loading: false,
      };
    case 'clear_error_message':
      return {...state, errorMessage: '', errorCode: '', loading: false};
    case 'show_loader':
      return {...state, loading: true};
    case 'add_is_change_pass_success':
      return {...state, isChangePassSuccess: true};
    case 'clear_is_change_pass_success':
      return {...state, isChangePassSuccess: false};
    case 'hide_loader':
      return {...state, loading: false};
    case 'add_temp_access_token':
      return {...state, tempAccessToken: action.payload};
    case 'clear_temp_access_token':
      return {...state, tempAccessToken: null};
    case 'logout':
      return {
        token: null,
        userId: null,
        errorMessage: '',
        errorCode: '',
        loading: false,
      };
    default:
      return state;
  }
};
const clearErrorMessage = dispatch => {
  return () => dispatch({type: 'clear_error_message'});
};
const showLoader = dispatch => {
  return () => dispatch({type: 'show_loader'});
};

const clearIsChangePassSuccess = dispatch => {
  return () => dispatch({type: 'clear_is_change_pass_success'});
};

const TryLocalLogin = dispatch =>
  useCallback(async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const user = jwt_decode(token);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
      if (!isExpired) {
        dispatch({type: 'login', payload: {token, userId: user.userId}});
      } else {
        await refreshToken();
      }
    }
  }, [dispatch]);

const sendOTPForgotPassword = dispatch => async params => {
  try {
    await axios.post(constants.SEND_OTP_FORGOT_PASSWORD_API, {
      phone: params.phone,
      roleType: params.roleType,
    });
    RootNavigation.push('ConfirmOTPScreen', params);
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: {
        message: getErrorMessage(err),
        code: err.response.data.message,
      },
    });
  } finally {
    dispatch({type: 'hide_loader'});
  }
};
const reSendOTPForgotPassword = dispatch => async params => {
  try {
    await axios.post(constants.SEND_OTP_FORGOT_PASSWORD_API, {
      phone: params.phone,
    });
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: {
        message: getErrorMessage(err),
        code: err.response.data.message,
      },
    });
  } finally {
    dispatch({type: 'hide_loader'});
  }
};

const confirmOTPForgotPassword = dispatch => async params => {
  try {
    const response = await axios.post(
      constants.CONFIRM_OTP_FORGOT_PASSWORD_API,
      JSON.stringify({phone: params.phone, otp: params.otp}),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log(response.data);
    await dispatch({
      type: 'add_temp_access_token',
      payload: response.data.accessToken,
    });
    RootNavigation.push('ForgotPassScreen');
  } catch (err) {
    if (err.response.data.message !== 'INVALID_OTP') {
      RootNavigation.goBack();
    }
    dispatch({
      type: 'add_error',
      payload: {
        message: getErrorMessage(err),
        code: err.response.data.message,
      },
    });
  } finally {
    dispatch({type: 'hide_loader'});
  }
};

const resetPassword = dispatch => async params => {
  try {
    const response = await axios.put(
      constants.RESET_PASSWORD_API,
      JSON.stringify({newPassword: params.newPassword}),
      {
        headers: {
          Authorization: `Bearer ${params.tempAccessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log(response.data);
    await dispatch({
      type: 'clear_temp_access_token',
    });
    await dispatch({type: 'add_is_change_pass_success'});
    RootNavigation.push('LoginScreen');
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: {
        message: getErrorMessage(err),
        code: err.response.data.message,
      },
    });
  } finally {
    dispatch({type: 'hide_loader'});
  }
};

const register = dispatch => async params => {
  try {
    await axios.post(constants.SEND_OTP_API, {phone: params.phone});
    RootNavigation.push('ConfirmOTPScreen', params);
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: {
        message: getErrorMessage(err),
        code: err.response.data.message,
      },
    });
  } finally {
    dispatch({type: 'hide_loader'});
  }
};

const reRegister = dispatch => async params => {
  try {
    await axios.post(constants.SEND_OTP_API, {phone: params.phone});
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: {
        message: getErrorMessage(err),
        code: err.response.data.message,
      },
    });
  } finally {
    dispatch({type: 'hide_loader'});
  }
};

const confirmOTP = dispatch => async params => {
  console.log(params);
  const formData = new FormData();
  formData.append('phone', params.phone);
  formData.append('otp', params.otp);
  if (params.avatar) {
    formData.append('avatar', {
      uri: params.avatar.path,
      type: params.avatar.mime,
      name: params.avatar.path.split('\\').pop().split('/').pop(),
    });
  }
  formData.append('fullName', params.fullName);
  formData.append('password', params.password);
  formData.append('communeId', params.communeId);
  formData.append('streetAddress', params.streetAddress);
  formData.append('roleType', 'ROLE_CUSTOMER');
  try {
    console.log('formData: ', formData);
    const res = await axios.post(constants.CONFIRM_OTP_API, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    await AsyncStorage.setItem('token', res.data.accessToken);
    await AsyncStorage.setItem('refreshToken', res.data.refreshToken);
    dispatch({
      type: 'login',
      payload: {
        token: res.data.accessToken,
        userId: jwt_decode(res.data.accessToken).userId,
      },
    });
  } catch (err) {
    if (err.response.data.message !== 'INVALID_OTP') {
      RootNavigation.goBack();
    }
    dispatch({
      type: 'add_error',
      payload: {
        message: getErrorMessage(err),
        code: err.response.data.message,
      },
    });
  } finally {
    dispatch({type: 'hide_loader'});
  }
};

const refreshToken = dispatch => async () => {
  try {
    console.log('run refresh token');
    const refresh_token = await AsyncStorage.getItem('refreshToken');
    if (!refresh_token) {
      throw new Error();
    }
    const response = await axios.get(constants.REFRESH_TOKEN_API, {
      headers: {
        Authorization: `Bearer ${refresh_token}`,
      },
    });
    console.log('response refresh token: \n' + response);
    await AsyncStorage.setItem('token', response.data.accessToken);
    await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
    dispatch({
      type: 'login',
      payload: {
        token: response.data.accessToken,
        userId: jwt_decode(response.data.accessToken).userId,
      },
    });
  } catch (err) {
    console.log(err.toString());
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('refreshToken');
    dispatch({type: 'logout'});
  }
};
const login = dispatch => async params => {
  try {
    const response = await axios.post(
      constants.LOGIN_API,
      qs.stringify(params),
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    await AsyncStorage.setItem('token', response.data.accessToken);
    await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
    dispatch({
      type: 'login',
      payload: {
        token: response.data.accessToken,
        userId: jwt_decode(response.data.accessToken).userId,
      },
    });
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: {
        message: getErrorMessage(err),
        code: err.response.data.message,
      },
    });
    console.log(err.toString());
  }
};
const logout = dispatch => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({type: 'logout'});
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {
    login,
    showLoader,
    register,
    logout,
    clearErrorMessage,
    TryLocalLogin,
    refreshToken,
    confirmOTP,
    reRegister,
    sendOTPForgotPassword,
    confirmOTPForgotPassword,
    reSendOTPForgotPassword,
    resetPassword,
    clearIsChangePassSuccess,
  },
  {token: null, errorMessage: '', userId: null, loading: false},
);
