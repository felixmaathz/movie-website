import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BiCameraMovie } from "react-icons/bi";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link, useParams, useNavigate } from "react-router-dom";

const Navbar = ({ sendSearchResults }) => {
  const [search, setSearch] = useState("");
  const [searchPlaceholder, setSearchPlaceholder] = useState("");
  const [showMenu, setShowMenu] = useState(false);

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
      navigate(`movieDB/search/${encodeURIComponent(search)}`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const goHome = async () => {
    setShowMenu(false);
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

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="bg-primary h-16 md:h-24 flex justify-around md:justify-center items-center fixed top-0 left-0 w-full z-[100] shadow-lg">
      <Link
        className="hidden md:block md:absolute left-12 cursor-pointer"
        to={"/movieDB"}
        onClick={goHome}
      >
        <BiCameraMovie size={40} className="text-accent" />
      </Link>
      <div onClick={toggleMenu}>
        {!showMenu ? (
          <AiOutlineMenu
            size={40}
            className="text-accent md:hidden cursor-pointer"
          />
        ) : (
          <AiOutlineClose
            size={40}
            className="text-accent md:hidden cursor-pointer"
          />
        )}
      </div>
      <div
        className="relative h-10 md:h-12 w-1/2 md:w-80 inline-flex items-center"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            searchMovies();
          }
        }}
      >
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

      <div className=
    {showMenu ?
      "top-0 right-0 fixed md:hidden w-[60%] h-screen  bg-primary opacity-95 ease-in-out transition duration-500 shadow-xl"   :
      "top-0 right-[-100%] fixed md:hidden w-1/2 h-screen bg-primary opacity-95 ease-in-out transition duration-500 shadow-xl"
    } 
      >
        <h1 className="text-white text-2xl font-bold text-center py-4 border-b-2 border-accent">
          Movie DB
        </h1>
        <ul>
          <li className="text-white text-2xl text-center py-4 border-b-2 border-accent">
            <Link to={"/movieDB"} onClick={goHome}>
              Home
            </Link>
          </li>
        </ul>
        <div className="absolute bottom-0 w-full">
          <ul>
            <li className="text-white text-2xl text-center py-4 border-t-2 border-accent">
              Account
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
