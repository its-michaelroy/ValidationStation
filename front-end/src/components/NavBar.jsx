import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import Wizard from "../assets/DB-wizard.png";
import { userLogout } from "../utilities"; //handle user logout

// NavBar components with props user & setuser for managing userstate.
function NavBar({ user, setUser }) {
  const handleUserLogout = async () => {
    const loggedOut = await userLogout();
    if (loggedOut) {
      setUser(null); //reset user state to null after logout
    }
  };

  //render navbar with links to different pages
  return (
    //Expand Navbar for large screens & logo setup
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
          Home {user ? user.email : ""} {/*display user email if logged in*/}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />{" "}
        {/*Toggle for smaller screens*/}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/register/" className="nav-link-hover">
              Register
            </Nav.Link>
            {/*COnditional render login if no user logged in*/}
            {user ? null : (
              <Nav.Link as={Link} to="/login/" className="nav-link-hover">
                Log In
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/main/" className="nav-link-hover">
              Main
            </Nav.Link>
            <Nav.Link as={Link} to="/emailhistory/" className="nav-link-hover">
              EmailHistory
            </Nav.Link>
            <Nav.Link as={Link} to="/phonehistory/" className="nav-link-hover">
              PhoneHistory
            </Nav.Link>
            <Nav.Link as={Link} to="/blacklist/" className="nav-link-hover">
              Blacklist
            </Nav.Link>
            <Nav.Link as={Link} to="/whitelist/" className="nav-link-hover">
              Whitelist
            </Nav.Link>
            {/* Show logout button if user is logged in */}
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
