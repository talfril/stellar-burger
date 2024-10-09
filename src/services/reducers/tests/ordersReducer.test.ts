import { expect, test } from '@jest/globals';
import { ordersSlice, initialState } from '../ordersReducer';
import { testOrdersList } from './forTestData';

describe('тестируем ordersReducer', () => {
  const testOrdersError = 'Ошибка получения списка заказов';

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Успешно отправлен запрос на получение данных заказа', () => {
    const expectedState = {
      orders: [],
      loading: true,
      error: null
    };
    const action = ordersSlice.actions.getOrdersStart();
    const testState = ordersSlice.reducer(initialState, action);
    expect(expectedState).toEqual(testState);
  });

  test('Список заказов получен', () => {
    const expectedState = {
      orders: testOrdersList,
      loading: false,
      error: null
    };
    const action = ordersSlice.actions.getOrdersSuccess(testOrdersList);
    const testState = ordersSlice.reducer(initialState, action);
    expect(expectedState).toEqual(testState);
  });

  test('Корректно выброшена ошибка получения списка заказов', () => {
    const expectedState = {
      orders: [],
      loading: false,
      error: testOrdersError
    };
    const action = ordersSlice.actions.getOrdersFailure(testOrdersError);
    const testState = ordersSlice.reducer(initialState, action);
    expect(expectedState).toEqual(testState);
  });
});
