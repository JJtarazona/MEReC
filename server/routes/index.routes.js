const { Router } = require("express");
const pool = require("../db");

const router = Router();

router.get("/ping", async (req, res) => {
  const [rows] = await pool.query("SELECT 1 + 1 AS result");
  console.log(rows);
  res.json("ping");
});

module.exports = router;
