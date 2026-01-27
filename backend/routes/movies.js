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
const {verifyToken} = require("../middlewares/auth")


router.post('/add-movie', verifyToken, upload.fields([{ name: 'image' }, { name: 'video' }]), movieAddHandler)
router.get('/get-movie', verifyToken, getMovieHandler)
router.get('/get-top-movie', verifyToken, getTopMovieHandler)
router.get('/get-broadcast-movie', verifyToken, getBroadcastMovieHandler)
router.get('/count-movie', verifyToken, countMovieHandler)
router.delete('/delete-movie/:id', verifyToken, deleteMovieHandler)
router.get('/:id', verifyToken, getMovieById)

module.exports = router