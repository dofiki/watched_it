import { useParams, useNavigate } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import { IoMdTime } from "react-icons/io";
import { MdStarRate, MdLocalMovies } from "react-icons/md";
import StarRating from "./ui/Rating.jsx";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth.js";
import { useEffect } from "react";

export default function WatchedListMovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkTheme } = useTheme();
  const { watchedlist, updateUserData } = useAuth();

  const movie = watchedlist.find((m) => m.imdbID === id);

  // Navigate away if movie not found
  useEffect(() => {
    if (!movie) navigate("/watched");
  }, [movie, navigate]);
  // wait for navigation
  if (!movie) return null;

  const handleSetRating = (rating) => {
    let newWatchedList = [...watchedlist];

    if (rating === 0) {
      newWatchedList = newWatchedList.filter((m) => m.imdbID !== movie.imdbID);
    } else {
      const index = newWatchedList.findIndex((m) => m.imdbID === movie.imdbID);
      if (index !== -1) {
        newWatchedList[index] = { ...movie, rating };
      } else {
        newWatchedList.push({ ...movie, rating });
      }
    }

    updateUserData({ watchedlist: newWatchedList });
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
    `}>
      <NavBar />

      <div
        key={movie.imdbID}
        className={`${darkTheme ? "bg-gray-900 text-white" : "bg-white text-black"} mt-15 rounded-lg 
        flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center shadow-lg shadow-black/40
        w-full sm:max-w-2xl md:max-w-3xl p-5 mx-auto`}
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
            <p className={`${darkTheme ? "text-gray-300" : "text-black"}`}>
              Directed by {movie.Director}
            </p>
          </div>

          <div
            className={`text-[0.8rem] ${darkTheme ? "text-gray-300" : "text-black"} flex items-center gap-3`}
          >
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

          <p
            className={`text-[0.8rem] ${darkTheme ? "text-gray-300" : "text-black"}`}
          >
            {movie.Plot}
          </p>

          <div>
            <div className="flex text-[0.8rem] text-gray-400 gap-2">
              <div className="bg-gray-700 px-1 rounded h-5">Writer</div>
              {movie.Writer}
            </div>

            <div className="flex text-[0.8rem] text-gray-400 gap-2 mt-1">
              <div className="bg-gray-700 px-1 rounded h-5">Cast</div>
              {movie.Actors}
            </div>
          </div>

          <div className="pt-2">
            <StarRating
              defaultRating={movie.rating ?? 0}
              onSetRating={handleSetRating}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
