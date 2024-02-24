import './App.css';
import React from 'react';
import io from 'socket.io-client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Login from './pages/login.jsx';
import NotFound from './pages/notFound.jsx';
import Chat from './pages/chat.jsx';

const socket = io('http://localhost:3000');

const App = () => (
  <I18nextProvider i18n={i18n}>
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Chat socket={socket} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  </I18nextProvider>
);

export default App;
