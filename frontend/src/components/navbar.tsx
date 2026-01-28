import { axiosInstance } from "@/lib/axios";
import { motion } from "framer-motion";
import { LogOut, Menu, Search, X } from "lucide-react";
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
  const admin = localStorage.getItem("isAdmin");
  const navigate = useNavigate();
  const [isSearch, setSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [broadcastData, setBroadcastData] = useState<movie[]>([]);
  const [allMovie, setAllMovie] = useState<movie[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState<movie[]>([]);

  useEffect(() => {
    async function getMovie() {
      const res = await axiosInstance.get("/movies/get-broadcast-movie");
      setBroadcastData(res.data);
    }
    getMovie();

    async function allMovie() {
      const res = await axiosInstance.get("/movies/get-movie");
      setAllMovie(res.data);
    }
    allMovie();
  }, []);

  return (
    <div className="bg-black text-white px-4 py-2">
      <div className="flex items-center justify-between">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-red-600 via-pink-500 to-red-700 text-transparent bg-clip-text drop-shadow-[0_0_2px_rgba(255,0,0,0.8)] tracking-wider"
        >
          NEOSTREAM
        </motion.h1>

        <ul className="hidden lg:flex items-center gap-5 font-medium ml-8">
          <li className="cursor-pointer" onClick={() => navigate("/home")}>
            Home
          </li>

          <li className="relative group cursor-default">
            Movies
            <ul className="absolute top-full left-0 bg-black/80 shadow-lg rounded-md p-4 w-[80vw] sm:w-[40vw] hidden group-hover:flex flex-col z-50">
              <div className="flex flex-wrap gap-2">
                {[
                  ["#all_movie", "All Movies"],
                  ["#top_pick", "Top Pick"],
                  ["#trending", "Trending"],
                  ["#new_movie", "New on NeoStream"],
                  ["#watch_again", "Watch it Again"],
                ].map(([href, label]) => (
                  <li
                    key={label}
                    className="bg-red-700 py-1 px-3 rounded hover:bg-red-800 hover:scale-105 transition"
                  >
                    <a href={href}>{label}</a>
                  </li>
                ))}
              </div>
              <h2 className="text-lg font-semibold mt-4 mb-2">
                Recommended Movies
              </h2>
              <div className="flex gap-3 overflow-x-auto">
                {broadcastData.map((movie) => (
                  <Link to={`/movies/${movie._id}`} key={movie._id}>
                    <img
                      src={movie.image}
                      alt="img"
                      className="w-[100px] rounded-md hover:scale-110 transition duration-300 cursor-pointer"
                    />
                  </Link>
                ))}
              </div>
            </ul>
          </li>

          <li className="relative group cursor-default">
            Series
            <ul className="absolute top-full left-0 bg-black/80 shadow-lg rounded-md p-3 w-fit hidden group-hover:block z-50">
              <li className="bg-red-700 py-1 px-2 rounded hover:bg-red-800">
                Currently not available
              </li>
            </ul>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          {admin && (
            <button
              onClick={() => navigate("/admin")}
              className="hidden sm:flex bg-gradient-to-r from-red-600 via-pink-600 to-red-600 px-3 py-1 rounded-md text-sm hover:scale-105 transition"
            >
              Admin Dashboard
            </button>
          )}

          <div className="relative">
            <Search
              size={24}
              onClick={() => setSearch(!isSearch)}
              className="cursor-pointer hover:scale-110 transition"
            />
            {isSearch && (
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchQuery(value);
                  const filtered = allMovie.filter((movie) =>
                    movie.name.toLowerCase().includes(value.toLowerCase())
                  );
                  setFilteredMovies(filtered);
                }}
                className="focus:outline-none pl-3 text-white absolute -left-20 h-[5vh] top-10 bg-gray-900/50 border-1 border-gray-700 rounded-md w-[200px]"
              />
            )}
            {searchQuery && filteredMovies.length > 0 && (
              <div className="absolute top-[60px] left-0 bg-black/80 text-white rounded-md z-50 w-[200px] max-h-[300px] overflow-y-auto shadow-lg">
                {filteredMovies.map((movie) => (
                  <Link
                    key={movie._id}
                    to={`/movies/${movie._id}`}
                    onClick={() => {
                      setSearch(false);
                      setSearchQuery("");
                      setFilteredMovies([]);
                    }}
                    className="block px-3 py-2 hover:bg-gray-800 cursor-pointer"
                  >
                    {movie.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => navigate("/login")}
            className="hidden sm:flex items-center gap-1 bg-gradient-to-r from-red-600 via-pink-500 px-3 py-1 rounded-md hover:scale-105 transition"
          >
            Logout <LogOut size={20} />
          </button>

          <div
            className="lg:hidden cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden mt-4 space-y-3 text-base">
          <div onClick={() => navigate("/home")} className="cursor-pointer">
            Home
          </div>

          <details className="bg-black/80 rounded-md">
            <summary className="cursor-pointer py-1 px-2">Movies</summary>
            <ul className="pl-4 space-y-1">
              <li>
                <a href="#all_movie">All Movies</a>
              </li>
              <li>
                <a href="#top_pick">Top Pick</a>
              </li>
              <li>
                <a href="#trending">Trending</a>
              </li>
              <li>
                <a href="#new_movie">New on NeoStream</a>
              </li>
              <li>
                <a href="#watch_again">Watch it Again</a>
              </li>
            </ul>
          </details>

          <details className="bg-black/80 rounded-md">
            <summary className="cursor-pointer py-1 px-2">Series</summary>
            <div className="pl-4">Currently not available</div>
          </details>

          {admin && (
            <button
              onClick={() => navigate("/admin")}
              className="block w-full text-left bg-gradient-to-r from-red-600 via-pink-600 to-red-600 px-3 py-1 rounded-md"
            >
              Admin Dashboard
            </button>
          )}
          <button
            onClick={() => navigate("/login")}
            className="w-full text-left flex items-center gap-2 bg-gradient-to-r from-red-600 via-pink-500 px-3 py-1 rounded-md"
          >
            Logout <LogOut size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
