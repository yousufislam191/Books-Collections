// BookForm.js
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Grid, Box, FormHelperText } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import apiHostName from "../../helper/apiConfig";

const BookForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      genre: "",
      publicationDate: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Title is required")
        .min(3, "Title must be at least 3 characters")
        .max(50, "Title will not be more than 50 characters"),
      author: Yup.string()
        .required("Title is required")
        .min(3, "Title must be at least 3 characters")
        .max(50, "Title will not be more than 50 characters"),
      genre: Yup.string()
        .required("Title is required")
        .min(3, "Title must be at least 3 characters"),
      publicationDate: Yup.date()
        .required("Publication date is required")
        .test("isValidDate", "Invalid Publication date format", (value) => {
          return !isNaN(value);
        }),
    }),
    onSubmit: async (values) => {
      //   console.log(values);
      try {
        const response = await axios.post(`${apiHostName}/book`, {
          title: values.title,
          author: values.author,
          genre: values.genre,
          publicationDate: values.publicationDate,
        });

        if (response.data.success === true) {
          // Call the parent onSubmit callback to handle additional actions
          onSubmit();
          formik.resetForm();
          console.log(response.data);
        } else {
          console.error("Failed to add book");
        }
      } catch (error) {
        console.error("Error adding book:", error);
      }
    },
  });

  return (
    <div>
      <h2>Add New Book</h2>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          xs={12}
          sm={6}
          md={4}
          style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}
        >
          <TextField
            id="title"
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />

          <TextField
            id="author"
            name="author"
            label="Author"
            value={formik.values.author}
            onChange={formik.handleChange}
            error={formik.touched.author && Boolean(formik.errors.author)}
            helperText={formik.touched.author && formik.errors.author}
          />
          {/* </Grid>

        <Grid style={{ display: "flex", gap: "1rem" }}> */}
          <TextField
            id="genre"
            name="genre"
            label="Genre"
            value={formik.values.genre}
            onChange={formik.handleChange}
            error={formik.touched.genre && Boolean(formik.errors.genre)}
            helperText={formik.touched.genre && formik.errors.genre}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Publication Date"
                value={
                  formik.values.publicationDate
                    ? new Date(formik.values.publicationDate)
                    : null
                }
                onChange={(date) =>
                  formik.setFieldValue(
                    "publicationDate",
                    date ? date.toISOString() : null
                  )
                }
                sx={{
                  borderColor:
                    formik.touched.publicationDate &&
                    formik.errors.publicationDate
                      ? "#D32F2F"
                      : undefined,
                }}
              />
            </LocalizationProvider>
            {formik.touched.publicationDate && formik.errors.publicationDate ? (
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {formik.errors.publicationDate}
              </FormHelperText>
            ) : null}
          </Box>

          <Button variant="contained" color="primary" type="submit">
            Add Book
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default BookForm;
