import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../services/store';
import { TConstructorIngredient } from '@utils-types';
import { TOrder, TIngredient } from '@utils-types';

interface ConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addToConstructor: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: crypto.randomUUID() }
      })
    }
  },
  selectors: {
    selectConstructorItems: (state: ConstructorState) => state.ingredients,
    selectBurgerConstructor: (state: ConstructorState) => state.constructor
  }
});

export const selectorConstructor = constructorSlice.selectors;
export const { addToConstructor } = constructorSlice.actions;
