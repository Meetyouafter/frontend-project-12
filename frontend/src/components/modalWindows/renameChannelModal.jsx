/* eslint-disable functional/no-let */
import React, { useState } from 'react';
import {
  Form, Button, Modal, InputGroup,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { renameChannel } from '../../store/slices/channels/channelSlice';
import './styles.css';

const RenameChannelModal = ({ channelId }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');
  const [formerror, setFormError] = useState('');

  const handleClose = () => setIsShowModal(false);
  const handleShow = () => setIsShowModal(true);

  const dispatch = useDispatch();

  const validate = () => {
    let error = '';
    if (!newChannelName) {
      error = 'Поле обязательно для заполнения';
    } else if (newChannelName.length < 3 || newChannelName.length > 20) {
      error = 'От 3 до 20 символов';
    }

    setFormError(error);
    return !error.length;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      dispatch(renameChannel({ id: channelId, name: newChannelName }));
      setNewChannelName('');
      handleClose();
    }
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
