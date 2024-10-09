import { expect, test } from '@jest/globals';
import { rootReducer } from '../RootReducer';
import userReducer from '../userReducer';
import orderReducer from '../orderReducer';
import ingredientsReducer from '../ingredientsReducer';
import ordersReducer from '../ordersReducer';
import newOrderReducer from '../newOrderReducer';
import { constructorSlice } from '../constructorReducer';

test('Инициализация rootReducer корретна', () => {
  const initialState = rootReducer(undefined, { type: '@@INIT' });

  expect(initialState).toHaveProperty('user');
  expect(initialState).toHaveProperty('order');
  expect(initialState).toHaveProperty('orders');
  expect(initialState).toHaveProperty('ingredients');
  expect(initialState).toHaveProperty('constructorItems');
  expect(initialState).toHaveProperty('newOrder');

  expect(initialState.user).toEqual(userReducer(undefined, { type: '@@INIT' }));
  expect(initialState.order).toEqual(
    orderReducer(undefined, { type: '@@INIT' })
  );
  expect(initialState.orders).toEqual(
    ordersReducer(undefined, { type: '@@INIT' })
  );
  expect(initialState.ingredients).toEqual(
    ingredientsReducer(undefined, { type: '@@INIT' })
  );
  expect(initialState.constructorItems).toEqual(
    constructorSlice.reducer(undefined, { type: '@@INIT' })
  );
  expect(initialState.newOrder).toEqual(
    newOrderReducer(undefined, { type: '@@INIT' })
  );
});
