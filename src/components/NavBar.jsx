import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light" className="mb-3">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="my-auto">
            <Nav.Link as={NavLink} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/teachers">
              Teachers
            </Nav.Link>
            <Nav.Link as={NavLink} to="/students">
              Students
            </Nav.Link>
            <Nav.Link as={NavLink} to="/logout">
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
