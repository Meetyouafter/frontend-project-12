/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { io } from 'socket.io-client';
import getInitialData from '../../store/slices/initialData/getInitialData';
import ChannelItem from '../channelItem/ChannelItem';
import AddChannelModal from '../modalWindows/addChannelModal';
import Notification from '../notification/Notification';
import Loader from '../loader/loader';
import { addMessage, subscribeMessages } from '../../store/slices/messages/messageSlice';
import chatEvents from '../../api/chatEvents';
import './styles.css';
import { subscribeChannels, subscribeChannelsRename, subscribeChannelsRemove } from '../../store/slices/channels/channelSlice';

const socket = io();

const Chat = () => {
  const [activeChannel, setActiveChannel] = useState(1);
  const [message, setMessage] = useState('');
  const [isShowNotification, setIsShowNotification] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const initialData = useSelector((state) => state.initialData);
  const newMessages = useSelector((state) => state.messages.messages);
  const newChannels = useSelector((state) => state.channels.channels);

  const channels = initialData?.initialData[0]?.channels || [];
  const messages = initialData?.initialData[0]?.messages || [];

  console.log(state);
  console.log(newChannels);

  const activeChannelName = 12;

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
      const newMessage = { body: message, channelId: activeChannel, username: user };
      dispatch(addMessage(newMessage));
      setMessage('');
    }
  };

  const getMessagesCount = () => {
    const first = messages.filter((mess) => mess.channelId === activeChannel);
    const second = newMessages.filter((mess) => mess.channelId === activeChannel);
    return first.length + second.length;
  };

  if (!localStorage.token) return <Navigate to="/login" />;

  if (initialData.isLoading) {
    return (
      <Loader />
    );
  }

  if (initialData.errors) {
    if (initialData.errors === 'Request failed with status code 401') return <Navigate to="/sign_up" />;
    return (
      <div>
        <p>
          Error:
          {' '}
          {initialData.errors}
        </p>
      </div>
    );
  }

  console.log(activeChannelName);

  { if (channels.length > 0) {
    return (
      <>
        <Notification show={isShowNotification} setShow={setIsShowNotification} />
        <div className="chat_wrapper">
          <Row className="channels_wrapper">
            <Col className="channels_container">
              <div className="channels_header" onClick={setIsShowNotification}>
                Каналы (
                {channels.length}
                )
                <AddChannelModal />
              </div>
              {channels.map((channel) => (
                <ChannelItem
                  activeChannel={activeChannel}
                  setActiveChannel={() => setActiveChannel(channel.id)}
                  channelData={channel}
                  key={channel.id}
                />
              ))}
              {newChannels.map((channel) => (
                <ChannelItem
                  activeChannel={activeChannel}
                  setActiveChannel={() => setActiveChannel(channel.id)}
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
                  {activeChannelName}
                </p>
                <p className="header_channel">
                  {getMessagesCount()}
                  {' '}
                  сообщений
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
                {newMessages
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
              <InputGroup className="mb-3 bb">
                <Form.Control
                  placeholder="Введите сообщение"
                  aria-label="Введите сообщение"
                  aria-describedby="basic-addon2"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
                <Button
                  variant="outline-secondary"
                  id="button-addon2"
                  className="send_message_button"
                  onClick={handleClick}
                  disabled={!message}
                >
                  Отправить
                </Button>
              </InputGroup>
            </Col>
          </Row>
        </div>
      </>
    );
  } }

  return (<Loader />);
};

export default Chat;
