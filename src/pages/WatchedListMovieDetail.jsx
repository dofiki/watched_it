import { useParams, useNavigate } from "react-router-dom";
import { useWatchListStore } from "../store/watchListStore.js";
import NavBar from "../components/NavBar.jsx";
import { IoMdTime } from "react-icons/io";
import { MdStarRate, MdLocalMovies } from "react-icons/md";
import StarRating from "../components/Rating.jsx";

export default function WatchedListMovieDetail() {
  const { id } = useParams();
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchListStore();
  const navigate = useNavigate();
  const movie = watchlist.find((m) => m.imdbID === id);
   const isInWatchlist = watchlist.some(
          (m) => m.imdbID === movie.imdbID
        );

  if (!movie) {
    return <p className="text-white p-10">Movie not found in watchlist.</p>;
  }

  return (
    <div className="min-h-screen text-white 
      [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      
      <NavBar />

                <div
                  key={movie.imdbID}
                  className="text-white mt-15 align-middle rounded-lg 
                  flex flex-col sm:flex-row gap-4 sm:gap-6 
                  w-full sm:max-w-2xl md:max-w-3xl p-5 sm:p-0 justify-center mx-auto "
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
                        <StarRating maxStars={10} size={14} color="white" className="starRating" />
                            
                    <div className={`flex items-center gap-1 text-[0.9rem] mt-2 w-55 p-2 rounded-2xl cursor-pointer 
                      transition-colors delay-15 justify-center
                      ${isInWatchlist ? "bg-red-900 text-white" : "bg-gray-800 text-gray-400"}`}
                      
                      onClick={() => {
                      if (isInWatchlist) {
                        removeFromWatchlist(movie.imdbID);
                        navigate("/watchlist");
                      } else {
                        addToWatchlist(movie);
                      }
                    }}>
                    {isInWatchlist ? " Remove from Watchlist" : "Add to Watchlist"}
                  </div>

                    </div>
      
                  </div>
                </div>

    </div>
  );
}
