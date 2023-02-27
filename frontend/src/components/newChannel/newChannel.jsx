import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { io } from 'socket.io-client';

const RemoveModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Удалить
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const RenameModal = () => {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Example textarea</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

const ChannelMenu = () => {
  const socket = io();
/*
  const removeChannel = () => {
    console.log('remove');
    socket.emit('removeChannel', { id: 6 });
    socket.on('removeChannel', (response) => {
      console.log(response); // { id: 6 };
    });
  };
*/

  const removeChannel = () => <RemoveModal />;

  const renameChannel = () => {
    console.log('rename');
    socket.emit('renameChannel', { id: 7, name: 'new name channel' });
    socket.on('renameChannel', (response) => {
      console.log(response); // { id: 7, name: "new name channel", removable: true }
    });
  };

  return (
    <DropdownButton id="dropdown-basic-button" title="">
      <RemoveModal />
      <RenameModal />
    </DropdownButton>
  );
};

const NewChannel = ({ channelName }) => {
  const ee = 4;
  return (
    <div
      className="chat"
    >
      #
      {' '}
      {channelName}
      {ee}
      <ChannelMenu />
    </div>
  );
};

export default NewChannel;
