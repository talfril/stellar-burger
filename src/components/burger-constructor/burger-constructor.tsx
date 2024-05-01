import { FC, useMemo } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { selectOrderModalData } from '../../reducers/orderReducer';
import {
  addNewOrder,
  selectNewOrderRequest,
  selectNewOrderModalData
} from '../../reducers/newOrderReducer';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../reducers/userReducer';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector((state) => state.constructorItems);
  const orderRequest = useSelector(selectNewOrderRequest);
  const orderModalData = useSelector(selectNewOrderModalData);
  const user = useSelector(getUser);

  const onOrderClick = () => {
    if (!constructorItems || orderRequest) {
      return;
    } else {
      const prepareConstructorItems = (constructorItems: any) => {
        const bunId = constructorItems.bun._id;
        const ingredientIds = constructorItems.ingredients.map(
          (ingredient: any) => ingredient._id
        );
        const idsArray = [bunId, ...ingredientIds, bunId];
        return idsArray;
      };

      const ingredientIds = prepareConstructorItems(constructorItems);

      if (!user) {
        navigate('/login');
        return;
      }
      dispatch(addNewOrder(ingredientIds));
    }
  };

  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
