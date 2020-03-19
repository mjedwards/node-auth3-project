exports.up = function(knex) {
  return knex.schema.createTable("Employees", tbl => {
    tbl.increments();
    tbl
      .text("username", 128)
      .unique()
      .notNullable();
    tbl.text("password", 15).notNullable();
    tbl.text("department", 128).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("Employees");
};
