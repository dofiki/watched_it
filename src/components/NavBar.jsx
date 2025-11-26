import { RiMovie2Fill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";

import { Link } from "react-router-dom";
import { useState } from "react";

import ThemeButton from "./ThemeButton";
import { useTheme } from "../context/ThemeContext";

export default function NavBar() {
  const { darkTheme } = useTheme();
  const [hamStatus, setHamStatus] = useState(false);

  function handleHam() {
    setHamStatus(!hamStatus);
  }

  return (
    <>
      <div
        className={`flex justify-around ${darkTheme ? "text-white" : "text-black"} p-5 items-center`}
      >
        <div
          className="text-xl sm:text-2xl flex gap-2 items-center hover:text-blue-500
             transition-colors delay-75 cursor-pointer"
        >
          <RiMovie2Fill />{" "}
          <Link to="/">
            watched<span className="text-blue-500">it</span>
          </Link>
        </div>

        <div>
          <ul className="hidden md:flex gap-10 items-center h-full">
            <li>
              <button className="hover:text-blue-500 transition-colors delay-75 cursor-pointer">
                <Link to="/">Home</Link>
              </button>
            </li>
            <li>
              <button className="hover:text-blue-500 transition-colors delay-75 cursor-pointer">
                <Link to="/watched">Watched</Link>
              </button>
            </li>
            <li>
              <button className="hover:text-blue-500 transition-colors delay-75 cursor-pointer">
                <Link to="/watchlist">Watchlist</Link>
              </button>
            </li>
            <li>
              <ThemeButton />
            </li>
          </ul>

          <div className="flex md:hidden gap-5 items-center">
            <div
              className={`flex items-center h-full ${darkTheme ? "text-white" : "text-black"}
               hover:text-blue-700 transition-colors delay-75 cursor-pointer`}
            >
              <GiHamburgerMenu onClick={handleHam} size={22} />
            </div>
            <ThemeButton />
          </div>

          <div
            className={`absolute z-50 ${darkTheme ? "bg-black text-white" : "bg-white text-black"}
              w-full md:hidden left-0 overflow transition-all duration-300 
              ${hamStatus ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <ul className="text-center p-10 ">
              <li>
                <Link
                  to="/"
                  className="hover:text-blue-400 transition-colors delay-75 p-2"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/watched"
                  className="hover:text-blue-400 transition-colors delay-75  p-2"
                >
                  Watched
                </Link>
              </li>

              <li>
                <Link
                  to="/watchlist"
                  className="hover:text-blue-400 transition-colors delay-75 p-2"
                >
                  Watchlist
                </Link>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </>
  );
}
