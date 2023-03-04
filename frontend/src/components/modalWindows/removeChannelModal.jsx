import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { removeChannel } from '../../store/slices/channels/channelSlice';
import './styles.css';

const RemoveChannelModal = ({ channelId }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(removeChannel({ id: channelId }));
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
          <Button variant="danger" className="modal_button" onClick={handleClick}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RemoveChannelModal;
