import React from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Navigation from '../components/navigation.jsx';
import ChatForm from '../components/chat.jsx';
import Modal from '../components/modal/modal.jsx';

const Chat = () => {
  const isModal = useSelector((state) => state.modal.isOpened);
  return (
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <Navigation />
        <ChatForm />
        {isModal && <Modal />}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Chat;
