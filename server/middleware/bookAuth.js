const { check } = require("express-validator");

const bookValidator = [
  check("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title should be between 3 and 40 characters")
    .escape(),
  check("author")
    .trim()
    .notEmpty()
    .withMessage("Author name is required")
    .isLength({ min: 3 })
    .withMessage("Author name should be between 3 and 40 characters")
    .escape(),
  check("genre")
    .trim()
    .notEmpty()
    .withMessage("Genre is required")
    .isLength({ min: 3 })
    .withMessage("Genre should be between 3 and 40 characters")
    .escape(),
  check("publicationDate")
    .notEmpty()
    .withMessage("Publication Date is required")
    .isISO8601()
    .withMessage("Invalid Publication Date format. Use ISO8601 date format."),
];

module.exports = {
  bookValidator,
};
