import { Navigate } from "react-router-dom";
import { List, Trash, Upload, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "@/lib/axios";

type movie = {
  _id: string;
  name: string;
  director: string;
  releasedDate: string;
  duration: string;
  image: string;
  video: string;
};

const AdminDashboard = () => {
  const token = localStorage.getItem("token");
  const adminEmail = localStorage.getItem("adminEmail");
  if (!token || !adminEmail) {
    return <Navigate to="/" replace />;
  }

  const [files, setFiles] = useState<{
    video: File | null;
    image: File | null;
  }>({
    video: null,
    image: null,
  });
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    director: "",
    releasedDate: "",
    duration: "",
  });

  const [data, setData] = useState<movie[]>([]);
  const [userCount, setUserCount] = useState("");
  const [movieCount, setMovieCount] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!files.image || !files.video) {
      alert("Please select both image and video files.");
      return;
    }

    const form = new FormData();
    form.append("name", formData.name);
    form.append("director", formData.director);
    form.append("releasedDate", formData.releasedDate);
    form.append("duration", formData.duration);
    form.append("image", files.image);
    form.append("video", files.video);

    try {
      setLoading(true);
      const res = await axiosInstance.post("/movies/add-movie", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        alert("Movie uploaded successfully!");
        setFormData({ name: "", director: "", releasedDate: "", duration: "" });
        setFiles({ image: null, video: null });
      } else {
        alert(res.data.message || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Already uploaded");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function getMovie() {
      const res = await axiosInstance.get("/movies/get-movie");
      setData(res.data);
    }

    getMovie();
  }, []);

  async function deleteMovie(id: string) {
    try {
      const res = await axiosInstance.delete(`/movies/delete-movie/${id}`);
      if (res.status === 200) {
        alert("Movie deleted successfully");

        const updatedMovies = await axiosInstance.get("/movies/get-movie");
        setData(updatedMovies.data);

        const result = await axiosInstance.get("/movies/count-movie");
        setMovieCount(result.data);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete movie");
    }
  }

  useEffect(() => {
    async function handleUser() {
      const res = await axiosInstance.get("/auth/count-user");
      setUserCount(res.data);

      const result = await axiosInstance.get("/movies/count-movie");
      setMovieCount(result.data);
    }

    handleUser();
  }, []);

  return (
    <>
      <div className="w-full bg-black min-h-screen pb-10">
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 gap-4 pt-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-red-600 via-pink-500 to-red-700 text-transparent bg-clip-text drop-shadow-[0_0_2px_rgba(255,0,0,0.8)] tracking-wider animate-pulse">
            NEOSTREAM
          </h1>
          <h1 className="text-white bg-red-700 py-1 px-2 rounded-md text-sm sm:text-base">
            Admin
          </h1>
        </div>
        <div className="flex flex-wrap justify-center gap-6 mt-6 px-4">
          <div className="w-full sm:w-[300px] h-40 bg-gray-800/40 rounded-[8px] shadow-green-400 shadow-md flex justify-around items-center p-4">
            <List size={50} className="text-white" />
            <div className="text-center">
              <h2 className="text-white text-base">Total movies</h2>
              <h1 className="text-white/60 text-3xl font-bold">{movieCount}</h1>
            </div>
          </div>
          <div className="w-full sm:w-[300px] h-40 bg-gray-800/40 rounded-[8px] shadow-green-400 shadow-md flex justify-around items-center p-4">
            <User size={50} className="text-white" />
            <div className="text-center">
              <h2 className="text-white text-base">Total users</h2>
              <h1 className="text-white/60 text-3xl font-bold">{userCount}</h1>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-10 px-4 sm:px-10 gap-4">
          <div>
            <h1 className="text-white font-semibold text-lg">
              🎬 Movies Library
            </h1>
            <p className="text-white/60 text-sm">Manage your movie tracks</p>
          </div>
          <div>
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <Button variant="outline" className="cursor-pointer">
                    Add Movie
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add movie</DialogTitle>
                    <DialogDescription>
                      Add movie in your website. Click save when you&apos;re
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-2">
                    <div className="flex gap-2">
                      <Label htmlFor="name-1">Name:</Label>
                      <Input
                        id="name-1"
                        name="name"
                        placeholder="Enter movie name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Label htmlFor="director-1">Director Name:</Label>
                      <Input
                        id="director-1"
                        name="director"
                        placeholder="Enter director name"
                        value={formData.director}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Label htmlFor="released-1">Released Date:</Label>
                      <Input
                        id="released-1"
                        name="releasedDate"
                        placeholder="Enter released date"
                        value={formData.releasedDate}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Label htmlFor="duration-1">Duration:</Label>
                      <Input
                        id="duration-1"
                        name="duration"
                        placeholder="Enter duration"
                        value={formData.duration}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="image-1">Add image</Label>
                      <Input
                        id="image-1"
                        name="image"
                        hidden
                        type="file"
                        accept="image/*"
                        ref={imageInputRef}
                        onChange={(e) =>
                          setFiles((prev) => ({
                            ...prev,
                            image: e.target.files![0],
                          }))
                        }
                      />
                    </div>

                    <div
                      className="flex items-center justify-center p-2 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
                      onClick={() => imageInputRef.current?.click()}
                    >
                      <div className="text-center">
                        {files.image ? (
                          <div className="space-y-2">
                            <div className="text-sm text-emerald-500">
                              Image Selected
                            </div>
                            <div className="text-xs text-zinc-400">
                              {files.image.name.slice(0, 20)}
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="p-3 bg-zinc-800 rounded-full inline-block mb-1">
                              <Upload className="h-6 w-6 text-zinc-400" />
                            </div>
                            <div className=" text-sm text-zinc-400 mb-2">
                              Upload image
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs"
                            >
                              Choose File
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="video-1">Add video</Label>
                      <Input
                        id="video-1"
                        name="video"
                        hidden
                        type="file"
                        accept="video/*"
                        ref={videoInputRef}
                        onChange={(e) =>
                          setFiles((prev) => ({
                            ...prev,
                            video: e.target.files![0],
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          onClick={() => videoInputRef.current?.click()}
                          className="w-full"
                        >
                          {files.video
                            ? files.video.name.slice(0, 20)
                            : "Choose Video File"}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleSubmit} className="cursor-pointer">
                      {isLoading ? "Uploading " : "Add Movie"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
          </div>
        </div>
        <div className="text-white mt-6 px-4 sm:px-10 overflow-x-auto">
          <div className="min-w-[600px]">
            <Table>
              <TableCaption>A list of your movies & series</TableCaption>
              <TableHeader>
                <TableRow className="bg-gray-700">
                  <TableHead>Title</TableHead>
                  <TableHead>Director</TableHead>
                  <TableHead>Released Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((movie) => (
                  <TableRow key={movie._id}>
                    <TableCell className="font-medium flex items-center">
                      <img
                        src={movie.image}
                        alt="img"
                        className="w-[30px] mr-1 rounded-[2px]"
                      />
                      {movie.name}
                    </TableCell>
                    <TableCell>{movie.director}</TableCell>
                    <TableCell>{movie.releasedDate}</TableCell>
                    <TableCell
                      onClick={() => deleteMovie(movie._id)}
                      className="flex justify-end text-red-700 cursor-pointer"
                    >
                      <Trash />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
