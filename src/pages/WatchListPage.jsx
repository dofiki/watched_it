import NavBar from "../components/NavBar.jsx";
import { useStore } from "../store/store.js";
import { Link } from "react-router-dom";

export default function WatchListPage() {
  const { watchlist } = useStore();

  return (
    <div className="absolute min-h-screen w-full pb-20 bg-[#000000] 
    bg-[radial-gradient(#ffffff33_2px,#000000_2px)] bg-[size:30px_30px]">  
      
      <NavBar />

      <div className="flex justify-center flex-wrap gap-4 mt-10">

        {watchlist.length === 0 && (
        <p className="text-gray-300 text-center w-full">No movies in watchlist.</p>
        )}

        {watchlist.map((movie) => (
          <Link to={`/watchlist/${movie.imdbID}`} key={movie.imdbID}>
            <div className="text-white p-4 h-70 flex-col text-center justify-center cursor-pointer">
              <img src={movie.Poster} className="h-56 rounded-lg" />
              <div className="flex gap-5 p-2 justify-center">
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
