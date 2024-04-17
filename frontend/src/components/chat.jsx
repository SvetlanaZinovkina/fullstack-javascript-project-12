import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setChannels } from '../slices/channelsSlice.js';
import { setMessages } from '../slices/messagesSlice.js';
import {
  useGetChannelsQuery,
  useGetMessagesQuery,
} from '../services/api.js';
import { AuthContext } from '../context/authContext.jsx';
import Channels from './channels.jsx';
import MessagesBox from './messagesBox.jsx';

const ChatForm = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isSuccess } = useGetChannelsQuery();
  const messagesQuery = useGetMessagesQuery();

  useEffect(
    () => {
      if (isSuccess && messagesQuery.isSuccess) {
        dispatch(setChannels(data));
        dispatch(setMessages(messagesQuery.data));
      }
    },
    [isSuccess, messagesQuery.isSuccess, data, messagesQuery.data, dispatch],
  );

  if (!isAuthenticated()) {
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
