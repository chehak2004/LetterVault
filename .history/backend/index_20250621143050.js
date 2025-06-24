import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import fs from "fs";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Create uploads directory if not exist
const uploadsDir = path.resolve("uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// POST endpoint
app.post("/api/letters", upload.single("file"), (req, res) => {
  try {
    const {
      letterNo,
      date,
      subject,
      role,
      name,
      location,
      district,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "File not uploaded" });
    }

    // Just logging for now
    console.log("Letter received:", {
      letterNo,
      date,
      subject,
      role,
      name,
      location,
      district,
      filePath: req.file.path,
    });

    res.status(200).json({ message: "Letter uploaded successfully!" });
  } catch (err) {
    console.error("Error uploading letter:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
