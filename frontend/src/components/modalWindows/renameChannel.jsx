/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
//  import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { io } from 'socket.io-client';
import './styles.css';

/*
const RenameChatSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов'),
});

const initialForm = {
  name: '',
};
*/

const RenameChannelModal = () => {
  const [show, setShow] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Переименовать канал</Modal.Title>
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
          <Button variant="primary" className="modal_button" onClick={renameChannel}>
            Переименовать
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RenameChannelModal;
