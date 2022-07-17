import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ApiConstants from '../../constants/Api';
import getErrorMessage from '../../utils/getErrorMessage';
import {RequestStatus} from '../../utils/util';

const initialState = {
  requests: {
    pending: null,
    approved: null,
    done: null,
    fixing: null,
    paymentWaiting: null,
    cancelled: null,
  },
  errorMessage: null,
  isLoading: false,
};

export const fetchRequests = createAsyncThunk(
  'request/fetchRequests',
  async ({customerAPI, status}, {rejectWithValue}) => {
    try {
      const response = await customerAPI.get(
        ApiConstants.GET_REQUEST_HISTORY_LIST_API,
        {
          params: {status},
        },
      );

      return {requests: response.data.requestHistories, type: status};
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

export const createRequest = createAsyncThunk(
  'request/createRequest',
  async ({customerAPI, body}, {rejectWithValue}) => {
    try {
      await customerAPI.post(
        ApiConstants.POST_REQUEST_API,
        JSON.stringify(body),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

export const cancelRequest = createAsyncThunk(
  'request/cancelRequest',
  async ({customerAPI, body}, {rejectWithValue}) => {
    try {
      await customerAPI.post(
        ApiConstants.CANCEL_REQUEST_API,
        JSON.stringify(body),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

export const confirmInvoice = createAsyncThunk(
  'request/confirmInvoice',
  async ({customerAPI, body}, {rejectWithValue}) => {
    try {
      const response = await customerAPI.post(
        ApiConstants.CONFIRM_INVOICE_API,
        JSON.stringify(body),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

export const fetchFixedService = createAsyncThunk(
  'request/fetchFixedService',
  async ({customerAPI, requestCode}, {rejectWithValue}) => {
    try {
      const response = await customerAPI.get(
        ApiConstants.GET_FIXED_SERVICE_OF_REQUEST_API,
        {
          params: {requestCode},
        },
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

export const fetchRequestDetail = createAsyncThunk(
  'request/fetchRequestDetail',
  async ({customerAPI, requestCode}, {rejectWithValue}) => {
    try {
      const response = await customerAPI.get(
        ApiConstants.GET_REQUEST_DETAIL_API,
        {
          params: {requestCode},
        },
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

export const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    setIsLoading(state) {
      state.isLoading = true;
    },
  },
  extraReducers: builder => {
    // builder.addCase(fetchRequests.pending, state => {
    //   state.isLoading = true;
    // });
    builder.addCase(fetchRequests.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
      switch (action.payload.type) {
        case RequestStatus.APPROVED:
          state.requests.approved = action.payload.requests;
          break;
        case RequestStatus.CANCELLED:
          state.requests.cancelled = action.payload.requests;
          break;
        case RequestStatus.PENDING:
          state.requests.pending = action.payload.requests;
          break;
        case RequestStatus.DONE:
          state.requests.done = action.payload.requests;
          break;
        case RequestStatus.FIXING:
          state.requests.fixing = action.payload.requests;
          break;
        case RequestStatus.PAYMENT_WAITING:
          state.requests.paymentWaiting = action.payload.requests;
          break;
        default:
          break;
      }
    });
    builder.addCase(fetchRequests.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    });

    // builder.addCase(createRequest.pending, state => {
    //   state.isLoading = true;
    // });
    builder.addCase(createRequest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(createRequest.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    });

    builder.addCase(fetchFixedService.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(fetchFixedService.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    });

    builder.addCase(confirmInvoice.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(confirmInvoice.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    });

    builder.addCase(fetchRequestDetail.fulfilled, (state, action) => {
      state.errorMessage = null;
    });
    builder.addCase(fetchRequestDetail.rejected, (state, action) => {
      state.errorMessage = action.payload;
    });
    // builder.addCase(cancelRequest.pending, state => {
    //   state.isLoading = true;
    // });
    builder.addCase(cancelRequest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(cancelRequest.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    });
  },
});

export const {setIsLoading} = requestSlice.actions;
export const selectRequests = state => state.request.requests;
export const selectErrorMessage = state => state.request.errorMessage;
export const selectIsLoading = state => state.request.isLoading;
export default requestSlice.reducer;
