const {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
} = require("../controllers/book.controllers");
const { validationHandler } = require("../middleware");
const { bookValidator } = require("../middleware/bookAuth");

const bookRouter = require("express").Router();

bookRouter.get("/", getAllBooks);
bookRouter.get("/:id", getBookById);
bookRouter.post("/", bookValidator, validationHandler, addBook);
bookRouter.put("/:id", updateBook);
bookRouter.delete("/:id", deleteBook);

module.exports = bookRouter;
