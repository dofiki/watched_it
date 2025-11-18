import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";

import matrix from "../assets/movie_posters/matrix.jpg";
import ablcc from "../assets/movie_posters/all_about_lily_chou_chou.jpg";
import dune from "../assets/movie_posters/dune.jpg";
import misslonely from "../assets/movie_posters/miss_lonely.jpg";
import swinggirls from "../assets/movie_posters/swing_girls.jpg";
import { useState } from "react";

function HomePage() {
  
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSearch(){
    if(!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <>
      <div
        className="absolute inset-0 -z-10 h-full w-full items-center
        overflow-hidden [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"
    >
        <NavBar />

        <div className="pl-1 pr-1">
          <h6 className="text-white text-4xl text-center pt-15">
            Discover Your Next Favourite Movies
          </h6>

          <p className="text-gray-400 text-[1rem] text-center pt-2 pl-2 pr-2">
            Track, organize movies that are worth watching !
          </p>
        </div>

        <div className="pt-5 flex justify-center">
          <div className="relative w-60 sm:w-140">
            <input
              type="text"
              placeholder="enter movie name"
              className="bg-white w-full h-10 rounded-lg p-2 pr-20 outline-0 
              hover:outline-6 hover:outline-blue-900 transition-all ease-in delay-100
              text-[0.8rem] md:text-[1rem]"
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
            />

            <button
              className="absolute right-1 top-1/2 transform -translate-y-1/2
              flex items-center gap-2 bg-black text-white pt-2 pb-2 pl-4 pr-4
              rounded-lg hover:scale-104 ease-in delay-75 hover:text-blue-500 transition-all"
              onClick={handleSearch}
            >
              <FaSearch />
            </button>
          </div>
        </div>

        <div className="absolute -bottom-22 w-full">
          <div className="relative h-96 w-full flex justify-center items-center">
            <img
              src={ablcc}
              className="w-30 sm:w-48 md:w-60 h-55 sm:h-80 md:h-96 rounded-md absolute
              -rotate-20 bottom-0 sm:-bottom-16 md:-bottom-20 -translate-x-20 sm:-translate-x-36
              md:-translate-x-72 z-10 hover:-bottom-5 transition-all ease-in delay-5"
            />

            <img
              src={dune}
              className="w-30 sm:w-48 md:w-60 h-55 sm:h-80 md:h-96 rounded-md absolute
              -rotate-20 md:-rotate-10 md:bottom-0 bottom-8 -translate-x-10 sm:-translate-x-24
              md:-translate-x-36 z-20 hover:bottom-10 transition-all ease-in delay-5"
            />

            <img
              src={matrix}
              className="w-30 sm:w-48 md:w-60 h-55 sm:h-80 md:h-96 rounded-md absolute
              rotate-0 bottom-15 sm:bottom-5 md:bottom-10 translate-x-0 z-30
              hover:bottom-15 transition-all ease-in delay-5"
            />

            <img
              src={misslonely}
              className="w-30 sm:w-48 md:w-60 h-55 sm:h-80 md:h-96 rounded-md absolute
              rotate-20 bottom-8 md:bottom-0 md:rotate-10 translate-x-10 sm:translate-x-24
              md:translate-x-36 z-20 hover:bottom-10 transition-all ease-in delay-5"
            />

            <img
              src={swinggirls}
              className="w-30 sm:w-48 md:w-60 h-55 sm:h-80 md:h-96 rounded-md absolute
              rotate-20 bottom-0 sm:-bottom-16 md:-bottom-20 translate-x-20 sm:translate-x-36
              md:translate-x-72 z-10 hover:-bottom-5 transition-all ease-in delay-5"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;