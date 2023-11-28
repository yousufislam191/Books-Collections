const {
  createNewUser,
  handleLogin,
} = require("../controllers/user.controllers");
const { validationHandler } = require("../middleware");
const { signUpValidator, signInValidator } = require("../middleware/userAuth");

const userRouter = require("express").Router();

userRouter.post("/register", signUpValidator, validationHandler, createNewUser);
userRouter.post("/login", signInValidator, validationHandler, handleLogin);

module.exports = userRouter;
