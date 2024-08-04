import React from 'react';
import Modal from './Modal';
import Button from '../Button';

export const ConfirmationModalContent = ({ title, subTitle, leftButton, rightButton }) => {
  return (
    <div className="flexColCenter">
      {title && <p>{title}</p>}
      {subTitle && <p>{subTitle}</p>}
      <div className="flexRow">
        <Button
          type={leftButton.type ?? 'primary'}
          text={leftButton.text}
          onClick={leftButton.onClick}
        />
        <Button text={rightButton.text} onClick={rightButton.onClick} />
      </div>
    </div>
  );
};

const ConfirmationModal = ({ title, subTitle, leftButton, rightButton, onClose }) => {
  return (
    <Modal
      content={
        <ConfirmationModalContent
          title={title}
          subTitle={subTitle}
          leftButton={leftButton}
          rightButton={rightButton}
        />
      }
      onClose={onClose}
    />
  );
};

export default ConfirmationModal;
