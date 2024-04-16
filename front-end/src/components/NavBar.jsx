import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
import { userLogout } from '../utilities';

// if user exists we are logged in nio
function NavBar({ user, setUser }) {


  const handleUserLogout = async () => {
    const loggedOut = await userLogout()
    if(loggedOut)  {
      setUser(null)
    }
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">Home { user ? user.email : ""}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/register/">Register</Nav.Link>
            { user ? null : <Nav.Link as={Link} to="/login/">Log In</Nav.Link>}
            <Nav.Link as={Link} to="/main/">Main</Nav.Link>
            <Nav.Link as={Link} to="/history/">History</Nav.Link>
            { !user ? null: <Button onClick={() => handleUserLogout()} variant="outline-danger">Log Out</Button>}
          </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
