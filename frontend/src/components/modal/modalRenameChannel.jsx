import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import { channelsSchema } from '../validationSchemas.js';

const ModalRenameChannel = ({ socket, handleCloseModal }) => {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels.channels);

  const handleRenameChannels = async (nameChannel) => {

  };
  return (
    <Formik
      initialValues={{
        name: '',
      }}
      validationSchema={channelsSchema(channels)}
      onSubmit={async (values) => handleRenameChannels(values)}
    >
      {({ errors, touched }) => (
        <Form className="">
          <div>
            <Field name="name" id="name" className={cn('mb-2', 'form-control', { 'is-invalid': errors.name && touched.name })} value="" />
            <label
              className="visually-hidden"
              htmlFor="name"
            >
              Имя канала
            </label>
            <div className="invalid-feedback" />
            <div className="d-flex justify-content-end">
              <button type="button" className="me-2 btn btn-secondary" onClick={handleCloseModal}>{t('modal.cancelBtn')}</button>
              <button type="submit" className="btn btn-primary">{t('modal.sendBtn')}</button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ModalRenameChannel;
