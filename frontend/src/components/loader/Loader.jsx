import { useTranslation } from 'react-i18next';
import { Container } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import './styles.css';

const Loader = () => {
  const { t } = useTranslation();

  return (
    <Container className="loader_container">
      <Spinner animation="border" variant="light" />
      <p>{t('loader.title')}</p>
    </Container>
  );
};

export default Loader;
