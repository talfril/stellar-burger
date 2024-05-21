import {
  constructorSlice,
  addToConstructor,
  removeFromConstructor,
  ConstructorState,
  changeIngredientsPlaces
} from '../constructorReducer';
import { expect, test } from '@jest/globals';
import { testIngredientsWithId, testIngredientsWithoutId } from './forTestData';

const { reducer } = constructorSlice;

describe('тесты редьюсера слайса constructor', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('обработка экшена добавления ингредиента', () => {
    const initialState: ConstructorState = {
      bun: null,
      ingredients: []
    };

    const testStateWithBun = reducer(
      initialState,
      addToConstructor(testIngredientsWithoutId[0])
    );

    expect(testStateWithBun.bun).toMatchObject(testIngredientsWithoutId[0]);
    expect(testStateWithBun.ingredients).toHaveLength(0);

    const testStateWithIngredient = reducer(
      initialState,
      addToConstructor(testIngredientsWithoutId[1])
    );

    expect(testStateWithIngredient.ingredients[0]).toMatchObject(
      testIngredientsWithoutId[1]
    );
    expect(testStateWithIngredient.bun).toBeNull();
  });

  test('обработка экшена удаления ингредиента', () => {
    const initialState: ConstructorState = {
      bun: testIngredientsWithId[0],
      ingredients: [testIngredientsWithId[1], testIngredientsWithId[2]]
    };
    const testStateDelete = reducer(
      initialState,
      removeFromConstructor(testIngredientsWithId[1]._id)
    );
    expect(testStateDelete.ingredients).toHaveLength(1);
    expect(testStateDelete.bun).toEqual(initialState.bun);
  });

  test('обработка экшена изменения порядка ингредиентов', () => {
    const expectedState: ConstructorState = {
      bun: testIngredientsWithId[0],
      ingredients: [testIngredientsWithId[2], testIngredientsWithId[1]]
    };

    const initialState: ConstructorState = {
      bun: testIngredientsWithId[0],
      ingredients: [testIngredientsWithId[1], testIngredientsWithId[2]]
    };

    const testState = reducer(
      initialState,
      changeIngredientsPlaces({ index: 1, direction: 'up' })
    );

    expect(testState.ingredients).toEqual(expectedState.ingredients);
  });
});
