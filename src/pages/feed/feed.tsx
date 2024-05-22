import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import {
  selectOrders,
  selectIsOrdersLoading,
  fetchOrdersList
} from '../../services/reducers/ordersReducer';
import { FC, useEffect } from 'react';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const loading = useSelector(selectIsOrdersLoading);

  useEffect(() => {
    dispatch(fetchOrdersList());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchOrdersList());
  };

  if (loading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
