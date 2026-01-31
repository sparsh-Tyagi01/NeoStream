import { Navigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import io from "socket.io-client";

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
  const username = localStorage.getItem("username");
  if (!token) {
    return <Navigate to="/" replace />;
  }

  const { id } = useParams();

  const socket = useMemo(
    () =>
      io(import.meta.env.VITE_API_BASE_URL, {
        transports: ["websocket", "polling"],
      }),
    [],
  );

  const [movie, setMovie] = useState<Movie | null>(null);
  const [data, setData] = useState<Movie[]>([]);
  const [topData, setTopData] = useState<Movie[]>([]);
  const [trendingData, setTrendingData] = useState<Movie[]>([]);
  const [newData, setNewData] = useState<Movie[]>([]);
  const [againData, setAgainData] = useState<Movie[]>([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { text: string; sender: "me" | "other"; user: string }[]
  >([]);

  useEffect(() => {
    setMessages([]);

    if (id) {
      socket.emit("joinRoom", { room: id });
    }

    socket.on("joined", (msg) => {
      console.log(msg);
    });

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, { text: msg.message, sender: msg.isMe ? "me" : "other", user: msg.username }]);
    });

    return () => {
      socket.off("joined");
      socket.off("receiveMessage");
      if (id) {
        socket.emit("leaveRoom", { room: id });
      }
    };
  }, [id, socket]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("sendMessage", { room: id, message, username });
      setMessage("");
    }
  }

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
      <div className="flex flex-col-reverse lg:flex-row justify-around items-center gap-6 lg:gap-0">
        <div className="text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {movie.name}
          </h1>
          <p className="text-md sm:text-lg mt-2">
            Directed by: {movie.director}
          </p>
          <p className="text-sm sm:text-md">
            Release Date: {movie.releasedDate}
          </p>
          <p className="text-sm sm:text-md">Duration: {movie.duration}</p>

          <div className="relative">
            <img
              src={movie.image}
              alt={movie.name}
              className="w-40 sm:w-60 md:w-72 lg:w-64 mt-4 rounded-lg mx-auto lg:mx-0"
            />
            <div className="absolute top-0 bg-black/70 w-40 sm:w-60 md:w-72 lg:w-64 h-full overflow-y-auto hide-scrollbar space-y-2 pt-1">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`text-base text-white px-4 rounded-xl max-w-[75%] break-words shadow-md 
          ${msg.sender === "me" ? "bg-gradient-to-r from-emerald-800 to-cyan-700" : "bg-gray-700"}`}
                  >
                    <p className="block text-xs text-yellow-400">
                      {msg.user}
                    </p>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/3">
          <video
            src={movie.video}
            autoPlay
            controls
            className="w-full h-auto max-w-[800px] mx-auto rounded-lg shadow-md shadow-emerald-500"
          />
        </div>
      </div>

      <div className="w-full flex justify-center">
        <form onSubmit={handleSubmit} className="fixed z-50">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="focus:outline-none w-[40vw] border-2 border-gray-200 rounded-xl py-1 pl-2 bg-black/50"
          />
          <button
            type="submit"
            className="text-white bg-red-700 rounded-xl py-1 px-2 ml-1 cursor-pointer"
          >
            Send
          </button>
        </form>
      </div>

      <div className="px-2 sm:px-4 md:px-6 lg:px-8 mt-12">
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
    </div>
  );
};

export default MovieDetail;
