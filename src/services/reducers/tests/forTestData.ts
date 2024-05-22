import { TOrder } from '@utils-types';
import { TRegisterData } from '@api';
import { v4 as uuidv4 } from 'uuid';

export const testOrderModalData: TOrder = {
  _id: '664735f797ede0001d06b1d2',
  status: 'done',
  name: 'Флюоресцентный люминесцентный бургер',
  createdAt: '2024-05-17T10:48:23.974Z',
  updatedAt: '2024-05-17T10:48:24.366Z',
  number: 40208,
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0946',
    '643d69a5c3f7b9001cfa0947',
    '643d69a5c3f7b9001cfa093c'
  ]
};

export const testOrderState = {
  bun: {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  },
  selectedIngredients: [
    {
      _id: '643d69a5c3f7b9001cfa0946',
      name: 'Хрустящие минеральные кольца',
      type: 'main',
      proteins: 808,
      fat: 689,
      carbohydrates: 609,
      calories: 986,
      price: 300,
      image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
      image_mobile:
        'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
      image_large:
        'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
      __v: 0
    },
    {
      _id: '643d69a5c3f7b9001cfa0947',
      name: 'Плоды Фалленианского дерева',
      type: 'main',
      proteins: 20,
      fat: 5,
      carbohydrates: 55,
      calories: 77,
      price: 874,
      image: 'https://code.s3.yandex.net/react/code/sp_1.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png',
      __v: 0
    }
  ],
  orderRequest: false,
  orderModalData: testOrderModalData
};

export const testIngredientsWithoutId = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',

    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    __v: 0
  }
];

export const testIngredientsWithId = testIngredientsWithoutId.map(
  (ingredient) => ({
    ...ingredient,
    id: uuidv4()
  })
);

export const testIngredientsList = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    __v: 0
  }
];

export const testOrdersList = [
  {
    _id: '6647624397ede0001d06b245',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0945',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Space флюоресцентный антарианский бургер',
    createdAt: '2024-05-17T13:57:23.113Z',
    updatedAt: '2024-05-17T13:57:23.490Z',
    number: 40226
  },
  {
    _id: '6647623d97ede0001d06b244',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0945',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Space флюоресцентный антарианский бургер',
    createdAt: '2024-05-17T13:57:17.225Z',
    updatedAt: '2024-05-17T13:57:17.653Z',
    number: 40225
  },
  {
    _id: '6647623797ede0001d06b243',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Space флюоресцентный бургер',
    createdAt: '2024-05-17T13:57:11.389Z',
    updatedAt: '2024-05-17T13:57:11.787Z',
    number: 40224
  },
  {
    _id: '6647615997ede0001d06b23d',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-05-17T13:53:29.807Z',
    updatedAt: '2024-05-17T13:53:30.243Z',
    number: 40223
  }
];

export const testUserData = {
  email: 'testEmail@test.test',
  name: 'testName'
};

export const testRegisterData: TRegisterData = {
  email: 'testEmail@test.test',
  name: 'testName',
  password: 'testPassword'
};
