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

router.post("/find-matches", async (req, res) => {

    const {level, startTime, endTime, date} = req.body

    let startTimeArr = startTime.split(":");
    let endTimeArr = endTime.split(":");

    const startDate = new Date(date);
    startDate.setHours(parseInt(startTimeArr[0], 10))

    const endDate = new Date(date);
    endDate.setHours(parseInt(endTimeArr[0], 10))

  try {
    const matches = await knex("matches")
      .join("courts", "matches.court_id", "courts.id")
      .join("sport", "matches.sport_id", "sport.id")
      .where("matches.skill_level", "=", level)
      .where("matches.time", ">=", startDate)
      .where("matches.time", "<", endDate)
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
      return res.status(200).json([{ data: "No games available at this time" }]);
    }
    return res.status(200).json({ data: matches });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to retrieve matches. Please try again later.",
    });
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
      return res.status(404).json([{ error: "No matches found" }]);
    }
    return res.status(200).json({ data: matches });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to retrieve matches. Please try again later.",
    });
  }
});


module.exports = router;
