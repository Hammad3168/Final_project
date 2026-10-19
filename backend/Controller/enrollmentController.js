import Enrollment from "../models/enrollmentModel.js";

// POST Enrollment Course (/api/enroll)
export const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const studentId = req.user.id;
    const existingEnrollment = await Enrollment.findOne({ student: studentId });
    if (existingEnrollment) {
      return res.status(409).json({
        success: false,
        message:
          "You can only enroll in one course. You are already enrolled in a course.",
      });
    }

    await Enrollment.create({
      student: studentId,
      course: courseId,
    });
    res.status(201).json({
      success: true,
      message: "Enroll successfully!",
    });
  } catch (error) {
    if (
      error.code === 11000 &&
      (error.keyPattern?.student || error.keyValue?.student)
    ) {
      return res.status(409).json({
        success: false,
        message:
          "You can only enroll in one course. You are already enrolled in a course.",
      });
    }

    console.error("Failed to enroll student:", error);
    res.status(500).json({
      success: false,
      message: "Unable to enroll in this course. Please try again.",
    });
  }
};

// GET show Student Course (/api/my-courses)
export const myCourses = async (req, res) => {
  try {
    const studentId = req.user.id;

    const enrollments = await Enrollment.find({ student: studentId }).populate(
      "course",
    );
    if (!enrollments || enrollments.length === 0) {
      return res.status(200).json({
        success: true,
        count: 0,
        data: [],
        message: "You are not enrolled in any course yet!",
        isEnrolled: false,
      });
    }

    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments,
      isEnrolled: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
