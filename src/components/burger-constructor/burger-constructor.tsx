import { FC, useMemo } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { resetConstructorItems } from '../../services/reducers/constructorReducer';
import {
  addNewOrder,
  resetOrder,
  setOrderRequest,
  setOrderModalData,
  selectNewOrderRequest,
  selectNewOrderModalData
} from '../../services/reducers/newOrderReducer';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../services/reducers/userReducer';

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
          (ingredient: TIngredient) => ingredient._id
        );
        const idsArray = [bunId, ...ingredientIds, bunId];
        return idsArray;
      };

      const ingredientIds = prepareConstructorItems(constructorItems);

      if (!user) {
        navigate('/login');
        return;
      }
      dispatch(addNewOrder(ingredientIds)).then((response) => {
        dispatch(resetConstructorItems());
      });
    }
  };

  const closeOrderModal = () => {
    dispatch(setOrderModalData(null));
    dispatch(resetOrder());
    dispatch(setOrderRequest(false));
  };

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
