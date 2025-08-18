const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const deleteImage = async (public_id) => {
    try {
        const result = await cloudinary.uploader.destroy(public_id);
        return { success: true, result };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

const deleteFolder = async (folderPath) => {
    try {
        await cloudinary.api.delete_resources_by_prefix(folderPath);
        console.log(`delete all images in${folderPath}`);
        const { folders } = await cloudinary.api.sub_folders(folderPath);

        for (const sub of folders) {
            await deleteFolder(sub.path)
        }

        await cloudinary.api.delete_folder(folderPath);
        console.log("DF", folderPath);
        return { success: true }
    } catch (error) {
        console.log("Delete folder error:", error);
        return { success: false, error: error.message };
    }
}

module.exports = { deleteImage, deleteFolder }