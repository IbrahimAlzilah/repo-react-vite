import { BrowserRouter as Router, Routes } from "react-router-dom";

import { AuthProvider } from "../contexts/auth";
import MainRoutes from "./MainRoutes";
import AuthRoutes from "./AuthRoutes";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth routes (no protection) */}
          {AuthRoutes()}

          {/* Main routes (protected) */}
          {MainRoutes()}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
