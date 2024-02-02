import * as api from "../api/index.js";

export const createUser = async (formData) => {
  try {
    const response = await api.createUser(formData);
    if (response.data.message === "User already exists.")
      return "User already exists.";
    if (response.data.message === "User Name already exists.")
      return "User Name already exists.";
    localStorage.setItem("profile", JSON.stringify({ ...response.data }));
    return response.data;
  } catch (error) {
    console.log(`This is the error: ${error.message}`);
    throw error;
  }
};

export const checkUser = async (formData) => {
  try {
    const response = await api.checkUser(formData);
    if (response.data.message === "User doesn't exist.")
      return "User doesn't exist.";
    if (response.data.message === "Invalid credentials.")
      return "Invalid credentials.";
    localStorage.setItem("profile", JSON.stringify({ ...response.data }));
    return response.data;
  } catch (error) {
    console.log(`This is the error: ${error.message}`);
    throw error;
  }
};

export const googleLogin = async (formData) => {
  try {
    const response = await api.googleLogin(formData);
    localStorage.setItem("profile", JSON.stringify({ ...response.data }));
    return response.data;
  } catch (error) {
    console.log(`This is the error: ${error.message}`);
    throw error;
  }
};

export const logOutUser = (async) => {
  try {
    localStorage.clear();
    return "Logged Out";
  } catch (error) {
    console.log(error);
  }
};
