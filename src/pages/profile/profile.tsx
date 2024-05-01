import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  getUser,
  checkUserAuth,
  updateUser
} from '../../services/reducers/userReducer';
import { Preloader } from '@ui';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const updateUserLoading = useSelector(
    (state) => state.user.statusRequest === 'Loading'
  );
  const updateUserSuccess = useSelector(
    (state) => state.user.statusRequest === 'Success'
  );

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(formValue));
    if (updateUserLoading) {
      return <Preloader />;
    }
    if (updateUserSuccess) {
      setFormValue({
        name: user?.name || '',
        email: user?.email || '',
        password: ''
      });
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
      {updateUserLoading && <Preloader />}{' '}
      {/* Показываем прелоадер, если запрос updateUser выполняется */}
      <ProfileUI
        formValue={formValue}
        isFormChanged={isFormChanged}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />
    </>
  );
};
