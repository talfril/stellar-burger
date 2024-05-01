import { ProfileOrdersUI } from '@ui-pages';
import { FC } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { selectOrders } from '../../services/reducers/ordersReducer';

export const ProfileOrders: FC = () => {
  const orders = useSelector(selectOrders);

  return <ProfileOrdersUI orders={orders} />;
};
