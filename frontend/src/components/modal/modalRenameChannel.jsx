import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import cn from 'classnames';
import * as Yup from 'yup';
import { useEditChannelMutation } from '../../services/api.js';
import notify from '../../utils/toast.js';
import { getChannelId, getChannels } from '../../selectors/selectors';

const ModalRenameChannel = ({ handleCloseModal }) => {
  const { t } = useTranslation();
  const [editChannel] = useEditChannelMutation();
  const inputRef = useRef();

  useEffect(() => inputRef.current.focus(), []);

  const channelsSchema = (existingChannels) => Yup.object()
    .shape({
      name: Yup.string()
        .min(3, t('warnSchema.channels'))
        .max(20, t('warnSchema.channels'))
        .notOneOf(existingChannels, t('warnSchema.existingChannels'))
        .required(t('warnSchema.required')),
    });

  const channels = useSelector(getChannels);
  const channelNames = channels.map((channel) => channel.name);
  const validationSchema = channelsSchema(channelNames);

  const channelIdToRename = useSelector(getChannelId);
  const [channel] = channels.filter(({ id }) => id === channelIdToRename);
  const handleRenameChannels = async (newChannelName) => {
    try {
      await editChannel({
        id: channelIdToRename,
        editedChannel: newChannelName,
      });
      handleCloseModal();
      notify(t('chat.renameChannel'));
    } catch (error) {
      console.error('Error rename channel:', error);
      notify(t('warnings.errNetwork'));
    }
  };
  return (
    <Formik
      initialValues={{
        name: channel.name,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => handleRenameChannels(values)}
    >
      {({
        errors,
        touched,
      }) => (
        <Form>
          <div>
            <Field
              type="text"
              name="name"
              innerRef={inputRef}
              id="name"
              className={cn('mb-2', 'form-control', { 'is-invalid': errors.name && touched.name })}
            />
            <label
              className="visually-hidden"
              htmlFor="name"
            >
              {t('modal.labelText')}
            </label>
            <ErrorMessage name="name" component="div" className="invalid-feedback" />
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="me-2 btn btn-secondary"
                onClick={handleCloseModal}
              >
                {t('modal.cancelBtn')}
              </button>
              <button type="submit" className="btn btn-primary">{t('modal.sendBtn')}</button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ModalRenameChannel;
