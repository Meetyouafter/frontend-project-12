import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Error404 from './components/errors/error404';
import store from './store';
import Loader from './components/loader/loader';
import LoginPage from './pages/loginPage';
import SignUpPage from './pages/signUpPage';
import './App.css';
import ChatPage from './pages/chatPage';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/sign_up" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ChatPage />} />
        <Route path="/loader" element={<Loader />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;
