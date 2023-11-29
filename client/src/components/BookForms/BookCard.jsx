import React from "react";
import {
  Card,
  Box,
  Grid,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

const BookCard = ({ book, onCardClick }) => {
  return (
    <Card
      style={{ margin: "10px", cursor: "pointer" }}
      onClick={() => onCardClick(book._id)}
    >
      <CardContent>
        <Typography variant="h5">{book.title}</Typography>
        <Typography variant="body2">Author: {book.author}</Typography>
        <Typography variant="body2">Genre: {book.genre}</Typography>
        <Typography variant="body2">
          Publication Date: {book.publicationDate}
        </Typography>
        <Grid style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            color="primary"
            style={{ marginTop: "1rem" }}
          >
            View Details
          </Button>
          <Button
            variant="outlined"
            color="error"
            style={{ marginTop: "1rem" }}
          >
            Delete
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BookCard;
