import { useState, useEffect } from "react";
import NavBar from "../components/NavBar.jsx";
import { useLocation } from "react-router-dom";

import SearchBar from "../components/SearchBar.jsx";
import Movie from "../components/Movie.jsx";
const apiKey = import.meta.env.VITE_API_KEY;

export default function SearchPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  if (!query) return;

  const controller = new AbortController(); 

  async function fetchMovies() {
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
      const data = await res.json();

      if (!data.Search) {
        setMovies([]);
        return;
      }

      const detailedMovies = await Promise.all(
        data.Search.map(async (movie) => {
          const res2 = await fetch(
            `https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}&plot=short`);
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
    
    <div className="absolute min-h-screen w-full pb-20 bg-[#000000] 
    bg-[radial-gradient(#ffffff33_2px,#000000_2px)] bg-[size:30px_30px]">  
      <NavBar />
      <SearchBar />
        {loading && (
        <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 
            rounded-full animate-spin"></div>
        </div>
      )}
      <Movie movies={movies} />      
    </div>
  );
}