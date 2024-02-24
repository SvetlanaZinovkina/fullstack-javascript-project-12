import React from 'react';
import Navigation from '../components/navigation.jsx';
import ChatForm from '../components/chat.jsx';

const Chat = ({ socket }) => (
  <>
    <Navigation />
    <ChatForm socket={socket} />
  </>
);

export default Chat;
