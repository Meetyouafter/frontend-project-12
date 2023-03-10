import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Toast } from 'react-bootstrap';
import { clearNotificationProps } from '../../store/slices/notification/notificationSlice';
import getStylesForNotification from './getStylesForNotification';
import closeImg from '../../assets/images/close_icon.svg';
import './styles.css';

const Notification = ({
  variant, text, isShow, toggleShow,
}) => {
  const dispatch = useDispatch();
  const closeNotification = () => dispatch(clearNotificationProps());

  const closeAlert = useCallback(() => {
    toggleShow(false);
    dispatch(clearNotificationProps());
  }, [dispatch, toggleShow]);

  useEffect(() => {
    const timer = setTimeout(() => {
      closeAlert();
    }, 50000);
    return () => clearTimeout(timer);
  }, [closeAlert]);

  const { img, color } = getStylesForNotification(variant);

  return (
    <Toast show={isShow} onClose={toggleShow} autohide className="notification" style={{ background: color }}>
      <Toast.Body>
        <div>
          <img src={img} alt="notification info" />
          <p>{text}</p>
        </div>
        <img src={closeImg} alt="close notification" onClick={closeNotification} style={{ cursor: 'pointer' }} />
      </Toast.Body>
    </Toast>
  );
};

export default Notification;
