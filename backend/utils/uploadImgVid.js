const cloudinary = require('./cloudinary');

async function uploadImage(imagePath) {
    try {
        const result = await cloudinary.uploader.upload(imagePath,
            {
                folder: "neostream",
                resource_type: "image"
            }
        )
        return result
    } catch (error) {
        console.log(error)
    }
}

async function uploadVideo(videoPath) {
    try {
        const result = await cloudinary.uploader.upload(videoPath,
            {
                folder: "neostream",
                resource_type: "video"
            }
        )
        return result
    } catch (error) {
        console.log(error)
    }
}

async function deleteImageFromCloudinary(imageId) {
    try {
        await cloudinary.uploader.destroy(imageId, { resource_type: 'image' });
    } catch (error) {
        console.log(error);
    }
}

async function deleteVideoFromCloudinary(videoId) {
    try {
        await cloudinary.uploader.destroy(videoId, { resource_type: 'video' });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { uploadImage, uploadVideo, deleteImageFromCloudinary, deleteVideoFromCloudinary }