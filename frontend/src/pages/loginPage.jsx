import React from 'react';
import Login from '../components/auth/Login';
import { LayoutContainerForAuth } from '../components/layoutContainer/LayoutContainer';
import Header from '../components/header/Header';

const LoginPage = () => (
  <>
    <Header />
    <LayoutContainerForAuth height="60%">
      <Login />
    </LayoutContainerForAuth>
  </>
);

export default LoginPage;
