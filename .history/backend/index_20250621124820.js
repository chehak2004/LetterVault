const express = require("express");
const cors = require("cors");
const lettersRoute = require("./routes/letters");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/letters", lettersRoute);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
