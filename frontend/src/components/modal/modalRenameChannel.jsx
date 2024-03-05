import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import { useEditChannelMutation } from '../../services/api.js';

import { channelsSchema } from '../validationSchemas.js';

const ModalRenameChannel = ({ handleCloseModal }) => {
  const { t } = useTranslation();
  const [editChannel] = useEditChannelMutation();

  const channels = useSelector((state) => state.channels.channels);
  const validationSchema = channelsSchema(channels);

  const channelIdToRename = useSelector((state) => state.modal.channelID);

  const handleRenameChannels = async (newChannelName) => {
    try {
      await editChannel({ id: channelIdToRename, editedChannel: newChannelName });
      handleCloseModal();
    } catch (error) {
      console.error('Error rename channel:', error);
    }
  };
  return (
    <Formik
      initialValues={{
        name: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => handleRenameChannels(values)}
    >
      {({ errors, touched }) => (
        <Form className="">
          <div>
            <Field name="name" id="name" className={cn('mb-2', 'form-control', { 'is-invalid': errors.name && touched.name })} />
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
