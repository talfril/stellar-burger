import { expect, test } from '@jest/globals';
import {
  orderSlice,
  OrderState,
  setOrderRequest,
  setOrderModalData,
  getOrderData
} from '../orderReducer';
import { testOrderModalData } from './forTestData';

describe('тестируем orderReducer', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const initialState: OrderState = {
    orderRequest: false,
    orderModalData: null
  };

  test('Успешно отправлен запрос на получение данных заказа', () => {
    const action = setOrderRequest(true);
    const testState = orderSlice.reducer(initialState, action);
    expect(testState).toEqual({
      orderRequest: true,
      orderModalData: null
    });
  });

  test('Получены данные для модального окна подробной информации о заказе', () => {
    const action = setOrderModalData(testOrderModalData);
    const testState = orderSlice.reducer(initialState, action);
    expect(testState).toEqual({
      orderRequest: false,
      orderModalData: testOrderModalData
    });
  });

  test('Данные о заказе получены', () => {
    const action = getOrderData.fulfilled(testOrderModalData, '', 104904);
    const testState = orderSlice.reducer(initialState, action);
    expect(testState).toEqual({
      orderRequest: false,
      orderModalData: testOrderModalData
    });
  });
});
