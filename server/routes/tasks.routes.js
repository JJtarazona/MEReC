const Router = require("express");
const router = Router();

const {
  getTaks,
  getTak,
  createTaks,
  updateTaks,
  deleteTaks,
} = require("../controllers/tasks.controllers.js");

router.get("/tasks", getTaks);

router.get("/tasks/:id", getTak);

router.post("/tasks", createTaks);

router.put("/tasks/:id", updateTaks);

router.delete("/tasks/:id", deleteTaks);

module.exports = router;
