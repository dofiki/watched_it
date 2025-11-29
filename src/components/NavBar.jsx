import { RiMovie2Fill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../hooks/useTheme";
import ThemeButton from "./ui/ThemeButton";
import { useAuth } from "../hooks/useAuth";
import { logoutUser } from "../services/firebaseAuth";
import Popover from "@mui/material/Popover";

export default function NavBar() {
  const { darkTheme } = useTheme();
  const { user } = useAuth();

  const [hamStatus, setHamStatus] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  function handleHam() {
    setHamStatus(!hamStatus);
  }

  // popover
  function handleLogout(event) {
    if (!user) return;
    setAnchorEl(event.currentTarget);
  }

  // popover
  function handleClose() {
    setAnchorEl(null);
  }

  // confirm logout
  async function confirmLogout() {
    await logoutUser();
    handleClose();
  }

  useEffect(() => {
    // attach only when menu is open
    if (!hamStatus) return;

    function handleClickOutside(e) {
      // if click/touch is inside the menu or toggle, we ignore
      if (
        menuRef.current?.contains(e.target) ||
        toggleRef.current?.contains(e.target)
      ) {
        return;
      }
      setHamStatus(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [hamStatus]);

  return (
    <>
      <div
        className={`flex justify-around ${darkTheme ? "text-white" : "text-black"} p-5 items-center`}
      >
        {/* Logo */}
        <div
          className="text-xl sm:text-2xl flex gap-2 items-center hover:text-blue-500
             transition-colors delay-75 cursor-pointer"
        >
          <RiMovie2Fill />{" "}
          <Link to="/">
            watched<span className="text-blue-500">it</span>
          </Link>
        </div>

        {/* Menu*/}
        <div>
          {/* PC */}
          <ul className="hidden md:flex gap-10 items-center h-full">
            <li>
              <button className="hover:text-blue-500 transition-colors delay-75 cursor-pointer">
                <Link to="/">Home</Link>
              </button>
            </li>
            {user && (
              <>
                <li>
                  <button className="hover:text-blue-500 transition-colors delay-75 cursor-pointer">
                    <Link to="/watched">Watched</Link>
                  </button>
                </li>
                <li>
                  <button className="hover:text-blue-500 transition-colors delay-75 cursor-pointer">
                    <Link to="/watchlist">Watchlist</Link>
                  </button>
                </li>
              </>
            )}
            {user ? (
              <>
                <li>
                  <button
                    className="hover:text-blue-500 transition-colors delay-75 cursor-pointer
                  flex items-center gap-1"
                    onClick={handleLogout}
                  >
                    <MdLogout /> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button className="hover:text-blue-500 transition-colors delay-75 cursor-pointer">
                    <Link to="/login">Login</Link>
                  </button>
                </li>
                <li>
                  <button
                    className="hover:text-blue-500 transition-colors delay-75 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <Link to="/signup">Signup</Link>
                  </button>
                </li>
              </>
            )}
            <li>
              <ThemeButton />
            </li>
          </ul>

          {/* mobile hamburger */}
          <div className="flex md:hidden gap-5 items-center">
            <div
              className={`flex items-center h-full ${darkTheme ? "text-white" : "text-black"}
               hover:text-blue-700 transition-colors delay-75 cursor-pointer`}
            >
              <GiHamburgerMenu ref={toggleRef} onClick={handleHam} size={22} />
            </div>
            <ThemeButton />
          </div>

          {/* mobile menu */}
          <div
            ref={menuRef}
            className={`absolute z-50 ${darkTheme ? "bg-black text-white" : "bg-white text-black"}
              w-full md:hidden left-0 overflow transition-all duration-300 
              ${hamStatus ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <ul className="text-center p-10">
              <li>
                <Link
                  to="/"
                  className="hover:text-blue-400 transition-colors delay-75 p-2"
                >
                  Home
                </Link>
              </li>
              {user && (
                <>
                  <li>
                    <Link
                      to="/watched"
                      className="hover:text-blue-400 transition-colors delay-75 p-2"
                    >
                      Watched
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/watchlist"
                      className="hover:text-blue-400 transition-colors delay-75 p-2"
                    >
                      Watchlist
                    </Link>
                  </li>
                </>
              )}
              {!user ? (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="hover:text-blue-400 transition-colors delay-75 p-2"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="hover:text-blue-400 transition-colors delay-75 p-2"
                    >
                      Signup
                    </Link>
                  </li>
                </>
              ) : (
                <li className="flex justify-center">
                  <button
                    onClick={handleLogout}
                    className="hover:text-blue-400 transition-colors delay-75  flex items-center gap-1
                    cursor-pointer"
                  >
                    <MdLogout /> Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Popover (Single for both desktop & mobile) */}
        <Popover
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <div className={`flex items-center gap-2 p-1`}>
            <p>Are you sure?</p>
            <button
              onClick={confirmLogout}
              className="bg-red-700 pl-2 pr-2 text-white rounded-2xl cursor-pointer
              hover:bg-red-900 transition-colors delay-75"
            >
              Yes
            </button>
          </div>
        </Popover>
      </div>
    </>
  );
}
