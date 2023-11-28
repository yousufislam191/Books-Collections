const { Schema, model } = require("mongoose");
const { isEmail, isStrongPassword } = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [40, "Name should not exceed 40 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      minLength: 8,
      validate: isStrongPassword,
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model("users", userSchema);
