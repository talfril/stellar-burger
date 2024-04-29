import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { useParams } from 'react-router-dom';
import { TIngredient } from '@utils-types';
import {
  fetchIngredients,
  selectIngredients
} from '../../reducers/ingredientsReducer';
import {
  selectOrderRequest,
  selectOrderModalData,
  getOrderData
} from '../../reducers/orderReducer';
import { useSelector, useDispatch } from '../../services/store';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number: orderNumber } = useParams<{ number: string }>();
  const orderRequest = useSelector(selectOrderRequest);
  const orderData = useSelector(selectOrderModalData);
  const ingredients = useSelector(selectIngredients);
  console.log('В результате отображается', orderData?.number);
  console.log('должен отображаться:', orderNumber);

  useEffect(() => {
    if (!orderData) {
      dispatch(getOrderData(parseInt(orderNumber!)));
    }
  }, [dispatch, orderData, orderNumber]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
