import { useSelector, useDispatch } from '../../services/store';

import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import {
  selectOrders,
  selectIsOrdersLoading,
  fetchOrdersList
} from '../../reducers/ordersReducer';
import { FC, useEffect } from 'react';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const loading = useSelector(selectIsOrdersLoading);

  useEffect(() => {
    dispatch(fetchOrdersList());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
