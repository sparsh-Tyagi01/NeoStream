import { Navigate } from "react-router-dom";
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
  if (!token) {
    return <Navigate to="/" replace />;
  }

  const [data, setData] = useState<movie[]>([]);
  const [topData, setTopData] = useState<movie[]>([]);
  const [trendingData, setTrendingData] = useState<movie[]>([]);
  const [newData, setNewData] = useState<movie[]>([]);
  const [againData, setAgainData] = useState<movie[]>([]);
  const [broadcastData, setBroadcastData] = useState<movie[]>([]);

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
    async function getMovie() {
      const res = await axiosInstance.get("/movies/get-broadcast-movie");
      setBroadcastData(res.data);
    }

    getMovie();
  }, []);

  return (
    <>
      <div className="h-[50vh] md:h-[70vh] bg-black flex justify-center items-center overflow-x-hidden">
        <Carousel>
          <CarouselContent>
            {broadcastData.map((movie) => (
              <CarouselItem key={movie._id}>
                <div className="relative h-[40vh] sm:h-[50vh] md:h-[70vh] w-full rounded-xl overflow-hidden group">
                  <video
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover brightness-[0.6] group-hover:brightness-50 transition duration-500 rounded-xl"
                    src={movie.video}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10" />

                  <div className="absolute bottom-10 left-10 z-20 text-white">
                    <h2 className="text-xl sm:text-3xl md:text-5xl font-bold">
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

      <div className="px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="w-full bg-black">
          <h1
            id="all_movie"
            className="text-lg sm:text-xl md:text-2xl text-white ml-3 font-semibold"
          >
            All Movies
          </h1>
          <ScrollArea className="w-full whitespace-nowrap overflow-x-auto">
            <div className="flex w-max space-x-4 p-4">
              {data.map((movie) => (
                <figure
                  key={movie._id}
                  className="shrink-0 w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px]"
                >
                  <div className="overflow-hidden rounded-md group relative">
                    <Link to={`/movies/${movie._id}`}>
                      <img
                        src={movie.image}
                        alt="img"
                        className="aspect-[2/3] w-full h-auto object-cover hover:scale-105 md:hover:scale-110 transition-all duration-300 cursor-pointer"
                      />
                    </Link>
                    <div className="absolute text-white right-0 top-0 z-50 hidden md:group-hover:block">
                      <div className="w-[10vw] bg-black/70 text-wrap text-white/40 font-medium  rounded-xl border-l-3 border-red-600">
                        <h1>
                          This movie is directed by {movie.director} and
                          released on {movie.releasedDate}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <figcaption className="text-muted-foreground pt-1 text-sm sm:text-base md:text-lg text-wrap text-center">
                    {movie.name}
                  </figcaption>
                </figure>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="h-0" />
          </ScrollArea>
        </div>
      </div>

      <div className="px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="w-full bg-black">
          <h1
            id="top_pick"
            className="text-lg sm:text-xl md:text-2xl text-white ml-3 font-semibold"
          >
            Top Pick
          </h1>
          <ScrollArea className="w-full whitespace-nowrap overflow-x-auto">
            <div className="flex w-max space-x-4 p-4">
              {topData.map((movie) => (
                <figure
                  key={movie._id}
                  className="shrink-0 w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px]"
                >
                  <div className="overflow-hidden rounded-md group relative">
                    <Link to={`/movies/${movie._id}`}>
                      <img
                        src={movie.image}
                        alt="img"
                        className="aspect-[2/3] w-full h-auto object-cover hover:scale-105 md:hover:scale-110 transition-all duration-300 cursor-pointer"
                      />
                    </Link>
                    <div className="absolute text-white right-0 top-0 z-50 hidden md:group-hover:block">
                      <div className="w-[10vw] bg-black/70 text-wrap text-white/40 font-medium  rounded-xl border-l-3 border-red-600">
                        <h1>
                          This movie is directed by {movie.director} and
                          released on {movie.releasedDate}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <figcaption className="text-muted-foreground pt-1 text-sm sm:text-base md:text-lg text-wrap text-center">
                    {movie.name}
                  </figcaption>
                </figure>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="h-0" />
          </ScrollArea>
        </div>
      </div>

      <div className="px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="w-full bg-black">
          <h1
            id="trending"
            className="text-lg sm:text-xl md:text-2xl text-white ml-3 font-semibold"
          >
            Trending
          </h1>
          <ScrollArea className="w-full whitespace-nowrap overflow-x-auto">
            <div className="flex w-max space-x-4 p-4">
              {trendingData.map((movie) => (
                <figure
                  key={movie._id}
                  className="shrink-0 w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px]"
                >
                  <div className="overflow-hidden rounded-md group relative">
                    <Link to={`/movies/${movie._id}`}>
                      <img
                        src={movie.image}
                        alt="img"
                        className="aspect-[2/3] w-full h-auto object-cover hover:scale-105 md:hover:scale-110 transition-all duration-300 cursor-pointer"
                      />
                    </Link>
                    <div className="absolute text-white right-0 top-0 z-50 hidden md:group-hover:block">
                      <div className="w-[10vw] bg-black/70 text-wrap text-white/40 font-medium  rounded-xl border-l-3 border-red-600">
                        <h1>
                          This movie is directed by {movie.director} and
                          released on {movie.releasedDate}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <figcaption className="text-muted-foreground pt-1 text-sm sm:text-base md:text-lg text-wrap text-center">
                    {movie.name}
                  </figcaption>
                </figure>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="h-0" />
          </ScrollArea>
        </div>
      </div>

      <div className="px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="w-full bg-black">
          <h1
            id="new_movie"
            className="text-lg sm:text-xl md:text-2xl text-white ml-3 font-semibold"
          >
            New on NeoStream
          </h1>
          <ScrollArea className="w-full whitespace-nowrap overflow-x-auto">
            <div className="flex w-max space-x-4 p-4">
              {newData.map((movie) => (
                <figure
                  key={movie._id}
                  className="shrink-0 w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px]"
                >
                  <div className="overflow-hidden rounded-md group relative">
                    <Link to={`/movies/${movie._id}`}>
                      <img
                        src={movie.image}
                        alt="img"
                        className="aspect-[2/3] w-full h-auto object-cover hover:scale-105 md:hover:scale-110 transition-all duration-300 cursor-pointer"
                      />
                    </Link>
                    <div className="absolute text-white right-0 top-0 z-50 hidden md:group-hover:block">
                      <div className="w-[10vw] bg-black/70 text-wrap text-white/40 font-medium  rounded-xl border-l-3 border-red-600">
                        <h1>
                          This movie is directed by {movie.director} and
                          released on {movie.releasedDate}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <figcaption className="text-muted-foreground pt-1 text-sm sm:text-base md:text-lg text-wrap text-center">
                    {movie.name}
                  </figcaption>
                </figure>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="h-0" />
          </ScrollArea>
        </div>
      </div>

      <div className="px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="w-full bg-black">
          <h1
            id="watch_again"
            className="text-lg sm:text-xl md:text-2xl text-white ml-3 font-semibold"
          >
            Watch it again
          </h1>
          <ScrollArea className="w-full whitespace-nowrap overflow-x-auto">
            <div className="flex w-max space-x-4 p-4">
              {againData.map((movie) => (
                <figure
                  key={movie._id}
                  className="shrink-0 w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px]"
                >
                  <div className="overflow-hidden rounded-md group relative">
                    <Link to={`/movies/${movie._id}`}>
                      <img
                        src={movie.image}
                        alt="img"
                        className="aspect-[2/3] w-full h-auto object-cover hover:scale-105 md:hover:scale-110 transition-all duration-300 cursor-pointer"
                      />
                    </Link>
                    <div className="absolute text-white right-0 top-0 z-50 hidden md:group-hover:block">
                      <div className="w-[10vw] bg-black/70 text-wrap text-white/40 font-medium  rounded-xl border-l-3 border-red-600">
                        <h1>
                          This movie is directed by {movie.director} and
                          released on {movie.releasedDate}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <figcaption className="text-muted-foreground pt-1 text-sm sm:text-base md:text-lg text-wrap text-center">
                    {movie.name}
                  </figcaption>
                </figure>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="h-0" />
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default Homepage;
