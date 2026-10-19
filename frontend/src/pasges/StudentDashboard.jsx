import { useEffect, useState, useContext } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import CourseCard from "../components/CourseCard.jsx";
import { fetchMyCourses } from "../services/enrollmentService.js";
import { AuthContext } from "../context/AuthContext.jsx";

function StudentDashboard() {
  const [myCourses, setMyCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchStudentCourses = async () => {
      setLoading(true);
      try {
        const resData = await fetchMyCourses();
        setMyCourse(resData.data);
      } catch (error) {
        toast.error(error.message || "Somthing went worng!");
      } finally {
        setLoading(false);
      }
    };
    fetchStudentCourses();
  }, []);

  return (
    <Container>
      <div className=" pb-3 m-3 border-bottom border-secondary-subtle">
        <h2 className="fw-bold text-dark">
          {user.name.toUpperCase()}'s Dashboard{" "}
        </h2>
        <p className="text-muted m-0">
          Student can watch course easly and the course valid till lifetime so
          you can watch course whenever you want.
        </p>
      </div>
      <Row>
        {loading ? (
          <Col className="text-center text-muted d-flex justify-content-center align-items-center  vh-100">
            <Spinner />
          </Col>
        ) : myCourses.length === 0 ? (
          <Col className="text-center text-muted">
            You are not enrolled in any courses yet.
          </Col>
        ) : (
          myCourses.map((enrollment) => (
            <Col key={enrollment._id} sm={12} md={6} lg={4}>
              <CourseCard course={enrollment.course} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default StudentDashboard;
