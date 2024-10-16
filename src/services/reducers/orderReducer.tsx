import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TOrder } from '@utils-types';
import { getOrderByNumberApi } from '@api';

export interface OrderState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

export const initialState: OrderState = {
  orderRequest: false,
  orderModalData: null
};

export const getOrderData = createAsyncThunk<TOrder, number>(
  'order/getOrderData',
  async (orderNumber) => {
    const data = await getOrderByNumberApi(orderNumber);
    const order = data.orders.find((order) => order.number === orderNumber);
    if (!order) {
      throw new Error(`Order with number ${orderNumber} not found`);
    }
    return order;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderRequest(state, action: PayloadAction<boolean>) {
      state.orderRequest = action.payload;
    },
    setOrderModalData(state, action: PayloadAction<TOrder | null>) {
      state.orderModalData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderData.fulfilled, (state, action) => {
      state.orderModalData = action.payload;
    });
  }
});

export const { setOrderRequest, setOrderModalData } = orderSlice.actions;

export const selectOrderRequest = (state: RootState) =>
  state.order.orderRequest;

export const selectOrderModalData = (state: RootState) =>
  state.order.orderModalData;

export default orderSlice.reducer;
