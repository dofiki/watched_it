import NavBar from "../components/NavBar.jsx";
import SearchBar from "../components/SearchBar.jsx";

import matrix from "../assets/movie_posters/matrix.jpg";
import ablcc from "../assets/movie_posters/all_about_lily_chou_chou.jpg";
import dune from "../assets/movie_posters/dune.jpg";
import misslonely from "../assets/movie_posters/miss_lonely.jpg";
import swinggirls from "../assets/movie_posters/swing_girls.jpg";

function HomePage() {
  
  return (
    <>
      <div
        className="absolute inset-0 -z-10 h-full w-full items-center
        overflow-hidden [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"
    >
        <NavBar />

        <div className="pl-1 pr-1">
          <h6 className="text-white text-4xl text-center pt-15">
            Discover Your Next Favourite Movies
          </h6>

          <p className="text-gray-400 text-[1rem] text-center pt-2 pl-5 pr-5">
            Track, organize movies that are worth watching !
          </p>
        </div>

        <SearchBar />

        <div className="absolute -bottom-22 w-full">
          <div className="relative h-96 w-full flex justify-center items-center">
            <img
              src={ablcc}
              className="w-55 sm:w-48 md:w-60 h-75 sm:h-80 md:h-96 rounded-md absolute
              -rotate-20 -bottom-5 sm:-bottom-16 md:-bottom-20 -translate-x-20 sm:-translate-x-36
              md:-translate-x-72 z-10 hover:-bottom-5 transition-all ease-in delay-5"
            />

            <img
              src={dune}
              className="w-55 sm:w-48 md:w-60 h-90 sm:h-80 md:h-96 rounded-md absolute
              -rotate-20 md:-rotate-10 md:bottom-0 bottom-8 -translate-x-10 sm:-translate-x-24
              md:-translate-x-36 z-20 hover:bottom-10 transition-all ease-in delay-5"
            />

            <img
              src={matrix}
              className="w-55 sm:w-48 md:w-60 h-90 sm:h-80 md:h-96 rounded-md absolute
              rotate-0 bottom-15 sm:bottom-5 md:bottom-10 translate-x-0 z-30
              hover:bottom-15 transition-all ease-in delay-5"
            />

            <img
              src={misslonely}
              className="w-55 sm:w-48 md:w-60 h-90 sm:h-80 md:h-96 rounded-md absolute
              rotate-20 bottom-8 md:bottom-0 md:rotate-10 translate-x-10 sm:translate-x-24
              md:translate-x-36 z-20 hover:bottom-10 transition-all ease-in delay-5"
            />

            <img
              src={swinggirls}
              className="w-55 sm:w-48 md:w-60 h-90 sm:h-80 md:h-96 rounded-md absolute
              rotate-20 -bottom-15 sm:-bottom-16 md:-bottom-20 translate-x-20 sm:translate-x-36
              md:translate-x-72 z-10 hover:-bottom-5 transition-all ease-in delay-5"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;