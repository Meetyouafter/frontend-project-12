import React, { useState } from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
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

  const { t } = useTranslation('translation', { keyPrefix: 'modal.renameModal' });
  const socket = useSocket();

  const handleClose = () => setIsShowModal(false);
  const handleShow = () => setIsShowModal(true);

  const channels = useSelector((state) => state.channels.channels);
  const channelsNames = channels.map((channel) => channel.name);

  const callback = (status) => {
    handleClose();
    if (status === 'success') {
      toast.success(t('notification'));
    } else {
      toast.error(t('error_notification'));
    }
  };

  const formik = useFormik({
    initialValues: {
      newChannelName: channelName,
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object().shape({
      newChannelName: Yup.string()
        .required(t('required_error'))
        .min(3, t('length_error'))
        .max(20, t('length_error'))
        .notOneOf(channelsNames, t('unique_error')),
    }),
    onSubmit: (values) => {
      socket.renameCurrentChannel({
        id: channelId, name: swearsFilter(values.newChannelName),
      }, callback);
    },
  });

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
          <Form onSubmit={formik.handleSubmit} className="modal_body">
            <FloatingLabel
              controlId="floatingInput"
              label={t('label')}
              className="mb-3"
            >
              <Form.Control
                type="text"
                name="newChannelName"
                placeholder={t('input_form')}
                htmlFor="rename channel input"
                autoFocus
                isInvalid={!!formik.errors.newChannelName}
                onChange={formik.handleChange}
                onFocus={(e) => e.target.select()}
                value={formik.values.newChannelName}
                onBlur={formik.handleBlur}
                aria-describedby="inputGroupPrepend"
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {formik.errors.newChannelName}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="modal_button" onClick={handleClose}>
            {t('escape_button')}
          </Button>
          <Button variant="primary" className="modal_button" type="submit">
            {t('success_button')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RenameChannelModal;
