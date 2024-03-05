import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { useDispatch } from 'react-redux';
import store from './services/store.js';
import i18n from './i18n';
import Login from './pages/login.jsx';
import NotFound from './pages/notFound.jsx';
import Chat from './pages/chat.jsx';
import { ApiProvider, socket } from './ApiProvider.jsx';
import { addChannelState, removeChannelState, renameChannelState } from './slices/channelsSlice.js';
import { addMessageState } from './slices/messagesSlice.js';

const App = () => {
  const dispatch = useDispatch();
  socket.on('newMessage', (message) => {
    dispatch(addMessageState(message));
  });
  socket.on('newChannel', (channel) => {
    dispatch(addChannelState(channel));
  });
  socket.on('removeChannel', (channel) => {
    dispatch(removeChannelState(channel));
  });
  socket.on('renameChannel', (payload) => {
    dispatch(renameChannelState(payload));
    console.log(payload); // { id: 7, name: "new name channel", removable: true }
  });

  return (
    <I18nextProvider i18n={i18n}>
      <ApiProvider>
        <Router>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Chat />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </ApiProvider>
    </I18nextProvider>
  );
};
export default App;
