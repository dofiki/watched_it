import { useState, useEffect } from "react";
import NavBar from "../components/navbar";
import { useLocation } from "react-router-dom";

const apiKey = import.meta.env.VITE_API_KEY;

export default function SearchPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      if (!query) return;

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
            `https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}&plot=full`
          );
          return await res2.json();
        })
      );

      setMovies(detailedMovies);
    }

    fetchMovies();
  }, [query]);

  return (
    <div className="min-h-screen w-full pb-20 
      [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"
    >
      <NavBar />

      <div className="flex flex-col pt-10 px-4 sm:px-10 gap-5">
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
              className="rounded w-full sm:w-40 object-cover"
            />

            <div className="flex flex-col gap-3">
              <h3 className="text-xl sm:text-2xl">{movie.Title}</h3>

              <div className="flex flex-wrap text-[0.8rem] gap-2 text-gray-400">
                <p>{movie.Released}</p>
                <p className="text-gray-300">Directed by {movie.Director}</p>
              </div>

              <p className="text-[0.8rem] text-gray-300">{movie.Plot}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
