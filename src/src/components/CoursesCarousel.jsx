import Carousel from "react-bootstrap/Carousel";
import { getCourse } from "../services/courseService.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function CoursesCarousel() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const resData = await getCourse();
        setCourses(resData.data.slice(0, 3));
      } catch (error) {
        toast.error(error.message || "Somthing went worng!");
      }
    };
    fetchCourses();
  }, []);

  return (
    <Carousel>
      {courses?.map((course) => (
        <Carousel.Item interval={2000}>
          <Link to={`/courses/${course._id}`}>
            <img
              src={course.thumbnail}
              alt="First course carousel slide"
              className="d-block w-100 rounded-3"
              style={{ height: "400px", objectFit: "cover" }}
            />
          </Link>
          <Carousel.Caption>
            <h3 className="fw-bold">{course.title}</h3>
            <p>{course.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CoursesCarousel;
