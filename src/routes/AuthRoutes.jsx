import { Routes, Route } from "react-router-dom";

// project imports
import AuthLayout from "../layouts/AuthLayout";

// Import all page components
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import NotFoundPage from "../pages/NotFound"; // Don't forget 404 page!

const AuthRoutes = () => {
  return (
    <AuthLayout>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthLayout>
  );
};

export default AuthRoutes;
