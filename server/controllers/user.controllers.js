const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const User = require("../models/users.model");
const { successResponse } = require("../services/response");
const { findWithId } = require("../services/findWithId");
const { findWithEmail } = require("../services/findWithEmail");

// for create new user
const createNewUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new User({
      name,
      email,
      password,
    });
    await newUser.save();

    return successResponse(res, {
      statusCode: 201,
      message: "Registered successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// for signin
const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await findWithEmail(User, email, next);

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw createError(401, "Email and password do not match");
    }

    const userWithoutPassword = { ...user.toObject() };
    delete userWithoutPassword.password;

    return successResponse(res, {
      statusCode: 200,
      message: "User logged in successfully",
      payload: { userWithoutPassword },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewUser,
  handleLogin,
};
