import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import { channelsSchema } from '../validationSchemas.js';

const ModalDeleteChannel = ({ socket, handleCloseModal }) => {
  const { t } = useTranslation();
const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  
  // const handleCloseModal = () => dispatch(closeModal());

  const handleDeleteChannel = () => {

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
