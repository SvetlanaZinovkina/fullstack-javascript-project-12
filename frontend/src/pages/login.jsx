import React from 'react';
import LoginForm from '../components/loginForm.jsx';
import FooterLoginForm from '../components/footerLoginForm.jsx';
import Navigation from '../components/navigation.jsx';

const Login = () => (
  <>
    <Navigation />
    <LoginForm />
    <FooterLoginForm />
  </>
);

export default Login;
