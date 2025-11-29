import { IoMdTime } from "react-icons/io";
import { MdStarRate, MdLocalMovies } from "react-icons/md";
import StarRating from "./ui/Rating.jsx";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";
import { FaCircleInfo } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Movie({ movies }) {
  const { darkTheme } = useTheme();
  const {
    user,
    watchlist,
    watchedlist,
    updateUserData,
  } = useAuth();

  function handleAddtoWatchList(movie){
    if(!user) return;
    updateUserData({ watchlist: [...(watchlist ?? []), movie] });
  }

  function handleRemovefromWatchList(movieId){
    if(!user) return;
    updateUserData({watchlist: (watchlist ?? []).filter((m)=>m.imdbID !== movieId)})
  }

  function handleMovieRating(movie, rating){
    if(!user) return;
    let newWatchedList = [...(watchedlist ?? [])];

    if(rating === 0){
      //remove if 0
      newWatchedList = watchedlist.filter((m)=>m.imdbID !== movie.imdbID)

    }else{
      //find the index of movie 
      const index = newWatchedList.findIndex((m)=> m.imdbID === movie.imdbID);
      if(index !== -1){
        //index already exists then just add rating to the movie
        newWatchedList[index]={...movie, rating};
      }else{
        newWatchedList.push({...movie, rating});
      }
    }

    //remove from watchlist if it exist there after you rated it
    const newWatchList = (watchlist ?? []).filter((m)=>m.imdbID !== movie.imdbID)

    //at last update firestore
    updateUserData({watchedlist: newWatchedList, watchlist: newWatchList})

  }

  return (
    <div className="flex flex-col pt-8 px-4 sm:px-10 gap-5">
      {movies.map((movie) => {
        
      const isInWatchlist = (watchlist ?? []).some((m) => m.imdbID === movie.imdbID);
      const isWatched = (watchedlist ?? []).some((m) => m.imdbID === movie.imdbID);
      const savedRating = (watchedlist ?? []).find((m) => m.imdbID === movie.imdbID)?.rating ?? 0;


        return (
          <div
            key={movie.imdbID}
            className={`p-4 rounded-lg ${darkTheme ? "bg-gray-900 text-white" : "bg-gray-400 text-black"}
              flex flex-col sm:flex-row gap-4 sm:gap-6 
              w-full sm:max-w-2xl md:max-w-3xl mx-auto shadow-lg shadow-black/40`}
          >
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="rounded w-30 sm:w-40 object-cover"
            />

            <div className="flex flex-col gap-3">
              <h3 className="text-xl sm:text-2xl">{movie.Title}</h3>

              <div
                className={`flex flex-wrap text-[0.8rem] gap-2 
                ${darkTheme ? "text-gray-400" : "text-gray-600"}`}
              >
                <p>{movie.Released}</p>
                <p className={`${darkTheme ? "text-gray-400" : "text-black"}`}>
                  Directed by {movie.Director}
                </p>
              </div>

              <div
                className={`text-[0.8rem] ${darkTheme ? "text-gray-400" : "text-black"} 
                flex items-center gap-3`}
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
                className={`text-[0.8rem] ${darkTheme ? "text-gray-400" : "text-black"}`}
              >
                {movie.Plot}
              </p>

              <div>
                <div
                  className={`flex text-[0.8rem] ${darkTheme ? "text-gray-400" : "text-black"} gap-2`}
                >
                  <div
                    className={`${darkTheme ? "bg-gray-700" : "bg-gray-500"} px-1 rounded h-5`}
                  >
                    Writer
                  </div>
                  {movie.Writer}
                </div>
                <div
                  className={`flex text-[0.8rem] ${darkTheme ? "text-gray-400" : "text-black"} gap-2 mt-1`}
                >
                  <div
                    className={`${darkTheme ? "bg-gray-700" : "bg-gray-500"} px-1 rounded h-5`}
                  >
                    Cast
                  </div>
                  {movie.Actors}
                </div>
              </div>

              {user ? (
                <>
                  <div className="flex-col pt-1 pb-1 ">
                    <StarRating
                      defaultRating={savedRating}
                      onSetRating={(rating) => handleMovieRating(movie, rating)}
                    />

                    <div
                      className={`flex items-center gap-1 text-[0.9rem] mt-2 w-55 p-2 rounded-2xl 
                    justify-center transition-colors delay-15
                    ${
                      isWatched
                        ? "bg-green-800 text-white cursor-default"
                        : isInWatchlist
                          ? `${darkTheme ? "bg-red-800 text-white" : "bg-red-800 text-white"} hover:bg-red-900 cursor-pointer`
                          : `${darkTheme ? "bg-gray-800 text-gray-400 hover:text-white" : "bg-gray-800 text-white hover:text-gray-400"} cursor-pointer`
                    }`}
                      onClick={() => {
                        if (isWatched) return;
                        if (isInWatchlist) {
                          handleRemovefromWatchList(movie.imdbID);
                        } else {
                          handleAddtoWatchList(movie);
                        }
                      }}
                    >
                      {isWatched
                        ? "Watched"
                        : isInWatchlist
                          ? "Remove from Watchlist"
                          : "Add to Watchlist"}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-500 flex gap-2 items-center">
                    <FaCircleInfo size={16} />
                    <Link to="/login" className="text-blue-800 underline">
                      Login
                    </Link>{" "}
                    to add to list or rate the movie.
                  </p>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
