const db = require("./dbConfig");

module.exports = {
  add,
  find,
  login
};

function add(user) {
  return db("Employees").insert(user);
}

function login(user) {
  return db("Employees")
    .where(user)
    .select("id", "username", "password", "department");
}

function find() {
  return db("Employees").select("username", "department");
}
