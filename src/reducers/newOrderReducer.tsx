import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../services/store';
import { TIngredient } from '@utils-types';

interface NewOrderState {
  bun: TIngredient | null;
  selectedIngredients: TIngredient[];
}

const initialState: NewOrderState = {
  bun: null,
  selectedIngredients: []
};

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    addBun(state, action: PayloadAction<TIngredient>) {
      state.bun = action.payload;
    },
    addIngredient(state, action: PayloadAction<TIngredient>) {
      state.selectedIngredients.push(action.payload);
    },
    resetOrder(state) {
      state.bun = null;
      state.selectedIngredients = [];
    }
  }
});

export const { addBun, addIngredient, resetOrder } = newOrderSlice.actions;

export const selectIngredients = (state: RootState) =>
  state.newOrder.selectedIngredients;

export default newOrderSlice.reducer;
