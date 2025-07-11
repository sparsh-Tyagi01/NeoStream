import { Navigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { motion } from "framer-motion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type Movie = {
  _id: string;
  name: string;
  director: string;
  releasedDate: string;
  duration: string;
  image: string;
  video: string;
};

const MovieDetail = () => {
  const token = localStorage.getItem("token");
  if (!token) {
  return <Navigate to="/" replace />;
}
  
  const { id } = useParams();

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const [movie, setMovie] = useState<Movie | null>(null);

  const [data, setData] = useState<Movie[]>([]);
    const [topData, setTopData] = useState<Movie[]>([]);
    const [trendingData, setTrendingData] = useState<Movie[]>([]);
    const [newData, setNewData] = useState<Movie[]>([]);
    const [againData, setAgainData] = useState<Movie[]>([]);

    useEffect(() => {
    async function getMovie() {
      const res = await axiosInstance.get("/movies/get-movie");
      setData(res.data);
    }

    getMovie();
  }, []);

  useEffect(() => {
    async function getMovie() {
      const res = await axiosInstance.get("/movies/get-top-movie");
      setTopData(res.data);
    }

    getMovie();
  }, []);

  useEffect(() => {
    async function getMovie() {
      const res = await axiosInstance.get("/movies/get-top-movie");
      setTrendingData(res.data);
    }

    getMovie();
  }, []);

  useEffect(() => {
    async function getMovie() {
      const res = await axiosInstance.get("/movies/get-top-movie");
      setNewData(res.data);
    }

    getMovie();
  }, []);

  useEffect(() => {
    async function getMovie() {
      const res = await axiosInstance.get("/movies/get-top-movie");
      setAgainData(res.data);
    }

    getMovie();
  }, []);

  useEffect(() => {
    async function fetchMovie() {
      const res = await axiosInstance.get(`/movies/${id}`);
      setMovie(res.data);
    }

    fetchMovie();
  }, [id]);

  if (!movie) return <div className="text-white">Loading...</div>;

  return (
    <div className="text-white p-6 bg-black">
      <div className="flex justify-around items-center">
      <div>
      <h1 className="text-4xl font-bold">{movie.name}</h1>
      <p className="text-lg mt-2">Directed by: {movie.director}</p>
      <p className="text-md">Release Date: {movie.releasedDate}</p>
      <p className="text-md">Duration: {movie.duration}</p>

      <img
        src={movie.image}
        alt={movie.name}
        className="w-64 mt-4 rounded-lg"
      />
      </div>
      
      <div>
      <video
        src={movie.video}
        autoPlay
        controls
        className="w-full max-w-[800px] mt-6 shadow-md shadow-emerald-500"
      />
      </div>
      </div>


      <div className="w-full bg-black">
        <h1 id="all_movie" className="text-2xl text-white ml-3 font-medium">All Movies</h1>
        <ScrollArea className="w-full rounded-md whitespace-nowrap">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex w-max space-x-4 p-4"
          >
            {data.map((movie) => (
              <motion.figure
                variants={itemVariants}
                key={movie._id}
                className="shrink-0 w-[160px]"
              >
                <div className="overflow-hidden rounded-md group relative">
                  <Link to={`/movies/${movie._id}`}>
                    <img
                    src={
                      movie.image
                    }
                    alt="img"
                    className="aspect-[3/4] h-fit w-fit object-cover hover:scale-110 transition-all duration-300 cursor-pointer hover:opacity-20"
                  />
                  </Link>
                  <div className="absolute text-white right-0 top-0 z-50 hidden group-hover:block">
                    <div className="w-[10vw] bg-black/70 text-wrap text-white/40 font-medium  rounded-xl border-l-3 border-red-600">
                      <h1>
                        This movie is directed by {movie.director} and released
                        on {movie.releasedDate}
                      </h1>
                    </div>
                  </div>
                </div>
                <figcaption className="text-muted-foreground pt-2 text-xl text-wrap">
                  {movie.name}
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
          <ScrollBar orientation="horizontal" className="h-0"/>
        </ScrollArea>
      </div>


      <div className="w-full bg-black">
        <h1 id="top_pick" className="text-2xl text-white ml-3 font-medium">Top Pick</h1>
        <ScrollArea className="w-full rounded-md whitespace-nowrap">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex w-max space-x-4 p-4"
          >
            {topData.map((movie) => (
              <motion.figure
                variants={itemVariants}
                key={movie._id}
                className="shrink-0 w-[160px]"
              >
                <div className="overflow-hidden rounded-md group relative">
                  <Link to={`/movies/${movie._id}`}>
                    <img
                    src={
                      movie.image
                    }
                    alt="img"
                    className="aspect-[3/4] h-fit w-fit object-cover hover:scale-110 transition-all duration-300 cursor-pointer hover:opacity-20"
                  />
                  </Link>
                  <div className="absolute text-white right-0 top-0 z-50 hidden group-hover:block">
                    <div className="w-[10vw] bg-black/70 text-wrap text-white/40 font-medium  rounded-xl border-l-3 border-red-600">
                      <h1>
                        This movie is directed by {movie.director} and released
                        on {movie.releasedDate}
                      </h1>
                    </div>
                  </div>
                </div>
                <figcaption className="text-muted-foreground pt-2 text-xl text-wrap">
                  {movie.name}
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
          <ScrollBar orientation="horizontal" className="h-0"/>
        </ScrollArea>
      </div>


      <div className="w-full bg-black">
        <h1 id="trending" className="text-2xl text-white ml-3 font-medium">Trending</h1>
        <ScrollArea className="w-full rounded-md whitespace-nowrap">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex w-max space-x-4 p-4"
          >
            {trendingData.map((movie) => (
              <motion.figure
                variants={itemVariants}
                key={movie._id}
                className="shrink-0 w-[160px]"
              >
                <div className="overflow-hidden rounded-md group relative">
                  <Link to={`/movies/${movie._id}`}>
                    <img
                    src={
                      movie.image
                    }
                    alt="img"
                    className="aspect-[3/4] h-fit w-fit object-cover hover:scale-110 transition-all duration-300 cursor-pointer hover:opacity-20"
                  />
                  </Link>
                  <div className="absolute text-white right-0 top-0 z-50 hidden group-hover:block">
                    <div className="w-[10vw] bg-black/70 text-wrap text-white/40 font-medium  rounded-xl border-l-3 border-red-600">
                      <h1>
                        This movie is directed by {movie.director} and released
                        on {movie.releasedDate}
                      </h1>
                    </div>
                  </div>
                </div>
                <figcaption className="text-muted-foreground pt-2 text-xl text-wrap">
                  {movie.name}
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
          <ScrollBar orientation="horizontal" className="h-0"/>
        </ScrollArea>
      </div>


      <div className="w-full bg-black">
        <h1 id="new_movie" className="text-2xl text-white ml-3 font-medium">New on NeoStream</h1>
        <ScrollArea className="w-full rounded-md whitespace-nowrap">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex w-max space-x-4 p-4"
          >
            {newData.map((movie) => (
              <motion.figure
                variants={itemVariants}
                key={movie._id}
                className="shrink-0 w-[160px]"
              >
                <div className="overflow-hidden rounded-md group relative">
                  <Link to={`/movies/${movie._id}`}>
                    <img
                    src={
                      movie.image
                    }
                    alt="img"
                    className="aspect-[3/4] h-fit w-fit object-cover hover:scale-110 transition-all duration-300 cursor-pointer hover:opacity-20"
                  />
                  </Link>
                  <div className="absolute text-white right-0 top-0 z-50 hidden group-hover:block">
                    <div className="w-[10vw] bg-black/70 text-wrap text-white/40 font-medium  rounded-xl border-l-3 border-red-600">
                      <h1>
                        This movie is directed by {movie.director} and released
                        on {movie.releasedDate}
                      </h1>
                    </div>
                  </div>
                </div>
                <figcaption className="text-muted-foreground pt-2 text-xl text-wrap">
                  {movie.name}
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
          <ScrollBar orientation="horizontal" className="h-0"/>
        </ScrollArea>
      </div>


      <div className="w-full bg-black">
        <h1 id="watch_again" className="text-2xl text-white ml-3 font-medium">Watch it again</h1>
        <ScrollArea className="w-full rounded-md whitespace-nowrap">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex w-max space-x-4 p-4"
          >
            {againData.map((movie) => (
              <motion.figure
                variants={itemVariants}
                key={movie._id}
                className="shrink-0 w-[160px]"
              >
                <div className="overflow-hidden rounded-md group relative">
                  <Link to={`/movies/${movie._id}`}>
                    <img
                    src={
                      movie.image
                    }
                    alt="img"
                    className="aspect-[3/4] h-fit w-fit object-cover hover:scale-110 transition-all duration-300 cursor-pointer hover:opacity-20"
                  />
                  </Link>
                  <div className="absolute text-white right-0 top-0 z-50 hidden group-hover:block">
                    <div className="w-[10vw] bg-black/70 text-wrap text-white/40 font-medium  rounded-xl border-l-3 border-red-600">
                      <h1>
                        This movie is directed by {movie.director} and released
                        on {movie.releasedDate}
                      </h1>
                    </div>
                  </div>
                </div>
                <figcaption className="text-muted-foreground pt-2 text-xl text-wrap">
                  {movie.name}
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
          <ScrollBar orientation="horizontal" className="h-0"/>
        </ScrollArea>
      </div>
    </div>
  );
};

export default MovieDetail;
