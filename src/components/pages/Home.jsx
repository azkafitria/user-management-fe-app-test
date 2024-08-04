import React, { useContext, useEffect, useState } from 'react';

import Button from '../commons/Button';
import Modal from '../commons/modals/Modal';
import DeleteConfirmationModal from '../commons/modals/DeleteConfirmationModal';
import { deleteUserApi, getAllUsersApi } from '../../utils/Api';
import Navbar from '../commons/Navbar';
import { ToastContext } from '../../context/ToastContext';
import DiscardChangesConfirmationModal from '../commons/modals/DiscardChangesConfirmationModal';
import { useAppDispatch, useAppSelector } from '../../redux/ReduxHooks';
import UserTable from '../users/UserTable';
import UserForm from '../users/UserForm';
import UserView from '../users/UserView';
import { userFieldChangedAction } from '../../redux/slices/UserSlice';

const Home = () => {
  const dispatch = useAppDispatch();
  const { isUserFieldChanged } = useAppSelector((state) => state.user);

  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState({
    add: false,
    view: false,
    edit: false,
    delete: false,
    discardEdit: false
  });

  const handleShowModalChange = (key, value) => {
    setShowModal({
      ...showModal,
      [key]: value
    });
  };

  const [selectedUserId, setSelectedUserId] = useState(0);

  const handleItemAction = (key, userId) => {
    handleShowModalChange(key, true);
    setSelectedUserId(userId);
  };

  const getAllUsers = () => {
    getAllUsersApi().then((users) => {
      if (users === 'error') {
        setToast({
          text: `Gagal mengambil data user`,
          isError: true,
          show: true
        });
        return;
      }
      setUsersData(users);
      setLoading(false);
    });
  };

  const addUser = () => {
    handleShowModalChange('add', false);
    getAllUsers();
  };

  const editUser = () => {
    handleShowModalChange('edit', false);
    getAllUsers();
  };

  const deleteUser = () => {
    deleteUserApi(selectedUserId).then((res) => {
      if (res === 'error') {
        setToast({
          text: `Gagal menghapus data user`,
          isError: true,
          show: true
        });
        return;
      }
      setToast({
        text: `Berhasil menghapus data user`,
        isError: false,
        show: true
      });
      handleShowModalChange('delete', false);
      getAllUsers();
    });
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      getAllUsers();
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const { setToast } = useContext(ToastContext);

  return (
    <>
      <Navbar />
      <div className="pageContent">
        <Button
          type="primary"
          text={'Tambah User'}
          onClick={() => handleShowModalChange('add', true)}
        />
        <UserTable
          users={usersData}
          onViewItem={(userId) => handleItemAction('view', userId)}
          onEditItem={(userId) => handleItemAction('edit', userId)}
          onDeleteItem={(userId) => handleItemAction('delete', userId)}
          loading={loading}
        />
      </div>

      {showModal.add && (
        <Modal
          title="Tambah User"
          content={<UserForm onSubmit={addUser} />}
          onClose={() => handleShowModalChange('add', false)}
        />
      )}
      {showModal.view && (
        <Modal
          title="User"
          content={<UserView userId={selectedUserId} />}
          onClose={() => handleShowModalChange('view', false)}
        />
      )}
      {showModal.edit && (
        <Modal
          title="Edit User"
          content={<UserForm onSubmit={editUser} userId={selectedUserId} />}
          onClose={() => {
            if (isUserFieldChanged) {
              handleShowModalChange('discardEdit', true);
            } else {
              handleShowModalChange('edit', false);
            }
          }}
        />
      )}
      {showModal.delete && (
        <DeleteConfirmationModal
          userId={selectedUserId}
          onDelete={deleteUser}
          onClose={() => handleShowModalChange('delete', false)}
        />
      )}
      {showModal.discardEdit && (
        <DiscardChangesConfirmationModal
          onDiscard={() => {
            setShowModal({
              ...showModal,
              edit: false,
              discardEdit: false
            });
            dispatch(userFieldChangedAction(false));
          }}
          onCancel={() => handleShowModalChange('discardEdit', false)}
        />
      )}
    </>
  );
};

export default Home;
