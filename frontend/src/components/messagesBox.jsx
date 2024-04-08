import React, { useEffect, useRef } from 'react';
import { Field, Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import filter from 'leo-profanity';
import { useAddMessageMutation } from '../services/api.js';
import arrow from '../images/arrow.png';
import notify from '../utils/toast.js';
import { getActiveChannel, getChannels, getMessages } from '../selectors/selectors';

const MessagesBox = () => {
  const { t } = useTranslation();
  const [addMessage] = useAddMessageMutation();
  const messagesEndRef = useRef(null);

  const messagesSchema = Yup.object()
    .shape({
      message: Yup.string()
        .min(1, t('warnSchema.messages'))
        .required(t('warnSchema.required')),
    });

  const messages = useSelector(getMessages);
  const usernameLocalstorage = localStorage.getItem('username');
  const channels = useSelector(getChannels);
  const activeChannelId = useSelector(getActiveChannel);
  const activeChannel = channels.find(({ id }) => id === activeChannelId);
  const activeMsg = messages && messages.filter(({ channelId }) => channelId === activeChannelId);
  const countMessages = messages ? activeMsg.length : 0;

  useEffect(() => {
    messagesEndRef.current?.lastChild?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const onSubmit = async (messageValue, { resetForm }) => {
    const { message } = messageValue;
    const newMessage = {
      body: filter.clean(message),
      channelId: activeChannelId,
      username: usernameLocalstorage,
    };
    try {
      await addMessage(newMessage);
      resetForm();
    } catch (error) {
      notify(t('warnings.errNetwork'));
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
        <div
          id="messages-box"
          className="chat-messages overflow-auto px-5 "
          ref={messagesEndRef}
        >
          {countMessages > 0 ? (
            messages.map((message) => {
              const {
                body,
                username,
                id,
                channelId,
              } = message;
              return channelId === activeChannelId && (
                <div key={id} className="text-break mb-2">
                  <b>{username}</b>
                  {': '}
                  {body}
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
