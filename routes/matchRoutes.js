const router = require("express").Router();
require("dotenv").config();

const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const knex = require("knex")(configuration);

router.post("/profile", async (req, res) => {
  const { user_id_1, sport_id, court_id, skill_level, availability, username } =
    req.body;

  if (!user_id_1 || !sport_id || !court_id || !skill_level || !username) {
    return res.status(400).json({ error: "Match slot request failed" });
  }

  const newMatch = {
    user_id_1,
    sport_id,
    court_id,
    skill_level,
    availability,
    username,
  };

  try {
    await knex("matches").insert(newMatch);
    return res.status(201).json(newMatch);
  } catch (error) {
    return res
      .status(400)
      .json({ error: `Failed to create a match: ${error.message}` });
  }
});

router.get("/find-matches", async (req, res) => {
  try {
    const matches = await knex("matches")
      .join("courts", "matches.court_id", "courts.id")
      .join("sport", "matches.sport_id", "sport.id")
      .select("*");

    await Promise.all(
      matches.map(async (match) => {
        const userOne = await knex("matches")
          .join("users", "users.id", "matches.user_id_1")
          .where("matches.id", "=", match.id)
          .select("*")
          .first();

        const userTwo = await knex("matches")
          .join("users", "users.id", "matches.user_id_2")
          .where("matches.id", "=", match.id)
          .select("*")
          .first();

        match.users = [userOne, userTwo];

        return match;
      })
    );

    if (matches.length === 0) {
      return res.status(404).json({ error: "No matches found" });
    }
    return res.status(200).json({ data: matches });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to retrieve matches. Please try again later.",
    });
  }
});

router.get("/find-match", async (req, res) => {
  const { skill_level } = req.params;

  try {
    const skillLevel = await knex("users")
      .where("skill_level", skill_level)
      .select("*");
    if (skillLevel.length === 0) {
      return res.status(404).json({ error: "Skill level not found" });
    }
    return res.status(200).json({ data: skillLevel });
  } catch (error) {
    console.error("Error fetching skill levels: ", error);
    return res.status(500).json({
      error: "Failed to retrieve skill levels. Please try again later.",
    });
  }
});

router.get("/find-match", async (req, res) => {
  const { chosenSport } = req.params;

  try {
    const sport = await knex("matches").where("sport", chosenSport).select("*");
    if (sport.length === 0) {
      return res.status(404).json({ error: "sport not found" });
    }
    return res.status(200).json({ data: sport });
  } catch (error) {
    console.error("Error fetching sport", error);
    return res.status(500).json({
      error: "Failed to retrieve sport. Please try again later.",
    });
  }
});

module.exports = router;
