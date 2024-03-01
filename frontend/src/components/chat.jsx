import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { setChannels, setActiveChannel } from '../slices/channelsSlice.js';
import { setUserToken } from '../slices/loginSlice.js';

import {
  useGetChannelsQuery,
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
  useGetMessagesQuery,
  useAddMessageMutation,
  useEditMessageMutation,
  useRemoveMessageMutation, useLoginMutation,
} from '../services/api.js';
import Channels from './channels.jsx';
import MessagesBox from './messagesBox.jsx';
import { setMessages } from '../slices/messagesSlice';

const ChatForm = ({ socket }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  if (!token) {
    return navigate('/login');
  }

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels socket={socket} />
        <MessagesBox socket={socket} />
      </div>
    </div>
  );
};

export default ChatForm;
