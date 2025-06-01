import { createBrowserRouter, Navigate } from "react-router-dom";

// Pages
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";

// Route components
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";

// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  // Catch all route - redirect to home
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
