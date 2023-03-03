import React from 'react';
import { LayoutContainerForAuth } from '../components/layoutContainer/LayoutContainer';
import Header from '../components/header/Header';
import SignUp from '../components/auth/SignUp';

const SignUpPage = () => (
  <>
    <Header />
    <LayoutContainerForAuth height="70%">
      <SignUp />
    </LayoutContainerForAuth>
  </>
);

export default SignUpPage;
