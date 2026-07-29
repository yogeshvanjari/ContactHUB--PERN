import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Check if session exists in sessionStorage or localStorage
  const isAuthenticated =
    sessionStorage.getItem("currentUser") ||
    sessionStorage.getItem("usermob");

  useEffect(() => {
    if (!isAuthenticated) {
      alert("⚠️ Access Denied! Please login first to view contacts.");
    }
  }, [isAuthenticated]);

  // If logged in, render the requested page; otherwise, redirect to Home
  if (!isAuthenticated) {
    return <Navigate to="/Home" replace />;
  }

  return children;
}
