import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/auth";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
}
