import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import {
  setMessages, addMessageState, editMessage, deleteMessage,
} from '../slices/messagesSlice.js';
import {
  useGetMessagesQuery,
  useAddMessageMutation,
  useEditMessageMutation,
  useRemoveMessageMutation, useAddChannelMutation,
} from '../services/api.js';
import arrow from '../images/arrow.png';
import { messagesSchema } from './validationSchemas';

const MessageForm = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-auto px-5 py-3">
      <Formik
        initialValues={{
          message: '',
        }}
        validationSchema={messagesSchema}
        onSubmit={async (values, { resetForm }) => onSubmit(values, { resetForm })}
      >
        {() => (
          <Form className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <Field
                type="message"
                name="message"
                aria-label="Новое сообщение"
                placeholder={t('chat.enterMessage')}
                className="border-0 p-0 ps-2 form-control"
              />
              <button type="submit" disabled="" className="btn btn-group-vertical">
                <img src={arrow} width="20" height="20" alt="отправить" />
                <span className="visually-hidden">{t('chat.sendBtn')}</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
