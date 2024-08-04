import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { formatDate, formatDateTime } from '../../utils/Formatter';
import Button from '../commons/Button';

const UserTable = ({ users, onViewItem, onEditItem, onDeleteItem, loading }) => {
  const tableHead = ['No.', 'Nama', 'Alamat', 'P/W', 'Tanggal Lahir', 'Tanggal Input', 'Aksi'];

  return (
    <>
      <table className="table">
        <thead className="tableHead">
          <tr>
            {tableHead.map((head, i) => (
              <th key={i}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody className="tableBody">
          {loading ? (
            <>
              {Array(10)
                .fill()
                .map((_, row) => (
                  <tr key={row}>
                    {Array(tableHead.length)
                      .fill()
                      .map((_, col) => (
                        <th key={col}>
                          <Skeleton />
                        </th>
                      ))}
                  </tr>
                ))}
            </>
          ) : users.length > 0 ? (
            <>
              {users.map((user, i) => (
                <tr key={i}>
                  <th>{i + 1}.</th>
                  <th>{user.name}</th>
                  <th>{user.address.length > 0 ? user.address : '-'}</th>
                  <th>{user.gender.length > 0 ? user.gender : '-'}</th>
                  <th>{user.date_of_birth.length > 0 ? formatDate(user.date_of_birth) : '-'}</th>
                  <th>{formatDateTime(user.created_at)}</th>
                  <th className="flexRow">
                    <Button text="View" onClick={() => onViewItem(user.id)} />
                    <Button text="Edit" onClick={() => onEditItem(user.id)} />
                    <Button type="red" text="Delete" onClick={() => onDeleteItem(user.id)} />
                  </th>
                </tr>
              ))}
            </>
          ) : (
            <></>
          )}
        </tbody>
      </table>
      {!loading && users.length === 0 && <p>Belum ada data.</p>}
    </>
  );
};

export default UserTable;
