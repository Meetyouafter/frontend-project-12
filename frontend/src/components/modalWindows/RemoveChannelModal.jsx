import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSocket } from '../../context/SocketContext';
import './styles.css';

const RemoveChannelModal = ({ channelId, handleClose }) => {
  const [isShowModal, setIsShowModal] = useState(false);

  const { t } = useTranslation('translation', { keyPrefix: 'modal.removeModal' });
  const socket = useSocket();

  const handleCloseModal = () => setIsShowModal(false);
  const handleShow = () => {
    handleClose();
    setIsShowModal(true);
  };

  const getSocketStatusAction = (status) => {
    handleCloseModal();
    if (status === 'success') {
      toast.success(t('notification'));
    } else {
      toast.error(t('error_notification'));
    }
  };

  const handleClick = () => {
    socket.removeCurrentChannel({ id: channelId }, getSocketStatusAction);
  };

  return (
    <>
      <Button variant="outlined-light" onClick={handleShow} className="open_modal_button">
        {t('remove_link')}
        <span className="visually-hidden">{t('remove_link')}</span>
      </Button>

      <Modal centered show={isShowModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{t('title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('description')}</Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="primary" className="modal_button" onClick={handleCloseModal}>
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
