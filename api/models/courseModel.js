import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    lessons: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
        },
        videoUrl: {
          type: String,
          required: true,
        },
        duration: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
