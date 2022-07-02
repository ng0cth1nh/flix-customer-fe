import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import useReducer from './reducers';

// const middleware = [thunk];

export const store = createStore(useReducer, applyMiddleware(thunk));
