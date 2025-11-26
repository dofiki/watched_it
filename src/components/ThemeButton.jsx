import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

export default function ThemeButton() {
  const { darkTheme, toggleTheme } = useTheme();

  return (
    <div className="cursor-pointer">
      {darkTheme ? (
        <div
          onClick={toggleTheme}
          className="text-white hover:text-amber-300
            transition-colors delay-75 "
        >
          <FaSun size={18} />
        </div>
      ) : (
        <div
          onClick={toggleTheme}
          className="text-black hover:text-blue-500
            transition-colors delay-75 "
        >
          <FaMoon size={16} />
        </div>
      )}
    </div>
  );
}
