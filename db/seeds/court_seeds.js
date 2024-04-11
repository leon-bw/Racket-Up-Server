/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const courts = require("../seed-data/03_court");

exports.seed = async function(knex) {

  await knex("courts").del();
  await knex("courts").insert(courts);
};
