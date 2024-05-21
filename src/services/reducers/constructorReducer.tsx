import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';
import { TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

export interface ConstructorState {
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
        payload: { ...ingredient, id: uuidv4() }
      })
    },
    removeFromConstructor: (state, action: PayloadAction<string>) => {
      const index = state.ingredients.findIndex(
        (ingredient) => ingredient._id === action.payload
      );

      if (index !== -1) {
        state.ingredients.splice(index, 1);
      }
    },
    changeIngredientsPlaces: (
      state,
      action: PayloadAction<{ index: number; direction: 'up' | 'down' }>
    ) => {
      const { index, direction } = action.payload;
      if (direction === 'up' && index > 0) {
        [state.ingredients[index], state.ingredients[index - 1]] = [
          state.ingredients[index - 1],
          state.ingredients[index]
        ];
      } else if (direction === 'down' && index < state.ingredients.length - 1) {
        [state.ingredients[index], state.ingredients[index + 1]] = [
          state.ingredients[index + 1],
          state.ingredients[index]
        ];
      }
    },
    resetConstructorItems: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    selectConstructorItems: (state: ConstructorState) => state.ingredients,
    selectBurgerConstructor: (state: ConstructorState) => state.constructor
  }
});

export const selectorConstructor = constructorSlice.selectors;
export const {
  addToConstructor,
  removeFromConstructor,
  changeIngredientsPlaces,
  resetConstructorItems
} = constructorSlice.actions;
