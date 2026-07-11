import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {

  const loggedIn = localStorage.getItem("adminLoggedIn");

  if (!loggedIn) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}