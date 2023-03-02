/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import { io } from 'socket.io-client';
import addIcon from '../../assets/images/add_icon.svg';
import './styles.css';

const AddChannelModal = ({ newChannels, setNewChannels }) => {
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

  const addChannel = () => {
    console.log('add');
    socket.emit('newChannel', { name: newChannelName });
    socket.on('newChannel', (payload) => {
      console.log('on add');

      setNewChannels([...newChannels, payload]);
      console.log(newChannels); // { id: 6, name: "new channel", removable: true }
      console.log(payload); // { id: 6, name: "new channel", removable: true }
    });
    handleClose();
    setNewChannelName('');
  };

  return (
    <>
      <img className="modal_image" src={addIcon} alt="add channel" onClick={handleShow} />

      <Modal centered show={isShowModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить новый канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmit} className="modal_body">
            <Form.Group controlId="validationChanelName">
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="New channel name"
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
                Добавить
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddChannelModal;
