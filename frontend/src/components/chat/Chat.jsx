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
import ChannelItem from '../channelItem/ChannelItem';
import AddChannelModal from '../modalWindows/addChannelModal';
import './styles.css';
import Notification from '../notification/Notification';

const socket = io();

const Chat = () => {
  const [activeChannel, setActiveChannel] = useState(1);
  const [message, setMessage] = useState('');
  const [newMessages, setNewMessages] = useState([]);
  const [newChannels, setNewChannels] = useState([]);

  const [isShowNotification, setIsShowNotification] = useState(false);


  const dispatch = useDispatch();
  const channelData = useSelector((state) => state.channel);

  const activeChannelName = useSelector((state) => state.channel.channels[activeChannel]);
  const activeChannelName1 = useSelector((state) => state.channel.channels.channels);
  const activeChannelName2 = useSelector((state) => state.channel.channels[0]);

  const channels = channelData.channels[0]?.channels;
  const messages = channelData.channels[0]?.messages;

  const user = JSON.parse(localStorage.getItem('user'));

  console.log(0, activeChannelName);
  console.log(1, activeChannelName1);
  console.log(2, activeChannelName2?.channels[activeChannel - 1]?.name);

  useEffect(() => {
    dispatch(getChannel());
  }, [dispatch]);

  console.log(channelData);

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

  console.log(activeChannelName);

  { if (channelData.channels.length > 0) {
    return (
      <>
        <Notification show={isShowNotification} setShow={setIsShowNotification}/>
        <Header />
        <LayoutContainer>
          <div className="chat_wrapper">
            <Row className="channels_wrapper">
              <Col className="channels_container">
                <div className="channels_header" onClick={setIsShowNotification}>
                  Каналы (
                  {channelData.channels.length + 1}
                  )
                  <AddChannelModal newChannels={newChannels} setNewChannels={setNewChannels} />
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
        </LayoutContainer>
      </>
    );
  } }

  return (<div>RRR</div>);
};

export default Chat;
