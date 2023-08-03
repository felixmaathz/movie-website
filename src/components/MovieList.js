import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Loader from "./Loader";
import { useParams } from "react-router-dom";

const MovieList = ({ data }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption] = useState("popularity");

  const { searchId } = useParams();

  const sortMovies = (sortBy) => {
    if (sortBy === "popularity") {
      const sortedMovies = [...searchResults].sort(
        (a, b) => b.popularity - a.popularity
      );
      setSearchResults(sortedMovies);
      console.log("sorted by popularity", sortedMovies);
    }
    if (sortBy === "rating") {
      const sortedMovies = [...searchResults].sort(
        (a, b) => b.vote_average - a.vote_average
      );
      setSearchResults(sortedMovies);
      console.log("sorted by rating", sortedMovies);
    }
    if (sortBy === "release") {
      const sortedMovies = [...searchResults].sort((a, b) => {
        const dateA = new Date(a.release_date);
        const dateB = new Date(b.release_date);
        return dateB - dateA;
      });
      setSearchResults(sortedMovies);
      console.log("sorted by release", sortedMovies);
    }
    if (sortBy === "votes") {
      const sortedMovies = [...searchResults].sort(
        (a, b) => b.vote_count - a.vote_count
      );
      setSearchResults(sortedMovies);
      console.log("sorted by votes", sortedMovies);
    }
    setSortOption(sortBy);
  };

  useEffect(() => {
    setIsLoading(true);
    setSearchResults(data);
    console.log("sorted by popularity", data);
    setSortOption("popularity");
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, [data]);

  return (
    <div className={`flex flex-col bg-secondary min-h-screen pt-24`}>
      {searchResults.length > 0 ? (
        <label className="mx-auto my-4  sm:mx-10 flex justify-between">
          <div>
            Sort by:
            <select
              onChange={(e) => sortMovies(e.target.value)}
              value={sortOption}
              className="p-1 rounded-xl ml-1 outline-none bg-primary text-white"
            >
              <option value="popularity">Popularity</option>
              <option value="rating">Rating</option>
              <option value="release">Release date</option>
              <option value="votes">Votes</option>
            </select>
          </div>
          {/* {searchResults.length}{" "}results found */}
        </label>
      ) : (
        ""
      )}

      {isLoading ? (
        <div className="flex items-center justify-center flex-grow">
          <Loader />
        </div>
      ) : (
        <div className="text-black flex flex-row flex-wrap justify-around content-around">
          {searchResults.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}

          {searchResults.length === 0 && !isLoading ? (
            <div className="mt-20">
              <h1 className="text-4xl text-center">No results found :/</h1>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default MovieList;
