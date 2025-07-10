const express = require('express')
const router = express.Router()
const {
  movieAddHandler,
  getMovieHandler,
  deleteMovieHandler,
  getTopMovieHandler,
  getBroadcastMovieHandler,
  getMovieById,
  countMovieHandler,
} = require('../controllers/movies')
const { upload } = require('../utils/storage');


router.post('/add-movie', upload.fields([{ name: 'image' }, { name: 'video' }]), movieAddHandler)
router.get('/get-movie', getMovieHandler)
router.get('/get-top-movie', getTopMovieHandler)
router.get('/get-broadcast-movie', getBroadcastMovieHandler)
router.get('/count-movie', countMovieHandler)
router.delete('/delete-movie/:id', deleteMovieHandler)
router.get('/:id', getMovieById)

module.exports = router