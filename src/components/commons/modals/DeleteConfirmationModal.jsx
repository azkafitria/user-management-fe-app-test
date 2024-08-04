import React, { useContext, useEffect, useState } from 'react';

import { getUserApi } from '../../../utils/Api';
import { ToastContext } from '../../../context/ToastContext';
import ConfirmationModal from './ConfirmationModal';

const DeleteConfirmationModal = ({ userId, onDelete, onClose }) => {
  const { setToast } = useContext(ToastContext);

  const [username, setUsername] = useState({});

  const getUser = () => {
    getUserApi(userId).then((user) => {
      if (user === 'error') {
        setToast({
          text: `Gagal mengambil data user`,
          isError: true,
          show: true
        });
        return;
      }
      setUsername(user.name);
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <ConfirmationModal
      title={`Hapus user ${username}?`}
      leftButton={{ text: 'Hapus', onClick: onDelete, type: 'red' }}
      rightButton={{ text: 'Batal', onClick: onClose }}
      onClose={onClose}
    />
  );
};

export default DeleteConfirmationModal;
