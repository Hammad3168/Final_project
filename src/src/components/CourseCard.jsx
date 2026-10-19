import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function CourseCard({ course }) {
  return (
    <div>
      <Card
        style={{ maxWidth: "22rem", height: "24rem" }}
        className="rounded-4 overflow-hidden my-3"
      >
        <Card.Img variant="top" className="h-50" src={course?.thumbnail} />
        <Card.Body>
          <Card.Title className="fw-bold text-truncate">
            {course?.title}
          </Card.Title>
          <Card.Text
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {course?.description}
          </Card.Text>
          <div className="d-flex justify-content-between align-items-center">
            <Button
              style={{ background: "#1e3c72" }}
              className="text-white"
              as={Link}
              to={`/courses/${course._id}`}
            >
              See Details
            </Button>
            <Card.Text className="pt-3 fw-bold">Rs.{course?.price}</Card.Text>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CourseCard;
