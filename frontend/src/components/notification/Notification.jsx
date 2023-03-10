import React from 'react';
import { Toast } from 'react-bootstrap';
import closeImg from '../../assets/images/close_icon.svg';
import infoImg from '../../assets/images/info_icon.svg';
import successImg from '../../assets/images/success_icon.svg';
import './styles.css';

const getIcon = (variant) => {
  if (variant === 'success') {
    return successImg;
  }
  return infoImg;
};

const Notification = ({
  variant, text, show, toggleShow,
}) => (
  <Toast show={show} onClose={toggleShow} delay={300000} autohide className="notification">
    <Toast.Body>
      <div>
        <img src={getIcon(variant)} alt="notification info" />
        <p>{text}</p>
      </div>
      <img src={closeImg} alt="close notification" onClick={toggleShow} style={{ cursor: 'pointer' }} />
    </Toast.Body>
  </Toast>
);

export default Notification;
