import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import LoginForm from "../components/AuthForms/LoginForm";
import RegisterForm from "../components/AuthForms/RegisterForm";
import BookList from "../components/BookList";

const RouterPath = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginForm />} />
          <Route exact path="/register" element={<RegisterForm />} />
          <Route exact path="/books" element={<BookList />} />

          {/* <Route exact path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouterPath;
