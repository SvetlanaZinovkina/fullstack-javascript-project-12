import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
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
import { messagesSchema } from './validationSchemas.js';

const MessagesBox = () => {
  const { t } = useTranslation();
  const [addMessage] = useAddMessageMutation();

  const messages = useSelector((state) => state.messages.messages);
  const usernameLocalstorage = localStorage.getItem('username');
  const channels = useSelector((state) => state.channels.channels);
  const activeChannelId = useSelector((state) => state.channels.activeChannel);
  const activeChannel = channels.find(({ id }) => id === activeChannelId);
  const countMessages = messages ? messages.filter(({ channelId }) => channelId === activeChannelId).length : 0;

  const onSubmit = async (messageValue, { resetForm }) => {
    const { message } = messageValue;
    const newMessage = {
      body: message,
      channelId: activeChannelId,
      username: usernameLocalstorage,
    };
    try {
      await addMessage(newMessage);
      resetForm();
    } catch (error) {
      console.error('Error add message:', error);
    }
  };

  return (
    <div className="col p-0 h-100 ">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {' '}
              {activeChannel && activeChannel.name}
            </b>
          </p>
          <span className="text-muted">{t('chat.message', { count: countMessages })}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {countMessages > 0 ? (
            messages.map((message) => {
              const {
                body, username, id, channelId,
              } = message;
              return channelId === activeChannelId && (
                <div key={id} className="text-break mb-2">
                  <b>{username}</b>
                  {': '}
                  {body}
                  <button type="submit" disabled="" className="btn" />
                </div>
              );
            })
          ) : (
            <div>Нет сообщений...</div>
          )}
        </div>
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
      </div>
    </div>
  );
};

export default MessagesBox;
