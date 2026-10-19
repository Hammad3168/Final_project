import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Tabs,
  Tab,
  Form,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { getUsers, updateUser } from "../services/authService";
import { deleteCourse, getCourse } from "../services/courseService";
import { BsFillPersonFill } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdVideoCameraBack } from "react-icons/md";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAdminData = async () => {
    try {
      setLoading(true);
      const [usersRes, coursesRes] = await Promise.all([
        getUsers(),
        getCourse(),
      ]);

      setUsers(usersRes?.data?.data || usersRes?.data);
      setCourses(coursesRes?.data?.data || coursesRes?.data);
    } catch (error) {
      toast.error("Failed to load global system metrics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  // Course Delete (Admin Rights)
  const handleGlobalCourseDelete = async (courseId) => {
    if (
      window.confirm(
        "CRITICAL WARNING: Delete this course globally from LearnHub permanently?",
      )
    ) {
      try {
        const data = await deleteCourse(courseId);
        toast.success(
          data.message || "Course deleted from platform successfully",
        );
        loadAdminData();
      } catch (error) {
        toast.error("Operation failed or unauthorized access");
      }
    }
  };

  // User Account Delete (Admin Rights)
  const handleUserPurge = async (userId) => {
    if (
      window.confirm(
        "Are you sure you want to revoke system access and delete this account?",
      )
    ) {
      try {
        const data = await deleteCourse(userId);
        toast.success(data.message || "Account status terminated successfully");
        loadAdminData();
      } catch (error) {
        toast.error("Failed to terminate user session parameters");
      }
    }
  };
  // Role change handler
  const handleRoleChange = async (userId, newRole) => {
    try {
      const data = await updateUser(userId, newRole);
      toast.success(data.message || "User authorization privileges mutated! ");
      loadAdminData();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Role change mutation failed",
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5" style={{ marginTop: "100px" }}>
        Loading Central Command Grid...
      </div>
    );
  }

  // Totel Sutdents and Instructors
  const totalStudents = users.filter((u) => u.role === "student").length;
  const totalInstructors = users.filter((u) => u.role === "instructor").length;

  return (
    <div className="bg-light min-vh-100 py-3">
      <Container>
        {/* DASHBOARD HEADER */}
        <div className=" pb-3 border-bottom border-secondary-subtle">
          <h1 className="fw-bold text-dark">Central Administration command</h1>
          <p className="text-muted m-0">
            Platform-wide overview monitoring logs, users access rights, and
            structural assets management.
          </p>
        </div>

        <Row className="g-4">
          <Col md={4}>
            <Card className="border-0 shadow-sm rounded-3 bg-white p-3 text-center">
              <Card.Body>
                <div className="fs-1 text-primary mb-2">
                  <BsFillPersonFill />
                </div>
                <Card.Title className="text-secondary small fw-bold text-uppercase">
                  Total Enrolled Students
                </Card.Title>
                <h2 className="fw-extrabold text-dark m-0">{totalStudents}</h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm rounded-3 bg-white p-3 text-center">
              <Card.Body>
                <div className="fs-1 text-warning mb-2">
                  <FaChalkboardTeacher />
                </div>
                <Card.Title className="text-secondary small fw-bold text-uppercase">
                  Active Instructor Members
                </Card.Title>
                <h2 className="fw-extrabold text-dark m-0">
                  {totalInstructors}
                </h2>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm rounded-3 bg-white p-3 text-center">
              <Card.Body>
                <div className="fs-1 text-success mb-2">
                  <MdVideoCameraBack />
                </div>
                <Card.Title className="text-secondary small fw-bold text-uppercase">
                  Hosted Courses
                </Card.Title>
                <h2 className="fw-extrabold text-dark m-0">{courses.length}</h2>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="border-0 shadow-sm rounded-4 overflow-hidden bg-white p-4">
          <Tabs
            defaultActiveKey="coursesGrid"
            id="admin-workspace-tabs"
            className="mb-4 custom-tabs"
          >
            {/*  GLOBAL COURSES MANAGMENT */}
            <Tab eventKey="coursesGrid" title="System Courses Catalog">
              <Table responsive hover className="align-middle m-0">
                <thead className="table-light small text-secondary">
                  <tr>
                    <th>Program Title</th>
                    <th>Category</th>
                    <th>Pricing</th>
                    <th>Lessons</th>
                    <th className="text-center">Root Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course._id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={course.thumbnail}
                            alt=""
                            className="rounded"
                            style={{
                              width: "50px",
                              height: "35px",
                              objectFit: "cover",
                            }}
                          />
                          <span className="fw-semibold text-dark small">
                            {course.title}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-light text-primary">
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
                        <Button
                          style={{ background: "#1e3c72" }}
                          size="sm"
                          className="fw-bold px-3 me-2 text-white"
                          as={Link}
                          to={`/courses/${course._id}`}
                        >
                          View Course
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          className="fw-bold px-3"
                          onClick={() => handleGlobalCourseDelete(course._id)}
                        >
                          Purge Course
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>

            {/* GLOBAL USERS MANAGEMENT */}
            <Tab eventKey="usersGrid" title="Registered Accounts Registry">
              <Table responsive hover className="align-middle m-0">
                <thead className="table-light small text-secondary">
                  <tr>
                    <th>Account Holder Name</th>
                    <th>Email Address</th>
                    <th>Assigned Role Permissions</th>
                    <th className="text-center">Root Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id}>
                      <td className="fw-semibold text-dark small">{u.name}</td>
                      <td className="text-muted small">{u.email}</td>
                      <td>
                        <Form.Select
                          size="sm"
                          value={u.role}
                          disabled={u.role === "admin"}
                          onChange={(e) =>
                            handleRoleChange(u._id, e.target.value)
                          }
                          className="fw-bold text-uppercase border-secondary-subtle focus-none"
                          style={{
                            width: "130px",
                            fontSize: "11px",
                            color:
                              u.role === "instructor"
                                ? "#ffc107"
                                : u.role === "student"
                                  ? "#198754"
                                  : "#dc3545",
                          }}
                        >
                          <option value="student">Student</option>
                          <option value="instructor">Instructor</option>
                          <option value="admin" disabled>
                            Admin
                          </option>
                        </Form.Select>
                      </td>
                      <td className="text-center">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="fw-bold"
                          disabled={u.role === "admin"}
                          onClick={() => handleUserPurge(u._id)}
                        >
                          Destory User
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </Card>
      </Container>
    </div>
  );
};

export default AdminDashboard;
