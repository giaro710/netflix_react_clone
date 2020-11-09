import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import tmdbApi from "../axios";

import { getYoutubeId } from "../getYoutubeId";

import "../Row.css";

const baseUrl = "https://image.tmdb.org/t/p/original/";
const trailerOptions = {
  height: "390px",
  width: "100%",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const request = await tmdbApi.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    };
    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    getYoutubeId(movie, trailerUrl, setTrailerUrl);
  };

  const renderMovies = () => {
    return movies.map((movie) => {
      return (
        <img
          key={movie.id}
          className={`row__poster ${isLargeRow && "row__posterLarge"}`}
          src={`${baseUrl}${
            isLargeRow ? movie.poster_path : movie.backdrop_path
          }`}
          alt={movie.name}
          onClick={() => handleClick(movie)}
        />
      );
    });
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">{renderMovies()}</div>
      {trailerUrl && (
        <YouTube
          videoId={trailerUrl}
          opts={trailerOptions}
          className="row__trailer"
        />
      )}
    </div>
  );
};

export default Row;
