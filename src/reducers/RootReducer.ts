import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import orderReducer from './orderReducer';
import ingredientsReducer from './ingredientsReducer';
import constructorReducer from './constructorReducer';
import ordersReducer from './ordersReducer';
import newOrderReducer from './newOrderReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  order: orderReducer,
  orders: ordersReducer,
  ingredients: ingredientsReducer,
  constructorItems: constructorReducer,
  newOrder: newOrderReducer
});
