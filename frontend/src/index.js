import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App.jsx';
import './i18n.js';
import store from './services/store.js';

const appContainer = document.createElement('div');
appContainer.className = 'h-100';

document.body.appendChild(appContainer);

const root = ReactDOM.createRoot(appContainer);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
