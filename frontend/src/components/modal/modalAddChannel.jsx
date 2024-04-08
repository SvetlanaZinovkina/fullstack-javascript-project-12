import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import * as Yup from 'yup';
import filter from 'leo-profanity';
import cn from 'classnames';
import { setActiveChannel } from '../../slices/channelsSlice.js';
import { useAddChannelMutation } from '../../services/api.js';
import notify from '../../utils/toast.js';
import {getChannels} from '../../selectors/selectors';

const ModalAddChannel = ({ handleCloseModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [addChannel] = useAddChannelMutation();
  const channels = useSelector(getChannels);
  const channelNames = channels.map((channel) => channel.name);
  const handleActiveChannel = (id) => dispatch(setActiveChannel(id));
  const inputRef = useRef();

  useEffect(() => inputRef.current.focus(), []);

  const channelsSchema = Yup.object()
    .shape({
      name: Yup.string()
        .min(3, t('warnSchema.channels'))
        .max(20, t('warnSchema.channels'))
        .notOneOf(channelNames, t('warnSchema.existingChannels'))
        .required(t('warnSchema.required')),
    });

  const handleAddChannel = async (dataChannel) => {
    const { name } = dataChannel;
    const newChannel = {
      name: filter.clean(name),
    };
    try {
      const { data } = await addChannel(newChannel);
      handleCloseModal();
      handleActiveChannel(data.id);
      notify(t('chat.addChannel'));
    } catch (error) {
      console.error('Error add channel:', error);
      notify(t('warnings.errNetwork'));
    }
  };

  return (
    <Formik
      initialValues={{ name: '' }}
      validationSchema={channelsSchema}
      onSubmit={async (values) => handleAddChannel(values)}
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
              id="name"
              innerRef={inputRef}
              className={cn('mb-2', 'form-control', { 'is-invalid': errors.name && touched.name })}
            />
            <label
              className="visually-hidden"
              htmlFor="nameChannel"
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

export default ModalAddChannel;
