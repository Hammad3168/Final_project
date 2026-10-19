import { useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  ListGroup,
} from "react-bootstrap";
import { AuthContext } from "../context/AuthContext.jsx";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="text-center py-5" style={{ marginTop: "100px" }}>
        <h5>Please log in to view your profile details.</h5>
      </div>
    );
  }

  const getRoleBadgeColor = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "danger";
      case "instructor":
        return "warning";
      default:
        return "success";
    }
  };

  return (
    <div className="bg-light py-2">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
              <div
                className="text-center py-3 position-relative"
                style={{
                  background:
                    "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
                }}
              >
                <div
                  className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center mx-auto shadow"
                  style={{
                    width: "70px",
                    height: "70px",
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "#1e3c72",
                  }}
                >
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>

                <h4 className="text-white fw-bold my-2 mb-1">
                  {user.name.toUpperCase()}
                </h4>

                <Badge
                  bg={getRoleBadgeColor(user.role)}
                  className="text-uppercase px-3 py-2 rounded-pill fw-bold shadow-sm"
                >
                  {user.role || "Student"}
                </Badge>
              </div>

              <Card.Body className="p-4 bg-white">
                <h5 className="fw-bold text-dark mb-4 border-bottom pb-2">
                  Account Information
                </h5>

                <ListGroup variant="flush" className="mb-4">
                  <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 border-light">
                    <span className="text-secondary fw-medium small">
                      User Account ID
                    </span>
                    <span className="text-dark small monospace text-muted">
                      {user.id || user._id}
                    </span>
                  </ListGroup.Item>

                  <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 border-light">
                    <span className="text-secondary fw-medium small">
                      Email Address
                    </span>
                    <span className="text-muted fw-semibold">
                      {user.email || "N/A"}
                    </span>
                  </ListGroup.Item>

                  <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 border-light">
                    <span className="text-secondary fw-medium small">
                      Portal Access
                    </span>
                    <Badge bg="success" className="px-2 py-1 rounded">
                      Active
                    </Badge>
                  </ListGroup.Item>
                </ListGroup>
                <div className="d-grid gap-2">
                  <Button
                    variant="outline-danger"
                    onClick={logout}
                    className="fw-bold py-2 rounded-3 border-2"
                  >
                    Logout From Device
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
