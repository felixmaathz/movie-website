import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BiCameraMovie } from "react-icons/bi";


const Navbar = ({ sendSearchResults }) => {
  const [search, setSearch] = useState("");
  const [searchPlaceholder, setSearchPlaceholder] = useState("");


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
  }, []);
    

  const searchMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=b19813b697c0dece456e929eda8859c0`
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

  const refreshPage = () => {
    window.location.reload(false);
  };


  return (
    <div className="bg-primary h-24 flex justify-center items-center relative">
      <div className="absolute left-12 cursor-pointer" 
           onClick={refreshPage}>
        <BiCameraMovie size={40} className="text-accent" />
        

        </div>
      <div className="relative h-12 w-80 inline-flex items-center">
        <input
          className="w-full h-full border-2 outline-none rounded-xl 
                  bg-transparent border-accent text-white   
                  pr-8 pl-2 "
          placeholder={searchPlaceholder+"..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch
          className="text-accent absolute right-4 cursor-pointer"
          onClick={searchMovies}
        />
      </div>
    </div>
  );
};

export default Navbar;
