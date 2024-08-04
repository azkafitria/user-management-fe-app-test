import React from 'react';

const Toast = ({ text, isError }) => {
  return <div className={isError ? 'toastErr' : 'toast'}>{text}</div>;
};

export default Toast;
