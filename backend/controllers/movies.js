const Movie = require('../models/movies')

async function movieAddHandler(req, res) {
  try {
    const { name, director, releasedDate, duration } = req.body;


    const existingMovie = await Movie.findOne({ name });
    if (existingMovie) {
      return res.status(403).json({ message: 'Already added' });
    }


    const image = req.files['image']?.[0]?.path;
    const video = req.files['video']?.[0]?.path;

    if (!image || !video) {
      return res.status(400).json({ message: 'Both image and video are required' });
    }


    const newMovie = new Movie({
      name,
      director,
      releasedDate,
      duration,
      image,
      video,
    });

    await newMovie.save();

    return res.status(201).json({ message: 'Movie added' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function getMovieHandler(req, res) {
  const data = await Movie.find({})
  return res.status(200).json(data)
}

async function getTopMovieHandler(req, res) {
  const data = await Movie.aggregate([
    {
      $sample: { size: 10 }
    },
    {
      $project: {
        _id: 1,
        name: 1,
        director: 1,
        releasedDate: 1,
        duration: 1,
        image: 1,
        video: 1
      }
    }
  ])
  return res.status(200).json(data)
}

async function getBroadcastMovieHandler(req, res) {
  const data = await Movie.aggregate([
    {
      $sample: { size: 3 }
    },
    {
      $project: {
        _id: 1,
        name: 1,
        director: 1,
        releasedDate: 1,
        duration: 1,
        image: 1,
        video: 1
      }
    }
  ])
  return res.status(200).json(data)
}

async function getMovieById(req,res) {
  const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("Movie not found");
    res.json(movie);
}

async function deleteMovieHandler(req, res) {
  await Movie.findByIdAndDelete(req.params.id)
  return res.status(204).json({ "message": "Deleted successfully" })
}

async function countMovieHandler(req,res) {
  const movie = await Movie.countDocuments({})
  return res.status(200).json(movie)
}

module.exports = {
  movieAddHandler,
  getMovieHandler,
  deleteMovieHandler,
  getTopMovieHandler,
  getBroadcastMovieHandler,
  getMovieById,
  countMovieHandler,
}