import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { addLesson } from "../../services/courseService";

const AddLessonModal = ({ show, onHide, courseId, onLessonAdded }) => {
  const [lessonData, setLessonData] = useState({
    title: "",
    videoUrl: "",
    duration: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newData = {
        title: lessonData.title,
        videoUrl: lessonData.videoUrl,
        duration: Number(lessonData.duration),
      };
      const data = addLesson(courseId, newData);
      console.log(courseId);

      toast.success(data.message || "New Lecture added successfully!");
      setLessonData({ title: "", videoUrl: "", duration: "" });
      if (onLessonAdded) onLessonAdded();
      onHide();
    } catch (error) {
      toast.error("Failed to add video lesson");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold text-dark fs-5">
          Add Course Video Lecture
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label className="small fw-semibold">Lecture Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., Working with useEffect Hooks"
              value={lessonData.title}
              onChange={(e) =>
                setLessonData({ ...lessonData, title: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="small fw-semibold">
              Video URL / Placeholder Link
            </Form.Label>
            <Form.Control
              type="url"
              placeholder="https://abc.com"
              value={lessonData.videoUrl}
              onChange={(e) =>
                setLessonData({ ...lessonData, videoUrl: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label className="small fw-semibold">
              Duration (Minutes)
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="e.g, 15"
              value={lessonData.duration}
              onChange={(e) =>
                setLessonData({ ...lessonData, duration: e.target.value })
              }
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button type="submit" variant="success" className="fw-bold">
            Push Lesson
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddLessonModal;
