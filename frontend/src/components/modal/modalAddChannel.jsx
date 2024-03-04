import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import { channelsSchema } from '../validationSchemas.js';
import { closeModal } from '../../slices/modalSlice.js';
import { addChannelState } from '../../slices/channelsSlice.js';
import { useAddChannelMutation } from '../../services/api.js';
import { addMessageState } from '../../slices/messagesSlice';

const ModalAddChannel = ({ handleCloseModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [addChannel] = useAddChannelMutation();

  const channels = useSelector((state) => state.channels.channels);

  const handleAddChannel = async (dataChannel) => {
    try {
      const { name } = dataChannel;
      console.log(dataChannel);
      const newChannel = {
        name: channel,
      };
      await addChannel(newChannel);
      handleCloseModal();
    } catch (error) {
      console.error('Error add channel:', error);
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
      }}
      validationSchema={channelsSchema(channels)}
      onSubmit={async (values) => handleAddChannel(values)}
    >
      {({ errors, touched }) => (
        <Form className="">
          <div>
            <Field
              name="name"
              id="name"
              className={cn('mb-2', 'form-control', { 'is-invalid': errors.name && touched.name })}
            />
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

export default ModalAddChannel;
