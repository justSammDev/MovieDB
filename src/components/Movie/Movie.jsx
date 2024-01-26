import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const Movie = ({ movie }) => {
  return (
    <Link to={`/movies/${movie.title}/${movie.id}`}>
      <div className=" flex gap-3 flex-col bg-[#071E1E] max-h-[40rem]">
        <div className=" w-[208.167px] h-[312.25px] overflow-hidden">
          <img
            src={
              !movie.poster_path
                ? "../../public/images/noMovie.jpg"
                : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            }
            className=" object-cover w-full h-full"
          />
        </div>
        <div className="pl-3 flex gap-3">
          <Star color="#0080ff" fill="#0080ff" width={18} />
          {!isNaN(movie.vote_average) && (
            <p>
              {movie.vote_count === 0 ? "N/A" : Math.round(movie.vote_average)}
            </p>
          )}
          <p>Released: {movie.release_date.split("-")[0]}</p>
        </div>
        <p className=" font-montserrat text-base font-thin pl-3 h-24 text-left">
          {movie.title}
        </p>
      </div>
    </Link>
  );
};

export default Movie;
