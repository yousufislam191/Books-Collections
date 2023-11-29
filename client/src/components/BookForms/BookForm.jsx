// BookForm.js
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const BookForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      genre: "",
      publicationDate: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      author: Yup.string().required("Required"),
      genre: Yup.string().required("Required"),
      publicationDate: Yup.date().required("Required"),
    }),
    onSubmit: (values) => {
      // Implement adding book functionality
      onSubmit(values);
    },
  });

  return (
    <div>
      <h2>Add New Book</h2>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="title"
          name="title"
          label="Title"
          fullWidth
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />

        <TextField
          id="author"
          name="author"
          label="Author"
          fullWidth
          value={formik.values.author}
          onChange={formik.handleChange}
          error={formik.touched.author && Boolean(formik.errors.author)}
          helperText={formik.touched.author && formik.errors.author}
        />

        <TextField
          id="genre"
          name="genre"
          label="Genre"
          fullWidth
          value={formik.values.genre}
          onChange={formik.handleChange}
          error={formik.touched.genre && Boolean(formik.errors.genre)}
          helperText={formik.touched.genre && formik.errors.genre}
        />

        <TextField
          id="publicationDate"
          name="publicationDate"
          label="Publication Date"
          type="date"
          fullWidth
          value={formik.values.publicationDate}
          onChange={formik.handleChange}
          error={
            formik.touched.publicationDate &&
            Boolean(formik.errors.publicationDate)
          }
          helperText={
            formik.touched.publicationDate && formik.errors.publicationDate
          }
        />

        <Button variant="contained" color="primary" type="submit">
          Add Book
        </Button>
      </form>
    </div>
  );
};

export default BookForm;
