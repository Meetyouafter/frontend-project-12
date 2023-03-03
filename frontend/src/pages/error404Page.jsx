import React from 'react';
import { LayoutContainer } from '../components/layoutContainer/LayoutContainer';
import Header from '../components/header/Header';
import Error404 from '../components/errors/error404';

const ChatPage = () => (
  <>
    <Header withBackBtn />
    <LayoutContainer>
      <Error404 />
    </LayoutContainer>
  </>
);

export default ChatPage;
