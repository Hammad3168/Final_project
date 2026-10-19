import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { getCourse } from "../services/courseService";
import CourseCard from "../components/CourseCard";
import CoursesCarousel from "../components/CoursesCarousel.jsx";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchHomeCourses = async () => {
      setLoading(true);
      try {
        const resData = await getCourse();
        setCourses(resData.data);
      } catch (error) {
        toast.error(error.message || "Somthing went worng!");
      } finally {
        setLoading(false);
      }
    };
    fetchHomeCourses();
  }, []);
  return (
    <div className="px-3 py-2">
      <CoursesCarousel />
      <Container>
        <div className="text-center py-4">
          <h1 className="h2 fw-bold">Here are our best courses</h1>
          <p className="text-muted">
            Explore hundreds of online courses taught by expert instructions
            acroos 50+ categories
          </p>
        </div>
        <Row>
          {courses?.length === 0 ? (
            <Col className="text-center text-muted d-flex justify-content-center align-items-center vh-100">
              <Spinner />
            </Col>
          ) : (
            courses?.map((course) => (
              <Col key={course._id} sm={12} md={6} lg={4}>
                <CourseCard course={course} />
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Courses;
