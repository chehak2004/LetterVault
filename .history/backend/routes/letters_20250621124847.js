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

module.exports = router;
