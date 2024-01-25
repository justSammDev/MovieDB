import axios from "axios";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import Search from "../components/Search";

const TVShow = ({ tvShow }) => {
  return (
    <div className=" flex gap-3 flex-col bg-[#071E1E] max-h-[40rem]">
      <div className=" w-[208.167px] h-[312.25px] overflow-hidden">
        <img
          src={
            !tvShow.poster_path
              ? "../../public/images/noTvShow.jpg"
              : `https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`
          }
          className=" object-cover w-full h-full"
        />
      </div>
      <div className="pl-3 flex gap-3">
        <Star color="#0080ff" fill="#0080ff" width={18} />
        <p>
          {tvShow.vote_count === 0 ? "N/A" : Math.round(tvShow.vote_average)}
        </p>
        <p>Aired: {tvShow.first_air_date.split("-")[0]}</p>
      </div>
      <p className=" font-montserrat text-base font-thin pl-3 h-24">
        {tvShow.name}
      </p>
    </div>
  );
};

const TVShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [unchangingTvShows, setUnchangingTvShows] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [inputPageNo, setInputPageNo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPageNo, setSearchPageNo] = useState(1);

  const fetchTvShows = async (pageNumber) => {
    try {
      const fetchedData = await axios.get(
        `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${pageNumber}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
          },
        }
      );

      const fetchedTvShows = fetchedData.data.results;
      setTvShows(fetchedTvShows);
      if (pageNo === 1) {
        setUnchangingTvShows(fetchedTvShows);
      }
      setSearchPageNo(1);
    } catch (error) {
      console.error("Error fetching tvShows:", error);
    }
  };

  const onSearch = async (query, searchPageNo) => {
    try {
      const queriedTvShowsData = await axios.get(
        `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=${searchPageNo}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
          },
        }
      );
      const queriedTvShows = queriedTvShowsData.data.results;
      setTvShows(queriedTvShows);
      setSearchQuery(query);
      setPageNo(1);
    } catch (error) {
      console.error("Error fetching queried tvShows:", error);
    }
  };

  useEffect(() => {
    if (searchQuery === "") {
      setTvShows(unchangingTvShows);
      setSearchPageNo(1);
    }
  }, [searchQuery, unchangingTvShows]);

  useEffect(() => {
    if (searchQuery !== "") {
      onSearch(searchQuery, searchPageNo);
    } else {
      fetchTvShows(pageNo);
    }
  }, [pageNo, searchPageNo]);

  const handlePrevClick = () => {
    if (searchQuery && searchPageNo > 1) {
      setSearchPageNo((prevPage) => prevPage - 1);
      setInputPageNo("");
      window.scrollTo({ top: 0 });
    } else if (pageNo > 1) {
      setPageNo((prevPage) => prevPage - 1);
      setInputPageNo("");
      window.scrollTo({ top: 0 });
    }
  };

  const handleNextClick = () => {
    if (searchQuery) {
      setSearchPageNo((prevPage) => prevPage + 1);
      setInputPageNo("");
      window.scrollTo({ top: 0 });
    } else {
      setPageNo((prevPage) => prevPage + 1);
      setInputPageNo("");
      window.scrollTo({ top: 0 });
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputPageNo(value);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    const newPage = parseInt(inputPageNo, 10);
    if (searchQuery !== "" && !isNaN(newPage) && newPage >= 1) {
      setSearchPageNo(newPage);
      setInputPageNo("");
      window.scrollTo({ top: 0 });
    } else if (!isNaN(newPage) && newPage >= 1) {
      setPageNo(newPage);
      setInputPageNo("");
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <section>
      <div className="flex flex-col justify-center items-center">
        <Search onSearch={onSearch} pageNo={searchPageNo} />
        <h1 className=" pb-5 font-montserrat font-bold text-4xl">Tv Shows:</h1>
      </div>
      <div className="flex justify-center my-4 gap-10 items-center">
        <button
          onClick={handlePrevClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          disabled={pageNo <= 1}
        >
          Prev
        </button>
        {searchQuery ? searchPageNo : pageNo}
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
      <div className="text-center">
        {tvShows.length === 0 ? (
          <h2 className="font-kanit font-bold text-8xl py-20">
            No Tv Shows Found!!
          </h2>
        ) : (
          <div className="grid grid-cols-6 gap-3 p-5">
            {tvShows.map((tvShow) => (
              <TVShow key={tvShow.id} tvShow={tvShow} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TVShows;
