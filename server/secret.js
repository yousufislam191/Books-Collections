require("dotenv").config();

const serverPort = process.env.PORT || 5200;

// const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";

const corsOrigin = process.env.CORS_ORIGIN || "https://books-collections-9cty.vercel.app";

const mongodbUrl =
  process.env.DB_URL || "mongodb://localhost:27017/booksCollections";

module.exports = {
  serverPort,
  corsOrigin,
  mongodbUrl,
};
