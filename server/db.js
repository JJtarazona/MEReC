const { createPool } = require("mysql2/promise");

module.exports = pool = createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb",
});
