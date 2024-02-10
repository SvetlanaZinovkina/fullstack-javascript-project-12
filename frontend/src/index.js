import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App.jsx';
import './i18n.js';
import store from './services/index.js';

const root = ReactDOM.createRoot(document.querySelector('body'));
// eslint-disable-next-line functional/no-expression-statements
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
