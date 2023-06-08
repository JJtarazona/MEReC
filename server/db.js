const { createPool } = require("mysql");

module.exports = pool = createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb",
});
