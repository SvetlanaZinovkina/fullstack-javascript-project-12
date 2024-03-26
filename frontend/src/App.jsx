import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';
import { Provider, useDispatch } from 'react-redux';
import i18n from './i18n.js';
import io from 'socket.io-client';
import Login from './pages/login.jsx';
import NotFound from './pages/notFound.jsx';
import Signup from './pages/signup.jsx';
import Chat from './pages/chat.jsx';
import { addChannelState, removeChannelState, renameChannelState } from './slices/channelsSlice.js';
import { addMessageState } from './slices/messagesSlice.js';
import routes from './routes/routes.js';
import store from './services/store.js';


const App = () => {
  const socket = io();
  const dispatch = useDispatch();

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    environment: 'production',
  };

  socket.on('newMessage', (message) => dispatch(addMessageState(message)));
  socket.on('newChannel', (channel) => dispatch(addChannelState(channel)));
  socket.on('removeChannel', (channel) => dispatch(removeChannelState(channel)));
  socket.on('renameChannel', (payload) => dispatch(renameChannelState(payload)));

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
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
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};
export default App;
