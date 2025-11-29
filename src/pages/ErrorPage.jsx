import NavBar from "../components/NavBar.jsx";
import { useTheme } from "../hooks/useTheme.js";

export default function ErrorPage() {
  const { darkTheme } = useTheme();

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

      <div className="text-gray-500 text-center mt-15">
        <h1 className="text-4xl">404</h1>
        <p className="text-xl mb-6">Oops! Page not found.</p>
      </div>
      
    </div>
  );
}
