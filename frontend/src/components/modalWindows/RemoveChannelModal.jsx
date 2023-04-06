import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import SocketService from '../../api/SocketService';
import './styles.css';

const RemoveChannelModal = ({ channelId }) => {
  const [show, setShow] = useState(false);

  const { t } = useTranslation('translation', { keyPrefix: 'modal.removeModal' });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const callback = (status) => {
    if (status === 'success') {
      handleClose();
      toast.success(t('notification'));
    } else {
      handleClose();
      toast.error(t('error_notification'));
    }
  };

  const handleClick = () => {
    SocketService.removeCurrentChannel({ id: channelId }, callback);
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
