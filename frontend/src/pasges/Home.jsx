import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaLaptopCode } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { RiCertificate2Fill } from "react-icons/ri";
import heroImg from "../assets/Hero.png";
import { useEffect, useState } from "react";
import { getCourse } from "../services/courseService.js";
import { toast } from "react-toastify";
import CourseCard from "../components/CourseCard.jsx";
import { FaUserCheck } from "react-icons/fa";
import { HiMiniSwatch } from "react-icons/hi2";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchHomeCourses = async () => {
      setLoading(true);
      try {
        const resData = await getCourse();
        setCourses(resData.data.slice(0, 3));
      } catch (error) {
        toast.error(error.message || "Somthing went worng!");
      } finally {
        setLoading(false);
      }
    };
    fetchHomeCourses();
  }, []);

  return (
    <div>
      {/* HERO SECTION Banner */}
      <div
        className="bg-dark text-white py-5 text-center text-md-start"
        style={{
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        }}
      >
        <Container>
          <Row className="align-items-center pb-5">
            <Col md={6}>
              <h1 className="display-4 fw-bold mb-3">
                For Every Student Every{" "}
                <span className="text-warning">Clasroom</span>
              </h1>
              <p className="lead text-white-50 mb-4">
                Explore hundreds of online courses taught by expert instructions
                acroos 50+ categories
              </p>
              <div className="d-gap gap-3 d-md-flex">
                <Button
                  as={Link}
                  to="/courses"
                  variant="warning"
                  size="lg"
                  className="fw-bold px-4 mx-2 mb-md-0"
                >
                  Explore Courses
                </Button>
                <Button
                  as={Link}
                  to="/register"
                  variant="outline-warning"
                  size="lg"
                  className="px-4"
                >
                  Join as Student
                </Button>
              </div>
            </Col>
            <Col md={6} className="text-center d-none d-md-block">
              <img
                src={heroImg}
                alt="E-Learning Graphic"
                className="img-fluid"
                style={{ maxHeight: "400px", objectFit: "contain" }}
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="my-5 py-4">
        <h2 className="text-center fw-bold mb-5">Why Learn with LearnHub?</h2>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm text-center p-3">
              <Card.Body>
                <div className="fs-1 text-primary mb-3">
                  <FaLaptopCode />
                </div>
                <Card.Title className="fw-bold text-black">
                  Expert Instructors
                </Card.Title>
                <Card.Text className="text-muted">
                  Learn directly from industry experts who build real-world
                  enterprise applications.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm text-center p-3">
              <Card.Body>
                <div className="fs-1 text-success mb-3">
                  <FaClock />
                </div>
                <Card.Title className="fw-bold text-black">
                  Flexible Learning
                </Card.Title>
                <Card.Text className="text-muted">
                  Study at your own pace anytime, anywhere with lifetime access
                  to materials.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm text-center p-3">
              <Card.Body>
                <div className="fs-1 text-warning mb-3">
                  <RiCertificate2Fill />
                </div>
                <Card.Title className="fw-bold text-black">
                  Earn Certificates
                </Card.Title>
                <Card.Text className="text-muted">
                  Get certified upon course completion to showcase your skills
                  to potential employers.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Course Section */}
        <Row>
          {courses.length === 0 ? (
            <Col className="text-center text-muted">
              No courses available right now.
            </Col>
          ) : (
            courses.map((course) => (
              <Col key={course._id} sm={12} md={6} lg={4}>
                <CourseCard course={course} />
              </Col>
            ))
          )}
        </Row>

        {/* How its works */}
        <h2 className="text-center fw-bold my-3">How its works?</h2>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100 border-0 shadow-lg text-center p-3">
              <Card.Body>
                <div className="fs-1 text-success mb-3">
                  <FaUserCheck />
                </div>
                <Card.Title className="fw-bold text-black">Sign Up</Card.Title>
                <Card.Text className="text-muted">
                  Register youself with username,email or password and be part
                  of our community.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 border-0 shadow-lg text-center p-3">
              <Card.Body>
                <div className="fs-1 text-primary mb-3">
                  <HiMiniSwatch />
                </div>
                <Card.Title className="fw-bold text-black">
                  Browse Courses
                </Card.Title>
                <Card.Text className="text-muted">
                  Search course whoever you like to learn and start learning.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 border-0 shadow-lg text-center p-3">
              <Card.Body>
                <div className="fs-1 text-warning mb-3">
                  <RiCertificate2Fill />
                </div>
                <Card.Title className="fw-bold text-black">
                  Earn Certificates
                </Card.Title>
                <Card.Text className="text-muted">
                  Get certified upon course completion to showcase your skills
                  to potential employers.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
