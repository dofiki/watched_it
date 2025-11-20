import { IoMdTime } from "react-icons/io";
import { MdStarRate, MdLocalMovies, MdOutlineMoreTime } from "react-icons/md";
import StarRating from "../components/Rating.jsx";
import { useWatchListStore } from "../store/watchListStore.js";

export default function Movie({ movies }) {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchListStore();

  return (
    <div className="flex flex-col pt-8 px-4 sm:px-10 gap-5">
      {movies.map((movie) => {
        const isInWatchlist = watchlist.some(
          (m) => m.imdbID === movie.imdbID
        );

        return (
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

              <p className="text-[0.8rem] text-gray-300">{movie.Plot}</p>

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

              <div className="flex-col pt-1 pb-1">
                <StarRating maxStars={10} size={14} color="white" />


                <div
                  className={`flex items-center gap-1 text-[0.9rem] mt-2 w-55 p-2 rounded-2xl cursor-pointer 
                    transition-colors delay-15 justify-center hover:text-white
                    ${isInWatchlist ? "bg-red-800 hover:bg-red-900" : "bg-gray-800 text-gray-400"}`}
                  onClick={() =>
                    isInWatchlist
                      ? removeFromWatchlist(movie.imdbID)
                      : addToWatchlist(movie)
                  }
                >
                  {isInWatchlist ? " Remove from Watchlist" : "Add to Watchlist"}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
