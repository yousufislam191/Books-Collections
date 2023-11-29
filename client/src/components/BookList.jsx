import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Container, Button, Typography } from "@mui/material";
import BookForm from "./BookForms/BookForm";
import BookCard from "./BookForms/BookCard";
import apiHostName from "../helper/apiConfig";

const BookList = () => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${apiHostName}/book`);
        if (res.data.success === true) {
          //   console.log(res.data.payload.books);
          setLoading(true);
          setBooks(res.data.payload.books);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

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
      <Grid
        spacing={2}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          style={{ fontWeight: "bold", marginBottom: "0.5rem" }}
        >
          Book List
        </Typography>
        <Button variant="contained" color="primary" type="submit">
          Add New Book
        </Button>
      </Grid>
      <Grid container spacing={2}>
        {books.map((book) => (
          <Grid item key={book._id} xs={12} sm={6} md={4}>
            <BookCard book={book} onCardClick={handleCardClick} />
          </Grid>
        ))}
      </Grid>

      <BookForm onSubmit={handleBookSubmit} />
    </Container>
  );
};

export default BookList;
