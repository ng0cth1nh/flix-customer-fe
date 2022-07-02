import {SET_USER_INFO, ADD_ERROR} from '../constants';
const initialState = {
  avatarUrl: null,
  fullName: null,
  email: null,
  phone: null,
  dateOfBirth: null,
  errorMessage: null,
  gender: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...action.payload,
        errorMessage: null,
      };
    case ADD_ERROR:
      return {...state, errorMessage: action.payload};
    default:
      return state;
  }
};

export default userReducer;
