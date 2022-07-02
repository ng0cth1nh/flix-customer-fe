import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import requestReducer from '../features/request/requestSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    request: requestReducer,
  },
});
