/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { io } from 'socket.io-client';
import './styles.css';

const RemoveChannelModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const socket = io();

  const removeChannel = () => {
    console.log('remove');
    socket.emit('removeChannel', { id: 6 });
    socket.on('removeChannel', (response) => {
      console.log(response); // { id: 6 };
    });
    handleClose();
  };

  return (
    <>
      <p onClick={handleShow} className="modal_primary_title">
        Удалить
      </p>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Удалить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>Вы уверены?</Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="primary" className="modal_button" onClick={handleClose}>
            Отменить
          </Button>
          <Button variant="danger" className="modal_button" onClick={removeChannel}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RemoveChannelModal;
