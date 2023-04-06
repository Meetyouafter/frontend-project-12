/* eslint-disable functional/no-let */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  Button, FloatingLabel, Modal, Form,
} from 'react-bootstrap';
import SocketService from '../../api/SocketService';
import { toast } from 'react-toastify';
import { swearsFilter } from '../../textService';
import addIcon from '../../assets/images/add_icon.svg';
import './styles.css';

const AddChannelModal = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');
  const [formerror, setFormError] = useState('');

  const { t } = useTranslation('translation', { keyPrefix: 'modal.addModal' });

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
      SocketService.addNewChannel({ name: swearsFilter(newChannelName) }, callback);
    }
  };

  return (
    <>
      <Button onClick={handleShow} variant="outline-light" className="open_modal_button">
        <img className="modal_image" src={addIcon} alt="add channel" />
        <span className="visually-hidden">+</span>
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
                htmlFor="add channel input"
                autoFocus
                isInvalid={!!formerror}
                value={newChannelName}
                onChange={(e) => setNewChannelName(e.target.value)}
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

export default AddChannelModal;
