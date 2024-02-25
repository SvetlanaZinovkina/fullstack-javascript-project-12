import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import { channelsSchema } from '../validationSchemas.js';

const ModalDeleteChannel = () => {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels.channels);

  const handleDeleteChannel = () => {

  };
  return (
    <>
      <p className="lead">{t('modal.areSure')}</p>
      <div className="d-flex justify-content-end">
        <button type="button" className="me-2 btn btn-secondary">{t('modal.cancelBtn')}</button>
        <button type="button" className="btn btn-danger" onClick={handleDeleteChannel}>{t('modal.deleteBtn')}</button>
      </div>
    </>

  );
};

export default ModalDeleteChannel;
