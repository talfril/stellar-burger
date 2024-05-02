import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectOrders,
  fetchCurrentUserOrders
} from '../../services/reducers/ordersReducer';

export const ProfileOrders: FC = () => {
  const orders = useSelector(selectOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUserOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
