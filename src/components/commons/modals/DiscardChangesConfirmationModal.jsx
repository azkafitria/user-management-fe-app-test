import React from 'react';

import ConfirmationModal from './ConfirmationModal';

const DiscardChangesConfirmationModal = ({ onDiscard, onCancel }) => {
  return (
    <ConfirmationModal
      title="Anda yakin ingin keluar?"
      subTitle="Perubahan yang Anda buat tidak akan tersimpan."
      leftButton={{ text: 'Ya', onClick: onDiscard }}
      rightButton={{ text: 'Batal', onClick: onCancel }}
    />
  );
};

export default DiscardChangesConfirmationModal;
