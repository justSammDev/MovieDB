import { Link } from "react-router-dom";
import axios from "axios";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

const TVShowSnippet = ({ mediaId }) => {
  const [mediaDetail, setMediaDetail] = useState([]);

  const fetchMedia = async (mediaId) => {
    try {
      const queriedMediaData = await axios.get(
        `https://api.themoviedb.org/3/find/${mediaId}?external_source=imdb_id`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
          },
        }
      );
      const queriedMedia = queriedMediaData.data.tv_results[0];
      setMediaDetail(queriedMedia);
    } catch (error) {
      console.error("Error fetching queried tvShow: ", error);
    }
  };

  useEffect(() => {
    fetchMedia(mediaId);
  }, [mediaId]);

  return (
    <Link to={`/tvShows/${mediaDetail.name}/${mediaDetail.id}`}>
      <div className=" flex items-center gap-3 py-5 px-3">
        <div className="w-20 h-24 flex justify-center items-center">
          <img
            src={`https://image.tmdb.org/t/p/w500/${mediaDetail.poster_path}`}
            alt="Movie Poster"
            className=" object-cover "
          />
        </div>
        <div className=" flex flex-col gap-2">
          <p className=" font-montserrat text-2xl font-bold">
            {mediaDetail.name}
          </p>
          <div className=" flex gap-4">
            <p className="font-montserrat text-md">
              <span className="font-montserrat text-lg font-bold">Aired:</span>{" "}
              {mediaDetail.first_air_date}
            </p>
            <div className=" flex gap-2 font-montserrat text-md">
              <Star color="#0080ff" fill="#0080ff" width={18} />
              {!isNaN(mediaDetail.vote_average) && (
                <p>
                  {mediaDetail.vote_count === 0
                    ? "N/A"
                    : Math.round(mediaDetail.vote_average)}
                </p>
              )}
            </div>
            <div className=" font-montserrat text-lg font-bold">TvShow</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TVShowSnippet;
