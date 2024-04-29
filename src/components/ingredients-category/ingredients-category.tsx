import { forwardRef, useMemo, useEffect } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { selectIngredients } from '../../reducers/newOrderReducer';
import { setBurgerConstructor } from '../../reducers/constructorReducer';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const dispatch = useDispatch();
  const selectedIngredients = useSelector(selectIngredients);

  let bunId: string | null = null;
  const otherIngredients: { _id: string }[] = [];

  selectedIngredients.forEach((ingredient: TIngredient) => {
    if (ingredient.type === 'bun') {
      bunId = ingredient._id;
    } else {
      otherIngredients.push({ _id: ingredient._id });
    }
  });

  const burgerConstructor = {
    bun: { _id: bunId || '' },
    ingredients: otherIngredients
  };
  console.log('first', burgerConstructor);

  useEffect(() => {
    dispatch(setBurgerConstructor(burgerConstructor));
  }, [dispatch, burgerConstructor]);

  const ingredientsCounters = useMemo(() => {
    const counters: { [key: string]: number } = {};
    burgerConstructor.ingredients.forEach((ingredient: { _id: string }) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    if (burgerConstructor.bun._id) counters[burgerConstructor.bun._id] = 2;
    return counters;
  }, [burgerConstructor]);

  console.log('ingredientsCounters', ingredientsCounters);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
