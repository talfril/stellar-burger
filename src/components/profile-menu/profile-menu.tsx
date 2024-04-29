import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { logoutUser, getIsAuthChecked } from '../../reducers/userReducer';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const isAuthChecked = useSelector(getIsAuthChecked);
  console.log('isAuthChecked', isAuthChecked);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={'/login'} />;
};
