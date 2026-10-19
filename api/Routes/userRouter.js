import express from "express";
import {
  deleteUser,
  getSingleUser,
  getUsers,
  loginUser,
  registerUser,
  updateUser,
} from "../Controller/userController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/", protect, authorize("admin"), getUsers);
router.get(
  "/:id",
  protect,
  authorize("admin", "student", "instructor"),
  getSingleUser,
);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/:id", protect, authorize("admin"), updateUser);
router.delete("/:id", protect, authorize("admin"), deleteUser);

export default router;
