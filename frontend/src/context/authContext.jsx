import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const tokenLocal = localStorage.getItem('token');

  const setUser = (token, username) => {
    setToken(token);
    setUsername(username);
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  const isAuthenticated = () => !!tokenLocal;

  return (
    <AuthContext.Provider value={{
      token, username, setUser, logout, isAuthenticated,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};
