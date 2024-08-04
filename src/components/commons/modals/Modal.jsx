import React from 'react';

import closeIcon from '../../../assets/close-icon.png';
import Button from '../Button';

const Modal = ({ title, content, onClose }) => {
  return (
    <div className="overlay">
      <div className="modalContentCard">
        {title ? (
          <div className="flexRowBetween">
            {title && <p>{title}</p>}
            {onClose && (
              <Button
                text={<img src={closeIcon} className="icon" />}
                onClick={onClose}
                customClass="modalCloseButton"
              />
            )}
          </div>
        ) : (
          <>
            {onClose && (
              <Button
                text={<img src={closeIcon} className="icon" />}
                onClick={onClose}
                customClass="absModalCloseButton"
              />
            )}
          </>
        )}

        {content}
      </div>
    </div>
  );
};

export default Modal;
