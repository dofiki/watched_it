import { useParams, useNavigate } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import { IoMdTime } from "react-icons/io";
import { MdStarRate, MdLocalMovies } from "react-icons/md";
import StarRating from "./ui/Rating.jsx";
import { useTheme } from "../hooks/useTheme.js";
import { useAuth } from "../hooks/useAuth.js"; 
import { useEffect } from "react";

export default function WatchListMovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkTheme } = useTheme();
  const { watchlist, watchedlist, updateUserData } = useAuth();

  const movie = watchlist.find((m) => m.imdbID === id);

  // navigate if movie not found
  useEffect(() => {
    if (!movie) navigate("/watchlist");
  }, [movie, navigate]);

  if (!movie) return null;

  const savedRating = watchedlist.find((m) => m.imdbID === movie.imdbID)?.rating ?? 0;
  const isInWatchlist = watchlist.some((m) => m.imdbID === movie.imdbID);

  const handleRating = (rating) => {
    // Add or update in watchedList
    let newWatchedList = [...watchedlist];
    const index = newWatchedList.findIndex((m) => m.imdbID === movie.imdbID);

    if (rating === 0) {
      newWatchedList = newWatchedList.filter((m) => m.imdbID !== movie.imdbID);
    } else {
      if (index !== -1) {
        newWatchedList[index] = { ...movie, rating };
      } else {
        newWatchedList.push({ ...movie, rating });
      }
    }

    // Remove from watchList
    const newWatchList = watchlist.filter((m) => m.imdbID !== movie.imdbID);

    // Update Firestore
    updateUserData({ watchlist: newWatchList, watchedlist: newWatchedList });

    navigate("/watched");
  };

  const handleWatchlistToggle = () => {
    const newWatchList = isInWatchlist
      ? watchlist.filter((m) => m.imdbID !== movie.imdbID)
      : [...watchlist, movie];

    updateUserData({ watchlist: newWatchList });
    if (isInWatchlist) navigate("/watchlist");
  };

  return (
    <div
      className={`
      absolute min-h-screen w-full pb-20 pl-2 pr-2 bg-[#000000] bg-size-[30px_30px]
      ${
        darkTheme
          ? "bg-[radial-gradient(#ffffff33_2px,#000000_2px)]"
          : "bg-[radial-gradient(#bdbdbd_2px,#ffffff_2px)]"
      }
    `}
    >
      <NavBar />

      <div
        key={movie.imdbID}
        className={`${darkTheme ? "bg-gray-900 text-white" : "bg-white text-black"} mt-15 rounded-lg 
        flex flex-col sm:flex-row gap-4 sm:gap-6 
        w-full sm:max-w-2xl md:max-w-3xl p-5  justify-center mx-auto shadow-lg shadow-black/40`}
      >
        <img src={movie.Poster} alt={movie.Title} className="rounded w-30 sm:w-40 object-cover" />

        <div className="flex flex-col gap-3">
          <h3 className="text-xl sm:text-2xl">{movie.Title}</h3>

          <div className={`flex flex-wrap text-[0.8rem] gap-2 ${darkTheme ? "text-gray-300" : "black"}`}>
            <p>{movie.Released}</p>
            <p>Directed by {movie.Director}</p>
          </div>

          <div className={`text-[0.8rem] flex items-center gap-3 ${darkTheme ? "text-gray-300" : "text-black"}`}>
            <div className="flex items-center gap-1">
              <IoMdTime size={16} /> {movie.Runtime}
            </div>
            <div className="flex items-center gap-1">
              <MdStarRate size={16} /> imdb {movie.imdbRating}
            </div>
            <div className="flex items-center gap-1">
              <MdLocalMovies size={16} /> {movie.Genre}
            </div>
          </div>

          <p className={`text-[0.8rem] ${darkTheme ? "text-gray-300" : "text-black"}`}>{movie.Plot}</p>

          <div>
            <div className={`flex text-[0.8rem] gap-2 ${darkTheme ? "text-gray-300" : "text-black"}`}>
              <div className={`${darkTheme ? "bg-gray-700" : "bg-gray-500"} px-1 rounded h-5`}>Writer</div>
              {movie.Writer}
            </div>
            <div className={`flex text-[0.8rem] gap-2 mt-1 ${darkTheme ? "text-gray-300" : "text-black"}`}>
              <div className={`${darkTheme ? "bg-gray-700" : "bg-gray-500"} px-1 rounded h-5`}>Cast</div>
              {movie.Actors}
            </div>
          </div>

          <div className="flex-col pt-1 pb-1">
            <StarRating defaultRating={savedRating} onSetRating={handleRating} />

            <div
              className={`flex items-center gap-1 text-[0.9rem] mt-2 w-55 p-2 rounded-2xl cursor-pointer transition-colors delay-15 justify-center ${
                isInWatchlist
                  ? `${darkTheme ? "bg-red-800 text-white" : "bg-red-800 text-white"} hover:bg-red-900`
                  : `${darkTheme ? "bg-gray-800 text-gray-400 hover:text-white" : "bg-gray-800 text-white hover:text-gray-400"}`
              }`}
              onClick={handleWatchlistToggle}
            >
              {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
