import API from "./api";

export const getCourse = async () => {
  try {
    const response = await API.get("/course");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const CourseDetail = async (id) => {
  try {
    const response = await API.get(`/course/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const createCourse = async (newData) => {
  try {
    const response = await API.post("/course", newData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const addLesson = async (courseId, lessonData) => {
  try {
    const response = await API.post(`/course/${courseId}/lessons`, lessonData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const updateCourse = async (courseId, editFormData) => {
  try {
    const response = await API.put(`/course/${courseId}`, editFormData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const deleteCourse = async (courseId) => {
  try {
    const response = await API.delete(`/course/${courseId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};
