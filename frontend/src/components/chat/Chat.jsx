import React from 'react';
import { Navigate } from 'react-router-dom';

const Chat = () => {
  if (!localStorage.token) return <Navigate to="/login" />;

  return (
    <p>Chat</p>
  );
};

export default Chat;
