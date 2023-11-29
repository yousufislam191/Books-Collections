const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: true,
      trim: true,
      minLength: [3, "Title must be at least 3 characters"],
      maxLength: [40, "Title should not exceed 40 characters"],
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
      minLength: [3, "Author name must be at least 3 characters"],
      maxLength: [40, "Author name should not exceed 40 characters"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      trim: true,
      minLength: [3, "Genre must be at least 3 characters"],
    },
    publicationDate: {
      type: Date,
      required: [true, "Date is required"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model("books", bookSchema);
