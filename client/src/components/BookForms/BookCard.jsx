import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

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
        <Button variant="outlined" color="primary">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookCard;
