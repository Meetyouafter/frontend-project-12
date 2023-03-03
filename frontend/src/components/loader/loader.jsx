import { Container } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import Header from '../header/Header';
import './styles.css';

const Loader = () => (
  <>
    <Header />
    <Container className="loader_container">
      <Spinner animation="border" variant="light" />
      <p>Loading...</p>
    </Container>
  </>
);

export default Loader;
