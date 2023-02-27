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
import NewChannel from '../newChannel/newChannel';
//  import { getMessages } from '../../store/slices/channel/messagesSlice';

const socket = io();

const Chat = () => {
  const [activeChannel, setActiveChannel] = useState(1);
  const [message, setMessage] = useState('');
  const [newMessages, setNewMessages] = useState([]);

  const dispatch = useDispatch();
  const channelData = useSelector((state) => state.channel);

  const channels = channelData.channels[0]?.channels;
  const messages = channelData.channels[0]?.messages;

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    dispatch(getChannel());
  }, [dispatch]);

  const getMessagesCount = () => {
    const first = messages.filter((mess) => mess.channelId === activeChannel);
    const second = newMessages.filter((mess) => mess.channelId === activeChannel);
    return first.length + second.length;
  };

  const handleClick = () => {
    socket.on('newMessage', (payload) => {
      setNewMessages([...newMessages, payload]);
    });
    socket.timeout(1000).emit('newMessage', { body: message, channelId: activeChannel, username: user }, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        console.log(response);
      }
    });
    setMessage('');
  };

  if (!localStorage.token) return <Navigate to="/sign_up" />;

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
                    {' '}
                    {channel.name}
                  </div>
                ))}
                <NewChannel channelName="hohoho" />
              </Col>
            </Row>
            <Row className="messages_wrapper">
              <Col className="channels_container messages_box">
                <div className="messages_header">
                  <p className="header_channel">
                    #
                    {channels[activeChannel - 1].name}
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
        </LayoutContainer>
      </>
    );
  } }

  return (<div>RRR</div>);
};

export default Chat;
