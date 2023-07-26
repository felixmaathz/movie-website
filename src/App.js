import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import MovieCard from "./components/MovieCard";
import Loader from "./components/Loader";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption] = useState("popularity");

  const getPopularMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=b19813b697c0dece456e929eda8859c0"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchResults = async (results) => {
    setIsLoading(true);
    const sortedMovies = [...results].sort(
      (a, b) => b.popularity - a.popularity
    );
    setSearchResults(sortedMovies);
    setSortOption("popularity");
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

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
    getPopularMovies();
  }, []);

  return (
    <div className="flex flex-col bg-secondary h-full min-h-screen">
      <Navbar sendSearchResults={handleSearchResults} />

      {searchResults.length > 0 ? (
        <label className="mx-auto my-4  sm:mx-10">
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
        </label>
      ) : (
        ""
      )}
      <div className="text-black flex flex-row flex-wrap justify-around content-around">
        {isLoading ? (
          <div className="mt-20">
            <Loader />
          </div>
        ) : (
          searchResults.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))
        )}

        {searchResults.length === 0 && !isLoading ? (
          <div className="mt-20">
            <h1 className="text-4xl text-center">No results found :/</h1>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
