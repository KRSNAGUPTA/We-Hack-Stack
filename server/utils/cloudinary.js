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
  if (!localFilePath) {
    console.error('No file path provided');
    return null;
  }

  let response = null;
  
  try {
    response = await cloudinary.uploader.upload(localFilePath, {
      folder: folder, 
      use_filename: true, 
      unique_filename: false, 
    });
    
    console.log('\nUpload successful:', response.url); 
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error.message);
    console.error('Error stack:', error.stack);
  } finally {
    try {
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
        console.log('\nLocal file deleted successfully');
      }
    } catch (unlinkError) {
      console.error('Error deleting local file:', unlinkError.message);
    }
  }

  return response;
};

export default uploadOnCloudinary;

