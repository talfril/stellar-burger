import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import orderReducer from './orderReducer';
import ingredientsReducer from './ingredientsReducer';
import ordersReducer from './ordersReducer';
import newOrderReducer from './newOrderReducer';
import { constructorSlice } from './constructorReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  order: orderReducer,
  orders: ordersReducer,
  ingredients: ingredientsReducer,
  constructorItems: constructorSlice.reducer,
  newOrder: newOrderReducer
});
