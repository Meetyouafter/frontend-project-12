import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Row, InputGroup, Form, Col, Button,
} from 'react-bootstrap';
import getInitialData from '../../store/slices/initialData/getInitialData';
import ChannelItem from '../channelItem/ChannelItem';
import AddChannelModal from '../modalWindows/addChannelModal';
import Loader from '../loader/loader';
import { getMessageNameCount, getActiveChannelName, getMessagesCount } from './helper';
import sendImage from '../../assets/images/send_icon.svg';
import swearsFilter from '../../services/swearsFilter/swearsFilter';
import './styles.css';
import SocketService from '../../api/chatEvents';

const Chat = () => {
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const appData = useSelector((state) => state);
  const { messages } = appData.messages;
  const { channels } = appData.channels;

  console.log(appData);

  const messagesLoading = appData.messages.isLoading;
  const channelsLoading = appData.channels.isLoading;
  const messagesError = appData.messages.errors;
  const channelsError = appData.channels.errors;

  const { currentChannel } = appData.channels;

  const { t } = useTranslation('translation', { keyPrefix: 'chat' });

  const user = JSON.parse(localStorage.getItem('user'));

  const messageNameCount = getMessageNameCount(getMessagesCount(currentChannel, messages));

  const token = (JSON.parse((localStorage.getItem('token'))));

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

  if (!localStorage.token) return <Navigate to="/" />;

  if (messagesLoading && channelsLoading) {
    return (
      <Loader />
    );
  }

  if (messagesError || channelsError) {
    if (messagesError.errors === 'Request failed with status code 401') return <Navigate to="/signup" />;
    return (
      <div>
        <p>
          Error:
          {' '}
          {messagesError || channelsError}
        </p>
      </div>
    );
  }

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
              currentChannel={currentChannel}
            />
          ))}
        </Col>
      </Row>
      <Row className="messages_wrapper">
        <Col className="channels_container messages_box">
          <div className="messages_header">
            <p className="header_channel">
              #
              {getActiveChannelName(channels, currentChannel)}
            </p>
            <p className="header_channel">
              {getMessagesCount(currentChannel, messages)}
              {' '}
              {t('message', { messageCount: messageNameCount })}
            </p>
          </div>
          <div className="messages_container">
            {messages
              .filter((mess) => mess.channelId === currentChannel)
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
        </Col>
      </Row>
    </div>
  );
};

export default Chat;
