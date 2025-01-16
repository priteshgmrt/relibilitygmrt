import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cors from 'cors'; // Import CORS

// Workaround for __dirname in ES modules
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Enable CORS for all origins or specific origins
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Temporary folder for uploads

// Define the path for the existing file
const existingFilePath = path.join(__dirname, './public/data.xlsx');

// Endpoint to upload and replace the existing file
app.post('/replace', upload.single('excelFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded!' });
    }

    try {
        const uploadedFilePath = req.file.path;

        // Replace the existing file
        if (fs.existsSync(existingFilePath)) {
            fs.unlinkSync(existingFilePath); // Delete the old file
        }
        fs.renameSync(uploadedFilePath, existingFilePath); // Move new file

        res.json({ message: 'File replaced successfully!', filePath: existingFilePath });
    } catch (error) {
        console.error('Error replacing file:', error);
        res.status(500).json({ error: 'Error replacing the file.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});