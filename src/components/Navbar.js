import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BiCameraMovie } from "react-icons/bi";
import { Link, useParams, useNavigate } from "react-router-dom";

const Navbar = ({ sendSearchResults }) => {
  const [search, setSearch] = useState("");
  const [searchPlaceholder, setSearchPlaceholder] = useState("");

  const { searchId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const suggestedNames = [
      "Pulp Fiction",
      "Forrest Gump",
      "Inception",
      "The Matrix",
      "Jurassic Park",
      "Avatar",
      "Gladiator",
      "Titanic",
      "Casablanca",
      "Jaws",
      "Rocky",
      "Frozen",
      "Memento",
      "Alien",
      "Psycho",
      "Grease",
      "Hugo",
      "Mulan",
      "Gravity",
      "Brave",
    ];
    const randomIndex = Math.floor(Math.random() * suggestedNames.length);
    setSearchPlaceholder(suggestedNames[randomIndex]);
    getPopularMovies();
  }, []);

  const searchMovies = async () => {
    if (search === "") return;
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=b19813b697c0dece456e929eda8859c0`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      sendSearchResults(data.results);
      navigate(`/search/${encodeURIComponent(search)}`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const goHome = async () => {
    setSearch("");
    getPopularMovies();
  };

  const getPopularMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=b19813b697c0dece456e929eda8859c0"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      sendSearchResults(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="bg-primary h-24 flex justify-center items-center fixed top-0 left-0 w-full z-[100]">
      <Link
        className="hidden md:block absolute left-12 cursor-pointer"
        to={"/"}
        onClick={goHome}
      >
        <BiCameraMovie size={40} className="text-accent" />
      </Link>
      <div className="relative h-12 w-1/2 md:w-80 inline-flex items-center">
        <input
          className="w-full h-full border-2 outline-none rounded-xl 
                  bg-transparent border-accent text-white   
                  pr-8 pl-2 "
          placeholder={searchPlaceholder + "..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch
          className="text-accent absolute right-4 cursor-pointer hover:scale-110 transition duration-100"
          onClick={searchMovies}
        />
      </div>
    </div>
  );
};

export default Navbar;
