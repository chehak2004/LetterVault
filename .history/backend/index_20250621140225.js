import express from "express";
import cors from "cors";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Letter storage (in-memory)
let letters = [];

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// POST - Upload letter
app.post("/api/upload", upload.single("file"), (req, res) => {
  const { letterNo, date, subject, role, name, location, district } = req.body;
  const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  const id = uuidv4();

  const newLetter = { id, letterNo, date, subject, role, name, location, district, fileUrl };
  letters.push(newLetter);
  res.json({ message: "Letter uploaded", letter: newLetter });
});

// GET - All letters
app.get("/api/letters", (req, res) => {
  res.json(letters);
});

// PUT - Edit letter
app.put("/api/letters/:id", (req, res) => {
  const letterId = req.params.id;
  const index = letters.findIndex((l) => l.id === letterId);

  if (index === -1) return res.status(404).json({ message: "Letter not found" });

  // Update only existing fields
  letters[index] = { ...letters[index], ...req.body };
  res.json(letters[index]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
