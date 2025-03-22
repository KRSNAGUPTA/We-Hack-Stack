import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the path for temporary storage
const localPath = path.join(__dirname, '..', '..', 'public', 'temp');

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, localPath); // Set the destination to localPath
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Name file with timestamp
    },
});

// Initialize multer with the configured storage
const upload = multer({ storage });

export { upload };

