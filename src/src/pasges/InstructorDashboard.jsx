import { useState, useEffect, useContext } from "react";
import { Container, Card, Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext.jsx";
import { IoMdAdd } from "react-icons/io";

//  components links
import AddLessonModal from "../components/dashboard/AddLessonModal.jsx";
import AddCourseModal from "../components/dashboard/AddCourseModel.jsx";
import EditCourseModel from "../components/dashboard/EditCourseModel.jsx";
import { deleteCourse, getCourse } from "../services/courseService.js";
import { Link } from "react-router-dom";

const InstructorDashboard = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  // update cousre states
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeCourseId, setActiveCourseId] = useState(null);
  const [activeCourseData, setActiveCourseData] = useState(null);
  const [targetCourseId, setTargetCourseId] = useState(null);

  const loadInstructorCourses = async () => {
    try {
      const data = await getCourse();
      const myCourses = data.data.filter(
        (c) => c.instructor === user?.id || c.instructor?._id === user?.id,
      );
      setCourses(myCourses);
    } catch (error) {
      toast.error("Failed to load courses");
    }
  };

  useEffect(() => {
    if (user) loadInstructorCourses();
  }, [user]);

  const handleDelete = async (courseId) => {
    if (window.confirm("Delete this course permanently?")) {
      try {
        const data = await deleteCourse(courseId);
        toast.success(data.message || "Course deleted successfully");
        loadInstructorCourses();
      } catch (error) {
        toast.error("Failed to delete course");
      }
    }
  };

  const triggerLessonUpload = (courseId) => {
    setTargetCourseId(courseId);
    setShowLessonModal(true);
  };

  return (
    <div className="bg-light min-vh-100 p-2">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom border-secondary-subtle">
          <div>
            <h1 className="fw-bold text-dark">Instructor Studio</h1>
            <p className="text-muted m-0">Welcome back, {user?.name}.</p>
          </div>
          <Button
            onClick={() => setShowAddModal(true)}
            className="fw-bold px-4 py-2 border-0"
            style={{
              background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
            }}
          >
            <IoMdAdd size={25} /> Launch New Course
          </Button>
        </div>

        <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
          <Card.Body className="p-0">
            <div
              className="p-3 fw-bold text-white fs-5"
              style={{
                background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
              }}
            >
              Your Published Programs ({courses.length})
            </div>

            <Table responsive hover className="m-0 align-middle">
              <thead className="table-light text-secondary small">
                <tr>
                  <th>Thumbnail & Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Lessons</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course._id}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={course.thumbnail}
                          alt=""
                          className="rounded shadow-sm"
                          style={{
                            width: "60px",
                            height: "40px",
                            objectFit: "cover",
                          }}
                        />
                        <span className="fw-semibold text-dark small">
                          {course.title}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-light text-primary px-2 py-1 rounded">
                        {course.category}
                      </span>
                    </td>
                    <td className="fw-bold text-success small">
                      Rs. {course.price}
                    </td>
                    <td className="text-muted small">
                      {course.lessonCount || 0} Lectures
                    </td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <Button
                          as={Link}
                          variant="outline-primary"
                          size="sm"
                          to={`/courses/${course._id}`}
                        >
                          View
                        </Button>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          onClick={() => {
                            setActiveCourseId(course._id);
                            setActiveCourseData(course);
                            setShowEditModal(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() => triggerLessonUpload(course._id)}
                        >
                          <IoMdAdd size={25} /> Video
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(course._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        {/* CHILD FUNCTIONAL COMPOMENTS */}
        <AddCourseModal
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
          onCourseAdded={loadInstructorCourses}
          userId={user?.id}
        />
        <EditCourseModel
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          onCourseUpdated={loadInstructorCourses}
          courseData={activeCourseData}
          courseId={activeCourseId}
        />
        <AddLessonModal
          show={showLessonModal}
          onHide={() => setShowLessonModal(false)}
          courseId={targetCourseId}
          onLessonAdded={loadInstructorCourses}
        />
      </Container>
    </div>
  );
};

export default InstructorDashboard;
