import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import ErrorPage from './components/error/Error';
import './App.css';
import Chat from './components/chat/Chat';
import { Provider } from 'react-redux';
import store from './store';

const App = () => (
  <Provider store={store}>
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Chat />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
  </Provider>
);

export default App;
