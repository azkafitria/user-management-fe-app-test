import React from 'react';

const Button = ({ type, text, onClick, customClass, disabled }) => {
  let buttonClass = '';

  switch (type) {
    case 'submit':
      return <input type="submit" value={text} disabled={disabled} className="primaryButton" />;
    case 'primary':
      buttonClass = 'primaryButton';
      break;
    case 'secondary':
      buttonClass = 'secondaryButton';
      break;
    case 'red':
      buttonClass = 'redButton';
      break;
    case 'text':
      buttonClass = 'textButton';
      break;
    default:
      buttonClass = customClass;
      break;
  }

  return (
    <button onClick={onClick} className={buttonClass}>
      {text}
    </button>
  );
};

export default Button;
