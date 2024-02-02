import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).jti
    }`;
  }

  return req;
});

export const getUser = () => API.get("/getUser");
export const createUser = (formData) => API.post(`/auth/createUser`, formData);
export const checkUser = (formData) => API.post(`/auth/checkUser`, formData);
export const googleLogin = (formData) =>
  API.post(`/auth/googleLogin`, formData);
export const addToFavourites = (movieId) =>
  API.patch(`/addToFavourites`, movieId);
export const addToFavouriteTvShows = (movieId) =>
  API.patch(`/addToFavouriteTvShows`, movieId);
export const removeFromFavourites = (movieId) =>
  API.patch(`/removeFromFavourites`, movieId);
