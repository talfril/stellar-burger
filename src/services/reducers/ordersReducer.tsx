import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrdersApi } from '@api';
import { RootState } from '../store';

export interface OrdersState {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
  response?: any;
}

export const fetchOrdersList = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFeedsApi();
      return response;
    } catch (error) {
      console.error('ошибка получения списка заказов', error);
      return rejectWithValue('ошибка получения списка заказов');
    }
  }
);

export const fetchCurrentUserOrders = createAsyncThunk(
  'orders/fetchCurrentUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrdersApi();
      return response;
    } catch (error) {
      console.error('ошибка получения заказов текущего пользователя', error);
      return rejectWithValue('ошибка получения заказов текущего пользователя');
    }
  }
);

export const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    getOrdersStart(state) {
      state.loading = true;
      state.error = null;
    },
    getOrdersSuccess(state, action: PayloadAction<TOrder[]>) {
      state.loading = false;
      state.orders = action.payload;
    },
    getOrdersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersList.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.response = action.payload;
      })
      .addCase(fetchOrdersList.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.error);
      })
      .addCase(fetchCurrentUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.response = action.payload;
      })
      .addCase(fetchCurrentUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.error);
      });
  }
});

export const selectOrders = (state: RootState) => state.orders.orders;
export const selectTodayOrders = (state: RootState) => state.orders;
export const selectIsOrdersLoading = (state: RootState) => state.orders.loading;

export default ordersSlice.reducer;
