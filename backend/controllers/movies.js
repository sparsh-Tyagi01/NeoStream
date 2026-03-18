const Movie = require('../models/movies');
const { uploadImage, uploadVideo, deleteImageFromCloudinary, deleteVideoFromCloudinary } = require('../utils/uploadImgVid');
const { getCache, setCache } = require("../utils/cache")

async function movieAddHandler(req, res) {
  try {
    const { name, director, releasedDate, duration } = req.body;


    const existingMovie = await Movie.findOne({ name });
    if (existingMovie) {
      return res.status(403).json({ message: 'Already added' });
    }


    const imagePath = req.files['image']?.[0]?.path;
    const videoPath = req.files['video']?.[0]?.path;

    if (!imagePath || !videoPath) {
      return res.status(400).json({ message: 'Both image and video are required' });
    }

    const imageResult = await uploadImage(imagePath);
    const videoResult = await uploadVideo(videoPath);

    if (!imageResult || !videoResult) {
      return res.status(500).json({ message: 'Failed to upload files to Cloudinary' });
    }

    const videoHlsUrl = videoResult.secure_url.replace('/upload/', '/upload/sp_hd/')
    const hlsUrl = videoHlsUrl.replace(/\.(mp4|mov|avi)$/, '.m3u8')

    const newMovie = new Movie({
      name,
      director,
      releasedDate,
      duration,
      image: imageResult.secure_url,
      video: videoResult.secure_url,
      videoHls: hlsUrl
    });

    await newMovie.save();

    return res.status(201).json({ message: 'Movie added' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function getMovieHandler(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const cacheKey = `movies_page_${page}_limit_${limit}`;
  const cached = await getCache(cacheKey);
  if (cached) return res.status(200).json(cached);

  const [movies, total] = await Promise.all([
    Movie.find({}).limit(limit).skip(skip).lean(),
    Movie.countDocuments()
  ]);

  const result = {
    movies,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
      limit
    }
  };

  await setCache(cacheKey, result, 300);
  return res.status(200).json(result);
}

async function getTopMovieHandler(req, res) {
  const cached = await getCache('top_movies')
  if (cached) return res.status(200).json(cached);

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

  await setCache('top_movies', data, 600)
  return res.status(200).json(data)
}

async function getBroadcastMovieHandler(req, res) {
  const cached = await getCache('broadcast_movies')
  if(cached) return res.status(200).json(cached);

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

  await setCache('broadcast_movies', data, 300)
  return res.status(200).json(data)
}

async function getMovieById(req,res) {
  const cacheKey = `movie_${req.params.id}`
  const cached = await getCache(cacheKey)
  if(cached) return res.status(200).json(cached);

  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).send("Movie not found");

  await setCache(cacheKey, movie, 600);
  res.json(movie);
}

async function deleteMovieHandler(req, res) {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const imagePublicId = movie.image.split('/').slice(-2).join('/').split('.')[0];
    const videoPublicId = movie.video.split('/').slice(-2).join('/').split('.')[0];

    await deleteImageFromCloudinary(imagePublicId);
    await deleteVideoFromCloudinary(videoPublicId);

    await Movie.findByIdAndDelete(req.params.id);
    
    return res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function countMovieHandler(req,res) {
  const cached = await getCache('movie_count')
  if(cached) return es.status(200).json(cached);
    
  const movie = await Movie.countDocuments({})

  await setCache('movie_count', movie, 600)
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