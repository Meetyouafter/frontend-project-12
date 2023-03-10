import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Modal } from 'react-bootstrap';
import { removeChannel } from '../../store/slices/channels/channelSlice';
import Notification from '../notification/Notification';
import './styles.css';

const RemoveChannelModal = ({ channelId }) => {
  const [show, setShow] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const toggleShow = () => setShowNotification(!showNotification);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { t } = useTranslation('translation', { keyPrefix: 'modal.removeModal' });

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(removeChannel({ id: channelId }));
    handleClose();
    toggleShow();
  };

  return (
    <>
      <p onClick={handleShow} className="modal_primary_title">
        {t('remove_link')}
      </p>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('description')}</Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="primary" className="modal_button" onClick={handleClose}>
            {t('escape_button')}
          </Button>
          <Button variant="danger" className="modal_button" onClick={handleClick}>
            {t('success_button')}
          </Button>
        </Modal.Footer>
      </Modal>
      <Notification variant="success" text={t('notification')} show={showNotification} toggleShow={toggleShow} />
    </>
  );
};

export default RemoveChannelModal;
