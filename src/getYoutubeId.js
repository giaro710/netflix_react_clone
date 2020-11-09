import movieTrailer from "movie-trailer";

export const getYoutubeId = (movie, trailerUrl, setTrailerUrl) => {
  if (trailerUrl) {
    setTrailerUrl("");
  } else {
    movieTrailer(movie?.name || movie?.original_name || movie?.title)
      .then((url) => {
        console.log(url);
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
      })
      .catch((error) => console.log(error));
  }
};

//  The movieTrailer library take a string and returns the path to the trailer (youtube)
