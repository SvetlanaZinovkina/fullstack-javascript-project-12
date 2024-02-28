import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import store from './services/store.js';
import i18n from './i18n';
import Login from './pages/login.jsx';
import NotFound from './pages/notFound.jsx';
import Chat from './pages/chat.jsx';
import { ApiProvider, socket } from './ApiProvider.jsx';
import { addChannelState } from './slices/channelsSlice.js';
import { addMessageState } from './slices/messagesSlice.js';

const App = () => {
  socket.on('newMessage', (message) => {
    store.dispatch(addMessageState(message));
  });
  socket.on('newChannel', (channel) => {
    store.dispatch(addChannelState(channel));
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
