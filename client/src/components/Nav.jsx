import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import MenuSvg from "../assets/svg/MenuSvg";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

const Nav = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [openNavigation, setOpenNavigation] = useState(false);

  const location = useLocation();

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;
    enablePageScroll();
    setOpenNavigation(false);
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <div
      className={`flex relative justify-around items-center p-4 mx-10 font-kanit text-2xl lg:justify-end`}
    >
      <div>
        <Link to="/">
          <div className=" w-12 aspect-square border bg-cyan-50 overflow-hidden rounded-3xl cursor-pointer">
            <img src="../images/movie.png" alt="Logo" />
          </div>
        </Link>
      </div>
      <nav
        className={`${
          openNavigation
            ? "flex flex-col justify-evenly absolute w-screen h-[100vh] top-20 bg-black z-10"
            : "hidden"
        } justify-around list-none items-center p-4 w-4/5 lg:flex`}
      >
        <li onClick={handleClick}>
          <Link to="/movies">Movies</Link>
        </li>
        <li onClick={handleClick}>
          <Link to="/tvShows">TVShows</Link>
        </li>
        <li onClick={handleClick}>
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
      <div className="lg:hidden">
        <button
          className="ml-auto lg:hidden p-3 border rounded-xl"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </button>
      </div>
    </div>
  );
};

export default Nav;
