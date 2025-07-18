const knex = require("../config/knex");

exports.findByEmail = async (email) => {
  return await knex("users").where({ email }).first();
};

exports.create = async (data) => {
  return await knex("users").insert(data);
};
