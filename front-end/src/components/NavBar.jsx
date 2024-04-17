import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import Wizard from "../assets/DB-wizard.png";
import { userLogout } from "../utilities";

// if user exists we are logged in nio
function NavBar({ user, setUser }) {
  const handleUserLogout = async () => {
    const loggedOut = await userLogout();
    if (loggedOut) {
      setUser(null);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <img
          src={Wizard}
          width="50"
          height="50"
          className="d-inline-block align-top"
          alt="Wizard Logo"
        />
        {"  "}
        <Navbar.Brand as={Link} to="/">
          Home {user ? user.email : ""}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/register/">
              Register
            </Nav.Link>
            {user ? null : (
              <Nav.Link as={Link} to="/login/">
                Log In
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/main/">
              Main
            </Nav.Link>
            <Nav.Link as={Link} to="/emailhistory/">
              EmailHistory
            </Nav.Link>
            <Nav.Link as={Link} to="/phonehistory/">
              PhoneHistory
            </Nav.Link>
            <Nav.Link as={Link} to="/blacklist/">
              Blacklist
            </Nav.Link>
            <Nav.Link as={Link} to="/whitelist/">
              Whitelist
            </Nav.Link>
            {!user ? null : (
              <Button
                onClick={() => handleUserLogout()}
                variant="outline-danger"
              >
                Log Out
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
