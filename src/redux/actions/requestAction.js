import ApiConstants from '../../constants/Api';
import {
  SET_PENDING_REQUEST,
  SET_APPROVED_REQUEST,
  SET_CANCELLED_REQUEST,
  SET_FIXING_REQUEST,
  SET_DONE_REQUEST,
  SET_PAYMENT_WAITING_REQUEST,
  SET_LOADING,
  ADD_ERROR,
} from '../constants';
import getErrorMessage from '../../utils/getErrorMessage';
import {RequestStatus} from '../../utils/util';
import Toast from 'react-native-toast-message';

export function fetchRequest(customerAPI, status) {
  return async dispatch => {
    try {
      const response = await customerAPI.get(
        ApiConstants.GET_REQUEST_HISTORY_LIST_API,
        {
          params: {status},
        },
      );
      console.log('response:\n' + response.data);
      dispatch({
        type:
          RequestStatus.PENDING === status
            ? SET_PENDING_REQUEST
            : RequestStatus.APPROVED === status
            ? SET_APPROVED_REQUEST
            : RequestStatus.CANCELLED === status
            ? SET_CANCELLED_REQUEST
            : RequestStatus.FIXING === status
            ? SET_FIXING_REQUEST
            : RequestStatus.DONE === status
            ? SET_DONE_REQUEST
            : SET_PAYMENT_WAITING_REQUEST,
        payload: response.data.requestHistories,
      });
    } catch (err) {
      console.log(err.toString());
    }
  };
}

export function setLoading() {
  return async dispatch => {
    dispatch({
      type: SET_LOADING,
    });
  };
}

export function cancelRequest(customerAPI, requestCode, reason) {
  return async dispatch => {
    try {
      const body = {
        requestCode,
        reason,
      };
      const response = await customerAPI.post(
        ApiConstants.CANCEL_REQUEST_API,
        JSON.stringify(body),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (err) {
      console.log(err.toString());
      dispatch({
        type: ADD_ERROR,
        payload: getErrorMessage(err),
      });
    }
  };
}

export function createRequest(customerAPI, body) {
  return async dispatch => {
    try {
      const response = await customerAPI.post(
        ApiConstants.POST_REQUEST_API,
        JSON.stringify(body),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (err) {
      //console.log(err.response.data.message);
      dispatch({
        type: ADD_ERROR,
        payload: getErrorMessage(err),
      });
    }
  };
}
