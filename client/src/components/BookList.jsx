import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Container, Button, Typography, Pagination } from "@mui/material";
import BookForm from "./BookForms/BookForm";
import BookCard from "./BookForms/BookCard";
import apiHostName from "../helper/apiConfig";

const BookList = () => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    currentPage: 1,
    previousPage: null,
    nextPage: null,
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          `${apiHostName}/book?page=${pagination.currentPage}`
        );
        if (res.data.success === true) {
          //   console.log(res.data.payload.books);
          setLoading(true);
          setBooks(res.data.payload.books);
          setPagination(res.data.payload.pagination);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [pagination.currentPage]);

  const handlePageChange = (event, page) => {
    setPagination({
      ...pagination,
      currentPage: page,
    });
  };

  const handleCardClick = (bookId) => {
    // Implement view details functionality
    console.log("View details for book with ID:", bookId);
  };

  const handleBookSubmit = (bookData) => {
    // Implement adding book functionality
    console.log("Book submitted:", bookData);
  };

  return (
    <Container>
      <BookForm onSubmit={handleBookSubmit} />
      <Grid
        spacing={2}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "1.5rem",
        }}
      >
        <Typography
          variant="h4"
          style={{ fontWeight: "bold", marginBottom: "0.5rem" }}
        >
          Book List
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        {books.map((book) => (
          <Grid item key={book._id} xs={12} sm={6} md={4}>
            <BookCard book={book} onCardClick={handleCardClick} />
          </Grid>
        ))}
      </Grid>
      <Grid container justifyContent="center" mt={3}>
        <Pagination
          count={pagination.totalPages}
          page={pagination.currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
        />
      </Grid>
    </Container>
  );
};

export default BookList;
