import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainRoutes from "./MainRoutes";
import AuthRoutes from "./AuthRoutes";

// TODO: Replace with your actual authentication logic (e.g., from context or Redux)
const useAuth = () => {
  // Example: return useContext(AuthContext).isAuthenticated;
  return true;
};

const AppRoutes = () => {
  const isAuth = useAuth();

  return (
    //  <Router>
    //   <Routes>
    //     <Route path="/*" element={isAuth ? <MainRoutes /> : <AuthRoutes />} />
    //   </Routes>
    // </Router>

    <Router>
      <Routes>
        {isAuth ? (
          // Authenticated users: render main app routes
          <Route path="/*" element={<MainRoutes />} />
        ) : (
          // Unauthenticated users: render auth routes
          <Route path="/*" element={<AuthRoutes />} />
        )}
        {/* Fallback: redirect unknown routes */}
        {!isAuth && (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
