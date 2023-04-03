/* eslint-disable functional/no-let */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Form, Button, Modal, FloatingLabel,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setNotificationProps } from '../../store/slices/notification/notificationSlice';
import swearsFilter from '../../services/swearsFilter/swearsFilter';
import SocketService from '../../api/SocketService';
import './styles.css';

const RenameChannelModal = ({ channelId, channelName }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [newChannelName, setNewChannelName] = useState(channelName);
  const [formerror, setFormError] = useState('');

  const { t } = useTranslation('translation', { keyPrefix: 'modal.renameModal' });
  const dispatch = useDispatch();

  const handleClose = () => setIsShowModal(false);
  const handleShow = () => setIsShowModal(true);

  const channels = useSelector((state) => state.channels.channels);
  const channelsNames = channels.map((channel) => channel.name);

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
      SocketService.renameCurrentChannel({ id: channelId, name: swearsFilter(newChannelName) });
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
