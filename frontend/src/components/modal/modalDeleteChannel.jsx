import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import { useRemoveChannelMutation } from '../../services/api.js';
import { channelsSchema } from '../validationSchemas.js';
import { removeChannelState } from '../../slices/channelsSlice.js';

const ModalDeleteChannel = ({ handleCloseModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [removeChannel] = useRemoveChannelMutation();

  const channelIdToDelete = useSelector((state) => state.modal.channelID);

  const handleDeleteChannel = async () => {
    await removeChannel(channelIdToDelete);
    dispatch(removeChannelState(channelIdToDelete));
    handleCloseModal();
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
