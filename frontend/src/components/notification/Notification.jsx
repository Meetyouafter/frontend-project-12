import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Toast, Button } from 'react-bootstrap';
import { clearNotificationProps } from '../../store/slices/notificationSlice';
import closeImg from '../../assets/images/close_icon.svg';
import infoImg from '../../assets/images/info_icon.svg';
import successImg from '../../assets/images/success_icon.svg';
import errorImg from '../../assets/images/error_icon.svg';
import './styles.css';

const getStylesForNotification = (variant) => {
  switch (variant) {
    case 'success':
      return {
        img: successImg,
        color: 'rgba(159, 255, 160, 0.9)',
      };
    case 'error':
      return {
        img: errorImg,
        color: 'rgba(255, 172, 178, 0.9)',
      };
    default:
      return {
        img: infoImg,
        color: 'rgba(159, 255, 250, 0.9)',
      };
  }
};

const Notification = ({
  variant, text, isShow, toggleShow,
}) => {
  const dispatch = useDispatch();

  const closeAlert = useCallback(() => {
    toggleShow(false);
    dispatch(clearNotificationProps({ isShow: false }));
  }, [dispatch, toggleShow]);

  useEffect(() => {
    const timer = setTimeout(() => {
      closeAlert();
    }, 5000);
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
        <Button variant="outlined-warn" onClick={closeAlert}>
          <img
            src={closeImg}
            alt="close notification"
          />
        </Button>
      </Toast.Body>
    </Toast>
  );
};

export default Notification;
