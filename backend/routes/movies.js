const express = require('express')
const router = express.Router()
const multer = require('multer')
const {
  movieAddHandler,
  getMovieHandler,
  deleteMovieHandler,
  getTopMovieHandler,
  getBroadcastMovieHandler,
  getMovieById,
  countMovieHandler,
} = require('../controllers/movies')
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

router.post('/add-movie', upload.fields([{ name: 'image' }, { name: 'video' }]), movieAddHandler)
router.get('/get-movie', getMovieHandler)
router.get('/get-top-movie', getTopMovieHandler)
router.get('/get-broadcast-movie', getBroadcastMovieHandler)
router.get('/count-movie', countMovieHandler)
router.delete('/delete-movie/:id', deleteMovieHandler)
router.get('/:id', getMovieById)

module.exports = router