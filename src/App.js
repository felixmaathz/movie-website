import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import MovieList from "./components/MovieList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieInformation from "./components/MovieInformation";

function App() {
  const [searchResults, setSearchResults] = useState([]);
 
  const handleSearchResults = async (results) => {

    const sortedMovies = [...results].sort(
      (a, b) => b.popularity - a.popularity
    );
    setSearchResults(sortedMovies);

  };

  return (
    <>
      <Router>
        <Navbar 
          sendSearchResults={handleSearchResults} />

        <Routes>
          <Route path="/movieDB" element={<MovieList 
            data={searchResults}
          />} />
          <Route path="/movieDB/search/:searchId" element={
          <MovieList 
            data={searchResults}
          />} />
          <Route path="/movieDB/movie/:movieId" element={<MovieInformation />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
