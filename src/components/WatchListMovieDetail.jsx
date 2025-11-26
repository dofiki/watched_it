import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../store/store.js";
import NavBar from "./NavBar.jsx";
import { IoMdTime } from "react-icons/io";
import { MdStarRate, MdLocalMovies } from "react-icons/md";
import StarRating from "./Rating.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

export default function WatchListMovieDetail() {
  const { id } = useParams();
  const { darkTheme } = useTheme();
  const navigate = useNavigate();

  const {
    watchlist,
    watchedlist,
    addToWatchlist,
    removeFromWatchlist,
    setMovieRating,
  } = useStore();

  const movie = watchlist.find((m) => m.imdbID === id);
  if (!movie) return navigate("/watchlist");

  const savedRating =
    watchedlist.find((m) => m.imdbID === movie.imdbID)?.rating ?? 0;

  const isInWatchlist = watchlist.some((m) => m.imdbID === movie.imdbID);

  function handleRating(rating) {
    setMovieRating(movie, rating);
    removeFromWatchlist(movie.imdbID);
    navigate("/watched");
  }

  return (
    <div
      className={`
      absolute min-h-screen w-full pb-20 bg-[#000000] bg-size-[30px_30px]
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
        className={`
          ${darkTheme ? "text-white" : "text-black"} mt-15 rounded-lg 
          flex flex-col sm:flex-row gap-4 sm:gap-6 
          w-full sm:max-w-2xl md:max-w-3xl p-5 sm:p-0 justify-center mx-auto
        `}
      >
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="rounded w-30 sm:w-40 object-cover"
        />

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
            <StarRating
              defaultRating={savedRating}
              onSetRating={handleRating}
            />

            <div
              className={`
                flex items-center gap-1 text-[0.9rem] mt-2 w-55 p-2 rounded-2xl cursor-pointer 
                transition-colors delay-15 justify-center
                ${
                  isInWatchlist
                    ? `${darkTheme ? "bg-red-800 text-white" : "bg-red-800 text-white"} hover:bg-red-900`
                    : `${darkTheme ? "bg-gray-800 text-gray-400 hover:text-white" : "bg-gray-800 text-white hover:text-gray-400"}`
                }
              `}
              onClick={() => {
                if (isInWatchlist) {
                  removeFromWatchlist(movie.imdbID);
                  navigate("/watchlist");
                } else {
                  addToWatchlist(movie);
                }
              }}
            >
              {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
