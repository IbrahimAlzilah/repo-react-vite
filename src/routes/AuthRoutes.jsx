import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import NotFoundPage from "../pages/NotFound";

const AuthRoutes = () => [
  <Route key="auth" element={<AuthLayout />}>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
  </Route>,
  <Route key="404" path="*" element={<NotFoundPage />} />,
];

export default AuthRoutes;
