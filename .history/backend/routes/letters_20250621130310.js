const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const lettersFile = path.join(__dirname, "../data/letters.json");

// GET all letters
router.get("/", (req, res) => {
  fs.readFile(lettersFile, "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading letters.");
    const letters = JSON.parse(data);
    res.json(letters);
  });
});

// POST new letter
router.post("/", (req, res) => {
  const newLetter = req.body;

  fs.readFile(lettersFile, "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading letters.");
    const letters = JSON.parse(data);

    letters.push(newLetter);

    fs.writeFile(lettersFile, JSON.stringify(letters, null, 2), (err) => {
      if (err) return res.status(500).send("Error saving letter.");
      res.status(201).json({ message: "Letter added successfully" });
    });
  });
});

module.exports = router;
