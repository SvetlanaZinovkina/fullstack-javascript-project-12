import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';
import { Provider, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import i18next from 'i18next';
import translationRU from './locales/ru.js';
import Login from './pages/login.jsx';
import NotFound from './pages/notFound.jsx';
import Signup from './pages/signup.jsx';
import Chat from './pages/chat.jsx';
import { addChannelState, removeChannelState, renameChannelState } from './slices/channelsSlice.js';
import { addMessageState } from './slices/messagesSlice.js';
import routes from './routes/routes.js';
import store from './services/store.js';
import { AuthProvider } from './context/authContext.jsx';

const App = () => {
  const socket = io();
  const dispatch = useDispatch();

  const resources = {
    ru: { translation: translationRU },
  };

  const options = {
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  };
  const i18n = i18next.createInstance();
  i18n
    .use(initReactI18next)
    .init(options);

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
            <AuthProvider>
              <Router>
                <Routes>
                  <Route path={routes.notFoundPage()} element={<NotFound />} />
                  <Route path={routes.mainPage()} element={<Chat />} />
                  <Route path={routes.loginPage()} element={<Login />} />
                  <Route path={routes.signUpPage()} element={<Signup />} />
                </Routes>
              </Router>
            </AuthProvider>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};
export default App;
