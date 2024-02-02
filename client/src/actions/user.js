import * as api from "../api/index.js";

export const addToFavourites = async (movieId) => {
  try {
    const response = await api.addToFavourites({ movieId: movieId });
    return response.data;
  } catch (error) {
    console.log(`Tis error yo addToFav: ${error}`);
  }
};

export const addToFavouriteTvShows = async (movieId) => {
  try {
    const response = await api.addToFavouriteTvShows({ movieId: movieId });
    return response.data;
  } catch (error) {
    console.log(`Tis error yo addToFav: ${error}`);
  }
};

export const removeFromFavourites = async (movieId) => {
  try {
    const response = await api.removeFromFavourites({ movieId: movieId });
    return response.data;
  } catch (error) {
    console.log(`Tis error yo removeToFav: ${error}`);
  }
};

export const getUser = async () => {
  try {
    const response = await api.getUser();
    return response.data;
  } catch (error) {
    console.log(`Tis error yo removeToFav: ${error}`);
  }
};
