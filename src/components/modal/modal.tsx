import { FC, memo, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { TModalProps } from './type';
import { ModalUI } from '@ui';
import { useNavigate, useParams } from 'react-router-dom';

const modalRoot = document.getElementById('modals');

export const Modal: FC<TModalProps> = memo(({ title, onClose, children }) => {
  const navigate = useNavigate();
  const params = useParams<{ number: string }>();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleClose = () => {
    navigate(-1);
    onClose();
  };

  return ReactDOM.createPortal(
    <ModalUI
      title={params.number ? '#0' + params.number : title}
      onClose={handleClose}
    >
      {children}
    </ModalUI>,
    modalRoot as HTMLDivElement
  );
});
