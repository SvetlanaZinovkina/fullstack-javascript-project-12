import React from 'react';
import { useNavigate } from 'react-router';
import Channels from './channels.jsx';
import MessagesBox from './messagesBox.jsx';

const ChatForm = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

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
