import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../services/store';
import { TConstructorIngredient } from '@utils-types';
import { TOrder } from '@utils-types';

interface ConstructorItemsState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorItemsState = {
  bun: null,
  ingredients: []
};

const constructorItemsSlice = createSlice({
  name: 'constructorItems',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TConstructorIngredient | null>) {
      state.bun = action.payload;
    },
    setIngredients(state, action: PayloadAction<TConstructorIngredient[]>) {
      state.ingredients = action.payload;
    }
  }
});

const constructorSlice = createSlice({
  name: 'constructor',
  initialState: { burgerConstructor: null },
  reducers: {
    setBurgerConstructor(state, action: PayloadAction<any>) {
      state.burgerConstructor = action.payload;
    }
  }
});

export const { setBurgerConstructor } = constructorSlice.actions;
export const selectBurgerConstructor = (state: RootState) => state.constructor;

export const { setBun, setIngredients } = constructorItemsSlice.actions;

export const selectConstructorItems = (state: RootState) =>
  state.constructorItems;

export default constructorItemsSlice.reducer;
