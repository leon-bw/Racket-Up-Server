/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const sport = require("../seed-data/04_sport");

exports.seed = async function(knex) {

  await knex("sport").del();
  await knex("sport").insert(sport);
};
