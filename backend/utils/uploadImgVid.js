const cloudinary = require('./cloudinary');

async function uploadImage(imagePath) {
    try {
        const result = await cloudinary.uploader.upload(imagePath,
            {
                folder: "neostream",
                resource_type: "image",
                transformation: [
                    { quality: "auto", fetch_format: "auto" }
                ]
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
                resource_type: "video",
                eager: [
                    {
                        streaming_profile: "hd",
                        format: "m3u8"
                    }
                ],
                eager_async: true,
                eager_notification_url: process.env.CLOUDINARY_WEBHOOK_URL
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