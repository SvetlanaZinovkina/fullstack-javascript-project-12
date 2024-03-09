import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import { useAddChannelMutation } from '../../services/api.js';
import notify from '../../utils/toast.js';

const ModalAddChannel = ({ handleCloseModal }) => {
  const { t } = useTranslation();
  const [addChannel] = useAddChannelMutation();

  const channelsSchema = (existingChannels) => Yup.object().shape({
    name: Yup.string()
      .min(3, t('warnSchema.channels'))
      .max(20, t('warnSchema.channels'))
      .notOneOf(existingChannels, t('warnSchema.existingChannels'))
      .required(t('warnSchema.required')),
  });

  const channels = useSelector((state) => state.channels.channels);
  const channelNames = channels.map((channel) => channel.name);
  const validationSchema = channelsSchema(channelNames);

  const handleAddChannel = async (dataChannel) => {
    const { name } = dataChannel;
    const newChannel = {
      name,
    };
    try {
      await addChannel(newChannel);
      handleCloseModal();
      notify(t('chat.addChannel'));
    } catch (error) {
      console.error('Error add channel:', error);
      notify(t('warnings.errNetwork'));
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
      }}
      validationSchema={validationSchema}
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
            <ErrorMessage name="name" component="div" className="invalid-feedback" />
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
