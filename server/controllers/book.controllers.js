const createError = require("http-errors");
const Book = require("../models/books.model");
const { successResponse } = require("../services/response");
const { findWithId } = require("../services/findWithId");

// Get all books
const getAllBooks = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const searchRegExp = new RegExp(".*" + search + ".*", "i");

    const filter = {
      $or: [
        { title: { $regex: searchRegExp } },
        { author: { $regex: searchRegExp } },
        { genre: { $regex: searchRegExp } },
      ],
    };

    const books = await Book.find(filter)
      .limit(limit)
      .skip((page - 1) * limit);

    // total documents count
    const totalBooks = await Book.find(filter).countDocuments();

    if (!books) throw createError(404, "Book not found");

    // const books = await Book.find();

    return successResponse(res, {
      statusCode: 200,
      message: "Books were retured successfully",
      payload: {
        books,
        pagination: {
          totalPages: Math.ceil(totalBooks / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(totalBooks / limit) ? page + 1 : null,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get single book by ID
const getBookById = async (req, res, next) => {
  try {
    const book = await findWithId(Book, req.params.id);

    return successResponse(res, {
      statusCode: 200,
      message: "Book was retured successfully",
      payload: { book },
    });
  } catch (err) {
    next(err);
  }
};

// Add a new book
const addBook = async (req, res, next) => {
  try {
    const { title, author, genre, publicationDate } = req.body;
    const newBook = new Book({ title, author, genre, publicationDate });
    await newBook.save();
    return successResponse(res, {
      statusCode: 200,
      message: "Book added successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Update book details
const updateBook = async (req, res, next) => {
  try {
    const { title, author, genre, publicationDate } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, genre, publicationDate },
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ msg: "Book not found" });
    }
    return successResponse(res, {
      statusCode: 200,
      message: "Book updated successfully",
      payload: { updateBook },
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Book not found" });
    }
    res.status(500).send("Server Error");
  }
};

// Delete a book
const deleteBook = async (req, res, next) => {
  try {
    const book = await findWithId(Book, req.params.id);

    const deleteBook = await Book.findOneAndDelete({ _id: req.params.id });
    if (!deleteBook)
      throw createError(404, "Book is not deleted. Please try again");

    return successResponse(res, {
      statusCode: 200,
      message: "Book deleted",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllBooks, getBookById, addBook, updateBook, deleteBook };
