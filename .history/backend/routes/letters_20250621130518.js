const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const lettersFile = path.join(__dirname, "../data/letters.json");

// Route: GET /api/letters
// Description: Returns all letters from the JSON file
router.get("/", (req, res) => {
  fs.readFile(lettersFile, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading letters:", err);
      return res.status(500).send("Error reading letters.");
    }

    const letters = JSON.parse(data);
    res.json(letters);
  });
});

// Route: POST /api/letters
// Description: Saves a new letter to the JSON file
router.post("/", (req, res) => {
  const newLetter = req.body;

  fs.readFile(lettersFile, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading letters for writing:", err);
      return res.status(500).send("Error reading letters.");
    }

    let letters = [];
    try {
      letters = JSON.parse(data);
    } catch (parseErr) {
      console.error("Error parsing JSON:", parseErr);
      return res.status(500).send("Error parsing letters data.");
    }

    letters.push(newLetter);

    fs.writeFile(lettersFile, JSON.stringify(letters, null, 2), (err) => {
      if (err) {
        console.error("Error writing new letter:", err);
        return res.status(500).send("Error saving letter.");
      }

      res.status(201).json({ message: "Letter added successfully" });
    });
  });
});

module.exports = router;
