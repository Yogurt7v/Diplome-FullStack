const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require('./routes')
const path = require('path');
require("dotenv").config();

const cors = require("cors");
const port = 3005;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(express.static("../frontend/build")); // для сборки приложения

app.use('/', routes)
// отсюда
let production = false;

if (production) {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});
// до сюда
mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  production = true;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
