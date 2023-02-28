/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { io } from 'socket.io-client';
import addIcon from '../../assets/images/add_icon.svg';
import './styles.css';

const AddChannelModal = ({ newChannels, setNewChannels }) => {
  const [show, setShow] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить новый канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="name"
                placeholder="New channel name"
                autoFocus
                value={newChannelName}
                onChange={(e) => setNewChannelName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="secondary" className="modal_button" onClick={handleClose}>
            Отменить
          </Button>
          <Button variant="primary" className="modal_button" onClick={addChannel}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddChannelModal;
