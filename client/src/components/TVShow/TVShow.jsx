import { Star } from "lucide-react";
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

const TVShow = ({ tvShow }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToFavourites = () => {};

  return (
    <Link to={`/tvShows/${tvShow.name}/${tvShow.id}`}>
      <div className=" flex gap-3 flex-col bg-[#071E1E] max-h-[40rem] relative">
        <div
          className="absolute -right-2 -top-1 w-12 h-10 flex items-center opacity-50 hover:opacity-100 justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleAddToFavourites}
        >
          <PlusCircle size={30} color="#000000" />{" "}
        </div>
        {isHovered && (
          <div className="absolute  -top-9 -right-3 font-kanit bg-white p-2 text-black shadow rounded-lg opacity-65">
            Add to Favorites
            <div className="w-3 h-4 absolute right-4 bg-white transform rotate-45 -mt-1"></div>
          </div>
        )}
        <div className=" w-[208.167px] h-[312.25px] overflow-hidden">
          <img
            src={
              !tvShow.poster_path
                ? "../images/noTvShow.jpg"
                : `https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`
            }
            className=" object-cover w-full h-full"
          />
        </div>
        <div className="pl-3 flex gap-3">
          <Star color="#0080ff" fill="#0080ff" width={18} />
          {!isNaN(tvShow.vote_average) && (
            <p>
              {tvShow.vote_count === 0
                ? "N/A"
                : Math.round(tvShow.vote_average)}
            </p>
          )}
          <p>Aired: {tvShow.first_air_date.split("-")[0]}</p>
        </div>
        <p className=" font-montserrat text-base font-thin pl-3 h-24 text-left">
          {tvShow.name}
        </p>
      </div>
    </Link>
  );
};

export default TVShow;
