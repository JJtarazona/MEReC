const express = require("express");
const PORT = require("./config");

const app = express();

app.listen(3001);
console.log(`Server is running on port ${PORT}`);
