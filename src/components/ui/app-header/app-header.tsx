import React, { FC } from 'react';
import styles from './app-header.module.css';
import { Link } from 'react-router-dom';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <>
          <BurgerIcon type={'primary'} />
          <Link to={{ pathname: `/` }} className={`${styles.link} ml-2 mr-10`}>
            <p className={styles.text}>Конструктор</p>
          </Link>
        </>
        <>
          <ListIcon type={'primary'} />
          <Link to={{ pathname: `/feed` }} className={`${styles.link} ml-2`}>
            <p className={styles.text}>Лента заказов</p>
          </Link>
        </>
      </div>
      <div className={styles.logo}>
        <Logo className='' />
      </div>
      <div className={styles.link_position_last}>
        <ProfileIcon type={'primary'} />
        <Link to={{ pathname: `/profile` }} className={`${styles.link} ml-2`}>
          <p className={`${styles.text} ml-2`}>
            {userName || 'Личный кабинет'}
          </p>
        </Link>
      </div>
    </nav>
  </header>
);
