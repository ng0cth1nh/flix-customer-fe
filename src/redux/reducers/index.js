import {combineReducers} from 'redux';
import userInfo from './user';
import requestInfo from './request';

const Reducers = combineReducers({
  userInfo,
  requestInfo,
});

export default (state, action) => Reducers(state, action);
