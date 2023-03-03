import React from 'react';
import { LayoutContainer } from '../components/layoutContainer/LayoutContainer';
import Header from '../components/header/Header';
import Chat from '../components/chat/Chat';

const ChatPage = () => (
  <>
    <Header withBackBtn />
    <LayoutContainer>
      <Chat />
    </LayoutContainer>
  </>
);

export default ChatPage;
