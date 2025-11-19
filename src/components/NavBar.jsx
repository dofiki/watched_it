import { RiMovie2Fill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";

import { Link } from "react-router-dom";
import { useState } from "react";


export default function NavBar(){

    const[hamStatus,setHamStatus] = useState(false);

    function handleHam(){
      setHamStatus(!hamStatus)
    }

    return (
        <>
        <div className="flex justify-around text-white p-5 ">
           <div
             className="text-xl sm:text-2xl flex gap-2 items-center hover:text-blue-500
             transition-colors delay-75 cursor-pointer"
           >
             <RiMovie2Fill /> <Link to="/">watchedit</Link>
           </div>
 
           <div>
             <ul className="hidden md:flex gap-10 items-center h-full">
               <li>
                 <button className="hover:text-blue-500 transition-colors delay-75 cursor-pointer">
                   <Link to="/">Home</Link>
                 </button>
               </li>
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
             </ul>
 
             <div
               className="flex md:hidden items-center h-full text-white
               hover:text-blue-700 transition-colors delay-75 cursor-pointer">
               <GiHamburgerMenu onClick={handleHam} />
             </div>
             
             <div
              className={`absolute bg-black w-full md:hidden left-0 overflow
              transition-all duration-300 
              ${hamStatus ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
            >
              <ul className="text-center p-10 text-white">
                <li>
                  <Link
                    to="/"
                    className="hover:text-blue-400 transition-colors delay-75"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    to="/watchlist"
                    className="hover:text-blue-400 transition-colors delay-75"
                  >
                    Watched
                  </Link>
                </li>

                <li>
                  <Link
                    to="/watchlist"
                    className="hover:text-blue-400 transition-colors delay-75"
                  >
                    Watchlist
                  </Link>
                </li>
              </ul>
            </div>


           </div>
         </div>       
        </>
    )
}