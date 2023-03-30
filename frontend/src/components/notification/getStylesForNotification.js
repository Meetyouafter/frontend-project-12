import infoImg from '../../assets/images/info_icon.svg';
import successImg from '../../assets/images/success_icon.svg';
import errorImg from '../../assets/images/error_icon.svg';

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

export default getStylesForNotification;
