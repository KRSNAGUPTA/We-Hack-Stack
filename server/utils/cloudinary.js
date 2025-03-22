import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath, folder = 'finTrack') => {
  try {
    if (!localFilePath) {
      return null;
    }
    
    // Check if file exists before uploading
    if (!fs.existsSync(localFilePath)) {
      console.error("File not found at path:", localFilePath);
      return null;
    }
    
    // Upload the file
    console.log("Attempting to upload to Cloudinary:", localFilePath);
    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: folder, 
      use_filename: true, 
      unique_filename: false, 
      resource_type: "auto",
    });
    
    console.log("Upload successful:", response.url);
    
    // Remove the locally saved file
    try {
      fs.unlinkSync(localFilePath);
      console.log("Local file deleted after upload");
    } catch (unlinkError) {
      console.error("Error deleting local file:", unlinkError);
    }
    
    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    
    // Clean up local file in case of error
    if (localFilePath && fs.existsSync(localFilePath)) {
      try {
        fs.unlinkSync(localFilePath);
        console.log("Local file deleted after upload error");
      } catch (unlinkError) {
        console.error("Error deleting local file after upload error:", unlinkError);
      }
    }
    
    return null;
  }
};

export default uploadOnCloudinary;

