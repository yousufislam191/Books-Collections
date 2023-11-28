const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
const app = express();

require("./config/db");

app.use(cors({ credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("server home route");
});

// client error handling
app.use((req, res, next) => {
  next(createError(404, "Page Not Found "));
});

// server error handling --> all errors handeled finally
app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});

module.exports = app;
