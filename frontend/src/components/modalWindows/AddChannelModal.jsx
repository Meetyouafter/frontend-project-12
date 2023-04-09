import React, { useState } from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import {
  Button, FloatingLabel, Modal, Form,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { swearsFilter } from '../../textService';
import { useSocket } from '../../context/SocketContext';
import addIcon from '../../assets/images/add_icon.svg';
import './styles.css';

const AddChannelModal = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  const { t } = useTranslation('translation', { keyPrefix: 'modal.addModal' });
  const socket = useSocket();

  const channels = useSelector((state) => state.channels.channels);
  const channelsNames = channels.map((channel) => channel.name);

  const handleClose = () => {
    setIsShowModal(false);
  };

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
      newChannelName: '',
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
    onSubmit: (values, { resetForm }) => {
      socket.addNewChannel({ name: swearsFilter(values.newChannelName) }, callback);
      resetForm({
        values: {
          newChannelName: '',
        },
      });
    },
  });

  return (
    <>
      <Button onClick={() => setIsShowModal(true)} variant="outline-light" className="open_modal_button">
        <img className="modal_image" src={addIcon} alt="add channel" />
        <span className="visually-hidden">+</span>
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
                htmlFor="add channel input"
                autoFocus
                isInvalid={!!formik.errors.newChannelName}
                onChange={formik.handleChange}
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

export default AddChannelModal;
