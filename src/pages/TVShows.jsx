import axios from "axios";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import Search from "../components/Search";

const TVShow = ({ tvShow }) => {
  return (
    <div className=" flex gap-3 flex-col bg-[#071E1E] max-h-[40rem]">
      <div>
        <img src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`} />
      </div>
      <div className="pl-3 flex gap-3">
        <Star color="#0080ff" fill="#0080ff" width={18} />
        <p>{Math.round(tvShow.vote_average)}</p>
        <p>Released: {tvShow.first_air_date.split("-")[0]}</p>
      </div>
      <p className=" font-montserrat text-base font-thin pl-3 h-24">
        {tvShow.name}
      </p>
    </div>
  );
};

const TVShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [inputPageNo, setInputPageNo] = useState("");

  const fetchTVShows = async (pageNumber) => {
    try {
      const fetchedData = await axios.get(
        `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${pageNumber}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
          },
        }
      );

      const fetchedTVShows = fetchedData.data.results;
      setTvShows(fetchedTVShows);
      console.log(fetchedTVShows);
    } catch (error) {
      console.error("Error fetching tvShows:", error);
    }
  };

  useEffect(() => {
    fetchTVShows(pageNo);
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
      <Search />
      <div className=" grid grid-cols-6 gap-3 px-5">
        {tvShows.map((tvShow) => (
          <TVShow key={tvShow.id} tvShow={tvShow} />
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

export default TVShows;
