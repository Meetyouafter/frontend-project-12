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
import { getChannel } from '../../store/slices/channel/channelSlice';
import LayoutContainer from '../layoutContainer/LayoutContainer';
import Header from '../header/Header';
import './styles.css';
import { getMessages } from '../../store/slices/channel/messagesSlice';

const socket = io();

const Chat = () => {
  const [activeChannel, setActiveChannel] = useState(1);
  const [message, setMessage] = useState('');
  const [newMessages, setNewMessages] = useState([]);

  const dispatch = useDispatch();
  const channelData = useSelector((state) => state.channel);
  const messagesData = useSelector((state) => state.messages);
  const channels = channelData.channels[0]?.channels;
  const messages = channelData.channels[0]?.messages;

  console.log(messagesData);

  useEffect(() => {
    dispatch(getChannel());
    console.log('effect');
  }, [dispatch]);

  useEffect(() => {
    socket.on('newMessage', () => {
      console.log('newMessage');
    });
  }, []);

  const user = JSON.parse(localStorage.getItem('user'));

  const handleClick = () => {
    socket.emit('newMessage', { body: message, channelId: activeChannel, username: user });
    socket.on('newMessage', (payload) => {
      setNewMessages([...newMessages, payload]);
      // => { body: "new message", channelId: 7, id: 8, username: "admin" }
    });
    setMessage('');
  };

  if (!localStorage.token) return <Navigate to="/sign_up" />;

  console.log(channelData);

  if (channelData.isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (channelData.errors) {
    if (channelData.errors === 'Request failed with status code 401') return <Navigate to="/sign_up" />;
    return (
      <div>
        <p>
          Error:
          {' '}
          {channelData.errors}
        </p>
      </div>
    );
  }

  { if (channelData.channels.length > 0) {
    return (
      <>
        <Header />
        <LayoutContainer>
          <div className="chat_wrapper">
            <Row className="channels_wrapper">
              <Col className="channels_container">
                <div className="channels_header">
                  Каналы (
                  {channelData.channels.length + 1}
                  )
                </div>
                {channels.map((channel) => (
                  <div
                    key={channel.id}
                    onClick={() => {
                      setActiveChannel(channel.id);
                    }}
                    className={activeChannel === channel.id ? 'chat active_chat' : 'chat'}
                  >
                    #
                    {channel.name}
                  </div>
                ))}
              </Col>
            </Row>
            <Row className="messages_wrapper">
              <Col className="channels_container">
                <div className="messages_header">
                  <p>
                    #
                    {channels[activeChannel - 1].name}
                  </p>
                  <p>
                    {messages.length}
                    {' '}
                    сообщений
                  </p>
                </div>
                <div className="messages_container">
                  {messages.map((mess) => (
                    <div key={mess.id}>
                      <span>{mess.username}</span>
                      <span>{mess.body}</span>
                    </div>
                  ))}
                  {newMessages.map((mess) => (
                    <div key={mess.id}>
                      <span>{mess.username}</span>
                      <span>{mess.body}</span>
                    </div>
                  ))}
                  <InputGroup className="mb-3">
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
                      onClick={handleClick}
                      disabled={!message}
                    >
                      Отправить
                    </Button>
                  </InputGroup>
                </div>
              </Col>
            </Row>
          </div>
        </LayoutContainer>
      </>
    );
  } }

  return (<div>RRR</div>);
};

export default Chat;
