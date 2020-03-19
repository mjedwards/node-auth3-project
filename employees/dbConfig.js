const knex = require("knex");

const configOpts = require("../knexfile").development;

module.exports = knex(configOpts);
