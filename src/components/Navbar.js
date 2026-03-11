import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function CustomNavbar() {
  return (
    <Navbar expand="md" className="custom-navbar" variant="light" sticky="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Sonja Wong
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ml-auto">
            <Nav.Link as={NavLink} to="/" exact="true">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
            <Nav.Link as={NavLink} to="/projects">Projects</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}