import express from "express";
import {
  addLessonToCourse,
  createCourse,
  deleteCourse,
  getAllCourses,
  updateCourse,
  viewCourse,
} from "../Controller/courseController.js";
import { authorize, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllCourses);
router.get(
  "/:id",
  protect,
  authorize("student", "instructor", "admin"),
  viewCourse,
);
router.post("/", protect, authorize("instructor", "admin"), createCourse);
router.post(
  "/:courseId/lessons",
  protect,
  authorize("instructor", "admin"),
  addLessonToCourse,
);
router.put("/:id", protect, authorize("instructor", "admin"), updateCourse);
router.delete("/:id", protect, authorize("instructor", "admin"), deleteCourse);

export default router;
