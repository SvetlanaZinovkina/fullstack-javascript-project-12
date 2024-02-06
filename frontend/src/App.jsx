import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Login from './pages/login.jsx';
import NotFound from './pages/notFound.jsx';

const App = () => (
  <I18nextProvider i18n={i18n}>
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  </I18nextProvider>
);

export default App;
