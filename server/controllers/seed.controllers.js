const { userData, bookData } = require("../dummyData");
const User = require("../models/users.model");
const Book = require("../models/books.model");

const seedUser = async (req, res, next) => {
  try {
    // deleting all existing users
    await User.deleteMany({});

    // inserting new users
    const newuser = await User.insertMany(userData.users);

    // successfull response
    return res.status(201).json(newuser);
  } catch (error) {
    next(error);
  }
};

const seedBook = async (req, res, next) => {
  try {
    // deleting all existing users
    await Book.deleteMany({});

    // inserting new users
    const newbook = await Book.insertMany(bookData.books);

    // successfull response
    return res.status(201).json(newbook);
  } catch (error) {
    next(error);
  }
};

module.exports = { seedUser, seedBook };
