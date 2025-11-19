import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SearchBar(){

  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSearch(){
    if(!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }
    return(
        <>
        <div className="pt-5 flex justify-center">
          <div className="relative w-60 sm:w-140">
            <input
              type="text"
              placeholder="enter movie name"
              className="bg-white w-full h-10 rounded-lg p-2 pr-20 outline-0 
              hover:outline-6 hover:outline-blue-900 transition-all ease-in delay-100
              text-[0.8rem] md:text-[1rem]"
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
            />

            <button
              className="absolute right-1 top-1/2 transform -translate-y-1/2
              flex items-center gap-2 bg-black text-white pt-2 pb-2 pl-4 pr-4
              rounded-lg hover:scale-104 ease-in delay-75 hover:text-blue-500 transition-all"
              onClick={handleSearch}
            >
              <FaSearch />
            </button>
          </div>
        </div>
        </>
    )
}