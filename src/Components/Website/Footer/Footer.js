import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
    <footer className="bg-dark text-white py-3 mt-5">
        <Container className="text-center">
        <p className="mb-0">
            &copy; {new Date().getFullYear()} | Project by <strong>Joudy Dawalibi</strong>
        </p>
        </Container>
    </footer>
    );
};

export default Footer;