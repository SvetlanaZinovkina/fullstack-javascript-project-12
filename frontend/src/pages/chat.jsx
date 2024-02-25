import React from 'react';
import { useSelector } from 'react-redux';

import Navigation from '../components/navigation.jsx';
import ChatForm from '../components/chat.jsx';
import Modal from '../components/modal/modal.jsx';

const Chat = ({ socket }) => {
  const isModal = useSelector((state) => state.modal.isOpened);
  return (
    <>
      <Navigation />
      <ChatForm socket={socket} />
      {isModal && <Modal socket={socket} />}
    </>
  );
};

export default Chat;
