import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TIngredient, TOrder } from '@utils-types';
import { orderBurgerApi } from '@api';
import { getCookie } from 'src/utils/cookie';

export interface NewOrderState {
  bun: TIngredient | null;
  selectedIngredients: TIngredient[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

export const initialState: NewOrderState = {
  bun: null,
  selectedIngredients: [],
  orderRequest: false,
  orderModalData: null
};

type NewOrderAPIResponse = {
  order: TOrder;
  name: string;
};

export const addNewOrder = createAsyncThunk<NewOrderAPIResponse, string[]>(
  'newOrder/createNewOrder',
  async (preparedData, { dispatch }) => {
    try {
      dispatch(setOrderRequest(true));
      const newOrder = await orderBurgerApi(preparedData);
      return newOrder;
    } catch (error) {
      throw error;
    } finally {
      dispatch(setOrderRequest(false));
    }
  }
);

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    resetOrder(state) {
      state.bun = null;
      state.selectedIngredients = [];
      state.orderModalData = null;
    },
    setOrderRequest(state, action) {
      state.orderRequest = action.payload;
    },
    setOrderModalData(state, action) {
      state.orderModalData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addNewOrder.fulfilled, (state, action) => {
      state.orderModalData = action.payload.order;
      state.orderRequest = false;
    });
  }
});

export const { resetOrder, setOrderRequest, setOrderModalData } =
  newOrderSlice.actions;

export const selectIngredients = (state: RootState) =>
  state.newOrder.selectedIngredients;

export const selectNewOrderRequest = (state: RootState) =>
  state.newOrder.orderRequest;

export const selectNewOrderModalData = (state: RootState) =>
  state.newOrder.orderModalData;

export default newOrderSlice.reducer;
