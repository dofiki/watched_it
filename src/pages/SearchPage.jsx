import { useState, useEffect } from "react";
import NavBar from "../components/NavBar.jsx";
import { useLocation } from "react-router-dom";
import { IoMdTime } from "react-icons/io";
import { MdStarRate } from "react-icons/md";
import { MdLocalMovies } from "react-icons/md";
import { MdOutlineMoreTime } from "react-icons/md";

import StarRating from "../components/Rating.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { useWatchlistStore } from "../store/watchlistStore.js";


const apiKey = import.meta.env.VITE_API_KEY;

export default function SearchPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const { watched, addToWatchlist } = useWatchlistStore();

  useEffect(() => {
    async function fetchMovies() {
      if (!query) return;

      setLoading(true);

      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`
      );  
      const data = await res.json();

      if (!data.Search) {
        setMovies([]);
        return;
      }

      const detailedMovies = await Promise.all(
        data.Search.map(async (movie) => {
          const res2 = await fetch(
            `https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}&plot=short`
          );
          return await res2.json();
        })
      );

      setMovies(detailedMovies);
      setLoading(false);
    }

    fetchMovies();
  }, [query]);

  return (
    <div className="min-h-screen w-full pb-20 
      [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] "
    >
      <NavBar />
      <SearchBar />

      {loading && (
        <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 
            rounded-full animate-spin"></div>
        </div>
      )}

      <div className="flex flex-col pt-8 px-4 sm:px-10 gap-5">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="text-white p-4 rounded-lg bg-gray-900 
            flex flex-col sm:flex-row gap-4 sm:gap-6 
            w-full sm:max-w-2xl md:max-w-3xl mx-auto shadow-lg shadow-black/40"
          >
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="rounded w-30 sm:w-40 object-cover"
            />

            <div className="flex flex-col gap-3">

              <h3 className="text-xl sm:text-2xl">{movie.Title}</h3>

              <div className="flex flex-wrap text-[0.8rem] gap-2 text-gray-400">
                <p>{movie.Released}</p>
                <p className="text-gray-300">Directed by {movie.Director}</p>
              </div>

              <div className="text-[0.8rem] text-gray-400 flex items-center gap-3 ">
                <div className="flex flex-col sm:flex-row items-center align-middle gap-1 self-center">
                  <IoMdTime size={16}/>{movie.Runtime}</div>
                <div className="flex flex-col sm:flex-row items-center gap-1 align-middle self-center">
                  <MdStarRate size={16}/> imdb {movie.imdbRating}</div>
                <div className="flex flex-col sm:flex-row items-center align-middle gap-1 self-center">
                  <MdLocalMovies size={16}/> {movie.Genre}
                </div>
              </div>

              <p className="text-[0.8rem] text-gray-300">{movie.Plot}</p>

              <div >
                <div className="flex text-[0.8rem] text-gray-400 gap-2">
                  <div className="text-gray-400 bg-gray-700 pl-1 pr-1 rounded h-5 ">
                    Writer</div> {movie.Writer}</div>
                <div className="flex text-[0.8rem] text-gray-400 gap-2 mt-1">
                  <div className="text-gray-400 bg-gray-700 pl-1 pr-1 rounded h-5">
                    Cast</div> {movie.Actors}</div>
              </div>

              <div className="flex-col pt-1 pb-1">
                    <StarRating maxStars={10} size={14} color="white" 
                      className="starRating" />
                      <div className="flex items-center gap-1 text-gray-400 hover:text-gray-200
                       text-[0.9rem] mt-2 bg-gray-800 w-40 p-2 rounded-2xl cursor-pointer
                       transition-colors delay-15 justify-center"
                       onClick={() => addToWatchlist(movie)}>
                        <MdOutlineMoreTime size={16} /> Add to watchlist</div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}