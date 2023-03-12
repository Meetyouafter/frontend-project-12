import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Toast } from 'react-bootstrap';
import closeImg from '../../assets/images/close_icon.svg';
import infoImg from '../../assets/images/info_icon.svg';
import successImg from '../../assets/images/success_icon.svg';
import './styles.css';
import { clearNotificationProps } from '../../store/slices/notification/notificationSlice';

const getIcon = (variant) => {
  if (variant === 'success') {
    return successImg;
  }
  return infoImg;
};

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
    }, 5000);
    return () => clearTimeout(timer);
  }, [closeAlert]);

  return (
    <Toast show={isShow} onClose={toggleShow} autohide className="notification">
      <Toast.Body>
        <div>
          <img src={getIcon(variant)} alt="notification info" />
          <p>{text}</p>
        </div>
        <img src={closeImg} alt="close notification" onClick={closeNotification} style={{ cursor: 'pointer' }} />
      </Toast.Body>
    </Toast>
  );
};

export default Notification;
