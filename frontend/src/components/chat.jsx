import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setChannels } from '../slices/channelsSlice.js';
import { setMessages } from '../slices/messagesSlice.js';
import { setUserToken } from '../slices/loginSlice.js';
import {
  useGetChannelsQuery,
  useGetMessagesQuery,
} from '../services/api.js';
import Channels from './channels.jsx';
import MessagesBox from './messagesBox.jsx';

const ChatForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  const channelsQuery = useGetChannelsQuery();
  const messagesQuery = useGetMessagesQuery();

  useEffect(() => {
    if (channelsQuery.isSuccess && messagesQuery.isSuccess) {
      dispatch(setChannels(channelsQuery.data));
      dispatch(setMessages(messagesQuery.data));
    }
  }, [channelsQuery.isSuccess, messagesQuery.isSuccess, channelsQuery.data, messagesQuery.data, dispatch]);

  if (!token) {
    return navigate('/login');
  }

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <MessagesBox />
      </div>
    </div>
  );
};

export default ChatForm;
