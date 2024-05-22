import {
  constructorSlice,
  addToConstructor,
  removeFromConstructor,
  ConstructorState,
  changeIngredientsPlaces,
  initialState
} from '../constructorReducer';
import { expect, test } from '@jest/globals';
import { testIngredientsWithId, testIngredientsWithoutId } from './forTestData';

const { reducer } = constructorSlice;

describe('тесты редьюсера слайса constructor', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('обработка экшена добавления ингредиента', () => {
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
    const beforeTestState: ConstructorState = {
      bun: testIngredientsWithId[0],
      ingredients: [testIngredientsWithId[1], testIngredientsWithId[2]]
    };
    const testStateDelete = reducer(
      beforeTestState,
      removeFromConstructor(testIngredientsWithId[1]._id)
    );
    expect(testStateDelete.ingredients).toHaveLength(1);
    expect(testStateDelete.bun).toEqual(beforeTestState.bun);
  });

  test('обработка экшена изменения порядка ингредиентов', () => {
    const expectedState: ConstructorState = {
      bun: testIngredientsWithId[0],
      ingredients: [testIngredientsWithId[2], testIngredientsWithId[1]]
    };

    const beforeTestState: ConstructorState = {
      bun: testIngredientsWithId[0],
      ingredients: [testIngredientsWithId[1], testIngredientsWithId[2]]
    };

    const testState = reducer(
      beforeTestState,
      changeIngredientsPlaces({ index: 1, direction: 'up' })
    );

    expect(testState.ingredients).toEqual(expectedState.ingredients);
  });
});
