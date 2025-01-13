const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5000;

// Middleware to serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Multer configuration for file uploads
const upload = multer({
  dest: path.join(__dirname, "public"), // Save files to the "public" folder
  fileFilter: (req, file, cb) => {
    // Check if the file is an Excel file (either xlsx or xls)
    if (
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.mimetype === "application/vnd.ms-excel"
    ) {
      cb(null, true); // Accept Excel files
    } else {
      cb(new Error("Only .xlsx and .xls files are allowed!"));
    }
  },
});

// Route for file upload
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const oldPath = path.join(__dirname, "public", req.file.filename);
  const newPath = path.join(__dirname, "public", "data.xlsx");

  // Rename the uploaded file to "data.xlsx"
  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.error("Error replacing the file:", err);
      return res.status(500).send("Error replacing the file.");
    }
    res.send("File uploaded and replaced successfully.");
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
