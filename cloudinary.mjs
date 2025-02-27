import cloudinary from 'cloudinary';
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

async function uploadToCloudinary(path, folder) {

    try {
        const data = await cloudinary.v2.uploader.upload(path, {
            folder
        });
        return { url: data.url, public_id: data.public_id };
    } catch (error) {
        console.log(error);
    }
}

export async function removeFromCloudinary(public_id) {
    try {
        console.log("removeFromCloudinary_public_id"+public_id);
        const result = await cloudinary.v2.uploader.destroy(public_id);
        console.log("Results from remove image option"+result);
    } catch (error) {
        console.log("Error while removing the image from cloudinary folder"+error);
    }
}

// export default {uploadToCloudinary,removeFromCloudinary};
export default uploadToCloudinary;