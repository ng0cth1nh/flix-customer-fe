import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ApiConstants from '../../constants/Api';
import getErrorMessage from '../../utils/getErrorMessage';

const initialState = {
  user: {
    avatarUrl: null,
    fullName: null,
    email: null,
    phone: null,
    dateOfBirth: null,
    gender: null,
  },
  errorMessage: null,
  isLoading: false,
  addresses: null,
  notifications: [],
  totalPageNotifications: null,
  pageNumbers: 0,
  numberOfUnread: 0,
};

export const fetchProfile = createAsyncThunk(
  'user/fetchProfile',
  async (customerAPI, {rejectWithValue}) => {
    try {
      const response = await customerAPI.get(ApiConstants.PROFILE_INFO_API);
      return response.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

export const fetchComments = createAsyncThunk(
  'user/fetchComments',
  async ({customerAPI, repairerId, offset, limit}, {rejectWithValue}) => {
    try {
      const response = await customerAPI.get(
        ApiConstants.GET_REPAIRER_COMMENT_API,
        {
          params: {repairerId, offset, limit},
        },
      );
      return response.data.repairerComments;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

export const fetchNotifications = createAsyncThunk(
  'user/fetchNotifications',
  async ({customerAPI, pageNumber, pageSize}, {rejectWithValue}) => {
    try {
      const response = await customerAPI.get(
        ApiConstants.GET_NOTIFICATIONS_API,
        {
          params: {pageNumber, pageSize},
        },
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

export const fetchAccessories = createAsyncThunk(
  'user/fetchAccessories',
  async ({customerAPI, pageNumber, pageSize}, {rejectWithValue}) => {
    try {
      const response = await customerAPI.get(ApiConstants.GET_ACCESSORIES_API, {
        params: {pageNumber, pageSize},
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

export const deleteNotification = createAsyncThunk(
  'user/deleteNotification',
  async ({customerAPI, id}, {rejectWithValue}) => {
    try {
      const response = await customerAPI.delete(ApiConstants.NOTIFICATION_API, {
        params: {id},
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

export const markReadNotification = createAsyncThunk(
  'user/markReadNotification',
  async ({customerAPI, body}, {rejectWithValue}) => {
    try {
      const response = await customerAPI.put(
        ApiConstants.NOTIFICATION_API,
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

export const fetchAddresses = createAsyncThunk(
  'user/fetchAddresses',
  async (customerAPI, {rejectWithValue}) => {
    try {
      const response = await customerAPI.get(ApiConstants.GET_ADDRESS_LIST_API);
      return response.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async ({customerAPI, body}, {rejectWithValue}) => {
    try {
      await customerAPI.put(
        ApiConstants.PROFILE_INFO_API,
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

export const addAddress = createAsyncThunk(
  'user/addAddress',
  async ({customerAPI, body}, {rejectWithValue}) => {
    try {
      await customerAPI.post(
        ApiConstants.POST_ADDRESS_API,
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
export const sendFeedback = createAsyncThunk(
  'user/sendFeedback',
  async ({customerAPI, body}, {rejectWithValue}) => {
    try {
      console.log(body);
      const formData = new FormData();
      formData.append('feedbackType', body.feedbackType);
      formData.append('title', body.title);
      formData.append('description', body.description);
      body.requestCode && formData.append('requestCode', body.requestCode);
      if (body.images) {
        for (let image of body.images) {
          formData.append('images[]', {
            uri: image.path,
            type: image.mime,
            name: image.path.split('\\').pop().split('/').pop(),
          });
        }
      }
      await customerAPI.post(ApiConstants.POST_FEEDBACK_API, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

export const updateAddress = createAsyncThunk(
  'user/updateAddress',
  async ({customerAPI, body}, {rejectWithValue}) => {
    try {
      await customerAPI.put(
        ApiConstants.POST_ADDRESS_API,
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

export const updateMainAddress = createAsyncThunk(
  'user/updateMainAddress',
  async ({customerAPI, body}, {rejectWithValue}) => {
    try {
      await customerAPI.put(
        ApiConstants.GET_MAIN_ADDRESS_API,
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

export const deleteAddress = createAsyncThunk(
  'user/deleteAddress',
  async ({customerAPI, addressId}, {rejectWithValue}) => {
    try {
      await customerAPI.delete(ApiConstants.POST_ADDRESS_API, {
        params: {addressId},
      });
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

export const updateAvatar = createAsyncThunk(
  'user/updateAvatar',
  async ({customerAPI, avatar}, {rejectWithValue}) => {
    try {
      console.log('avatar:' + avatar);
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
      await customerAPI.put(ApiConstants.UPDATE_PROFILE_AVATAR_API, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLoading(state) {
      state.isLoading = true;
    },
    setNotifications(state, action) {
      state.notifications = action.payload;
    },
    setPageNumbers(state, action) {
      state.pageNumbers = action.payload;
    },
    setTotalPageNotifications(state, action) {
      state.totalPageNotifications = action.payload;
    },
    setNumberOfUnread(state, action) {
      state.numberOfUnread = action.payload;
    },
    resetState: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(fetchProfile.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
      state.user = {
        ...action.payload,
        dateOfBirth:
          action.payload.dateOfBirth !== null
            ? action.payload.dateOfBirth.replace(/-/g, '/')
            : null,
      };
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    });

    builder.addCase(updateProfile.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    });

    builder.addCase(fetchAddresses.fulfilled, (state, action) => {
      state.isLoading = false;
      state.addresses = action.payload.addresses;
      state.errorMessage = null;
    });
    builder.addCase(fetchAddresses.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    });

    builder.addCase(addAddress.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(addAddress.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    });
    builder.addCase(sendFeedback.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(sendFeedback.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    });
    builder.addCase(updateAddress.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(updateAddress.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    });
    builder.addCase(updateMainAddress.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(updateMainAddress.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    });
    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(deleteAddress.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    });

    builder.addCase(updateAvatar.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(updateAvatar.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(updateAvatar.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    });
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(fetchNotifications.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    });
    builder.addCase(fetchAccessories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(fetchAccessories.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    });
    builder.addCase(deleteNotification.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(deleteNotification.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    });
    builder.addCase(markReadNotification.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(markReadNotification.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    });
  },
});

export const {
  setIsLoading,
  setNotifications,
  setPageNumbers,
  setTotalPageNotifications,
  setNumberOfUnread,
  resetState,
} = userSlice.actions;
export const selectUser = state => state.user.user;
export const selectAddresses = state => state.user.addresses;
export const selectNotifications = state => state.user.notifications;
export const selectNumberOfUnread = state => state.user.numberOfUnread;
export const selectTotalPageNotifications = state =>
  state.user.totalPageNotifications;
export const selectPageNumbers = state => state.user.pageNumbers;
export const selectErrorMessage = state => state.user.errorMessage;
export const selectIsLoading = state => state.user.isLoading;
export default userSlice.reducer;
