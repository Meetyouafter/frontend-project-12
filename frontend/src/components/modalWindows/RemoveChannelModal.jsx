import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Modal } from 'react-bootstrap';
<<<<<<< HEAD
import { setNotificationProps } from '../../store/slices/notificationSlice';
import SocketService from '../../api/SocketService';
=======
import { setNotificationProps } from '../../store/slices/notification/notificationSlice';
import SocketService from '../../api/sockets/SocketService';
>>>>>>> parent of 3144111 (refactoring api)
import './styles.css';

const RemoveChannelModal = ({ channelId }) => {
  const [show, setShow] = useState(false);

  const { t } = useTranslation('translation', { keyPrefix: 'modal.removeModal' });
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = () => {
    SocketService.removeCurrentChannel({ id: channelId });
    handleClose();
    dispatch(setNotificationProps({
      variant: 'success',
      text: t('notification'),
      isShow: true,
    }));
  };

  return (
    <>
      <Button variant="outlined-light" onClick={handleShow} className="open_modal_button">
        {t('remove_link')}
        <span className="visually-hidden">{t('remove_link')}</span>
      </Button>

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
    </>
  );
};

export default RemoveChannelModal;
