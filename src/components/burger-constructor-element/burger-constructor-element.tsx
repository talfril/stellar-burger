import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  removeFromConstructor,
  changeIngredientsPlaces
} from '../../services/reducers/constructorReducer';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      if (index < totalItems - 1) {
        dispatch(changeIngredientsPlaces({ index, direction: 'down' }));
      }
    };

    const handleMoveUp = () => {
      if (index > 0) {
        dispatch(changeIngredientsPlaces({ index, direction: 'up' }));
      }
    };

    const handleClose = () => {
      dispatch(removeFromConstructor(ingredient._id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
