import { axiosInstance } from "@/libs/axios";
import { motion } from "framer-motion";
import { LogOut, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type movie = {
  _id: number;
  name: string;
  director: string;
  releasedDate: string;
  duration: string;
  image: string;
  video: string;
};

const Navbar = () => {
  const admin = localStorage.getItem("adminEmail");

  const navigate = useNavigate();
  const [isSearch, setSearch] = useState(false);
  const [broadcastData, setBroadcastData] = useState<movie[]>([]);

  useEffect(() => {
    async function getMovie() {
      const res = await axiosInstance("/movies/get-broadcast-movie");
      setBroadcastData(res.data);
    }

    getMovie();
  }, []);

  return (
    <>
      <div className="bg-black flex justify-between py-1">
        <div className="flex justify-center items-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-5xl font-extrabold ml-1 bg-gradient-to-r from-red-600 via-pink-500 to-red-700 text-transparent bg-clip-text drop-shadow-[0_0_2px_rgba(255,0,0,0.8)] tracking-wider animate-pulse"
          >
            NEOSTREAM
          </motion.h1>
          <ul className="flex text-white gap-5 font-medium ml-8">
            <li className="cursor-pointer" onClick={()=>navigate('/home')}>Home</li>
            <li className="relative group cursor-default">
              Movies
              <ul className="absolute -left-50 top-full  bg-black/70 shadow-lg rounded-md p-2 w-[50vw] hidden group-hover:block z-50">
                <li className="flex">
                    
                  <li className="bg-red-700 py-1 px-2 rounded-[5px] hover:bg-red-800 hover:scale-110 transition-all duration-300 m-2 cursor-pointer">
                    <a href="#all_movie">All movies</a>
                  </li>
                  <li className="bg-red-700 py-1 px-2 rounded-[5px] hover:bg-red-800 hover:scale-110 transition-all duration-300 m-2 cursor-pointer">
                    <a href="#top_pick">Top pick</a>
                  </li>
                  <li className="bg-red-700 py-1 px-2 rounded-[5px] hover:bg-red-800 hover:scale-110 transition-all duration-300 m-2 cursor-pointer">
                    <a href="#trending">Trending</a>
                  </li>
                  <li className="bg-red-700 py-1 px-2 rounded-[5px] hover:bg-red-800 hover:scale-110 transition-all duration-300 m-2 cursor-pointer">
                    <a href="#new_movie">New on NoeStream</a>
                  </li>
                  <li className="bg-red-700 py-1 px-2 rounded-[5px] hover:bg-red-800 hover:scale-110 transition-all duration-300 m-2 cursor-pointer">
                    <a href="#watch_again">Watch it again</a>
                  </li>
                </li>
                <li className="ml-2 text-xl mb-2">Recommended Movies</li>
                <li className="flex justify-center items-center gap-8">
                  {broadcastData.map((movie) => (
                    <div className="w-[160px]">
                      <Link to={`/movies/${movie._id}`}>
                        <img
                        src={`${import.meta.env.VITE_API_BACKEND_URL}${
                          movie.image
                        }`}
                        alt="img"
                        className="aspect-[3/4] h-fit w-fit object-cover hover:scale-110 transition-all duration-300 cursor-pointer hover:opacity-20 rounded-md"
                      />
                      </Link>
                    </div>
                  ))}
                </li>
              </ul>
            </li>
            <li className="relative group cursor-default">
              Series
              <ul className="absolute -left-50 top-full  bg-black/70 shadow-lg rounded-md p-2 w-[50vw] hidden group-hover:block z-50">
                <li className="flex">
                  <li className="bg-red-700 py-1 px-2 rounded-[5px] hover:bg-red-800 hover:scale-110 transition-all duration-300 m-2 cursor-pointer">
                    Currently not available
                  </li>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="flex justify-center items-center gap-7">
          {admin && (
            <button
              onClick={() => navigate("/admin")}
              className="text-white flex justify-center items-center mr-4 bg-gradient-to-r from-red-600 via-pink-600 to-red-600 py-1 px-2 rounded-md shadow-md hover:scale-105 hover:from-pink-600 hover:via-red-700 transition-all duration-300 cursor-pointer"
            >
              Admin Dashboard
            </button>
          )}
          <div className="relative">
            <Search
              size={30}
              onClick={() => setSearch(!isSearch)}
              className="text-white cursor-pointer hover:scale-125 transition-all duration-300"
            />
            {isSearch && (
              <input
                type="text"
                placeholder="Search..."
                className="focus:outline-none pl-3 text-white absolute -left-20 h-[5vh] top-10 bg-gray-900/50 border-1 border-gray-700 rounded-md"
              />
            )}
          </div>
          <button
            onClick={() => navigate("/login")}
            className="text-white flex justify-center items-center mr-4 bg-gradient-to-r from-red-600 via-pink-500 py-1 px-2 rounded-md shadow-md hover:scale-105 hover:from-pink-600 hover:via-red-700 transition-all duration-300 cursor-pointer"
          >
            Logout <LogOut size={30} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
