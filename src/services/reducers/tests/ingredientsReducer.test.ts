import { expect, test } from '@jest/globals';
import {
  ingredientsSlice,
  getIngredientsFailure,
  getIngredientsStart,
  getIngredientsSuccess,
  initialState
} from '../ingredientsReducer';
import { testIngredientsList } from './forTestData';

describe('тесты редьюсера ingredients', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const testError = 'Ошибка получения списка ингредиентов';

  test('При вызове экшена Request булевая переменная меняется на true', () => {
    const expectedState = {
      ingredients: [],
      loading: true,
      error: null
    };
    const action = getIngredientsStart();
    const testState = ingredientsSlice.reducer(initialState, action);
    expect(expectedState).toEqual(testState);
  });

  test('При вызове экшена Success и передаче в него ингредиентов эти данные записываются в стор и store.isLoading меняется на false', () => {
    const expectedState = {
      ingredients: testIngredientsList,
      loading: false,
      error: null
    };

    const action = getIngredientsSuccess(testIngredientsList);
    const testState = ingredientsSlice.reducer(initialState, action);
    expect(expectedState).toEqual(testState);
  });

  test('При вызове экшена Failed и передаче в него ошибки она записывается в стор  и store.isLoading меняется на false', () => {
    const expectedState = {
      ingredients: [],
      loading: false,
      error: testError
    };

    const action = getIngredientsFailure(testError);
    const testState = ingredientsSlice.reducer(initialState, action);
    expect(expectedState).toEqual(testState);
  });
});
