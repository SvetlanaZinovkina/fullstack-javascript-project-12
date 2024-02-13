import React from 'react';
import LoginForm from '../components/loginForm.jsx';
import Navigation from '../components/navigation.jsx';

const Login = () => (
  <div className="d-flex flex-column h-100">
    <Navigation />
    <LoginForm />
  </div>
);

export default Login;
