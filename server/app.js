const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
const { errorResponse } = require("./services/response");
const seedRouter = require("./routes/seed.routes");
const userRouter = require("./routes/user.routes");
const bookRouter = require("./routes/book.routes");
const app = express();

require("./config/db");

app.use(cors({ credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/book", bookRouter);
app.use("/api/seed", seedRouter); // Seed api has been used for development purposes

// app.get("/", (req, res) => {
//   res.status(200).send("server home route");
// });

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
