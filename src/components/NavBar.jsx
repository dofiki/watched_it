import { RiMovie2Fill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";

import { Link } from "react-router-dom";

export default function NavBar(){
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
                   <Link to="/watchlist">Watchlist</Link>
                 </button>
               </li>
             </ul>
 
             <div
               className="flex md:hidden items-center h-full text-white
               hover:text-blue-700 transition-colors delay-75 cursor-pointer"
             >
               <GiHamburgerMenu />
             </div>
           </div>
         </div>       
        </>
    )
}