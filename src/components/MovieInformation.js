import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import { FaStar } from "react-icons/fa";

const MovieInformation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [movieInformation, setMovieInformation] = useState([]);

  const { movieId } = useParams();

  useEffect(() => {
    const getMovieInformation = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=b19813b697c0dece456e929eda8859c0`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        console.log(data);
        setMovieInformation(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    };
    getMovieInformation();
  }, [movieId]);

  return (
    <div className="bg-secondary h-full pt-16 md:pt-24 flex justify-center text-white">
      {isLoading ? (
        <div className="flex items-center">
          <Loader />
        </div>
      ) : (
        <div className="relative w-full md:h-full h-auto">
          <img
            src={`https://image.tmdb.org/t/p/w1280/${movieInformation.backdrop_path}`}
            alt="poster"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full z-1 bg-black opacity-70"></div>
          <div className="absolute top-0 left-0 w-full h-full z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:px-24 py-2 md:py-8">
            <div className="col-span-1 m-auto">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movieInformation.poster_path}`}
                alt="poster"
                className="h-[28rem] w-auto object-cover"
              />
            </div>
            <div className="m-auto bg-primary border-y-2 border-accent md:border-0 md:bg-transparent col-span-1 lg:col-span-2 p-4 px-6">
              <h1 className="text-center md:text-left text-5xl font-bold">
                {movieInformation.title}
              </h1>

              <div className="flex justify-between mt-4">
                <p className="text-2xl opacity-60">
                  {movieInformation.tagline}
                </p>
                <div className="flex flex-row items-baseline justify-center">
                  <p className="text-lg md:text-2xl">
                    {Math.round(movieInformation.vote_average * 10) / 10}
                  </p>
                  <p className="text-sm">/10</p>
                </div>
              </div>
              <p className="mt-4">{movieInformation.overview}</p>
              <p className="text-xl mt-4">
                Release date: {movieInformation.release_date}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieInformation;
