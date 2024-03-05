import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useRemoveChannelMutation } from '../../services/api.js';

const ModalDeleteChannel = ({ handleCloseModal }) => {
  const { t } = useTranslation();
  const [removeChannel] = useRemoveChannelMutation();

  const channelIdToDelete = useSelector((state) => state.modal.channelID);

  const handleDeleteChannel = async () => {
    try {
      await removeChannel(channelIdToDelete);
      handleCloseModal();
    } catch (error) {
      console.error('Error delete channel:', error);
    }
  };

  return (
    <>
      <p className="lead">{t('modal.areSure')}</p>
      <div className="d-flex justify-content-end">
        <button type="button" className="me-2 btn btn-secondary" onClick={handleCloseModal}>{t('modal.cancelBtn')}</button>
        <button type="button" className="btn btn-danger" onClick={handleDeleteChannel}>{t('modal.deleteBtn')}</button>
      </div>
    </>

  );
};

export default ModalDeleteChannel;
