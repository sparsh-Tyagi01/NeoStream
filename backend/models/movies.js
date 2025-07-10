const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    trim: true,
  },
  releasedDate: {
    type: String,
    trim: true,
  },
  duration: {
    type: String,
    trim: true,
  },
  video: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
