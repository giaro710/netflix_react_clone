import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";

import tmdbApi from "../axios";
import requests from "../requests";
import { getYoutubeId } from "../getYoutubeId";
import "../Banner.css";

const trailerOptions = {
  height: "390px",
  width: "100%",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const request = await tmdbApi.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    };
    fetchData();
  }, []);

  const handleClick = () => {
    getYoutubeId(movie, trailerUrl, setTrailerUrl);
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <div>
      <header
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="banner__buttons">
            <button onClick={() => handleClick()} className="banner__button">
              Play
            </button>
            <button className="banner__button">My List</button>
          </div>

          <h1 className="banner__description">
            {truncate(movie?.overview, 150)}
          </h1>
        </div>

        <div className="banner--fadeBottom" />
      </header>
      {trailerUrl && (
        <YouTube
          videoId={trailerUrl}
          opts={trailerOptions}
          className="banner__trailer"
        />
      )}
    </div>
  );
};

export default Banner;
