const { seedUser, seedBook } = require("../controllers/seed.controllers");

const seedRouter = require("express").Router();

seedRouter.get("/users", seedUser);
seedRouter.get("/books", seedBook);

module.exports = seedRouter;
