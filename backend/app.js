const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require('./routes')
const cors = require("cors");
const path = require('path');
require("dotenv").config();

const port = 3005;
const app = express();

app.use(express.static("../frontend/build")); // для сборки приложения
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use('/', routes)

if( process.env.NODE_ENV === "production" ) {
  console.log("production");
  // app.use(express.static(path.resolve("./", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve("../frontend/build", "index.html"));
  });
}


mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
