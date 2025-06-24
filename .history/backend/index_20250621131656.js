import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Ensure uploads directory exists
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Dummy database
const letters = [];

app.post("/api/letters", upload.single("file"), (req, res) => {
  const {
    letterNo,
    date,
    subject,
    role,
    name,
    location,
    district,
  } = req.body;

  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  const newLetter = {
    id: letters.length + 1,
    letterNo,
    date,
    subject,
    role,
    name,
    location,
    district,
    fileUrl,
  };

  letters.push(newLetter);
  res.status(201).json({ message: "Letter uploaded", letter: newLetter });
});

app.get("/api/letters", (req, res) => {
  res.json(letters);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
