import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const MovieCard = ({ data }) => {
  const handleClick = () => {
    console.log("MovieCard clicked");
  };

  return (
    <Link
      to={`/movie/${data.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        className="flex flex-col w-[350px] sm:w-[300px] h-auto rounded-xl mx-6 mb-12
                bg-primary overflow-hidden text-white shadow-xl transform
                  hover:scale-[102%] duration-200 cursor-pointer hover:shadow-2xl"
        onClick={handleClick}
      >
        <div>
          {data.poster_path === null ? (
            <div className="h-96 w-full bg-primary flex justify-center items-center">
              <h1 className="text-4xl">Poster not found</h1>
            </div>
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
              alt="poster"
              className="h-96 w-full object-cover"
            />
          )}
        </div>
        <div className="h-24 flex flex-row justify-start items-center p-2">
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-xl ">{data.title}</h1>
            <p className="text-xs">{data.release_date}</p>
          </div>
          <div className="flex h-full justify-center ml-auto border-l-2 pl-2 border-accent">
            {data.vote_average > 0 ? (
              <div className="flex flex-col justify-center items-center">
                <FaStar className=" text-accent" />

                <h1 className="text-xl">
                  {Math.round(data.vote_average * 10) / 10}
                </h1>
                <p className="text-xs">({data.vote_count})</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
