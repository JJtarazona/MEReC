const express = require("express");
const PORT = require("./config");

const indexRoutes = require("./routes/index.routes");
const tasksRoutes = require("./routes/tasks.routes");

const app = express();

app.use(indexRoutes);
app.use(tasksRoutes);

app.listen(PORT);
console.log(`Server is running on port ${PORT}`);
