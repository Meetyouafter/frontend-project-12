import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Form, Button, Modal, FloatingLabel,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { swearsFilter } from '../../textService';
import { useSocket } from '../../context/SocketContext';
import './styles.css';

const RenameChannelModal = ({ channelId, channelName }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [newChannelName, setNewChannelName] = useState(channelName);
  const [formerror, setFormError] = useState('');

  const { t } = useTranslation('translation', { keyPrefix: 'modal.renameModal' });
  const socket = useSocket();

  const handleClose = () => setIsShowModal(false);
  const handleShow = () => setIsShowModal(true);

  const channels = useSelector((state) => state.channels.channels);
  const channelsNames = channels.map((channel) => channel.name);

  const validate = () => {
    const error = {};
    if (!newChannelName) {
      error.error = t('required_error');
    } else if (newChannelName.length < 3 || newChannelName.length > 20) {
      error.error = t('length_error');
    } else if (channelsNames.includes(newChannelName)) {
      error.error = t('unique_error');
    } else {
      error.error = '';
    }

    setFormError(error.error);
    return Object.values(error).includes('');
  };

  const callback = (status) => {
    if (status === 'success') {
      setNewChannelName('');
      handleClose();
      toast.success(t('notification'));
    } else {
      setNewChannelName('');
      handleClose();
      toast.error(t('error_notification'));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      socket.renameCurrentChannel({ id: channelId, name: swearsFilter(newChannelName) }, callback);
    }
  };

  return (
    <>
      <Button variant="outlined-light" onClick={handleShow} className="open_modal_button">
        {t('rename_link')}
        <span className="visually-hidden">{t('rename_link')}</span>
      </Button>

      <Modal centered show={isShowModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="modal_body">
            <FloatingLabel
              controlId="floatingInput"
              label={t('label')}
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder={t('input_form')}
                htmlFor="rename channel input"
                autoFocus
                isInvalid={!!formerror}
                value={newChannelName}
                onChange={(e) => setNewChannelName(e.target.value)}
                onFocus={(e) => e.target.select()}
                aria-describedby="inputGroupPrepend"
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {formerror}
              </Form.Control.Feedback>
            </FloatingLabel>
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
    </>
  );
};

export default RenameChannelModal;
