import API from "./api";

export const getUsers = async () => {
  try {
    const response = await API.get("/users");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await API.post("/users/register", userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const login = async (credentials) => {
  try {
    const response = await API.post("/users/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const deleteCourse = async (userId) => {
  try {
    const response = await API.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const updateUser = async (id, newRole) => {
  try {
    const response = await API.put(`/users/${id}`, { role: newRole });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};
