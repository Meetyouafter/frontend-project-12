/* eslint-disable functional/no-let */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, InputGroup, Modal, Form,
} from 'react-bootstrap';
import SocketService from '../../api/sockets/SocketService';
import { setNotificationProps } from '../../store/slices/notification/notificationSlice';
import swearsFilter from '../../services/swearsFilter/swearsFilter';
import addIcon from '../../assets/images/add_icon.svg';
import './styles.css';

const AddChannelModal = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');
  const [formerror, setFormError] = useState('');

  const { t } = useTranslation('translation', { keyPrefix: 'modal.addModal' });
  const dispatch = useDispatch();

  const channels = useSelector((state) => state.channels.channels);
  const channelsNames = channels.map((channel) => channel.name);

  const handleClose = () => {
    setIsShowModal(false);
    setNewChannelName('');
  };

  const handleShow = () => setIsShowModal(true);

  const validate = () => {
    let error = '';
    if (!newChannelName) {
      error = t('required_error');
    } else if (newChannelName.length < 3 || newChannelName.length > 20) {
      error = t('length_error');
    } else if (channelsNames.includes(newChannelName)) {
      error = t('unique_error');
    }

    setFormError(error);
    return !error.length;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      SocketService.addNewChannel({ name: swearsFilter(newChannelName) });
      setNewChannelName('');
      handleClose();
      dispatch(setNotificationProps({
        variant: 'success',
        text: t('notification'),
        isShow: true,
      }));
    }
  };

  return (
    <>
      <Button onClick={handleShow} variant="outline-light">
        <img className="modal_image" src={addIcon} alt="add channel" />
        <span className="visually-hidden">+</span>
      </Button>
      <Modal centered show={isShowModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmit} className="modal_body">
            <Form.Group controlId="validationChanelName">
              <InputGroup hasValidation className="modal_form">
                <Form.Control
                  type="text"
                  placeholder={t('input_form')}
                  htmlFor="add channel input"
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
                <Form.Label visuallyHidden>
                  {t('label')}
                </Form.Label>
              </InputGroup>
            </Form.Group>
            <div className="modal_button_group">
              <Button variant="secondary" onClick={handleClose}>
                {t('escape_button')}
              </Button>
              <Button variant="primary" type="submit">
                {t('success_button')}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddChannelModal;