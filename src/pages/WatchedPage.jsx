import NavBar from "../components/NavBar.jsx";
import { useWatchListStore } from "../store/watchListStore.js";
import { Link } from "react-router-dom";

export default function WatchedPage() {
  const { watched } = useWatchListStore();

  return (
    <div className="min-h-screen w-full pb-20
      [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      
      <NavBar />

      <div className="flex justify-center flex-wrap gap-4 mt-10">
        {watched.length === 0 && (
          <p className="text-gray-300 text-center w-full">No movies in watchlist.</p>
        )}

        {watched.map((movie) => (
          <Link to={`/watched/${movie.imdbID}`} key={movie.imdbID}>
            <div className="text-white p-4 h-70 flex-col text-center justify-center cursor-pointer">
              <img src={movie.Poster} className="h-56 rounded-lg" />
              <div className="flex gap-5 p-2 justify-center">
                <p className="text-[0.6rem]">{movie.Title}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
