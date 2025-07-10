import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";

type movie = {
  _id: number;
  name: string;
  director: string;
  releasedDate: string;
  duration: string;
  image: string;
  video: string;
};

const Homepage = () => {
  const token = localStorage.getItem("token");
  if (!token) Navigate({ to: "/" });

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

  const [data, setData] = useState<movie[]>([]);
  const [topData, setTopData] = useState<movie[]>([]);
  const [trendingData, setTrendingData] = useState<movie[]>([]);
  const [newData, setNewData] = useState<movie[]>([]);
  const [againData, setAgainData] = useState<movie[]>([]);
  const [broadcastData, setBroadcastData] = useState<movie[]>([]);

  useEffect(() => {
    async function getMovie() {
      const res = await axiosInstance("/movies/get-movie");
      setData(res.data);
    }

    getMovie();
  }, []);

  useEffect(() => {
    async function getMovie() {
      const res = await axiosInstance("/movies/get-top-movie");
      setTopData(res.data);
    }

    getMovie();
  }, []);

  useEffect(() => {
    async function getMovie() {
      const res = await axiosInstance("/movies/get-top-movie");
      setTrendingData(res.data);
    }

    getMovie();
  }, []);

  useEffect(() => {
    async function getMovie() {
      const res = await axiosInstance("/movies/get-top-movie");
      setNewData(res.data);
    }

    getMovie();
  }, []);

  useEffect(() => {
    async function getMovie() {
      const res = await axiosInstance("/movies/get-top-movie");
      setAgainData(res.data);
    }

    getMovie();
  }, []);

  useEffect(() => {
    async function getMovie() {
      const res = await axiosInstance("/movies/get-broadcast-movie");
      setBroadcastData(res.data);
    }

    getMovie();
  }, []);

  return (
    <>
      <div className="h-[50vh] md:h-[70vh] bg-gradient-to-l from-black via-red-950 to-black flex justify-center items-center overflow-x-hidden">
        <Carousel>
          <CarouselContent>
            {broadcastData.map((movie) => (
              <CarouselItem key={movie._id}>
                <div className="relative h-[70vh] w-full rounded-xl overflow-hidden group">
                  <video
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover brightness-[0.6] group-hover:brightness-50 transition duration-500 rounded-xl"
                    src={
                      movie.video
                    }
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10" />

                  <div className="absolute bottom-10 left-10 z-20 text-white">
                    <h2 className="text-4xl md:text-5xl font-bold">
                      {movie.name}
                    </h2>
                    <p className="text-md md:text-lg text-gray-300 mt-2">
                      Directed by{" "}
                      <span className="text-white font-semibold">
                        {movie.director}
                      </span>
                    </p>
                    <p className="text-sm text-gray-400">
                      Released on: {movie.releasedDate}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-10 opacity-10 w-[30px] h-[50px]" />
          <CarouselNext className="mr-10 opacity-10 w-[30px] h-[50px]" />
        </Carousel>
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
    </>
  );
};

export default Homepage;
