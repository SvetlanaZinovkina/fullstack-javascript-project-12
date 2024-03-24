import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';
import { useDispatch } from 'react-redux';
import i18n from './i18n';
import Login from './pages/login.jsx';
import NotFound from './pages/notFound.jsx';
import Signup from './pages/signup.jsx';
import Chat from './pages/chat.jsx';
import { socket } from './socket.js';
import { addChannelState, removeChannelState, renameChannelState } from './slices/channelsSlice.js';
import { addMessageState } from './slices/messagesSlice.js';
import routes from './routes/routes.js';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  environment: 'production',
};

const App = () => {
  const dispatch = useDispatch();

  socket.on('newMessage', (message) => dispatch(addMessageState(message)));
  socket.on('newChannel', (channel) => dispatch(addChannelState(channel)));
  socket.on('removeChannel', (channel) => dispatch(removeChannelState(channel)));
  socket.on('renameChannel', (payload) => dispatch(renameChannelState(payload)));

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Router>
            <Routes>
              <Route path={routes.notFound()} element={<NotFound />} />
              <Route path={routes.chat()} element={<Chat />} />
              <Route path={routes.login()} element={<Login />} />
              <Route path={routes.signup()} element={<Signup />} />
            </Routes>
          </Router>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};
export default App;
