import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Accordion,
  ListGroup,
  Button,
  Tabs,
  Tab,
  Spinner,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { CourseDetail } from "../services/courseService.js";
import { BsFillCollectionPlayFill } from "react-icons/bs";
import { MdDoneOutline } from "react-icons/md";
import {
  enrollmentStudent,
  fetchMyCourses,
} from "../services/enrollmentService.js";
import { AuthContext } from "../context/AuthContext.jsx";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [activeVideo, setActiveVideo] = useState("");
  const [enrolling, setEnrolling] = useState(false);
  const { user } = useContext(AuthContext);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const courseDetails = async () => {
      setCourse(null);
      setIsEnrolled(false);
      setAccessDenied(false);
      setLoadError("");
      try {
        if (!user) {
          setAccessDenied(true);
          return;
        }

        if (user.role === "student") {
          const enrollCheck = await fetchMyCourses();
          const enrollments = Array.isArray(enrollCheck.data)
            ? enrollCheck.data
            : [];
          const enrolledInCourse = enrollments.some(
            (enrollment) =>
              String(enrollment.course?._id ?? enrollment.course) ===
              String(id),
          );
          if (!enrolledInCourse) {
            setAccessDenied(true);
            return;
          }
        } else if (user.role !== "admin" && user.role !== "instructor") {
          setAccessDenied(true);
          return;
        }

        setIsEnrolled(true);
        const resData = await CourseDetail(id);
        setCourse(resData.data);
      } catch (error) {
        const message =
          error.message || error.error || "Unable to load course details.";
        toast.error(message);
        setLoadError(message);
      }
    };
    courseDetails();
  }, [id, user]);

  const handleEnrollment = async () => {
    if (!user) {
      toast.warn("Please login first to enroll in this course!");
      return navigate("/login");
    }

    if (user.role !== "student") {
      return toast.error(
        "Only Student accounts are allowed to enroll in courses!",
      );
    }
    try {
      setEnrolling(true);
      const data = await enrollmentStudent(id);
      toast.success(
        data.message || "congratulations you enrolled in this course!",
      );
      navigate("/my-dashboard");
    } catch (error) {
      toast.error(
        error.message || error.error || "Unable to enroll in this course.",
      );
    } finally {
      setEnrolling(false);
    }
  };

  if (accessDenied) {
    return (
      <>
        <Container className="py-5" style={{ marginTop: "100px" }}>
          <Card
            className="mx-auto border-0 shadow-sm"
            style={{ maxWidth: "600px" }}
          >
            <Card.Body className="p-4 text-center">
              <h4 className="fw-bold">Course details are locked</h4>
              <p className="text-muted">
                Enroll in this course to access its details and lessons.
              </p>
              <Button
                variant="warning"
                className="fw-bold px-4 rounded-pill"
                onClick={handleEnrollment}
                disabled={enrolling}
              >
                {enrolling ? "Enrolling Process..." : "Enroll In Course"}
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  }

  if (loadError) {
    return (
      <>
        <Container className="py-5 text-center" style={{ marginTop: "100px" }}>
          <p className="text-danger">{loadError}</p>
          <Button
            variant="outline-primary"
            onClick={() => navigate("/courses")}
          >
            Back to Courses
          </Button>
        </Container>
      </>
    );
  }

  if (!course) {
    return (
      <>
        <div className="text-center py-5 " style={{ marginTop: "100px" }}>
          <Spinner />
          <p>Loading course content...</p>
        </div>
      </>
    );
  }

  return (
    <div className="bg-light min-vh-100">
      <Container fluid="lg" className="py-2">
        {/* Video section */}
        <Row className="g-4">
          <Col lg={8}>
            <Card className="border-0 shadow-sm overflow-hidden mb-4 rounded-3">
              <div className="ratio ratio-16x9 bg-dark">
                {activeVideo ? (
                  <video
                    src={activeVideo}
                    controls
                    controlsList="nodownload"
                    className="w-100 h-100"
                  />
                ) : (
                  <img
                    src={course.thumbnail}
                    alt="Course Preview"
                    className="img-fluid"
                    style={{ objectFit: "cover" }}
                  />
                )}
              </div>
              <Card.Body className="bg-white d-flex justify-content-between align-items-center py-3">
                <div className="small text-muted gap-3 d-flex">
                  <BsFillCollectionPlayFill size={25} />
                  <p>Playing Course Lessons Preview</p>
                </div>
                <Button
                  variant="warning"
                  className="fw-bold px-4 rounded-pill shadow-sm"
                  style={{ fontSize: "14px" }}
                  onClick={handleEnrollment}
                  disabled={enrolling}
                >
                  {enrolling ? "Enrolling Process..." : "Enroll In Course"}
                </Button>
              </Card.Body>

              <h3 className="fw-bold text-dark mb-2 p-2">{course.title}</h3>
            </Card>
            {/* About Course and reviews details */}
            <Card className="border-0 shadow-sm rounded-3">
              <Card.Body className="p-4">
                <Tabs
                  defaultActiveKey="overview"
                  id="course-detail-tabs"
                  className="mb-4 custom-tabs"
                >
                  <Tab eventKey="overview" title="Overview">
                    <h5 className="fw-bold text-dark mb-3">
                      About This Course
                    </h5>
                    <p className="text-secondary" style={{ lineHeight: "1.7" }}>
                      {course.description}
                    </p>

                    <h5 className="fw-bold text-dark mt-4 mb-3">
                      Course Summary
                    </h5>
                    <Row className="g-3 text-secondary small">
                      <Col sm={6}>
                        <MdDoneOutline size={20} className="text-success" />{" "}
                        <strong>Skill Level:</strong> All Levels
                      </Col>
                      <Col sm={6}>
                        <MdDoneOutline size={20} className="text-success" />{" "}
                        <strong>Lectures:</strong> {course.lessons?.length || 0}{" "}
                        Lessons
                      </Col>
                      <Col sm={6}>
                        <MdDoneOutline size={20} className="text-success" />{" "}
                        <strong>Language:</strong> English / Urdu
                      </Col>
                      <Col sm={6}>
                        <MdDoneOutline size={20} className="text-success" />{" "}
                        <strong>Certification:</strong> Yes (Upon Completion)
                      </Col>
                    </Row>
                  </Tab>

                  <Tab eventKey="reviews" title="Reviews">
                    <p className="text-muted small">No reviews yet</p>
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </Col>
          {/* Course Lectures */}
          <Col lg={4}>
            <Card className="border-0 shadow-sm rounded-3 overflow-hidden ">
              <div
                className="text-white p-3 fw-bold"
                style={{
                  background:
                    "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
                }}
              >
                Course Content
              </div>

              <Accordion defaultActiveKey="0" flush>
                <Accordion.Item eventKey="0" className="border-0 ">
                  <Accordion.Header>
                    <div className="w-100 text-start">
                      <div className="fw-bold text-dark small">
                        Module 1: Main Syllabus
                      </div>
                      <small className="text-muted">
                        {course.lessons?.length || 0} Lessons • Full Length
                      </small>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className="p-0">
                    <ListGroup variant="flush">
                      {course.lessons && course.lessons.length > 0 ? (
                        course.lessons.map((lesson, index) => (
                          <ListGroup.Item
                            key={lesson._id || index}
                            action={isEnrolled}
                            onClick={() => {
                              if (!isEnrolled) {
                                return toast.warn(
                                  "Please enroll to unlock this lecture video!",
                                );
                              }
                              setActiveVideo(lesson.videoUrl);
                            }}
                            active={
                              activeVideo === lesson.videoUrl && isEnrolled
                            }
                            className={`d-flex align-items-center justify-content-between py-3 `}
                          >
                            <div
                              className="d-flex align-items-center gap-2 style-truncate"
                              style={{ maxWidth: "2026%" }}
                            >
                              <span className="small text-truncate text-dark">
                                {lesson.title}
                              </span>
                            </div>
                            <small
                              className="text-muted ps-2"
                              style={{ whiteSpace: "nowrap" }}
                            >
                              {lesson.duration} mins
                            </small>
                          </ListGroup.Item>
                        ))
                      ) : (
                        <div className="p-3 text-center text-muted small">
                          No lessons uploaded yet.
                        </div>
                      )}
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CourseDetails;
