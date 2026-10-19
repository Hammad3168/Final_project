import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { AuthContext } from "../context/AuthContext.jsx";

const AppNavbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <Navbar
      style={{
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
      }}
      className="position-sticky z-1 top-0 start-0 w-100  py-3 text-white"
      variant="black"
      expand="lg"
    >
      <Container className="d-flex align-items-center justify-content-between">
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 m-0 p-0">
          LearnHub
        </Navbar.Brand>

        <div className="d-flex align-items-center order-lg-last gap-2">
          {user ? (
            <Button
              variant="warning"
              size="sm"
              className="fw-bold px-3 rounded-pill shadow-sm"
              onClick={logout}
            >
              logout
            </Button>
          ) : (
            <Button
              as={Link}
              to="/login"
              variant="warning"
              size="sm"
              className="fw-bold px-3 rounded-pill shadow-sm"
            >
              login
            </Button>
          )}
          {/* Profile Icon */}
          <Link to={"/profile"}>
            {user?.name ? (
              <div
                className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center mx-auto shadow"
                style={{
                  width: "40px",
                  height: "40px",
                  fontSize: "25px",
                  fontWeight: "bold",
                  color: "#1e3c72",
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
            ) : (
              <CgProfile size={35} />
            )}
          </Link>
          <Navbar.Toggle
            aria-controls="navbar-lms-nav"
            className="border-0 p-1 ms-1 focus-none"
          />
        </div>

        <Navbar.Collapse id="navbar-lms-nav" className="w-100 mt-2 mt-lg-0">
          <Nav className="mx-auto text-center py-2 py-lg-0">
            <Nav.Link as={Link} to="/" className="px-3 fw-medium">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/courses" className="px-3 fw-medium">
              Courses
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="px-3 fw-medium">
              Contact
            </Nav.Link>
            <div>
              {user && user.role === "instructor" ? (
                <Nav.Link
                  as={Link}
                  to="/instructor-dashboard"
                  className="px-3 fw-medium"
                >
                  Instructor
                </Nav.Link>
              ) : user && user.role === "student" ? (
                <Nav.Link
                  as={Link}
                  to="/my-dashboard"
                  className="px-3 fw-medium"
                >
                  My Dashboard
                </Nav.Link>
              ) : user && user.role === "admin" ? (
                <Nav.Link
                  as={Link}
                  to="/admin-dashboard"
                  className="px-3 fw-medium"
                >
                  Admin Dashboard
                </Nav.Link>
              ) : (
                ""
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
