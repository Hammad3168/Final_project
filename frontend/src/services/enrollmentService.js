import API from "./api.js";

export const enrollmentStudent = async (courseId) => {
  try {
    const response = await API.post("/enroll", { courseId });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const fetchMyCourses = async () => {
  try {
    const response = await API.get("/my-courses");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};
