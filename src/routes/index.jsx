import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";

import { AuthProvider } from "../contexts/auth";
import MainRoutes from "./MainRoutes";
import AuthRoutes from "./AuthRoutes";

const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Auth routes (no protection) */}
          {AuthRoutes()}

          {/* Main routes (protected) */}
          {MainRoutes()}
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
