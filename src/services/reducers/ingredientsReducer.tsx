import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { RootState } from '../store';

export interface IngredientsState {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
}

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getIngredientsApi();
      return response;
    } catch (error) {
      console.error('ошибка получения списка ингридиентов', error);
      return rejectWithValue('ошибка получения списка ингридиентов');
    }
  }
);

const initialState: IngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    getIngredientsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getIngredientsSuccess(state, action: PayloadAction<TIngredient[]>) {
      state.loading = false;
      state.ingredients = action.payload;
    },
    getIngredientsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.error);
      });
  }
});

export const {
  getIngredientsStart,
  getIngredientsSuccess,
  getIngredientsFailure
} = ingredientsSlice.actions;

export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;
export const selectIsIngredientsLoading = (state: RootState) =>
  state.ingredients.loading;

export default ingredientsSlice.reducer;
