import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Lazy-loaded pages
const PropsPage = lazy(() => import("../pages/PropsPage"));
const UseState = lazy(() => import("../pages/UseState"));
const UseEffect = lazy(() => import("../pages/UseEffect"));
const UseRef = lazy(() => import("../pages/UseRef"));
const UseContext = lazy(() => import("../pages/UseContext"));
const MuiPage = lazy(() => import("../pages/MuiPage"));
const ToDoList = lazy(() => import("../pages/ToDoList"));
const UserProfile = lazy(() => import("../pages/UserProfile"));

const LoadingFallback = () => (
  <Box sx={{ width: "100%", minHeight: "60vh", padding: 2 }}>
    <CircularProgress color="primary" size="3rem" />
  </Box>
);

const routes = [
  { path: "/", element: <PropsPage /> },
  { path: "/useState", element: <UseState /> },
  { path: "/useEffect", element: <UseEffect /> },
  { path: "/useRef", element: <UseRef /> },
  { path: "/useContext", element: <UseContext /> },
  { path: "/mui", element: <MuiPage /> },
  { path: "/todoList", element: <ToDoList /> },
  { path: "/user-profile", element: <UserProfile /> },
];

const MainRoutes = () => [
  <Route
    key="main"
    element={
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    }
  >
    <Route
      index
      element={
        <Suspense fallback={<LoadingFallback />}>
          <PropsPage />
        </Suspense>
      }
    />
    {routes.slice(1).map((route, i) => (
      <Route
        key={i}
        path={route.path}
        element={
          <Suspense fallback={<LoadingFallback />}>{route.element}</Suspense>
        }
      />
    ))}
  </Route>,
];

export default MainRoutes;
