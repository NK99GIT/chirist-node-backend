const knex = require("../config/knex");

exports.getById = async (id) => {
  const user = await knex("users")
    .select('*')
    .where({ id }).first();
  return user;
};

exports.updateProfile = async ({id , name, phone }) => {
  await knex("users").where({ id }).update({ name, phone });
};

exports.updateAvatar = async (id, avatar) => {
  await knex("users").where({ id }).update({ avatar });
};


exports.updatePassword = async (id, passwordHash) => {
  await knex("users").where({ id }).update({ password: passwordHash });
};
