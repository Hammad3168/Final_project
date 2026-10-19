import exporess from "express";
import {
  enrollInCourse,
  myCourses,
} from "../Controller/enrollmentController.js";
import { authorize, protect } from "../middlewares/authMiddleware.js";
const router = exporess.Router();

router.post("/enroll", protect, authorize("student"), enrollInCourse);
router.get("/my-courses", protect, authorize("student"), myCourses);

export default router;
