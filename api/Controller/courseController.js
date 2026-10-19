import Course from "../models/courseModel.js";
import Enrollment from "../models/enrollmentModel.js";

// Get all Courses (/api/course)
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    if (!courses || courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Course not Found",
      });
    }
    const coursePreviews = courses.map((course) => {
      const courseData = course.toObject();
      courseData.lessonCount = courseData.lessons?.length || 0;
      delete courseData.lessons;
      return courseData;
    });

    res.status(200).json({
      success: true,
      data: coursePreviews,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
// get ViewCourse (/api/course/:id)
export const viewCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course Not Found!",
      });
    }

    if (req.user.role === "student") {
      const enrollment = await Enrollment.exists({
        student: req.user.id,
        course: courseId,
      });
      if (!enrollment) {
        return res.status(403).json({
          success: false,
          message: "Enroll in this course to access its details and lessons.",
        });
      }
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
// Post Create Course (/api/course)
export const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      price,
      instructor,
      thumbnail,
      lessons,
    } = req.body;

    if (
      !title ||
      !description ||
      !category ||
      !price ||
      !instructor ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields ",
      });
    }
    await Course.create({
      title,
      description,
      category,
      price,
      instructor,
      thumbnail,
      lessons,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
// POST /api/courses/:id/lessons
export const addLessonToCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const { title, videoUrl, duration } = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $push: { lessons: { title, videoUrl, duration } } },
      { returnDocument: "after", runValidators: true },
    );

    res
      .status(200)
      .json({ success: true, message: "Lesson added!", data: updatedCourse });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
// Update Course (/api/course/:id)
export const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const editCourse = req.body;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({
        success: false,
        message: "Course not found",
      });
    }
    const updatedCourse = await Course.findByIdAndUpdate(courseId, editCourse, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      success: true,
      message: "Course Updated Successfully!",
      data: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
// Delete Course (/api/course/:id)
export const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not Found!",
      });
    }
    await Course.findByIdAndDelete(courseId);
    res.status(200).json({
      success: true,
      message: "Course Deleted Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
