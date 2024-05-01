import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected
} from '@reduxjs/toolkit';
import { StatusRequest } from '@utils-types';
import {
  registerUserApi,
  loginUserApi,
  logoutApi,
  getUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi,
  refreshToken,
  resetPasswordApi
} from '@api';
import { RootState } from '../store';
import { setCookie, deleteCookie } from '../../utils/cookie';
import {} from '@reduxjs/toolkit';

export const sliceName = 'user';

export type UserDto = {
  email: string;
  name: string;
};

export interface TUserState {
  isAuth: boolean;
  data: UserDto | null;
  statusRequest: StatusRequest;
  error?: string | null | undefined;
}

const initialState: TUserState = {
  isAuth: false,
  data: null,
  statusRequest: StatusRequest.Idle,
  error: null
};

export const userSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isAuth = true;
    },
    logout: (state) => {
      state.isAuth = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusRequest = StatusRequest.Success;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusRequest = StatusRequest.Success;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusRequest = StatusRequest.Success;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuth = false;
        state.data = null;
        state.statusRequest = StatusRequest.Idle;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addMatcher(isPending, (state) => {
        state.statusRequest = StatusRequest.Loading;
      })
      .addMatcher(isRejected, (state) => {
        state.statusRequest = StatusRequest.Failed;
      });
  }
});

export const checkUserAuth = createAsyncThunk<UserDto, void>(
  `${sliceName}/checkUserAuth`,
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const data = await getUserApi();
      return data.user;
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      dispatch(authCheck());
    }
  }
);

export const registerUser = createAsyncThunk<UserDto, TRegisterData>(
  `${sliceName}/registerUser`,
  async (dataUser, { rejectWithValue }) => {
    try {
      const data = await registerUserApi(dataUser);
      if (!data?.success) {
        return rejectWithValue(data);
      }
      setCookie('accessToken', data.accessToken);
      setCookie('refreshToken', data.refreshToken);
      return data.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk<UserDto, TLoginData>(
  `${sliceName}/loginUser`,
  async (dataUser, { rejectWithValue }) => {
    try {
      const data = await loginUserApi(dataUser);
      if (!data?.success) {
        return rejectWithValue(data);
      }
      setCookie('accessToken', data.accessToken);
      setCookie('refreshToken', data.refreshToken);
      return data.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk<UserDto, Partial<UserDto>>(
  `${sliceName}/updateUser`,
  async (userData, { rejectWithValue }) => {
    try {
      const data = await updateUserApi(userData);
      return data.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk<void, void>(
  `${sliceName}/logoutUser`,
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await logoutApi();
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      dispatch(logout());
    }
  }
);

export const resetPassword = createAsyncThunk<
  void,
  { password: string; token: string }
>('user/resetPassword', async ({ password, token }, { rejectWithValue }) => {
  try {
    await resetPasswordApi({ password, token });
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const { authCheck, logout } = userSlice.actions;

export default userSlice.reducer;

export const getUser = (state: RootState) => state.user.data;

export const getIsAuthChecked = (state: RootState) =>
  state.user.statusRequest !== StatusRequest.Idle;

export const getRegisteredUser = (state: RootState) => state.user.data;

export const getLoggedInUser = (state: RootState) => {
  const user = state.user.data;
  const isAuth = state.user.isAuth;

  return isAuth ? user : null;
};
