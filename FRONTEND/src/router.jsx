import { createBrowserRouter, Navigate } from "react-router-dom"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import UserUrls from "./pages/UserUrls"
import Profile from "./pages/Profile"
import { isLoggedIn } from "./api/auth.api"

// Protected route component
const ProtectedRoute = ({ children }) => {
  if (!isLoggedIn()) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />
  }
  return children
}

// Public route component (redirects to home if already logged in)
const PublicRoute = ({ children }) => {
  if (isLoggedIn()) {
    // Redirect to home if already authenticated
    return <Navigate to="/" replace />
  }
  return children
}

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
  {
    path: "/urls",
    element: (
      <ProtectedRoute>
        <UserUrls />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
])

export default router
