import express from "express";
import cors from "cors";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import mysql from "mysql2/promise";

const app = express();
const PORT = 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MySQL connection
const db = await mysql.createConnection({
  host: "localhost",
  user: "root",           // Change as needed
  password: "",           // Add password if set
  database: "drdo_letters",
});

// Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Upload Letter
app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    const { letterNo, date, subject, role, name, location, district } = req.body;
    const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    const id = uuidv4();

    await db.execute(
      "INSERT INTO letters (id, letterNo, date, subject, role, name, location, district, fileUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [id, letterNo, date, subject, role, name, location, district, fileUrl]
    );

    res.json({ message: "Letter uploaded", letter: { id, letterNo, date, subject, role, name, location, district, fileUrl } });
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).json({ message: "Upload failed" });
  }
});

// Get All Letters
app.get("/api/letters", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM letters");
    res.json(rows);
  } catch (error) {
    console.error("Failed to fetch letters:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a Letter
app.put("/api/letters/:id", async (req, res) => {
  const letterId = req.params.id;
  const { letterNo, date, subject, role, name, location, district, fileUrl } = req.body;

  try {
    await db.execute(
      `UPDATE letters SET letterNo=?, date=?, subject=?, role=?, name=?, location=?, district=?, fileUrl=? WHERE id=?`,
      [letterNo, date, subject, role, name, location, district, fileUrl, letterId]
    );
    res.json({ message: "Letter updated" });
  } catch (error) {
    console.error("Failed to update letter:", error);
    res.status(500).json({ message: "Update failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
