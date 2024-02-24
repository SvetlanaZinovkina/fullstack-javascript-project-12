import React from 'react';
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
import Messages from './messages.jsx';

const ChatForm = ({ socket }) => {
  const {
    data, isLoading, refetch,
  } = useGetChannelsQuery();
  const dispatch = useDispatch();
  dispatch(setChannels(data));
  const channels = useSelector((state) => state.channels.channels);
  const user = useSelector((state) => state.auth);
  const activeChannel = useSelector((state) => state.channels.activeChannel);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  if (isLoading) {
    return (
      <div className="spinner-border text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  if (!token) {
    return navigate('/login');
  }

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels socket={socket} />
        <Messages socket={socket} />
      </div>
    </div>
  );
};

export default ChatForm;
