import React, { FC } from 'react';
import styles from './app-header.module.css';
import { Link, useLocation } from 'react-router-dom';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <>
            <BurgerIcon type={'primary'} />
            <Link
              to={{ pathname: '/stellar-burger' }}
              className={`${styles.link}  ${location.pathname === '/' ? '' : styles.link_active}`}
            >
              <p className='text text_type_main-default ml-2 mr-10'>
                Конструктор
              </p>
            </Link>
          </>
          <>
            <ListIcon type={'primary'} />
            <Link
              to={{ pathname: `/feed` }}
              className={`${styles.link}  ${location.pathname === '/feed' ? '' : styles.link_active}`}
            >
              <p className='text text_type_main-default ml-2 mr-10'>
                Лента заказов
              </p>
            </Link>
          </>
        </div>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
        <div className={styles.link_position_last}>
          <ProfileIcon type={'primary'} />
          <Link
            to={{ pathname: `/profile` }}
            className={`${styles.link}  ${location.pathname === '/profile' ? '' : styles.link_active}`}
          >
            <p className='text text_type_main-default ml-2 mr-10'>
              {userName || 'Личный кабинет'}
            </p>
          </Link>
        </div>
      </nav>
    </header>
  );
};
