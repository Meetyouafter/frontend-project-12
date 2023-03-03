/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import { io } from 'socket.io-client';
import './styles.css';

const RenameChannelModal = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');
  const [formerror, setFormError] = useState('');

  const handleClose = () => setIsShowModal(false);
  const handleShow = () => setIsShowModal(true);

  const validate = () => {
    let error = '';
    if (!newChannelName) {
      error = 'Поле обязательно для заполнения';
    } else if (newChannelName.length < 3 || newChannelName.length > 20) {
      error = 'От 3 до 20 символов';
    }

    setFormError(error);

    if (error.length === 0) {
      return true;
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log(true);
      setNewChannelName('');
      handleClose();
    } else {
      console.log(false);
    }
  };

  const socket = io();

  const renameChannel = () => {
    console.log('rename');
    socket.emit('renameChannel', { id: 7, name: 'new name channel' });
    socket.on('renameChannel', (payload) => {
      console.log('on add');
      console.log(payload); // { id: 7, name: "new name channel", removable: true }
    });
    handleClose();
    setNewChannelName('');
  };

  return (
    <>
      <p onClick={handleShow} className="modal_primary_title">
        Переименовать
      </p>

      <Modal centered show={isShowModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Переименовать канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmit} className="modal_body">
            <Form.Group controlId="validationChanelName">
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="New channel name"
                  htmlFor="rename channel input"
                  autoFocus
                  required
                  isInvalid={!!formerror}
                  value={newChannelName}
                  onChange={(e) => setNewChannelName(e.target.value)}
                  aria-describedby="inputGroupPrepend"
                />
                <Form.Control.Feedback type="invalid">
                  {formerror}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <div className="modal_button_group">
              <Button variant="secondary" className="modal_button" onClick={handleClose}>
                Отменить
              </Button>
              <Button variant="primary" className="modal_button" type="submit">
                Переименовать
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RenameChannelModal;
