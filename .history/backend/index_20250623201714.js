import express from "express";
import cors from "cors";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { fileURLToPath } from "url";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const app = express();
const PORT = 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MySQL connection using .env variables
const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Upload a letter
app.post("/api/upload", upload.single("file"), async (req, res) => {
  const { letterNo, date, subject, role, name, location, district } = req.body;
  const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  const id = uuidv4();

  try {
    await db.execute(
      `INSERT INTO letters (id, letterNo, date, subject, role, name, location, district, fileUrl)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, letterNo, date, subject, role, name, location, district, fileUrl]
    );

    res.json({
      message: "Letter uploaded",
      letter: { id, letterNo, date, subject, role, name, location, district, fileUrl },
    });
  } catch (err) {
    console.error("MySQL insert error:", err);
    res.status(500).json({ message: "Database error" });
  }
});

// Get all letters
app.get("/api/letters", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM letters ORDER BY date DESC");
    res.json(rows);
  } catch (err) {
    console.error("MySQL fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update letter
app.put("/api/letters/:id", async (req, res) => {
  const letterId = req.params.id;
  const { letterNo, date, subject, role, name, location, district, fileUrl } = req.body;

  try {
    const [result] = await db.execute(
      `UPDATE letters SET letterNo=?, date=?, subject=?, role=?, name=?, =?, district=?, fileUrl=? WHERE id=?`,
      [letterNo, date, subject, role, name, location, district, fileUrl, letterId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Letter not found" });
    }

    res.json({ id: letterId, letterNo, date, subject, role, name, location, district, fileUrl });
  } catch (err) {
    console.error("MySQL update error:", err);
    res.status(500).json({ message: "Update failed" });
  }
});

//  Download route for direct file download
app.get("/download/:filename", (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, "uploads", fileName);

  res.download(filePath, fileName, (err) => {
    if (err) {
      console.error("Download error:", err);
      res.status(404).send("File not found");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
