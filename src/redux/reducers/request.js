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
const initialState = {
  pendingRequests: null,
  approvedRequests: null,
  doneRequests: null,
  fixingRequests: null,
  paymentWaitingRequests: null,
  cancelledRequests: null,
  errorMessage: '',
  isLoading: false,
};

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PENDING_REQUEST:
      return {
        ...state,
        pendingRequests: action.payload,
        isLoading: false,
        errorMessage: '',
      };
    case SET_APPROVED_REQUEST:
      return {
        ...state,
        approvedRequests: action.payload,
        isLoading: false,
        errorMessage: '',
      };
    case SET_CANCELLED_REQUEST:
      return {
        ...state,
        cancelledRequests: action.payload,
        isLoading: false,
        errorMessage: '',
      };
    case SET_DONE_REQUEST:
      return {
        ...state,
        doneRequests: action.payload,
        isLoading: false,
        errorMessage: '',
      };
    case SET_FIXING_REQUEST:
      return {
        ...state,
        fixingRequests: action.payload,
        isLoading: false,
        errorMessage: '',
      };
    case SET_PAYMENT_WAITING_REQUEST:
      return {
        ...state,
        paymentWaitingRequests: action.payload,
        isLoading: false,
        errorMessage: '',
      };
    case ADD_ERROR:
      return {...state, errorMessage: action.payload, isLoading: false};
    case SET_LOADING:
      return {...state, isLoading: true};
    default:
      return {...state, isLoading: false};
  }
};

export default requestReducer;
