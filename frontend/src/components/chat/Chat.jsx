/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { getChannel } from '../../store/slices/channel/channelSlice';
import LayoutContainer from '../layoutContainer/LayoutContainer';
import './styles.css';

const Chat = () => {
  const [activeChat, setActiveChat] = useState(1);

  if (!localStorage.token) return <Navigate to="/sign_up" />;

  const dispatch = useDispatch();
  const channelData = useSelector((state) => state.channel);
  const channels = (channelData.channels[0]?.channels);

  useEffect(() => {
    dispatch(getChannel());
  }, [dispatch]);

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

  console.log(activeChat);

  { if (channelData.channels.length > 0) {
    return (
      <LayoutContainer>
        <Container className="chat_wrapper">
          <Row className="channels_container">
            <Col>
              <div>Каналы</div>
              {channels.map((channel) => (
                <div
                  key={channel.id}
                  onClick={() => {
                    setActiveChat(channel.id);
                  }}
                  className={activeChat === channel.id ? 'chat active_chat' : 'chat'}
                >
                  #
                  {channel.name}
                </div>
              ))}
            </Col>
          </Row>
          <Row className="messages_wrapper">
            <Col>
              <div className="messages_title">
                <p>
                  #
                  {channels[activeChat - 1].name}
                </p>
                <p>0 сообщений</p>
                <div className="messages_container">
                  Messages
                </div>
              </div>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Введите сообщение"
                  aria-label="Введите сообщение"
                  aria-describedby="basic-addon2"
                />
                <Button variant="outline-secondary" id="button-addon2">
                  Отправить
                </Button>
              </InputGroup>
            </Col>
          </Row>
        </Container>
      </LayoutContainer>
    );
  } }

  return (<div>RRR</div>);
};

export default Chat;
