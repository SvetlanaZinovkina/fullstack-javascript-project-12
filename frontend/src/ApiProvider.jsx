import React, { useMemo } from 'react';
import io from 'socket.io-client';
import SocketContext from './context/socket.jsx';

export const socket = io();

export const ApiProvider = ({ children }) => {
  const emitData = (...args) => new Promise((resolve, reject) => {
    socket.timeout(3000).emit(...args, (error, response) => {
      if (response?.status === 'ok') {
        resolve(response);
      }
      reject(error);
    });
  });

  const socketApi = {
    addMessage: (message) => emitData('newMessage', message),
    addChannel: (channel) => emitData('newChannel', channel),
    renameChannel: (channel) => emitData('renameChannel', channel),
    removeChannel: (channel) => emitData('removeChannel', channel),
  };

  // const socketApi = useMemo(() => ({
  //   addMessage: (message) => emitData('newMessage', message),
  //   addChannel: (channel) => emitData('newChannel', channel),
  //   renameChannel: (channel) => emitData('renameChannel', channel),
  //   removeChannel: (channel) => emitData('removeChannel', channel),
  // }), []);

  return (
    <SocketContext.Provider value={socketApi}>
      {children}
    </SocketContext.Provider>
  );
};
