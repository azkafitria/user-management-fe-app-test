import React, { useContext, useEffect, useState } from 'react';

import { getUserApi } from '../../utils/Api';
import { formatDate, formatDateTime } from '../../utils/Formatter';
import { ToastContext } from '../../context/ToastContext';

const UserView = ({ userId }) => {
  const { setToast } = useContext(ToastContext);

  const [userInfo, setUserInfo] = useState([]);

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
      setUserInfo([
        {
          attribute: 'Nama',
          value: user.name
        },
        {
          attribute: 'Alamat',
          value: user.address
        },
        {
          attribute: 'P / W',
          value: user.gender
        },
        {
          attribute: 'Tanggal Lahir',
          value: formatDate(user.date_of_birth)
        },
        {
          attribute: 'Tanggal Input',
          value: formatDateTime(user.created_at)
        }
      ]);
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      {userInfo.map((info, i) => (
        <div key={i} className="flexRow">
          <p>{info.attribute}:</p>
          <p>{info.value}</p>
        </div>
      ))}
    </div>
  );
};

export default UserView;
