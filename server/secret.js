require("dotenv").config();

const serverPort = process.env.PORT || 5200;

const mongodbUrl =
  process.env.DB_URL || "mongodb://localhost:27017/booksCollections";

module.exports = {
  serverPort,
  mongodbUrl,
};
