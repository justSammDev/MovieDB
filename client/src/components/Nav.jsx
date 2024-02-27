import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Nav = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const location = useLocation();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <nav className=" flex justify-evenly list-none items-center p-4 mx-10 font-kanit text-2xl ">
      <li>
        <Link to="/">
          <div className=" w-12 aspect-square border overflow-hidden rounded-3xl cursor-pointer">
            <img src="../../public/favicon.ico" alt="Logo" />
          </div>
        </Link>
      </li>
      <li>
        <Link to="/movies">Movies</Link>
      </li>
      <li>
        <Link to="/tvShows">TVShows</Link>
      </li>
      <li>
        {!user ? (
          <Link to="/auth">Sign In</Link>
        ) : (
          <Link to="/user">
            <img
              className=" w-12 h-12 aspect-square bg-green-700 rounded-full flex  items-center justify-center object-cover object-center"
              src={user.picture}
              alt={user.name.charAt(0)}
            />
          </Link>
        )}
      </li>
    </nav>
  );
};

export default Nav;
