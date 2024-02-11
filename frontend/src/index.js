import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App.jsx';
import './i18n.js';
import store from './services/index.js';

const rootContainer = document.createElement('div');
// eslint-disable-next-line functional/no-expression-statements
document.body.appendChild(rootContainer);

const root = ReactDOM.createRoot(rootContainer);
// eslint-disable-next-line functional/no-expression-statements
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
