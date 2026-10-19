import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className=" bottom-0 start-0 end-0 text-white pt-5 pb-3 mt-auto "
      style={{
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        borderTop: "4px solid #ffc107",
      }}
    >
      <Container>
        <Row className="g-4">
          <Col md={4} sm={12} className="text-center text-md-start">
            <h5 className="fw-bold text-warning mb-3">LearnHub</h5>
            <p className="small text-white-50" style={{ lineHeight: "1.6" }}>
              A premium MERN Stack Learning Management System built for students
              to enhance their engineering and design skills seamlessly.
            </p>
          </Col>

          <Col md={4} sm={6} className="text-center">
            <h5 className="fw-bold mb-3 text-warning">Quick Navigation</h5>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li>
                <Link
                  to="/"
                  className="text-white-50 text-decoration-none hover-white"
                >
                  Home Page
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="text-white-50 text-decoration-none hover-white"
                >
                  Course Listing
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white-50 text-decoration-none hover-white"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </Col>

          <Col md={4} sm={6} className="text-center text-md-end">
            <h5 className="fw-bold mb-3 text-warning">Technologies Used</h5>
            <p className="small text-white-50 m-0">MongoDB • Express JS</p>
            <p className="small text-white-50 m-0">React JS • Node JS</p>
            <p className="small text-white-50 mt-1">Bootstrap Components</p>
          </Col>
        </Row>

        <div className="text-center pt-4 mt-4 border-top border-secondary small text-white-50">
          &copy; 2026 LearnHub Portal. All Rights Reserved. Final MERN Term
          Project.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
