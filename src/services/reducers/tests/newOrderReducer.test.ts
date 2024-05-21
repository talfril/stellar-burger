import { expect, test } from '@jest/globals';
import {
  NewOrderState,
  newOrderSlice,
  resetOrder,
  setOrderRequest,
  setOrderModalData,
  addNewOrder
} from '../newOrderReducer';
import { testOrderModalData, testOrderState } from './forTestData';

describe('тесты редьюсера NewOrder', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const initialState: NewOrderState = {
    bun: null,
    selectedIngredients: [],
    orderRequest: false,
    orderModalData: null
  };

  test('Данные заказа очищаются при запросе на очистку данных', () => {
    const action = resetOrder();
    const testState = newOrderSlice.reducer(testOrderState, action);
    expect(testState).toEqual(initialState);
  });

  test('При вызове экшена setOrderRequest булевая переменная меняется на true', () => {
    const action = setOrderRequest(true);
    const testState = newOrderSlice.reducer(initialState, action);
    expect(testState.orderRequest).toBe(true);
  });

  test('При вызове экшена setOrderModalData данные заказа обновляются', () => {
    const action = setOrderModalData(testOrderModalData);
    const testState = newOrderSlice.reducer(initialState, action);
    expect(testState.orderModalData).toEqual(testOrderModalData);
  });

  test('При выполнении addNewOrder.fulfilled данные заказа обновляются', () => {
    const action = addNewOrder.fulfilled(
      {
        order: testOrderModalData,
        name: 'Флюоресцентный люминесцентный бургер'
      },
      '',
      []
    );
    const testState = newOrderSlice.reducer(initialState, action);
    expect(testState.orderModalData).toEqual(testOrderModalData);
    expect(testState.orderRequest).toBe(false);
  });
});
