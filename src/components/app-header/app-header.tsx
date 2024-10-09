import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUser } from '../../services/reducers/userReducer';
import { Outlet } from 'react-router-dom';

export const AppHeader: FC = () => {
  const user = useSelector(getUser);
  const userName = user ? user.name : '';

  return (
    <>
      <AppHeaderUI userName={userName} />
      <Outlet />
    </>
  );
};
