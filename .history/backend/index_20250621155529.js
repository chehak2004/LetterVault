import express from "express";
import cors from "cors";
import multer from "multer";
import mysql from "mysql2/promise";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// ✅ Database connection
let db;
try {
  db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  console.log("✅ Connected to MySQL database");
} catch (err) {
  console.error("❌ MySQL connection error:", err);
  process.exit(1);
}

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Multer file upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ POST - Upload letter
app.post("/api/upload", upload.single("file"), async (req, res) => {
  const { letterNo, date, subject, role, name, location, district } = req.body;

  if (!letterNo || !date || !subject || !role || !name || !location || !district || !req.file) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const id = uuidv4();
  const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;

  try {
    await db.execute(
      "INSERT INTO letters (id, letterNo, date, subject, role, name, location, district, fileUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [id, letterNo, date, subject, role, name, location, district, fileUrl]
    );
    res.json({ message: "Letter uploaded", letter: { id, letterNo, date, subject, role, name, location, district, fileUrl } });
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({ message: "Upload failed" });
  }
});

// ✅ GET - All letters
app.get("/api/letters", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM letters");
    res.json(rows);
  } catch (error) {
    console.error("❌ Fetch error:", error);
    res.status(500).json({ message: "Failed to fetch letters" });
  }
});

// ✅ PUT - Update letter
app.put("/api/letters/:id", async (req, res) => {
  const letterId = req.params.id;
  const { letterNo, date, subject, role, name, location, district, fileUrl } = req.body;

  try {
    const [result] = await db.execute(
      "UPDATE letters SET letterNo=?, date=?, subject=?, role=?, name=?, location=?, district=?, fileUrl=? WHERE id=?",
      [letterNo, date, subject, role, name, location, district, fileUrl, letterId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Letter not found" });
    }

    const [updatedRows] = await db.execute("SELECT * FROM letters WHERE id=?", [letterId]);
    res.json(updatedRows[0]);
  } catch (error) {
    console.error("❌ Update error:", error);
    res.status(500).json({ message: "Failed to update letter" });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
