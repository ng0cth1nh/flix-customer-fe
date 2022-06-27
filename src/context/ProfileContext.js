import createDataContext from './createDataContext';
import ApiConstants from '../constants/Api';
import getErrorMessage from '../utils/getErrorMessage';
import useAxios from '../hooks/useAxios';

function profileReducer(state, action) {
  switch (action.type) {
    case 'get_profile':
      return {...state, ...action.payload};
    case 'update_profile':
      return {...state, ...action.payload};
    case 'add_error':
      return {...state, errorMessage: action.payload};
    default:
      return state;
  }
}

function getProfile(dispatch) {
  let customerAPI = useAxios();
  return async params => {
    try {
      const response = await customerAPI.get(ApiConstants.PROFILE_INFO_API);
      dispatch({
        type: 'get_profile',
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
      dispatch({
        type: 'add_error',
        payload: getErrorMessage(err),
      });
    }
  };
}

function updateProfile(dispatch) {
  let customerAPI = useAxios();
  return async (fullName, dateOfBirth, gender, email) => {
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
      dispatch({
        type: 'add_error',
        payload: getErrorMessage(err),
      });
    }
  };
}

function updateAvatar(dispatch) {
  let customerAPI = useAxios();
  return async avatar => {
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
    try {
      const res = await customerAPI.put(
        ApiConstants.UPDATE_PROFILE_AVATAR_API,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
    } catch (err) {
      dispatch({
        type: 'add_error',
        payload: getErrorMessage(err),
      });
    }
  };
}

export const {Provider, Context} = createDataContext(
  profileReducer,
  {
    getProfile,
    updateProfile,
    updateAvatar,
  },
  [],
);
