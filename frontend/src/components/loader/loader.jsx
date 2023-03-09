import { Container } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import './styles.css';

const Loader = () => (
  <Container className="loader_container">
    <Spinner animation="border" variant="light" />
    <p>Loading...</p>
  </Container>
);

export default Loader;
