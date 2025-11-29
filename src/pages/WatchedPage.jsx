import NavBar from "../components/NavBar.jsx";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme.js";
import { useAuth } from "../hooks/useAuth.js";

export default function WatchedPage() {
  const { darkTheme } = useTheme();
  const { watchedlist } = useAuth();

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

      <div className="flex justify-center flex-wrap gap-4 mt-10">
        {watchedlist?.length === 0 && (
          <p className="text-gray-400 text-center w-full">
            No movies in watched list.
          </p>
        )}

      {watchedlist?.map((movie) => (
        <Link to={`/watched/${movie.imdbID}`} key={movie.imdbID}>
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
