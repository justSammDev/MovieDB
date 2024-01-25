import axios from "axios";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import Search from "../components/Search";

const Movie = ({ movie }) => {
  return (
    <div className=" flex gap-3 flex-col bg-[#071E1E] max-h-[40rem]">
      <div>
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
      </div>
      <div className="pl-3 flex gap-3">
        <Star color="#0080ff" fill="#0080ff" width={18} />
        <p>{Math.round(movie.vote_average)}</p>
        <p>Released: {movie.release_date.split("-")[0]}</p>
      </div>
      <p className=" font-montserrat text-base font-thin pl-3 h-24">
        {movie.title}
      </p>
    </div>
  );
};

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [inputPageNo, setInputPageNo] = useState("");

  const fetchMovies = async (pageNumber) => {
    try {
      const fetchedData = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageNumber}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
          },
        }
      );

      const fetchedMovies = fetchedData.data.results;
      setMovies(fetchedMovies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies(pageNo);
  }, [pageNo]);

  const handlePrevClick = () => {
    if (pageNo > 1) {
      setPageNo((prevPage) => prevPage - 1);
      setInputPageNo("");
      window.scrollTo({ top: 0 });
    }
  };

  const handleNextClick = () => {
    setPageNo((prevPage) => prevPage + 1);
    setInputPageNo("");
    window.scrollTo({ top: 0 });
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputPageNo(value);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    const newPage = parseInt(inputPageNo, 10);
    if (!isNaN(newPage) && newPage >= 1) {
      setPageNo(newPage);
      setInputPageNo("");
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <section>
      <div className="">
        <Search />
      </div>
      <div className=" grid grid-cols-6 gap-3 px-5">
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="flex justify-center my-4 gap-10 items-center">
        <button
          onClick={handlePrevClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          disabled={pageNo <= 1}
        >
          Prev
        </button>
        {pageNo}
        <form onSubmit={handleInputSubmit} className="flex items-center">
          <input
            type="number"
            value={inputPageNo}
            onChange={handleInputChange}
            className="border border-gray-300 rounded px-2 py-1 text-center w-16 text-black"
            min="1"
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Go
          </button>
        </form>
        <button
          onClick={handleNextClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Movies;
