const { userData } = require("../dummyData");
const User = require("../models/users.model");

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

module.exports = { seedUser };
