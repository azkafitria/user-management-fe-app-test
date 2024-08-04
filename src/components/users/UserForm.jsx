import React, { useContext, useEffect, useState } from 'react';

import '../../styles/Style.css';
import { getUserApi, postUserApi, putUserApi } from '../../utils/Api';
import { ToastContext } from '../../context/ToastContext';
import Button from '../commons/Button';
import Input from '../commons/Input';
import { useAppDispatch } from '../../redux/ReduxHooks';
import { userFieldChangedAction } from '../../redux/slices/UserSlice';

const UserForm = ({ onSubmit, userId }) => {
  const dispatch = useAppDispatch();

  const [user, setUser] = useState({});
  const [inputValue, setInputValue] = useState({
    name: { value: '', errMessage: '' },
    address: '',
    gender: '',
    dateOfBirth: ''
  });

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleInputChange = (key, value) => {
    let errMessage = '';
    if (key === 'name') {
      errMessage = value.length === 0 ? 'Nama wajib diisi' : '';
      setInputValue({
        ...inputValue,
        name: {
          value: value,
          errMessage: errMessage
        }
      });
    } else {
      setInputValue({
        ...inputValue,
        [key]: value
      });
    }

    if (userId) {
      let fieldChanged = false;
      let requiredFieldValid = true;

      for (const k in inputValue) {
        if (k === key) {
          if (key === 'dateOfBirth') {
            if (value !== user.date_of_birth) {
              fieldChanged = true;
            }
            continue;
          }
          if (value !== user[key]) {
            fieldChanged = true;
            if (key === 'name' && value.length === 0 && errMessage.length > 0) {
              requiredFieldValid = false;
              break;
            }
          }
        } else {
          if (k === 'name') {
            if (inputValue.name.value !== user.name) {
              fieldChanged = true;
              if (inputValue.name.value.length === 0 || inputValue.name.errMessage.length > 0) {
                requiredFieldValid = false;
                break;
              }
            }
          } else if (k === 'dateOfBirth') {
            if (inputValue.dateOfBirth !== user.date_of_birth) {
              fieldChanged = true;
            }
          } else {
            if (inputValue[k] !== user[k]) {
              fieldChanged = true;
            }
          }
        }
      }
      setIsSubmitDisabled(!fieldChanged || !requiredFieldValid);

      dispatch(userFieldChangedAction(fieldChanged));
    } else {
      if (
        (key === 'name' && value.length > 0 && errMessage.length === 0) ||
        (key !== 'name' &&
          inputValue.name.value.length > 0 &&
          inputValue.name.errMessage.length === 0)
      ) {
        setIsSubmitDisabled(false);
      } else {
        setIsSubmitDisabled(true);
      }
    }
  };

  const { setToast } = useContext(ToastContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId) {
      postUserApi({
        name: inputValue.name.value,
        address: inputValue.address,
        gender: inputValue.gender,
        date_of_birth: inputValue.dateOfBirth,
        created_at: new Date()
      }).then((res) => {
        if (res === 'error') {
          setToast({
            text: `Gagal menambah data user`,
            isError: true,
            show: true
          });
          return;
        }
        setToast({
          text: `Berhasil menambah data user`,
          isError: false,
          show: true
        });
        onSubmit();
      });
      return;
    }
    putUserApi({
      id: userId,
      name: inputValue.name.value,
      address: inputValue.address,
      gender: inputValue.gender,
      date_of_birth: inputValue.dateOfBirth,
      created_at: new Date()
    }).then((res) => {
      if (res === 'error') {
        setToast({
          text: `Gagal mengubah data user`,
          isError: true,
          show: true
        });
        return;
      }
      setToast({
        text: `Berhasil mengubah data user`,
        isError: false,
        show: true
      });
      onSubmit();
    });
  };

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
      setInputValue({
        name: { value: user.name, errMessage: '' },
        address: user.address,
        gender: user.gender,
        dateOfBirth: user.date_of_birth
      });
      setUser(user);
      setIsSubmitDisabled(true);
    });
  };

  useEffect(() => {
    if (userId) getUser();
  }, []);

  return (
    <form className="flexCol" onSubmit={(e) => handleSubmit(e)}>
      <div className="flexRowCenter">
        <label className="inputLabel" htmlFor="name">
          Nama
        </label>
        :
        <Input
          type="text"
          name="name"
          value={inputValue.name.value}
          errMessage={inputValue.name.errMessage}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
      </div>
      <div className="flexRowCenter">
        <label className="inputLabel" htmlFor="address">
          Alamat
        </label>
        :
        <Input
          type="textarea"
          name="address"
          value={inputValue.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
        />
      </div>
      <div className="flexRow">
        <label className="inputLabel" htmlFor="gender">
          P / W
        </label>
        :
        <div className="flexRowFull">
          <Input
            type="radio"
            value="Pria"
            label="Pria"
            name="gender"
            checked={inputValue.gender === 'Pria'}
            onChange={(e) => handleInputChange('gender', e.target.value)}
          />
          <Input
            type="radio"
            value="Wanita"
            label="Wanita"
            name="gender"
            checked={inputValue.gender === 'Wanita'}
            onChange={(e) => handleInputChange('gender', e.target.value)}
          />
        </div>
      </div>
      <div className="flexRow">
        <label className="inputLabel" htmlFor="dateOfBirth">
          Tanggal Lahir
        </label>
        :
        <Input
          type="date"
          name="dateOfBirth"
          value={inputValue.dateOfBirth}
          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
        />
      </div>
      <Button type="submit" text={!userId ? 'Add' : 'Edit'} disabled={isSubmitDisabled} />
    </form>
  );
};

export default UserForm;
