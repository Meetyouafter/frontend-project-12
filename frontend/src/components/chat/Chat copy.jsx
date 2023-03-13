/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Row, InputGroup, Form, Col, Button,
} from 'react-bootstrap';
import { io } from 'socket.io-client';
import getInitialData from '../../store/slices/initialData/getInitialData';
import ChannelItem from '../channelItem/ChannelItem';
import AddChannelModal from '../modalWindows/addChannelModal';
import Loader from '../loader/loader';
import { addMessage, subscribeMessages } from '../../store/slices/messages/messageSlice';
import chatEvents from '../../api/chatEvents';
import { subscribeChannels, subscribeChannelsRename, subscribeChannelsRemove } from '../../store/slices/channels/channelSlice';
import getMessageNameCount from './getMessageNameCount';
import sendImage from '../../assets/images/send_icon.svg';
import './styles.css';
import swearsFilter from '../../services/swearsFilter/swearsFilter';

const socket = io();

const Chat = () => {
  const [activeChannel, setActiveChannel] = useState(1);
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'chat' });

  //  const state = useSelector((state) => state);
  const { channels } = useSelector((state) => state.channels);
  //  const { messages } = state.messages;
  const messages = [];

  //  console.log('messages', messages);
  //  console.log('state', state);
  console.log('channels', channels);

  const getActiveChannelName = (channelsData, activeIndex) => {
    const activeChannelName = channelsData
      .filter((channel) => channel.id === activeIndex)
      .map((channel) => channel.name);
    return activeChannelName;
  };

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    dispatch(getInitialData());
  }, [dispatch]);

  useEffect(() => {
    socket.on(chatEvents.newMessage, (payload) => {
      dispatch(subscribeMessages(payload));
    });
  }, [dispatch]);

  useEffect(() => {
    socket.on(chatEvents.newChannel, (payload) => {
      dispatch(subscribeChannels(payload));
    });
  }, [dispatch]);

  useEffect(() => {
    socket.on(chatEvents.renameChannel, (payload) => {
      dispatch(subscribeChannelsRename(payload));
    });
  }, [dispatch]);

  useEffect(() => {
    socket.on(chatEvents.removeChannel, (payload) => {
      dispatch(subscribeChannelsRemove(payload));
    });
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    if (message.length > 0) {
      const newMessage = { body: swearsFilter(message), channelId: activeChannel, username: user };
      dispatch(addMessage(newMessage));
      setMessage('');
    }
  };

  const getMessagesCount = () => {
    const first = messages.filter((mess) => mess.channelId === activeChannel);
    return first.length;
  };

  const messageCount = getMessageNameCount(getMessagesCount());

  if (!localStorage.token) return <Navigate to="/login" />;

  if (channels.isLoading) {
    return (
      <Loader />
    );
  }

  if (channels.errors) {
    if (channels.errors === 'Request failed with status code 401') return <Navigate to="/sign_up" />;
    return (
      <div>
        <p>
          Error:
          {' '}
          {channels.errors}
        </p>
      </div>
    );
  }

  if (channels.length) {
  return (
    <div className="chat_wrapper">
      <Row className="channels_wrapper">
        <Col className="channels_container">
          <div className="channels_header">
            {t('channels')}
            {' '}
            (
            {channels.length}
            )
            <AddChannelModal />
          </div>
          {channels.map((channel) => (
            <ChannelItem
              channelData={channel}
              key={channel.id}
            />
          ))}
        </Col>
      </Row>
      <Row className="messages_wrapper">
        <Col className="channels_container messages_box">
          <div className="messages_header">
            <p className="header_channel">
              #
              {getActiveChannelName(channels, activeChannel)}
            </p>
            <p className="header_channel">
              {getMessagesCount()}
              {' '}
              {t('message', { messageCount })}
            </p>
          </div>
          <div className="messages_container">
            {messages
              .filter((mess) => mess.channelId === activeChannel)
              .map((mess) => (
                <div key={mess.id}>
                  <span className="username">
                    {mess.username}
                    :
                    {' '}
                  </span>
                  <span className="message">{mess.body}</span>
                </div>
              ))}
          </div>
          <form onSubmit={handleClick} className="send_form">
            <InputGroup className="mb-3 bb">
              <Form.Control
                placeholder={t('message_form')}
                aria-label={t('message_form')}
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
        </Col>
      </Row>
    </div>
  );
              }
};

export default Chat;
