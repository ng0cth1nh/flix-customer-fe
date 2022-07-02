import ApiConstants from '../../constants/Api';
import Toast from 'react-native-toast-message';
import {
  SET_USER_INFO,
  UPDATE_USER_INFO,
  ADD_ERROR,
  UPDATE_USER_AVATAR,
} from '../constants';
import getErrorMessage from '../../utils/getErrorMessage';

export function fetchUserInfo(customerAPI) {
  return async dispatch => {
    try {
      const response = await customerAPI.get(ApiConstants.PROFILE_INFO_API);
      console.log('response:\n' + response.data);
      dispatch({
        type: SET_USER_INFO,
        payload: {
          ...response.data,
          dateOfBirth:
            response.data.dateOfBirth !== null
              ? response.data.dateOfBirth.replace(/-/g, '/')
              : null,
        },
      });
    } catch (err) {
      console.log(err.toString());
    }
  };
}
export function updateUserInfo(
  customerAPI,
  fullName,
  dateOfBirth,
  gender,
  email,
) {
  return async dispatch => {
    try {
      const body = {
        fullName,
        dateOfBirth,
        gender,
        email,
      };
      const response = await customerAPI.put(
        ApiConstants.PROFILE_INFO_API,
        JSON.stringify(body),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (err) {
      console.log(err.toString());
    }
  };
}
export function updateAvatar(customerAPI, avatar) {
  return async dispatch => {
    try {
      const formData = new FormData();
      formData.append(
        'avatar',
        avatar
          ? {
              uri: avatar.path,
              type: avatar.mime,
              name: avatar.path.split('\\').pop().split('/').pop(),
            }
          : avatar,
      );
      const response = await customerAPI.put(
        ApiConstants.UPDATE_PROFILE_AVATAR_API,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
    } catch (err) {
      console.log(err.toString());
    }
  };
}
