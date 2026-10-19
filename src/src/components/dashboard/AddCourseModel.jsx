import { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { createCourse } from "../../services/courseService.js";

const AddCourseModal = ({ show, onHide, onCourseAdded, userId }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    thumbnail: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newData = { ...formData, instructor: userId };
      const data = await createCourse(newData);
      toast.success(data.message || "Course published successfully!");
      setFormData({
        title: "",
        description: "",
        category: "",
        price: "",
        thumbnail: "",
      });
      onCourseAdded();
      onHide();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create course");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="border-0 bg-light">
        <Modal.Title className="fw-bold text-dark fs-4">
          Create New Program
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body className="px-4 py-3">
          <Form.Group className="mb-3">
            <Form.Label className="small fw-semibold text-secondary">
              Course Title
            </Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="small fw-semibold text-secondary">
              Category
            </Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold text-secondary">
                  Price (PKR)
                </Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold text-secondary">
                  Thumbnail Image URL
                </Form.Label>
                <Form.Control
                  type="url"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-2">
            <Form.Label className="small fw-semibold text-secondary">
              Course Description
            </Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="border-0 bg-light">
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            style={{ backgroundColor: "#1e3c72" }}
          >
            Publish Course
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddCourseModal;
