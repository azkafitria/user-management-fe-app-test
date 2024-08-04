import React from 'react';

const Input = ({ type, value, onChange, errMessage, label, name, checked }) => {
  switch (type) {
    case 'textarea':
      return <textarea value={value} onChange={onChange} name={name} className="input" />;
    case 'radio':
      return (
        <label>
          <input type="radio" value={value} onChange={onChange} name={name} checked={checked} />{' '}
          {label}
        </label>
      );
    default:
      return (
        <div className="flexColFull">
          <input
            type={type ?? 'text'}
            value={value}
            onChange={onChange}
            name={name}
            className="input"
          />
          {errMessage && <p className="inputErrMessage">{errMessage}</p>}
        </div>
      );
  }
};

export default Input;
