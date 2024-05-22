import { expect, test } from '@jest/globals';
import {
  userSlice,
  TUserState,
  registerUser,
  resetPassword,
  initialState
} from '../userReducer';
import { StatusRequest } from '@utils-types';
import { testUserData, testRegisterData } from './forTestData';

describe('тестируем userReducer', () => {
  const testPasswordResetError = 'Ошибка сброса пароля';

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const initialStateLoggedUser: TUserState = {
    isAuth: true,
    data: testUserData,
    statusRequest: StatusRequest.Idle,
    error: null
  };

  test('Авторизация пользователя - пользователь авторизован', () => {
    const action = userSlice.actions.authCheck();
    const testState = userSlice.reducer(initialState, action);
    expect(testState.isAuth).toBe(true);
  });

  test('Проверка успешного выхода пользователя из системы', () => {
    const action = userSlice.actions.logout();
    const testState = userSlice.reducer(initialStateLoggedUser, action);
    expect(testState.isAuth).toEqual(false);
  });

  test('Проверка успешной регистрации пользователя', () => {
    const action = registerUser.fulfilled(
      testUserData,
      'requestId',
      testRegisterData
    );
    const testState = userSlice.reducer(initialState, action);
    expect(testState).toEqual({
      isAuth: true,
      data: testUserData,
      statusRequest: StatusRequest.Success,
      error: null
    });
  });

  test('Проверка сброса пароля пользователя - пароль сброшен', () => {
    const action = resetPassword.fulfilled(undefined, '', {
      password: 'newPassword',
      token: 'resetToken'
    });
    const testState = userSlice.reducer(initialState, action);
    expect(testState.error).toBeNull();
  });

  test('Проверка сброса пароля пользователя - сброс не выполнен, корректно выброшена ошибка', () => {
    const action = resetPassword.rejected(
      new Error(testPasswordResetError),
      '',
      {
        password: 'newPassword',
        token: 'resetToken'
      }
    );
    const testState = userSlice.reducer(initialState, action);
    expect(testState.error).toEqual(testPasswordResetError);
  });
});
