import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { BookmarkPlus } from "lucide-react";
import { BookmarkCheck } from "lucide-react";
import { addToFavouriteTvShows, getUser } from "../../actions/user";

const TVShowDetail = () => {
  const [media, setMedia] = useState([]);
  const [noMedia, setNoMedia] = useState(false);
  const [imdbId, setImdbId] = useState("");
  const [addedToFavourites, setAddedToFavourites] = useState(false);

  const { mediaId } = useParams();

  const fetchExternalIds = async () => {
    try {
      const externalIdsData = await axios.get(
        `https://api.themoviedb.org/3/tv/${mediaId}/external_ids`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
          },
        }
      );
      const fetchedImdbId = externalIdsData.data.imdb_id.toString();
      setImdbId(fetchedImdbId);
    } catch (error) {
      setNoMedia(true);
    }
  };

  const fetchMedia = async () => {
    try {
      const queriedMediaData = await axios.get(
        `https://api.themoviedb.org/3/find/${imdbId}?external_source=imdb_id`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
          },
        }
      );
      const queriedMedia = queriedMediaData.data.tv_results[0];
      setMedia(queriedMedia);
    } catch (error) {
      console.error("Error fetching queried tvShow:", error);
    }
  };

  const handleAddToFavourites = async () => {
    const data = await addToFavouriteTvShows(imdbId);
    setAddedToFavourites((prev) => !prev);
  };

  const getUserData = async () => {
    const user = await getUser();
    return user;
  };

  useEffect(() => {
    fetchExternalIds();
  }, []);

  useEffect(() => {
    if (imdbId) {
      fetchMedia();
      getUserData().then((user) => {
        if (user.favouriteTvShows.includes(imdbId)) {
          setAddedToFavourites(true);
        }
      });
    }
  }, [imdbId]);

  return (
    <div className=" w-full p-14 flex justify-center items-center">
      {noMedia ? (
        <p className=" font-montserrat text-9xl font-extrabold">NO TV SHOW!!</p>
      ) : (
        <div className="flex justify-center items-center gap-5 w-9/12">
          <div className="overflow-hidden w-1/3">
            {media.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
                className=" w-[200px] h-[300px] "
                alt="TvShow Poster"
              />
            ) : (
              <p className=" font-montserrat text-4xl font-bold">No Img</p>
            )}
          </div>
          <div className=" flex flex-col gap-8 w-2/3">
            <div className=" flex items-center justify-evenly flex-row">
              <h3 className=" font-montserrat text-3xl font-extrabold">
                {media.name}
              </h3>
              <div
                className="font-montserrat text-lg cursor-pointer flex items-center justify-center gap-2"
                onClick={() => {
                  handleAddToFavourites();
                }}
              >
                Add to favourites
                {addedToFavourites ? (
                  <BookmarkCheck color="blue" size={30} />
                ) : (
                  <BookmarkPlus color="grey" size={30} />
                )}
              </div>
            </div>
            <div className="pl-3 flex gap-8">
              <div className=" flex gap-3">
                <Star color="#0080ff" fill="#0080ff" width={18} />
                {!isNaN(media.vote_average) && (
                  <p>
                    {media.vote_count === 0
                      ? "N/A"
                      : Math.round(media.vote_average)}
                  </p>
                )}
              </div>
              {!isNaN(media.vote_count) && (
                <p>
                  <span className="font-montserrat text-lg font-bold">
                    Vote Count:
                  </span>{" "}
                  {media.vote_count === 0 ? "N/A" : media.vote_count}
                </p>
              )}
              <p className=" pl-5">
                <span className="font-montserrat text-lg font-bold">
                  Language:{" "}
                </span>
                {media.original_language}
              </p>
            </div>
            <p className=" font-kanit ">
              <span className="font-montserrat text-lg font-bold">
                Overview:{" "}
              </span>
              {media.overview}
            </p>
            <div className=" flex gap-4">
              <p>
                <span className="font-montserrat text-lg font-bold">
                  Aired date:
                </span>{" "}
                {media.first_air_date}
              </p>
              <p>
                <span className="font-montserrat text-lg font-bold">
                  Original Title:
                </span>{" "}
                {media.original_name}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TVShowDetail;
