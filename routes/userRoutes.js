const router = require("express").Router();
const bcrypt = require("bcrypt");
require("dotenv").config();

const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const knex = require("knex")(configuration);

const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    username,
    skill_level,
    sport,
  } = req.body;

  if (
    (!first_name ||
      !last_name ||
      !email ||
      !password ||
      !username ||
      !skill_level,
    !sport)
  ) {
    return res.status(400).json({ error: "Please enter the required fields." });
  }

  const encryptPassword = bcrypt.hashSync(password, 6);

  const newUser = {
    first_name,
    last_name,
    email,
    username,
    skill_level,
    sport,
    password: encryptPassword,
  };

  try {
    await knex("users").insert(newUser);
    return res.status(201).json(newUser);
  } catch (error) {
    return res
      .status(400)
      .json({ error: `User registration failed: ${error.message}` });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).send("Please enter a username");
  }

  if (!password) {
    return res.status(400).send("Please enter a password");
  }

  try {
    const user = await knex("users").where({ username: username }).first();
    if (!user) {
      return res.status(400).json({ error: "Username doesn't exist" });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    console.log(validPassword);
    if (!validPassword) {
      return res.status(400).send({ error: "Invalid password" });
    }

    const authToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({ authToken });
  } catch (error) {
    return res.status(400).json({ error: "Login Failed!" });
  }
});

router.get("/profile", async (req, res) => {
  if (!req.headers.authorization) {
    return res._construct(401).send({ error: "Please login" });
  }
  const authToken = req.headers.authorization.split(" ")[1];
  try {
    const verifiedUser = jwt.verify(authToken, process.env.JWT_SECRET);
    if (verifiedUser) {
      const { id } = verifiedUser;
      const user = await knex("users").where({ id }).first();

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    }
  } catch (error) {
    return res
      .status(401)
      .json({ error: `Invalid Authorization Token ${error.message}` });
  }
});

module.exports = router;
