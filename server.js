const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const userRoutes = require("./routes/userRoutes");
const matchRoutes = require("./routes/matchRoutes");

app.use(cors());

app.use(express.json());

app.use("/profile", userRoutes);
app.use("/signup", userRoutes);
app.use("/api/users", userRoutes);
app.use("/api/matches", matchRoutes);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}`);
});

