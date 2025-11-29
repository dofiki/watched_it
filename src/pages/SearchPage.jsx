import { useState, useEffect } from "react";
import NavBar from "../components/NavBar.jsx";
import { useLocation } from "react-router-dom";
import { useTheme } from "../hooks/useTheme.js";
import SearchBar from "../components/ui/SearchBar.jsx";
import Movie from "../components/Movie.jsx";
import LoadingSpinner from "../components/ui/LoadingSpinner.jsx";

const apiKey = import.meta.env.VITE_API_KEY;

export default function SearchPage() {
  const { darkTheme } = useTheme();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    async function fetchMovies() {
      setLoading(true);
      try {
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
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [query]);

  return (
    <div
      className={`absolute min-h-screen w-full pb-20 items-center overflow-hidden
      ${
        darkTheme
          ? "[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"
          : "[background:radial-gradient(125%_125%_at_50%_10%,#FAF9F6_40%,#63e_100%)]"
      }`}
    >
      <NavBar />
      <SearchBar />
      {loading && <LoadingSpinner />}
      <Movie movies={movies} />
    </div>
  );
}
