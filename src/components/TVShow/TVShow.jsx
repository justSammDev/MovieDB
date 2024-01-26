import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const TVShow = ({ tvShow }) => {
  return (
    <Link to={`/tvShows/${tvShow.name}/${tvShow.id}`}>
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
