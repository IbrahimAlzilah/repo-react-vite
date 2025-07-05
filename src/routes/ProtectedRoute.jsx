import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <Box
        className="flex justify-center items-center min-h-[100vh]"
        sx={{ minHeight: "100vh" }}
      >
        <CircularProgress color="primary" size="3rem" />
      </Box>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
}
