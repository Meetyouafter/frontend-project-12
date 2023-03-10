/* eslint-disable functional/no-let */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Form, Button, Modal, InputGroup,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { renameChannel } from '../../store/slices/channels/channelSlice';
import Notification from '../notification/Notification';
import './styles.css';

const RenameChannelModal = ({ channelId }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');
  const [formerror, setFormError] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const toggleShow = () => setShowNotification(!showNotification);

  const handleClose = () => setIsShowModal(false);
  const handleShow = () => setIsShowModal(true);

  const { t } = useTranslation('translation', { keyPrefix: 'modal.renameModal' });

  const dispatch = useDispatch();

  const validate = () => {
    let error = '';
    if (!newChannelName) {
      error = t('required_error');
    } else if (newChannelName.length < 3 || newChannelName.length > 20) {
      error = t('length_error');
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
      toggleShow();
    }
  };

  return (
    <>
      <p onClick={handleShow} className="modal_primary_title">
        {t('rename_link')}
      </p>
      <Modal centered show={isShowModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmit} className="modal_body">
            <Form.Group controlId="validationChanelName">
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder={t('input_form')}
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
                {t('escape_button')}
              </Button>
              <Button variant="primary" className="modal_button" type="submit">
                {t('success_button')}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Notification variant="success" text={t('notification')} show={showNotification} toggleShow={toggleShow} />
    </>
  );
};

export default RenameChannelModal;
