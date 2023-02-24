import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import SignUp from './components/signUp/SignUp';
import ErrorPage from './components/error/Error';
import Chat from './components/chat/Chat';
import store from './store';
import Login from './components/login/Login';
import './App.css';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Chat />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;
