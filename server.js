const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const userRoutes = require("./routes/userRoutes");

app.use(cors());

app.use(express.json());

app.use("/", (req, res) => {
  res.send(`<h1> Welcome to Leon's express app</h1>`);
});

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}`);
});
