const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const { cloudinary } = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'neostream', // folder in Cloudinary
      resource_type: file.mimetype.startsWith("video") ? "video" : "image",
    };
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
