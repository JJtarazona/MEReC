const express = require("express");
const PORT = require("./config");
const indexRoutes = require("./routes/index.routes");

const app = express();

app.use(indexRoutes);

app.listen(3001);
console.log(`Server is running on port ${PORT}`);
