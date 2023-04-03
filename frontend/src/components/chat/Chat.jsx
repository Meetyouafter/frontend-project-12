import React, { useEffect, useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Row, InputGroup, Form, Col, Button, Container,
} from 'react-bootstrap';
import getInitialData from '../../store/getInitialData';
import Channel from '../channel/Channel';
import AddChannelModal from '../modalWindows/AddChannelModal';
import Error from '../errors/Error';
import Header from '../header/Header';
import Loader from '../loader/Loader';
import {
  getMessageNameCount, getActiveChannelName, getMessagesCount, scrollToBottom,
} from './functions';
import sendImage from '../../assets/images/send_icon.svg';
import { swearsFilter } from '../../services/textService';
import SocketService from '../../api/SocketService';
import RouteService from '../../api/RouteService';
import './styles.css';

const Chat = () => {
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const appData = useSelector((state) => state);
  const { messages } = appData.messages;
  const { channels } = appData.channels;

  const messagesLoading = appData.messages.isLoading;
  const channelsLoading = appData.channels.isLoading;
  const appLoading = messagesLoading && channelsLoading;

  const messagesError = appData.messages.errors;
  const channelsError = appData.channels.errors;
  const appError = messagesError || channelsError;

  const { currentChannel } = appData.channels;
  const { t } = useTranslation('translation', { keyPrefix: 'chat' });

  const channelsRef = useRef(null);
  const messagesRef = useRef(null);

  useEffect(() => {
    scrollToBottom(messagesRef);
  }, [messages]);

  const getDataFromStorage = () => {
    const userData = localStorage.getItem('user') || null;
    const tokenData = localStorage.getItem('token') || null;
    if (userData) {
      const user = JSON.parse(userData);
      const token = JSON.parse(tokenData);
      return { user, token };
    }
    const user = null;
    const token = null;
    return { user, token };
  };

  const { user, token } = getDataFromStorage();

  const messageNameCount = getMessageNameCount(getMessagesCount(currentChannel, messages));

  const getStyleForMessage = (name) => {
    if (name === user) {
      return 'username message_author';
    }
    return 'username';
  };

  useEffect(() => {
    dispatch(getInitialData(token));
  }, [dispatch, token]);

  const handleClick = (e) => {
    e.preventDefault();
    if (message.trim().length > 0) {
      const newMessage = {
        body: swearsFilter(message), channelId: currentChannel, username: user,
      };
      SocketService.addNewMessage(newMessage);
      setMessage('');
    }
  };

  if (!localStorage.token) return <Navigate to={RouteService.logIn} />;

  if (appLoading) {
    return (
      <Loader />
    );
  }

  if (appError) {
    if (appError === 'Request failed with status code 401') {
      return <Navigate to={RouteService.logIn} />;
    }
    return <Error error={appError} />;
  }

  return (
    <>
      <Header withBackBtn />
      <Container className="layout_container">
        <Row className="channels_wrapper">
          <Col>
            <div className="channels_header">
              <span>
                {t('channels')}
                {' '}
                (
                {channels.length}
                )
              </span>
              <AddChannelModal />
            </div>
            <div className="channels_container" ref={channelsRef}>
              {channels.map((channel) => (
                <Channel
                  channelData={channel}
                  key={channel.id}
                  currentChannel={currentChannel}
                />
              ))}
            </div>
          </Col>
        </Row>
        <Row className="messages_wrapper">
          <Col>
            <div className="messages_header">
              <p className="header_channel">
                {getActiveChannelName(channels, currentChannel)}
              </p>
              <p>
                {getMessagesCount(currentChannel, messages)}
                {' '}
                {t('message', { messageCount: messageNameCount })}
              </p>
            </div>
            <div className="messages_form_container">
              <div className="messages_container" ref={messagesRef}>
                {messages
                  .filter((mess) => mess.channelId === currentChannel)
                  .map((mess) => (
                    <div key={mess.id}>
                      <span className={`${getStyleForMessage(mess.username)}`}>
                        {mess.username}
                        :
                        {' '}
                      </span>
                      <span className="message">{mess.body}</span>
                    </div>
                  ))}
              </div>
              <form onSubmit={handleClick} className="send_form">
                <InputGroup className="bb">
                  <Form.Control
                    placeholder={t('message_form')}
                    aria-label={t('message_label')}
                    aria-describedby="basic-addon2"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                  />
                  <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    className="send_message_button"
                    type="submit"
                    disabled={!message}
                  >
                    <img src={sendImage} alt="send message" />
                  </Button>
                </InputGroup>
              </form>
            </div>

          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Chat;
