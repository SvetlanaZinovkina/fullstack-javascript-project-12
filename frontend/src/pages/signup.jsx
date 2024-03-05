import React from 'react';
import Navigation from '../components/navigation.jsx';
import SignupForm from '../components/signupForm.jsx';

const Signup = () => (
  <div className="d-flex flex-column h-100">
    <Navigation />
    <SignupForm />
  </div>
);

export default Signup;
