import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className=" flex justify-evenly list-none items-center p-4 mx-10 font-kanit text-2xl ">
      <li>
        <Link to="/">
          <div className=" w-12 aspect-square border overflow-hidden rounded-3xl cursor-pointer">
            <img src="../../public/movi.jpg" alt="Logo" />
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
        <Link to="/auth">Auth</Link>
      </li>
    </nav>
  );
};

export default Nav;
