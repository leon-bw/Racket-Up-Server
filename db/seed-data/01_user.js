const bcrypt = require("bcrypt");

module.exports = [
  {
    id: 1,
    first_name: "Leon",
    last_name: "Williams",
    email: "lw@test.com",
    username: "tryhard",
    password: bcrypt.hashSync("1234", 6),
    sport: "Tennis",
    skill_level: "Intermediate"
  },
  {
    id: 2,
    first_name: "Wenzel",
    last_name: "Dashington",
    email: "wd@test.com",
    username: "actingchamp",
    password: bcrypt.hashSync("1234", 6),
    sport: "Badminton",
    skill_level: "Beginner"
  },
  {
    id: 3,
    first_name: "Hom",
    last_name: "Tardy",
    email: "ht@test.com",
    username: "squashchamp",
    password: bcrypt.hashSync("1234", 6),
    sport: "Squash",
    skill_level: "Good"
  },
  {
    id: 4,
    first_name: "Tike",
    last_name: "Myson",
    email: "tm@test.com",
    username: "boxingchamp",
    password: bcrypt.hashSync("1234", 6),
    sport: "Squash",
    skill_level: "Semi-Pro"
  },
  {
    id: 5,
    first_name: "Bustin",
    last_name: "Jieber",
    email: "bj@test.com",
    username: "singchamp",
    password: bcrypt.hashSync("1234", 6),
    sport: "Tennis",
    skill_level: "Advanced"
  },
  {
    id: 6,
    first_name: "Foger",
    last_name: "Rederer",
    email: "fr@test.com",
    username: "tennischamp",
    password: bcrypt.hashSync("1234", 6),
    sport: "Tennis",
    skill_level: "Beginner"
  },
  {
    id: 7,
    first_name: "Mionel",
    last_name: "Lessi",
    email: "ml@test.com",
    username: "footballchamp",
    password: bcrypt.hashSync("1234", 6),
    sport: "Badminton",
    skill_level: "Good"
  },
  {
    id: 8,
    first_name: "Jichael",
    last_name: "Mordan",
    email: "jm@test.com",
    username: "bballchamp",
    password: bcrypt.hashSync("1234", 6),
    sport: "Badminton",
    skill_level: "Semi-Pro"
  },
  {
    id: 9,
    first_name: "Wiger",
    last_name: "Toods",
    email: "wt@test.com",
    username: "golfchamp",
    password: bcrypt.hashSync("1234", 6),
    sport: "Squash",
    skill_level: "Beginner"
  },
  {
    id: 10,
    first_name: "Pichael",
    last_name: "Mhelps",
    email: "pm@test.com",
    username: "swimchamp",
    password: bcrypt.hashSync("1234", 6),
    sport: "Tennis",
    skill_level: "Intermediate"
  },
  {
    id: 11,
    first_name: "Wonny",
    last_name: "Jilkinson",
    email: "wj@test.com",
    username: "rugbychamp",
    password: bcrypt.hashSync("1234", 6),
    sport: "Squash",
    skill_level: "Advanced"
  },
];
