import React, { useEffect, useState } from "react";
import { logOutUser } from "../actions/auth";
import { useNavigate } from "react-router-dom";
import MovieSnippet from "../components/Movie/MovieSnippet";
import TVShowSnippet from "../components/TVShow/TVShowSnippet";
import { getUser } from "../actions/user";

const UserDetail = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [isMovies, setIsMovies] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser();
    navigate("/");
  };

  const getUserData = async () => {
    const user = await getUser();
    return user;
  };

  useEffect(() => {
    getUserData().then((user) => setUser(user));
  }, []);

  return (
    <div className=" relative flex justify-center flex-col items-center gap-3">
      <div className=" flex w-full justify-evenly items-center ">
        <button
          className="bg-primary   hover:bg-teal-700 text-black font-bold py-2 px-4 rounded mr-2"
          onClick={() => setIsMovies(true)}
        >
          Movies
        </button>
        <button
          className="bg-primary   hover:bg-teal-700 text-black font-bold py-2 px-4 rounded mr-2"
          onClick={() => setIsMovies(false)}
        >
          Tv Shows
        </button>
        <button
          className="bg-secondary  hover:bg-indigo-950 text-black font-bold py-2 px-4 rounded mr-2"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
      <p className=" font-kanit text-4xl font-bold">Favourites:</p>
      {isMovies ? (
        <div className="w-4/6 h-full ">
          {user.favouriteMovies.map((mediaId) => (
            <MovieSnippet key={mediaId} mediaId={mediaId} />
          ))}
        </div>
      ) : (
        <div className="w-4/6 h-full ">
          {user.favouriteTvShows.map((mediaId) => (
            <TVShowSnippet key={mediaId} mediaId={mediaId} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDetail;
